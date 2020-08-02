package universite.angers.master.info.courses.virtual.teacher.server.app.services;

import java.util.ArrayList;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;
import universite.angers.master.info.courses.virtual.teacher.models.app.course.Course;
import universite.angers.master.info.courses.virtual.teacher.models.app.structure.Structure;
import universite.angers.master.info.courses.virtual.teacher.models.app.user.Role;
import universite.angers.master.info.courses.virtual.teacher.models.app.user.User;
import universite.angers.master.info.courses.virtual.teacher.server.app.dao.UserRepository;
import universite.angers.master.info.courses.virtual.teacher.server.app.exceptions.ResourceNotFoundException;

@Service
public class UserService implements InterfaceService<User> {
	
	@Autowired
	private UserRepository userRepository;

	public User getCurrentUser() {

		Object principal = SecurityContextHolder.getContext().getAuthentication().getPrincipal();
		String username;
		
		if (principal instanceof UserDetails) {
			username = ((UserDetails)principal).getUsername();
		} else {
			username = principal.toString();
		}
		
		return userRepository.findByUsername(username)
				.orElseThrow(() -> new ResourceNotFoundException("User not found for this username : " + username));
	}

	public User getUser(String userName) {
		return userRepository.findByUsername(userName)
				.orElseThrow(() -> new ResourceNotFoundException("User not found for this username : " + userName));
	}

	public List<User> getUsersByRole(Role role){
		return userRepository.findByRole(role);
	}

	@Override
	public List<User> getAll() {
		return userRepository.findAll();
	}

	@Override
	public User add(User user) {
		return userRepository.save(user);
	}

	@Override
	public User get(String id) {
		return userRepository.findById(id)
				.orElseThrow(() -> new ResourceNotFoundException("User not found for this id : " + id));
	}

	@Override
	public void delete(String id) {
		userRepository.deleteById(id);
	}

	public List<Course> getCreatedCourses() {
		List<Course> courses = getCurrentUser().getCoursesCreated();
		for(Course course : courses) {
			CourseService.clearAndSortElementCourse(course.getRoot().getSubElements());
		}
		return courses;
	}

	public List<Course> getAutorizedCourses() {
		List<Course> courses = new ArrayList<Course>();
			for(Structure structure : getCurrentUser().getStructures())
				courses.addAll(structure.getCourses());
		for(Course course : courses) {
			CourseService.clearAndSortElementCourse(course.getRoot().getSubElements());
		}
		return courses;
	}
}