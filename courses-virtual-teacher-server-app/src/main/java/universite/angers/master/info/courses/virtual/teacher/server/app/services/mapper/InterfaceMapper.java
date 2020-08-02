package universite.angers.master.info.courses.virtual.teacher.server.app.services.mapper;


public interface InterfaceMapper<T,U> {
    U entitytoDTO(T t);
    T dtoToEntity(U u);
}
