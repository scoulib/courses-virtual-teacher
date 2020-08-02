package universite.angers.master.info.courses.virtual.teacher.server.app.rest;

import java.security.Principal;
import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.Authorization;
import universite.angers.master.info.courses.virtual.teacher.models.app.course.Course;
import universite.angers.master.info.courses.virtual.teacher.models.app.user.User;
import universite.angers.master.info.courses.virtual.teacher.server.app.dto.CourseDTO;
import universite.angers.master.info.courses.virtual.teacher.server.app.services.UserService;
import universite.angers.master.info.courses.virtual.teacher.server.app.services.mapper.CourseMapper;

@Api("API pour les opérations CRUD sur l'utisateurs courant.")
@RestController
@RequestMapping(value="/api/current-user")
public class CurrentUserController {
	
	@Autowired
	private UserService userService;

	@Autowired
	private CourseMapper courseMapper;

	@ApiOperation(value = "Récupérer le user courant", authorizations = { @Authorization(value="jwtToken") })
	@GetMapping(produces = MediaType.APPLICATION_JSON_VALUE)
	public User printUser(Principal principal) {
		return userService.getUser(principal.getName());
	}

	@ApiOperation(value = "Retourne la liste des cours autoriser a consulté par l'utilisateur courant", authorizations = { @Authorization(value="jwtToken") })
	@GetMapping(value = "/authorizedCourses", produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<List<CourseDTO>> getAuthorizedCourses() {
		List<CourseDTO> courseDTOS = new ArrayList<>();

		for(Course course:userService.getAutorizedCourses())
		{
			CourseDTO courseDTO = courseMapper.entitytoDTO(course);
			courseDTOS.add(courseDTO);
		}
		return ResponseEntity.ok(courseDTOS);
	}

	@ApiOperation(value = "Retourne la liste des cours appartenant à l'utilisateur courant", authorizations = { @Authorization(value="jwtToken") })
	@GetMapping(value = "/created_courses", produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<List<CourseDTO>> getCreatedCourses() {
		List<CourseDTO> courseDTOS = new ArrayList<>();

		for(Course course:userService.getCreatedCourses())
		{
			CourseDTO courseDTO = courseMapper.entitytoDTO(course);
			courseDTOS.add(courseDTO);
		}
		return ResponseEntity.ok(courseDTOS);
	}
}
