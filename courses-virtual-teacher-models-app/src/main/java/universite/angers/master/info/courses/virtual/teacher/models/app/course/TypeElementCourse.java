package universite.angers.master.info.courses.virtual.teacher.models.app.course;

public enum TypeElementCourse {
	SECTION("SECTION"), 
	PARAGRAPHE("PARAGRAPHE"), 
	IMAGE("IMAGE");
	
	private String name;
	
	private TypeElementCourse(String name) {
		this.name = name;
	}
	
	/**
	 * @return the name
	 */
	public String getName() {
		return name;
	}
}
