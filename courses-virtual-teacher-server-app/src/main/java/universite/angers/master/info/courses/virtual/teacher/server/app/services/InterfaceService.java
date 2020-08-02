package universite.angers.master.info.courses.virtual.teacher.server.app.services;

import java.util.List;

public interface InterfaceService<T> {
	
    public List<T> getAll();
    
    public T get(String id);

    public T add(T t);

    public void delete(String id);
}
