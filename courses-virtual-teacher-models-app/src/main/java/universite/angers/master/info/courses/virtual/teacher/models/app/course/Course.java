package universite.angers.master.info.courses.virtual.teacher.models.app.course;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.UUID;
import javax.persistence.*;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import org.hibernate.validator.constraints.Length;
import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Getter;
import lombok.Setter;
import universite.angers.master.info.courses.virtual.teacher.models.app.structure.Structure;
import universite.angers.master.info.courses.virtual.teacher.models.app.user.User;

@Entity
@Table
@Getter
@Setter
public class Course {

	@Id
	private String id;

	@Column(columnDefinition = "TINYTEXT", length = 255)
	private String title;

	@Column(columnDefinition = "TEXT", length = 65535)
	private String description;

	@ManyToOne(fetch = FetchType.LAZY, cascade = { CascadeType.DETACH, CascadeType.MERGE, CascadeType.PERSIST,
			CascadeType.REFRESH })
	private User author;

	@ManyToMany(fetch = FetchType.LAZY, cascade = { CascadeType.DETACH, CascadeType.MERGE, CascadeType.PERSIST,
			CascadeType.REFRESH })
    @JoinTable(
            name = "COURSES_STRUCTURES",
            joinColumns = @JoinColumn(name = "course_id"),
            inverseJoinColumns = @JoinColumn(name = "structure_id"))
    private List<Structure> structures;

	@JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd'T'HH:mm:ss.SSS'Z'", timezone = "Europe/Paris")
	@Temporal(TemporalType.TIMESTAMP)
	private Date dateCreated;

	@JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd'T'HH:mm:ss.SSS'Z'", timezone = "Europe/Paris")
	@Temporal(TemporalType.TIMESTAMP)
	private Date dateLastModified;

	@OneToOne(fetch = FetchType.EAGER, cascade = CascadeType.ALL)
	private ElementCourse root;

	public Course() {
		this.structures = new ArrayList<Structure>();
		this.dateCreated = new Date();
		this.dateLastModified = new Date();
	}

	@PrePersist
	void onCreate() {
		this.id = UUID.randomUUID().toString();
	}
}