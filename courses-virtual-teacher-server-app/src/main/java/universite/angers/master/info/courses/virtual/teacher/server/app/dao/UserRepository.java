package universite.angers.master.info.courses.virtual.teacher.server.app.dao;

import java.util.List;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import universite.angers.master.info.courses.virtual.teacher.models.app.user.Role;
import universite.angers.master.info.courses.virtual.teacher.models.app.user.User;

public interface UserRepository extends JpaRepository<User, String> {
	public Optional<User> findByUsername(String username);
	public Boolean existsByUsername(String username);
	public Boolean existsByEmail(String email);
	public List<User> findByRole(Role role);
}