package universite.angers.master.info.courses.virtual.teacher.server.app.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import universite.angers.master.info.courses.virtual.teacher.models.app.structure.Structure;

@Repository
public interface StructureRepository  extends JpaRepository<Structure,String> {
	
}
