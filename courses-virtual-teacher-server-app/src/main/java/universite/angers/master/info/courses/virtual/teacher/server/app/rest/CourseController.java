package universite.angers.master.info.courses.virtual.teacher.server.app.rest;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.Authorization;

import lombok.extern.java.Log;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;
import universite.angers.master.info.courses.virtual.teacher.models.app.course.Course;
import universite.angers.master.info.courses.virtual.teacher.models.app.structure.Structure;
import universite.angers.master.info.courses.virtual.teacher.server.app.dto.CourseDTO;
import universite.angers.master.info.courses.virtual.teacher.server.app.dto.StructureDTO;
import universite.angers.master.info.courses.virtual.teacher.server.app.services.CourseService;
import universite.angers.master.info.courses.virtual.teacher.server.app.services.UserService;
import universite.angers.master.info.courses.virtual.teacher.server.app.services.mapper.CourseMapper;
import universite.angers.master.info.courses.virtual.teacher.server.app.services.mapper.ElementCourseMapper;
import universite.angers.master.info.courses.virtual.teacher.server.app.services.mapper.StructureMapper;

import java.net.URI;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Api("API pour les opérations CRUD sur les cours.")
@RestController
@RequestMapping(value="/api/courses")
@Log
public class CourseController implements InterfaceController<CourseDTO>{
	
	@Autowired
	private CourseService courseService;

	@Autowired
	private UserService userService;

	@Autowired
	private CourseMapper courseMapper;

	@Autowired
	private StructureMapper structureMapper;

	@Autowired
	private ElementCourseMapper elementCourseMapper;



	@ApiOperation(value = "Récupèrer la liste complète de tous les cours!", authorizations = { @Authorization(value="jwtToken") })
	@GetMapping(produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<List<CourseDTO>>getAll() {
		List<CourseDTO> courseDTOS = new ArrayList<>();

		for(Course course:courseService.getAll())
		{
			CourseDTO courseDTO = courseMapper.entitytoDTO(course);
			courseDTOS.add(courseDTO);
		}
		return ResponseEntity.ok(courseDTOS);
	}

	@ApiOperation(value = "Ajouter un Cours!", authorizations = { @Authorization(value="jwtToken") })
	@PostMapping
	public ResponseEntity<Void> add(@RequestBody CourseDTO courseDTO) {
		Course course = courseMapper.dtoToEntity(courseDTO);

		Course courseAdded = courseService.add(course);

		if (courseAdded == null)
			return ResponseEntity.noContent().build();
		
		URI location = ServletUriComponentsBuilder
				.fromCurrentRequest()
				.path("/{id}")
				.buildAndExpand(courseAdded.getId())
				.toUri();
		
		return ResponseEntity.created(location).build();
	}

	@ApiOperation(value = "Récupère un cours grâce à son ID ", authorizations = { @Authorization(value="jwtToken") })
	@GetMapping(value = "/{id}", produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<CourseDTO> get(@PathVariable String id) {
		return ResponseEntity.ok(courseMapper.entitytoDTO(courseService.get(id)));
	}

	@ApiOperation(value = "supprimer un cours en fournissant un id", authorizations = { @Authorization(value="jwtToken") })
	@DeleteMapping(value = "/{id}", produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<?> delete(@PathVariable String id) {
		courseService.delete(id);
		return ResponseEntity.ok().build();
	}

	@ApiOperation(value = "Mettre à jour un cours en fournissant un id et un cours sous format json", authorizations = { @Authorization(value="jwtToken") })
	@PutMapping(value = "/{id}", consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<CourseDTO> update(@PathVariable String id, @RequestBody CourseDTO courseDTO) {
		Course course = courseService.get(id);
		course.setTitle(courseDTO.getTitle());
		course.setDescription(courseDTO.getDescription());
		course.setAuthor(userService.getCurrentUser());
		//course.setStructures(courseDTO.getStructures());
		course.setDateCreated(courseDTO.getDateCreated());
		course.setDateLastModified(new Date());
		course.setRoot(elementCourseMapper.dtoToEntity(courseDTO.getRoot()));

		List<Structure> structures = new ArrayList<>();
		for(StructureDTO structureDTO1:courseDTO.getStructureDTOS())
		{
			Structure structure = structureMapper.dtoToEntity(structureDTO1);
			structures.add(structure);
		}
		course.getStructures().addAll(structures);

		return ResponseEntity.ok(courseMapper.entitytoDTO(courseService.add(course)));
	}
}
