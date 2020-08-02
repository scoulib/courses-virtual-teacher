package universite.angers.master.info.courses.virtual.teacher.models.app.course;

public enum FormatElementCourse {
	HTML("HTML"), 
	TEXTE("TEXTE");
	
	private String name;
	
	private FormatElementCourse(String name) {
		this.name = name;
	}
	
	/**
	 * @return the name
	 */
	public String getName() {
		return name;
	}
}
