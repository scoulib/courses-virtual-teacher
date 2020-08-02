package universite.angers.master.info.courses.virtual.teacher.models.app.structure;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;
import javax.persistence.*;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;
import lombok.Getter;
import lombok.Setter;
import universite.angers.master.info.courses.virtual.teacher.models.app.course.Course;
import universite.angers.master.info.courses.virtual.teacher.models.app.user.User;

@Entity
@Table
@Getter
@Setter
@JsonIdentityInfo(
		generator = ObjectIdGenerators.PropertyGenerator.class,
		property = "id")
public class Structure implements Comparable<Structure> {

	@Id
	private String id;

	@Column(columnDefinition = "TINYTEXT", length = 255)
	protected String title;

	@Column(columnDefinition = "TEXT", length = 65535)
	protected String description;

	@Column
	private int position;

	@Column
	protected boolean expanded;

	@Column
	protected boolean selected;

	@ManyToOne(fetch = FetchType.EAGER, cascade = { CascadeType.DETACH, CascadeType.MERGE, CascadeType.PERSIST,
			CascadeType.REFRESH })
	private Structure father;

	@OneToMany(fetch = FetchType.EAGER, cascade = CascadeType.ALL)
	private List<Structure> subStructures;

	@ManyToMany(mappedBy = "structures", fetch = FetchType.LAZY, cascade = { CascadeType.DETACH, CascadeType.MERGE,
			CascadeType.PERSIST, CascadeType.REFRESH })
	private List<Course> courses;

	@ManyToMany(mappedBy = "structures", fetch = FetchType.LAZY, cascade = { CascadeType.DETACH, CascadeType.MERGE,
			CascadeType.PERSIST, CascadeType.REFRESH })
	private List<User> users;

	public Structure() {
		this.subStructures = new ArrayList<Structure>();
		this.courses = new ArrayList<Course>();
		this.users = new ArrayList<User>();
	}

	@PrePersist
	void onCreate() {
		this.id = UUID.randomUUID().toString();
	}


	@Override
	public int compareTo(Structure e) {
		return Integer.compare(this.position, e.position);
	}
}
