package universite.angers.master.info.courses.virtual.teacher.server.app.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import universite.angers.master.info.courses.virtual.teacher.models.app.course.Course;
import universite.angers.master.info.courses.virtual.teacher.models.app.course.ElementCourse;
import universite.angers.master.info.courses.virtual.teacher.server.app.dao.CourseRepository;
import universite.angers.master.info.courses.virtual.teacher.server.app.exceptions.ResourceNotFoundException;

import java.util.Collections;
import java.util.List;

@Service
public class CourseService implements InterfaceService<Course> {

	@Autowired
	private CourseRepository courseRepository;

	@Override
	public List<Course> getAll() {
		List<Course> courses = courseRepository.findAll();

		for (Course course : courses) {
			this.clearAndSortElementCourse(course.getRoot().getSubElements());
		}

		return courses;
	}

	/**
	 * Enlever l'objet pere et ordonner les éléments de cours par ordre de position
	 * par appel récursive de la méthode
	 * 
	 * @param elements
	 */
	public static void clearAndSortElementCourse(List<ElementCourse> elements) {
		for (ElementCourse element : elements) {
			clearAndSortElementCourse(element.getSubElements());
			element.setFather(null);
			Collections.sort(element.getSubElements());
		}
	}

	@Override
	public Course add(Course course) {
		return courseRepository.save(course);
	}

	@Override
	public Course get(String id) {
		Course course = courseRepository.findById(id)
				.orElseThrow(() -> new ResourceNotFoundException("Course not found for this id : " + id));

		this.clearAndSortElementCourse(course.getRoot().getSubElements());

		return course;
	}

	@Override
	public void delete(String id) {
		courseRepository.delete(get(id));
	}
}