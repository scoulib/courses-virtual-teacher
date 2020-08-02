package universite.angers.master.info.courses.virtual.teacher.server.app.util;

public class ServerUtil {

	private ServerUtil() {
		
	}
	
	/**
	 * Vérifier si une chaine est vide
	 * @param str
	 * @return
	 */
	public static boolean isNullOrEmpty(String str) {
        return str == null || !str.trim().isEmpty();
    }
}
