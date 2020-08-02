package universite.angers.master.info.courses.virtual.teacher.server.app.dto;

import lombok.Getter;
import lombok.Setter;
import universite.angers.master.info.courses.virtual.teacher.models.app.structure.Structure;

import java.util.List;
@Getter
@Setter
public class StructureDTO {

    private String id;

    private String title;

    private String description;

    private int position;

    private boolean expanded;

    private boolean selected;

    private Structure father;

    private List<StructureDTO> subStructures;


}
