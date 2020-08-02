package universite.angers.master.info.courses.virtual.teacher.server.app.dto;

import lombok.Getter;
import lombok.Setter;
import universite.angers.master.info.courses.virtual.teacher.models.app.course.ElementCourse;
import universite.angers.master.info.courses.virtual.teacher.models.app.course.FormatElementCourse;
import universite.angers.master.info.courses.virtual.teacher.models.app.course.TypeElementCourse;

import java.util.List;

@Getter
@Setter
public class ElementCourseDTO {

    private String id;

    private int position;

    protected String title;

    protected String description;

    protected boolean expanded;

    protected boolean selected;

    private TypeElementCourse type;

    private ElementCourse father;

    private List<ElementCourse> subElements;

    private String content;

    private FormatElementCourse format;

}
