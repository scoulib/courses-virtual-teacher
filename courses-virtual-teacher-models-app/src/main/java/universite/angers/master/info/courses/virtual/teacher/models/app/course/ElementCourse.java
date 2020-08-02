package universite.angers.master.info.courses.virtual.teacher.models.app.course;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;
import javax.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table
@Getter
@Setter
public class ElementCourse implements Comparable<ElementCourse> {
	
	@Id
	private String id;
	
	@Column
	private int position;

	@Column(columnDefinition = "TINYTEXT", length = 255)
	protected String title;

	@Column(columnDefinition = "TEXT", length = 65535)
	protected String description;
	
	@Column
	protected boolean expanded;
	
	@Column
	protected boolean selected;
	
	@Enumerated(EnumType.STRING)
	private TypeElementCourse type;

    @ManyToOne(fetch = FetchType.EAGER, cascade = {CascadeType.DETACH, CascadeType.MERGE, CascadeType.PERSIST, CascadeType.REFRESH})
    private ElementCourse father;

    @OneToMany(fetch = FetchType.EAGER, cascade = CascadeType.ALL)
    private List<ElementCourse> subElements;

	@Column(columnDefinition = "TEXT", length = 65535)
    private String content;
    
    @Enumerated(EnumType.STRING)
	private FormatElementCourse format;

	public ElementCourse() {
    	this.subElements = new ArrayList<ElementCourse>();
    }

	@PrePersist
	void onCreate() {
		this.id = UUID.randomUUID().toString();
	}

	@Override
	public int compareTo(ElementCourse e) {
		return Integer.compare(this.position, e.position);
	}
}
