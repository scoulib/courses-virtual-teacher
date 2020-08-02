package universite.angers.master.info.courses.virtual.teacher.server.app.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.builders.WebSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import universite.angers.master.info.courses.virtual.teacher.models.app.user.Role;
import universite.angers.master.info.courses.virtual.teacher.server.app.security.AuthEntryPointJwt;
import universite.angers.master.info.courses.virtual.teacher.server.app.security.AuthTokenFilter;
import universite.angers.master.info.courses.virtual.teacher.server.app.security.SecurityConstants;
import universite.angers.master.info.courses.virtual.teacher.server.app.services.VtUserDetailsService;

@Configuration
@EnableWebSecurity
@EnableGlobalMethodSecurity(
		  prePostEnabled = true, 
		  securedEnabled = true, 
		  jsr250Enabled = true)
public class WebSecurityConfig extends WebSecurityConfigurerAdapter {
	
	@Autowired
	private VtUserDetailsService vtUserDetailsService;
	
	@Autowired
	private AuthEntryPointJwt unauthorizedHandler;

	@Override
	public void configure(AuthenticationManagerBuilder authenticationManagerBuilder) throws Exception {
		authenticationManagerBuilder
			.eraseCredentials(true)
			.userDetailsService(vtUserDetailsService)
			.passwordEncoder(getPasswordEncoder());
	}

	@Bean
	@Override
	public AuthenticationManager authenticationManagerBean() throws Exception {
		return super.authenticationManagerBean();
	}
	
	@Bean
	public PasswordEncoder getPasswordEncoder() {
		return new BCryptPasswordEncoder();
	}
	
	@Bean
	public AuthTokenFilter authenticationJwtTokenFilter() {
		return new AuthTokenFilter();
	}
	
	@Override
	public void configure(WebSecurity web) throws Exception {
		web.ignoring().antMatchers(
				SecurityConstants.SWAGGER_URLS);
	}
	
	@Override
	protected void configure(HttpSecurity http) throws Exception {
		http.cors();
		http.csrf().disable();
		http.httpBasic();
		http.formLogin();
//		http.authorizeRequests().antMatchers(SecurityConstants.USERS_URL).hasRole(Role.ADMIN.getName());
//		http.authorizeRequests().antMatchers(HttpMethod.POST,SecurityConstants.STRUCTURES_URL).hasRole(Role.ADMIN.getName());
//		http.authorizeRequests().antMatchers(HttpMethod.PUT,SecurityConstants.STRUCTURES_URL).hasRole(Role.ADMIN.getName());
//		http.authorizeRequests().antMatchers(HttpMethod.DELETE,SecurityConstants.STRUCTURES_URL).hasRole(Role.ADMIN.getName());
//		http.authorizeRequests().antMatchers(HttpMethod.POST,SecurityConstants.COURSES_URL).hasRole(Role.TEACHER.getName());
//		http.authorizeRequests().antMatchers(HttpMethod.PUT,SecurityConstants.COURSES_URL).hasRole(Role.TEACHER.getName());
//		http.authorizeRequests().antMatchers(HttpMethod.DELETE,SecurityConstants.COURSES_URL).hasRole(Role.TEACHER.getName());
		http.authorizeRequests().antMatchers("api/**").authenticated();
		http.authorizeRequests().anyRequest().permitAll();
		http.exceptionHandling().authenticationEntryPoint(unauthorizedHandler);
		http.sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS);
		
		http.addFilterBefore(authenticationJwtTokenFilter(), UsernamePasswordAuthenticationFilter.class);
	}
}