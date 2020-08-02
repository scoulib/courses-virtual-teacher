package universite.angers.master.info.courses.virtual.teacher.server.app.services.mapper;

import org.mapstruct.Mapper;
import universite.angers.master.info.courses.virtual.teacher.models.app.course.ElementCourse;
import universite.angers.master.info.courses.virtual.teacher.server.app.dto.ElementCourseDTO;

@Mapper(componentModel = "spring")
public interface ElementCourseMapper extends InterfaceMapper<ElementCourse, ElementCourseDTO> {

}
