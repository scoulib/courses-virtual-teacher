package universite.angers.master.info.courses.virtual.teacher.server.app.services.mapper;

import org.mapstruct.Mapper;
import universite.angers.master.info.courses.virtual.teacher.models.app.structure.Structure;
import universite.angers.master.info.courses.virtual.teacher.server.app.dto.StructureDTO;

@Mapper(componentModel = "spring")
public interface StructureMapper extends InterfaceMapper<Structure, StructureDTO> {
}
