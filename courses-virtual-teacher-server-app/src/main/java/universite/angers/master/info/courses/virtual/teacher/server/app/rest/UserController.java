package universite.angers.master.info.courses.virtual.teacher.server.app.rest;

import java.net.URI;
import java.util.ArrayList;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.Authorization;
import universite.angers.master.info.courses.virtual.teacher.models.app.course.Course;
import universite.angers.master.info.courses.virtual.teacher.models.app.structure.Structure;
import universite.angers.master.info.courses.virtual.teacher.models.app.user.Role;
import universite.angers.master.info.courses.virtual.teacher.models.app.user.User;
import universite.angers.master.info.courses.virtual.teacher.server.app.dto.CourseDTO;
import universite.angers.master.info.courses.virtual.teacher.server.app.dto.StructureDTO;
import universite.angers.master.info.courses.virtual.teacher.server.app.dto.UserDTO;
import universite.angers.master.info.courses.virtual.teacher.server.app.services.UserService;
import universite.angers.master.info.courses.virtual.teacher.server.app.services.mapper.CourseMapper;
import universite.angers.master.info.courses.virtual.teacher.server.app.services.mapper.StructureMapper;
import universite.angers.master.info.courses.virtual.teacher.server.app.services.mapper.UserMapper;

@Api("API pour les opérations CRUD sur les utilisateurs.")
@RestController
@RequestMapping(value = "/api/users")
public class UserController implements InterfaceController<UserDTO> {

	@Autowired
	private UserService userService;

	@Autowired
	private UserMapper userMapper;

	@Autowired
	private StructureMapper structureMapper;

	@ApiOperation(value = "Récupèrer la liste complète de tous les utilisateurs", authorizations = { @Authorization(value="jwtToken") })
	@GetMapping(produces = MediaType.APPLICATION_JSON_VALUE)
	@Override
	public ResponseEntity<List<UserDTO>> getAll() {
		List<UserDTO> userDTOS = new ArrayList<>();

		for(User user:userService.getAll())
		{
			UserDTO userDTO = userMapper.entitytoDTO(user);
			userDTO.setStructureDTOS(new ArrayList<StructureDTO>());
			userDTOS.add(userDTO);
		}
		return ResponseEntity.ok(userDTOS);
	}

	@ApiOperation(value = "Ajouter un utilisateur", authorizations = { @Authorization(value="jwtToken") })
	@PostMapping(consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
	@Override
	public ResponseEntity<Void> add(@RequestBody UserDTO userDTO) {
		//TODO Ajout en tenant compte des structures
		User userAdded = userService.add(userMapper.dtoToEntity(userDTO));

		if (userAdded == null)
			return ResponseEntity.noContent().build();

		URI location = ServletUriComponentsBuilder.fromCurrentRequest().path("/{id}").buildAndExpand(userAdded.getId())
				.toUri();

		return ResponseEntity.created(location).build();
	}

	@ApiOperation(value = "Récupère un utilisateur grâce à son id", authorizations = { @Authorization(value="jwtToken") })
	@GetMapping(value = "/{id}", produces = MediaType.APPLICATION_JSON_VALUE)
	@Override
	public ResponseEntity<UserDTO> get(@PathVariable String id) {
		return ResponseEntity.ok(userMapper.entitytoDTO(userService.get(id)));
	}

	@ApiOperation(value = "supprimer un utilisateurs en fournissant un id", authorizations = { @Authorization(value="jwtToken") })
	@DeleteMapping(value = "/{id}", produces = MediaType.APPLICATION_JSON_VALUE)
	@Override
	public ResponseEntity<?> delete(@PathVariable String id) {
		userService.delete(id);
		return ResponseEntity.ok().build();
	}

	@ApiOperation(value = "Mettre à jour un utilisateur en fournissant un id et un utilisateur sous format json", authorizations = { @Authorization(value="jwtToken") })
	@PutMapping(value = "/{id}", consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
	@Override
	public ResponseEntity<UserDTO> update(@PathVariable String id, @RequestBody UserDTO userDTO) {
		User old = userService.get(id);

		old.setRole(userDTO.getRole());
		old.setLastname(userDTO.getLastname());
		old.setFirstname(userDTO.getFirstname());
		old.setUsername(userDTO.getUsername());
		old.setPassword(userDTO.getPassword());
		old.setBirth(userDTO.getBirth());
		old.setEmail(userDTO.getEmail());
		old.setPhone(userDTO.getPhone());
		old.setAddress(userDTO.getAddress());
		old.setActive(userDTO.isActive());
		List<Structure> structures = new ArrayList<>();
		for(StructureDTO structureDTO1:userDTO.getStructureDTOS())
		{
			Structure structure = structureMapper.dtoToEntity(structureDTO1);
			structures.add(structure);
		}
		old.getStructures().addAll(structures);

		return ResponseEntity.ok(userMapper.entitytoDTO(userService.add(old)));
	}

	@ApiOperation(value = "Récupèrer des utilistateurs avec un role donne", authorizations = { @Authorization(value="jwtToken") })
	@GetMapping(value = "/role/{role}",produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<List<UserDTO>> getUsersByRoleAdmin(@PathVariable String role) {
		List<UserDTO> userDTOS = new ArrayList<>();
		switch (role){
			case "admin":


				for(User user:userService.getUsersByRole(Role.ADMIN))
				{
					UserDTO userDTO = userMapper.entitytoDTO(user);
					userDTOS.add(userDTO);
				}
				return ResponseEntity.ok(userDTOS);
			case "student":
				for(User user:userService.getUsersByRole(Role.STUDENT))
				{
					UserDTO userDTO = userMapper.entitytoDTO(user);
					userDTOS.add(userDTO);
				}
				return ResponseEntity.ok(userDTOS);
			case "teacher":
				for(User user:userService.getUsersByRole(Role.TEACHER))
				{
					UserDTO userDTO = userMapper.entitytoDTO(user);
					userDTOS.add(userDTO);
				}
				return ResponseEntity.ok(userDTOS);
			default:
				return null;
		}

	}

}
