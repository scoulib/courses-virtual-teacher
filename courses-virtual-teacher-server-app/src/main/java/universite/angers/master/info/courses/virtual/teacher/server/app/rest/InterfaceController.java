package universite.angers.master.info.courses.virtual.teacher.server.app.rest;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

public interface InterfaceController<T> {

    public ResponseEntity<List<T>> getAll();


    public ResponseEntity<Void> add(@RequestBody T t);


    public ResponseEntity<T> get(@PathVariable String id);


    public ResponseEntity<?> delete(@PathVariable String id);


    public ResponseEntity<T> update(@PathVariable String id, @RequestBody T t);
}
