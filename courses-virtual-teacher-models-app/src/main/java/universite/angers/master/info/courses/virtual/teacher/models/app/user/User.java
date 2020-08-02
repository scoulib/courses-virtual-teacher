package universite.angers.master.info.courses.virtual.teacher.models.app.user;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.UUID;

import javax.persistence.*;

import com.fasterxml.jackson.annotation.*;
import org.hibernate.validator.constraints.Length;
import lombok.Getter;
import lombok.Setter;
import universite.angers.master.info.courses.virtual.teacher.models.app.course.Course;
import universite.angers.master.info.courses.virtual.teacher.models.app.structure.Structure;

@Entity
@Table
@Getter
@Setter
public class User {

	@Id
	@Length(max = 80)
	private String id;
	
	@Enumerated(EnumType.STRING)
	private Role role;

	@Column(columnDefinition = "TINYTEXT", length = 255)
	private String lastname;

	@Column(columnDefinition = "TINYTEXT", length = 255)
	private String firstname;

	@Column(columnDefinition = "TINYTEXT", length = 255,unique = true)
	private String username;

	private String password;
	
	@JsonFormat(shape=JsonFormat.Shape.STRING, pattern="yyyy-MM-dd'T'HH:mm:ss.SSS'Z'", timezone="Europe/Paris")
	@Temporal(TemporalType.TIMESTAMP)
	private Date birth;

	@Column(columnDefinition = "TINYTEXT", length = 255)
	private String email;

	@Column(columnDefinition = "TINYTEXT", length = 255)
	private String phone;

	@Column(columnDefinition = "TINYTEXT", length = 255)
	private String address;
	
	/**
	 * Le compte du user est-il active ?
	 */
	@Column
	private boolean active;

	@ManyToMany(fetch = FetchType.LAZY, cascade = {CascadeType.DETACH, CascadeType.MERGE, CascadeType.PERSIST, CascadeType.REFRESH})
	@JoinTable(
			name = "STRUCTURES_USERS",
			joinColumns = @JoinColumn(name = "user_id"),
			inverseJoinColumns = @JoinColumn(name = "structure_id"))
	private List<Structure> structures;
	@JsonBackReference
	@OneToMany(fetch = FetchType.LAZY, cascade = CascadeType.ALL, mappedBy = "author")
	private List<Course> coursesCreated;
	
	public User() {
		this.structures = new ArrayList<Structure>();
		this.coursesCreated = new ArrayList<Course>();
	}

	@PrePersist
	void onCreate() {
		this.id = UUID.randomUUID().toString();
	}
}
