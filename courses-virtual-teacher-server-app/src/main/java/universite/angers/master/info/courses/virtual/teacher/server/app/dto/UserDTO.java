package universite.angers.master.info.courses.virtual.teacher.server.app.dto;

import lombok.Getter;
import lombok.Setter;
import universite.angers.master.info.courses.virtual.teacher.models.app.user.Role;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonFormat;

@Getter
@Setter
public class UserDTO {

	private String id;

	private Role role;

	private String lastname;

	private String firstname;

	private String username;

	private String password;

    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd'T'HH:mm:ss.SSS'Z'", timezone = "Europe/Paris")
    private Date birth;

	private String email;

	private String phone;

	private String address;

	private boolean active;

	private List<StructureDTO> structureDTOS;

    public UserDTO() {
        this.structureDTOS = new ArrayList<>();
        this.birth = new Date();
    }

}
