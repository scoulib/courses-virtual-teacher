package universite.angers.master.info.courses.virtual.teacher.server.app.services.mapper;

import org.mapstruct.Mapper;
import universite.angers.master.info.courses.virtual.teacher.models.app.user.User;
import universite.angers.master.info.courses.virtual.teacher.server.app.dto.UserDTO;

@Mapper(componentModel = "spring")
public interface UserMapper extends InterfaceMapper<User, UserDTO>{
}
