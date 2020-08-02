package universite.angers.master.info.courses.virtual.teacher.server.app.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import universite.angers.master.info.courses.virtual.teacher.models.app.structure.Structure;
import universite.angers.master.info.courses.virtual.teacher.server.app.dao.StructureRepository;
import universite.angers.master.info.courses.virtual.teacher.server.app.exceptions.ResourceNotFoundException;

import java.util.Collections;
import java.util.List;

@Service
public class StructureService implements InterfaceService<Structure> {
	
    @Autowired
    private StructureRepository structureRepository;

    @Override
    public List<Structure> getAll() {
        List<Structure> structures = structureRepository.findAll();

        for(Structure structure : structures) {
            this.clearAndSortStructure(structure.getSubStructures());
        }

        return structures;
    }

    @Override
    public Structure add(Structure structure) {
        return structureRepository.save(structure);
    }

    @Override
    public Structure get(String id) {
        return structureRepository.findById(id)
        		.orElseThrow(() -> new ResourceNotFoundException("Structure not found for this id : " + id));
    }

    private void clearAndSortStructure(List<Structure> structures) {
        for(Structure structure : structures) {
            this.clearAndSortStructure(structure.getSubStructures());
            structure.setFather(null);
            Collections.sort(structure.getSubStructures());
        }
    }
            @Override
    public void delete(String id) {
        Structure structure = get(id);
        structure.getUsers().clear();
        structure.getCourses().clear();
        structureRepository.delete(structure);
    }
}
