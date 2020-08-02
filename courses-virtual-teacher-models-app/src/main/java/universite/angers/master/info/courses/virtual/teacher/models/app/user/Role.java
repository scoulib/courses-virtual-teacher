package universite.angers.master.info.courses.virtual.teacher.models.app.user;

public enum Role {
	ADMIN("ADMIN"), 
	TEACHER("TEACHER"), 
	STUDENT("STUDENT");
	
	private String name;
	
	Role(String name) {
		this.name = name;
	}

	/**
	 * @return the name
	 */
	public String getName() {
		return name;
	}
}
