package universite.angers.master.info.courses.virtual.teacher.server.app.dto;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonFormat;

import lombok.Getter;
import lombok.Setter;
import universite.angers.master.info.courses.virtual.teacher.models.app.structure.Structure;

@Getter
@Setter
public class CourseDTO {

	private String id;
	
	private String title;
	
	private String description;



	@JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd'T'HH:mm:ss.SSS'Z'", timezone = "Europe/Paris")
	private Date dateCreated;

	@JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd'T'HH:mm:ss.SSS'Z'", timezone = "Europe/Paris")
	private Date dateLastModified;

	private ElementCourseDTO root;
	
	private List<StructureDTO> structureDTOS;

	public CourseDTO() {
		this.structureDTOS = new ArrayList<>();

		this.dateCreated = new Date();
		this.dateLastModified = new Date();
	}

}
