package universite.angers.master.info.courses.virtual.teacher.server.app.services;

import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import universite.angers.master.info.courses.virtual.teacher.models.app.user.User;
import universite.angers.master.info.courses.virtual.teacher.server.app.dao.UserRepository;

@Service
public class VtUserDetailsService implements UserDetailsService {
	
	@Autowired
	private UserRepository userRepository;

	@Override
	public UserDetails loadUserByUsername(String userName) throws UsernameNotFoundException {
 		Optional<User> user = userRepository.findByUsername(userName);
 		user.orElseThrow(() -> new UsernameNotFoundException("Not found " + userName));
 		return user.map(VtUserDetails::new).get();
	}
}
