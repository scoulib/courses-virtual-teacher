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
import universite.angers.master.info.courses.virtual.teacher.server.app.dto.CourseDTO;
import universite.angers.master.info.courses.virtual.teacher.server.app.dto.StructureDTO;
import universite.angers.master.info.courses.virtual.teacher.server.app.services.StructureService;
import universite.angers.master.info.courses.virtual.teacher.server.app.services.mapper.StructureMapper;

@Api("API pour les opérations CRUD sur les structure.")
@RestController
@RequestMapping(value="/api/structures")
public class StructureController implements InterfaceController< StructureDTO> {

	@Autowired
	private StructureService structureService;

	@Autowired
	private StructureMapper structureMapper;

	@ApiOperation(value = "Récupèrer la liste complète de toutes les structures", authorizations = { @Authorization(value="jwtToken") })
	@GetMapping(produces = MediaType.APPLICATION_JSON_VALUE)
	@Override
	public ResponseEntity<List<StructureDTO>> getAll() {
		List<StructureDTO> stuctureDTOS = new ArrayList<>();

		for(Structure structure:structureService.getAll())
		{
			StructureDTO structureDTO = structureMapper.entitytoDTO(structure);
			stuctureDTOS.add(structureDTO);
		}
		return ResponseEntity.ok(stuctureDTOS);
	}

	@ApiOperation(value="Ajouter une structure", authorizations = { @Authorization(value="jwtToken") })
	@PostMapping(consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
	@Override
	public ResponseEntity<Void> add(@RequestBody StructureDTO structureDTO) {
		Structure addedStructure = structureService.add(structureMapper.dtoToEntity(structureDTO));
		
		if(addedStructure == null) {
			return ResponseEntity.noContent().build();
		}
		
		URI location = ServletUriComponentsBuilder
				.fromCurrentRequest()
				.path("/{id}")
				.buildAndExpand(addedStructure.getId())
				.toUri();
		
		return ResponseEntity.created(location).build();
	}

	@ApiOperation(value = "Récupère une structure grâce à son ID ", authorizations = { @Authorization(value="jwtToken") })
	@GetMapping(value = "/{id}", produces = MediaType.APPLICATION_JSON_VALUE)
	@Override
	public ResponseEntity<StructureDTO> get(@PathVariable String id) {
		return ResponseEntity.ok(structureMapper.entitytoDTO(structureService.get(id)));
	}

	@ApiOperation(value = "Supprimer une structures à l'aide de son id", authorizations = { @Authorization(value="jwtToken") })
	@DeleteMapping(value="/{id}", produces = MediaType.APPLICATION_JSON_VALUE)
	@Override
	public ResponseEntity<?> delete(@PathVariable String id) {
		structureService.delete(id);
		return ResponseEntity.ok().build();
	}

	@ApiOperation(value = "Mettre à jour une structure en fournissant un id et une structure sous format json", authorizations = { @Authorization(value="jwtToken") })
	@PutMapping(value = "/{id}", consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
	@Override
	public ResponseEntity<StructureDTO> update(@PathVariable String id, @RequestBody StructureDTO structureDTO) {
		Structure old = structureService.get(id);
		old.setTitle(structureDTO.getTitle());
		old.setDescription(structureDTO.getDescription());
		old.setExpanded(structureDTO.isExpanded());
		old.setSelected(structureDTO.isSelected());
		old.setFather(structureDTO.getFather());
		old.setPosition(structureDTO.getPosition());
		List<Structure> structures = new ArrayList<>();

		for(StructureDTO structureDTO1:structureDTO.getSubStructures())
		{
			Structure structure = structureMapper.dtoToEntity(structureDTO1);
			structures.add(structure);
		}
		old.setSubStructures(structures);
		
		return ResponseEntity.ok(structureMapper.entitytoDTO(structureService.add(old)));
	}
}
