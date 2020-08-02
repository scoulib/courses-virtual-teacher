package universite.angers.master.info.courses.virtual.teacher.server.app.services.mapper;

import org.mapstruct.Mapper;
import universite.angers.master.info.courses.virtual.teacher.models.app.course.Course;
import universite.angers.master.info.courses.virtual.teacher.server.app.dto.CourseDTO;
@Mapper(componentModel = "spring")
public interface CourseMapper extends InterfaceMapper<Course, CourseDTO> {
}
