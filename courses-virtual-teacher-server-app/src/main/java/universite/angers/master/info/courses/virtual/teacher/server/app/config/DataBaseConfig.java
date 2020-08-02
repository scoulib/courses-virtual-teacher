package universite.angers.master.info.courses.virtual.teacher.server.app.config;

import java.util.Calendar;
import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import universite.angers.master.info.courses.virtual.teacher.models.app.course.Course;
import universite.angers.master.info.courses.virtual.teacher.models.app.course.ElementCourse;
import universite.angers.master.info.courses.virtual.teacher.models.app.course.FormatElementCourse;
import universite.angers.master.info.courses.virtual.teacher.models.app.course.TypeElementCourse;
import universite.angers.master.info.courses.virtual.teacher.models.app.structure.Structure;
import universite.angers.master.info.courses.virtual.teacher.models.app.user.Role;
import universite.angers.master.info.courses.virtual.teacher.models.app.user.User;
import universite.angers.master.info.courses.virtual.teacher.server.app.dao.CourseRepository;
import universite.angers.master.info.courses.virtual.teacher.server.app.dao.StructureRepository;
import universite.angers.master.info.courses.virtual.teacher.server.app.dao.UserRepository;

@Component
public class DataBaseConfig implements CommandLineRunner {

	private static final int END = 20;

	@Autowired
	private UserRepository userRepository;

	@Autowired
	private CourseRepository courseRepository;

	@Autowired
	private StructureRepository structureRepository;

	@Autowired
	private PasswordEncoder passwordEncoder;

	private Map<String, User> admins;

	private Map<String, User> teachers;

	private Map<String, User> students;

	private Map<String, Course> courses;

	private Map<String, Structure> structures;

	@Override
	public void run(String... args) throws Exception {
		this.buildUsers();
		this.buildCourses();
		this.buildStructures();

		this.buildCoursesAuthors();
		this.buildStructuresCoursesMaster();
		this.buildStructuresUsersMaster();
		this.buildStructuresUsersSpring();
		this.buildStructuresUsersJava();
		this.buildStructuresUsersAngular();

		//Tout va etre crée en cascade
		this.userRepository.saveAll(this.admins.values());
		this.userRepository.saveAll(this.teachers.values());
		this.userRepository.saveAll(this.students.values());
	}

	private void buildCoursesAuthors() {
		courses.get("Intelligence artificielle 1").setAuthor(teachers.get("jmricher"));
		teachers.get("jmricher").getCoursesCreated().add(courses.get("Intelligence artificielle 1"));

		courses.get("Design patterns").setAuthor(teachers.get("ogoudet"));
		teachers.get("ogoudet").getCoursesCreated().add(courses.get("Design patterns"));

		courses.get("Web avancé").setAuthor(teachers.get("bdamota"));
		teachers.get("bdamota").getCoursesCreated().add(courses.get("Web avancé"));

		courses.get("Web des données").setAuthor(teachers.get("dgenest"));
		teachers.get("dgenest").getCoursesCreated().add(courses.get("Web des données"));
	}

	private void buildStructuresCoursesMaster() {
		structures.get("Master 1").getCourses().add(courses.get("Intelligence artificielle 1"));
		courses.get("Intelligence artificielle 1").getStructures().add(structures.get("Master 1"));

		structures.get("Master 1").getCourses().add(courses.get("Design patterns"));
		courses.get("Design patterns").getStructures().add(structures.get("Master 1"));

		structures.get("Master 1").getCourses().add(courses.get("Web avancé"));
		courses.get("Web avancé").getStructures().add(structures.get("Master 1"));

		structures.get("Master 1").getCourses().add(courses.get("Web des données"));
		courses.get("Web des données").getStructures().add(structures.get("Master 1"));
	}

	private void buildStructuresUsersMaster() {
		structures.get("Master 1").getUsers().add(students.get("oboubnina"));
		students.get("oboubnina").getStructures().add(structures.get("Master 1"));

		structures.get("Master 1").getUsers().add(students.get("scoulibaly"));
		students.get("scoulibaly").getStructures().add(structures.get("Master 1"));

		structures.get("Master 1").getUsers().add(students.get("lmatthias"));
		students.get("lmatthias").getStructures().add(structures.get("Master 1"));

		structures.get("Master 1").getUsers().add(students.get("yhanini"));
		students.get("yhanini").getStructures().add(structures.get("Master 1"));

		structures.get("Master 1").getUsers().add(students.get("tomar"));
		students.get("tomar").getStructures().add(structures.get("Master 1"));

		structures.get("Master 1").getUsers().add(students.get("tmahauda"));
		students.get("tmahauda").getStructures().add(structures.get("Master 1"));

		structures.get("Master 1").getUsers().add(students.get("ldavis"));
		students.get("ldavis").getStructures().add(structures.get("Master 1"));

		structures.get("Master 1").getUsers().add(students.get("mouhirra"));
		students.get("mouhirra").getStructures().add(structures.get("Master 1"));

		structures.get("Master 1").getUsers().add(students.get("iargani"));
		students.get("iargani").getStructures().add(structures.get("Master 1"));

		structures.get("Master 1").getUsers().add(students.get("arandria"));
		students.get("arandria").getStructures().add(structures.get("Master 1"));
	}

	private void buildStructuresUsersSpring() {
		structures.get("Spring Boot").getUsers().add(students.get("oboubnina"));
		students.get("oboubnina").getStructures().add(structures.get("Spring Boot"));

		structures.get("Spring Boot").getUsers().add(students.get("scoulibaly"));
		students.get("scoulibaly").getStructures().add(structures.get("Spring Boot"));
	}

	private void buildStructuresUsersJava() {
		structures.get("Java FX").getUsers().add(students.get("lmatthias"));
		students.get("lmatthias").getStructures().add(structures.get("Java FX"));

		structures.get("Java FX").getUsers().add(students.get("yhanini"));
		students.get("yhanini").getStructures().add(structures.get("Java FX"));

		structures.get("Java FX").getUsers().add(students.get("tomar"));
		students.get("tomar").getStructures().add(structures.get("Java FX"));
	}

	private void buildStructuresUsersAngular() {
		structures.get("Angular").getUsers().add(students.get("tmahauda"));
		students.get("tmahauda").getStructures().add(structures.get("Angular"));

		structures.get("Angular").getUsers().add(students.get("ldavis"));
		students.get("ldavis").getStructures().add(structures.get("Angular"));

		structures.get("Angular").getUsers().add(students.get("mouhirra"));
		students.get("mouhirra").getStructures().add(structures.get("Angular"));

		structures.get("Angular").getUsers().add(students.get("iargani"));
		students.get("iargani").getStructures().add(structures.get("Angular"));

		structures.get("Angular").getUsers().add(students.get("arandria"));
		students.get("arandria").getStructures().add(structures.get("Angular"));
	}

	private void buildUsers() {
		this.buildAdmins();
		this.buildTeachers();
		this.buildStudents();
	}

	private void buildAdmins() {
		admins = new HashMap<>();

		Calendar c = Calendar.getInstance();

		User admin = new User();
		admin.setRole(Role.ADMIN);
		admin.setLastname("ADMIN");
		admin.setFirstname("Root");
		admin.setUsername("radmin");
		admin.setPassword(passwordEncoder.encode("Radmin49!"));
		c.set(1960, 0, 1);
		admin.setBirth(c.getTime());
		admin.setEmail("root.admin@univ-angers.fr");
		admin.setPhone("0241735000");
		admin.setAddress("49000 Angers");
		admin.setActive(true);

		admins.put(admin.getUsername(), admin);
	}

	private void buildTeachers() {
		teachers = new HashMap<>();

		Calendar c = Calendar.getInstance();

		User jmr = new User();
		jmr.setRole(Role.TEACHER);
		jmr.setLastname("RICHER");
		jmr.setFirstname("Jean-Michel");
		jmr.setUsername("jmricher");
		jmr.setPassword(passwordEncoder.encode("JMricher49!"));
		c.set(1960, 0, 1);
		jmr.setBirth(c.getTime());
		jmr.setEmail("jean-michel.richer@univ-angers.fr");
		jmr.setPhone("0241735234");
		jmr.setAddress("49000 Angers");
		jmr.setActive(true);

		teachers.put(jmr.getUsername(), jmr);

		User olivier = new User();
		olivier.setRole(Role.TEACHER);
		olivier.setLastname("GOUDET");
		olivier.setFirstname("Olivier");
		olivier.setUsername("ogoudet");
		olivier.setPassword(passwordEncoder.encode("Ogoudet49!"));
		c.set(1961, 1, 2);
		olivier.setBirth(c.getTime());
		olivier.setEmail("olivier.goudet@univ-angers.fr");
		olivier.setPhone("0241735220");
		olivier.setAddress("49000 Angers");
		olivier.setActive(true);

		teachers.put(olivier.getUsername(), olivier);

		User david = new User();
		david.setRole(Role.TEACHER);
		david.setLastname("GENEST");
		david.setFirstname("David");
		david.setUsername("dgenest");
		david.setPassword(passwordEncoder.encode("Dgenest49!"));
		c.set(1962, 2, 1);
		david.setBirth(c.getTime());
		david.setEmail("olivier.goudet@univ-angers.fr");
		david.setPhone("0241735221");
		david.setAddress("49000 Angers");
		david.setActive(true);

		teachers.put(david.getUsername(), david);

		User benoit = new User();
		benoit.setRole(Role.TEACHER);
		benoit.setLastname("DA MOTA");
		benoit.setFirstname("Benoît");
		benoit.setUsername("bdamota");
		benoit.setPassword(passwordEncoder.encode("Bdamota49!"));
		c.set(1963, 3, 2);
		benoit.setBirth(c.getTime());
		benoit.setEmail("olivier.goudet@univ-angers.fr");
		benoit.setPhone("0241735379");
		benoit.setAddress("49000 Angers");
		benoit.setActive(true);

		teachers.put(benoit.getUsername(), benoit);
	}

	private void buildStudents() {
		students = new HashMap<>();

		Calendar c = Calendar.getInstance();

		User theo = new User();
		theo.setRole(Role.STUDENT);
		theo.setLastname("MAHAUDA");
		theo.setFirstname("Théo");
		theo.setUsername("tmahauda");
		theo.setPassword(passwordEncoder.encode("Tmahauda49!"));
		c.set(1990, 0, 1);
		theo.setBirth(c.getTime());
		theo.setEmail("theo.mahauda@univ-angers.fr");
		theo.setPhone("0241735001");
		theo.setAddress("49000 Angers");
		theo.setActive(true);

		students.put(theo.getUsername(), theo);

		User mat = new User();
		mat.setRole(Role.STUDENT);
		mat.setLastname("LAUNAY");
		mat.setFirstname("Matthias");
		mat.setUsername("lmatthias");
		mat.setPassword(passwordEncoder.encode("Mlaunay49!"));
		c.set(1991, 1, 2);
		mat.setBirth(c.getTime());
		mat.setEmail("matthias.launay@univ-angers.fr");
		mat.setPhone("0241735002");
		mat.setAddress("49000 Angers");
		mat.setActive(true);

		students.put(mat.getUsername(), mat);

		User momo = new User();
		momo.setRole(Role.STUDENT);
		momo.setLastname("OUHIRRA");
		momo.setFirstname("Mohamed");
		momo.setUsername("mouhirra");
		momo.setPassword(passwordEncoder.encode("Mouhirra49!"));
		c.set(1992, 2, 3);
		momo.setBirth(c.getTime());
		momo.setEmail("olivier.goudet@univ-angers.fr");
		momo.setPhone("0241735003");
		momo.setAddress("49000 Angers");
		momo.setActive(true);

		students.put(momo.getUsername(), momo);

		User soul = new User();
		soul.setRole(Role.STUDENT);
		soul.setLastname("COULIBALY");
		soul.setFirstname("Souleymane");
		soul.setUsername("scoulibaly");
		soul.setPassword(passwordEncoder.encode("Scoulibaly49!"));
		c.set(1993, 3, 4);
		soul.setBirth(c.getTime());
		soul.setEmail("souleymane.coulibaly@univ-angers.fr");
		soul.setPhone("0241735004");
		soul.setAddress("49000 Angers");
		soul.setActive(true);

		students.put(soul.getUsername(), soul);

		User ya = new User();
		ya.setRole(Role.STUDENT);
		ya.setLastname("HANINI");
		ya.setFirstname("Yassine");
		ya.setUsername("yhanini");
		ya.setPassword(passwordEncoder.encode("Yhanini49!"));
		c.set(1994, 4, 5);
		ya.setBirth(c.getTime());
		ya.setEmail("souleymane.coulibaly@univ-angers.fr");
		ya.setPhone("0241735005");
		ya.setAddress("49000 Angers");
		ya.setActive(true);

		students.put(ya.getUsername(), ya);

		User toi = new User();
		toi.setRole(Role.STUDENT);
		toi.setLastname("OMAR");
		toi.setFirstname("Toibrani");
		toi.setUsername("tomar");
		toi.setPassword(passwordEncoder.encode("Tomar49!"));
		c.set(1961, 1, 2);
		toi.setBirth(c.getTime());
		toi.setEmail("toibrani.omar@univ-angers.fr");
		toi.setPhone("0241735006");
		toi.setAddress("49000 Angers");
		toi.setActive(true);

		students.put(toi.getUsername(), toi);

		User imad = new User();
		imad.setRole(Role.STUDENT);
		imad.setLastname("ARGANI");
		imad.setFirstname("Imad");
		imad.setUsername("iargani");
		imad.setPassword(passwordEncoder.encode("Iargani49!"));
		c.set(1995, 5, 6);
		imad.setBirth(c.getTime());
		imad.setEmail("imad.argani@univ-angers.fr");
		imad.setPhone("0241735007");
		imad.setAddress("49000 Angers");
		imad.setActive(true);

		students.put(imad.getUsername(), imad);

		User omar = new User();
		omar.setRole(Role.STUDENT);
		omar.setLastname("BOUBNINA");
		omar.setFirstname("Omar");
		omar.setUsername("oboubnina");
		omar.setPassword(passwordEncoder.encode("Oboubnina49!"));
		c.set(1996, 6, 7);
		omar.setBirth(c.getTime());
		omar.setEmail("omar.boubnina@univ-angers.fr");
		omar.setPhone("0241735008");
		omar.setAddress("49000 Angers");
		omar.setActive(true);

		students.put(omar.getUsername(), omar);

		User luca = new User();
		luca.setRole(Role.STUDENT);
		luca.setLastname("DAVIS");
		luca.setFirstname("Luca");
		luca.setUsername("ldavis");
		luca.setPassword(passwordEncoder.encode("Ldavis49!"));
		c.set(1997, 7, 8);
		luca.setBirth(c.getTime());
		luca.setEmail("luca.davis@univ-angers.fr");
		luca.setPhone("0241735009");
		luca.setAddress("49000 Angers");
		luca.setActive(true);

		students.put(luca.getUsername(), luca);

		User andry = new User();
		andry.setRole(Role.STUDENT);
		andry.setLastname("RANDRIA");
		andry.setFirstname("Andry");
		andry.setUsername("arandria");
		andry.setPassword(passwordEncoder.encode("Arandria49!"));
		c.set(1998, 8, 9);
		andry.setBirth(c.getTime());
		andry.setEmail("andry.randria@univ-angers.fr");
		andry.setPhone("0241735010");
		andry.setAddress("49000 Angers");
		andry.setActive(true);

		students.put(andry.getUsername(), andry);
	}

	private void buildCourses() {
		courses = new HashMap<>();

		Course ia = this.buildCourseIA();
		courses.put(ia.getTitle(), ia);

		Course pattern = this.buildCoursePattern();
		courses.put(pattern.getTitle(), pattern);

		Course jee = this.buildCourseJEE();
		courses.put(jee.getTitle(), jee);

		Course rdf = this.buildCourseRDF();
		courses.put(rdf.getTitle(), rdf);
	}

	private Course buildCourseIA() {

		String content = "";

		Course ia = new Course();
		ia.setTitle("Intelligence artificielle 1");
		ia.setDescription("Ce cours est la première partie du cours d’intelligence artificielle réparti sur les deux semestres. Le cours\n" +
				"a pour objet de donner un large panorama des problématiques fondamentales de l’intelligence artificielle\n" +
				"et d’étudier la représentation et la résolution de problèmes en IA utiles à la mise en œuvre d’un agent\n" +
				"rationnel. Ce cours est en partie basé sur le livre Artificial Intelligence : A Modern Approach de Stuart\n" +
				"Russell et Peter Norvig.\n" +
				"Certains enseignements fondamentaux de l’IA (comme la logique, web des données, ... ) font l’objet de\n" +
				"cours spécifiques dans le cursus Licence-Master.");

		ElementCourse rootIA = new ElementCourse();
		rootIA.setTitle("IA et Jeux : Méthodes de Résolution");
		rootIA.setPosition(0);
		rootIA.setExpanded(false);
		rootIA.setSelected(false);
		rootIA.setType(TypeElementCourse.SECTION);
		rootIA.setDescription("Ce chapitre est une courte introduction aux jeux et aux principes de résolution de ces jeux avec IA.");
		rootIA.setContent("IA et Jeux : Méthodes de Résolution");
		rootIA.setFormat(FormatElementCourse.TEXTE);

		ia.setRoot(rootIA);

		ElementCourse nimSec = new ElementCourse();
		nimSec.setTitle("<h1> Jeu de Nim </h1>");
		nimSec.setPosition(0);
		nimSec.setExpanded(false);
		nimSec.setSelected(false);
		nimSec.setType(TypeElementCourse.SECTION);
		nimSec.setDescription("Illustration avec le jeu de Nim");
		nimSec.setContent("<h1> Jeu de Nim </h1>");
		nimSec.setFormat(FormatElementCourse.HTML);

		nimSec.setFather(rootIA);
		rootIA.getSubElements().add(nimSec);

		ElementCourse nimPara = new ElementCourse();
		content = "Le Jeu de Nim est un jeu à deux joueurs qui consiste, étant données n allumettes, à prendre à tour de rôle 1, 2 ou 3 allumettes. Le perdant est le joueur qui prend la dernière allumette."+
				"\n" +
				"\n" +
				"Il s'agit d'un jeu dit à somme nulle, c'est à dire que la somme des gains et des pertes de tous les joueurs est égale à 0. Dans le cas présent il y a un gagnant et un perdant.\n" +
				"\n" +
				"Par opposition on parle de jeu à somme non nulle tel le le dilemme du prisonnier.\n" +
				"\n" +
				"Examinons une situation de jeu pour 4 allumettes :";
		nimPara.setTitle(content.substring(0, END));
		nimPara.setPosition(0);
		nimPara.setExpanded(false);
		nimPara.setSelected(false);
		nimPara.setType(TypeElementCourse.SECTION);
		nimPara.setDescription("Illustration avec le jeu de Nim");
		nimPara.setContent(content);
		nimPara.setFormat(FormatElementCourse.TEXTE);

		nimPara.setFather(nimSec);
		nimSec.getSubElements().add(nimPara);

		ElementCourse nimImg = new ElementCourse();
		nimImg.setTitle("http://info.univ-angers.fr/~richer/ens/m1/img/jeu_de_nim_situation.png");
		nimImg.setPosition(1);
		nimImg.setExpanded(false);
		nimImg.setSelected(false);
		nimImg.setType(TypeElementCourse.IMAGE);
		nimImg.setDescription("Illustration avec le jeu de Nim");
		nimImg.setContent("http://info.univ-angers.fr/~richer/ens/m1/img/jeu_de_nim_situation.png");
		nimImg.setFormat(FormatElementCourse.TEXTE);

		nimImg.setFather(nimSec);
		nimSec.getSubElements().add(nimImg);

		ElementCourse nimAllum = new ElementCourse();
		content = "Pour 4 allumettes :\n" +
				"\n" +
				"    si j'en prends 3, alors je gagne car il ne reste qu'une seule allumette et mon adversaire est contraint de la prendre\n" +
				"    si j'en prends 2, alors je perds car si mon adversaire en prend une seule, alors je serai contraint de prendre la dernière allumette\n" +
				"    si j'en prends 1, alors je perds car si mon adversaire en prend deux, alors je serai contraint de prendre la dernière allumette\n";
		nimAllum.setTitle(content.substring(0, END));
		nimAllum.setPosition(2);
		nimAllum.setExpanded(false);
		nimAllum.setSelected(false);
		nimAllum.setType(TypeElementCourse.PARAGRAPHE);
		nimAllum.setDescription("Illustration avec le jeu de Nim");
		nimAllum.setContent(content);
		nimAllum.setFormat(FormatElementCourse.TEXTE);

		nimAllum.setFather(nimSec);
		nimSec.getSubElements().add(nimAllum);

		ElementCourse nimTab = new ElementCourse();
		content = "<div class=\"center\">\n" +
				"<table class=\"simple\">\n" +
				"<tr class=\"simple_header\">\n" +
				"	<td style=\"text-align: center\">&nbsp;Allumettes<br/>restantes&nbsp;</td>\n" +
				"	<td style=\"text-align: center\">&nbsp;Allumette(s)<br/>prise(s)&nbsp;</td>\n" +
				"	<td style=\"text-align: left\">&nbsp;Situation&nbsp;</td>\n" +
				"</tr>\n" +
				"<tr>\n" +
				"	<td style=\"text-align: center\">&nbsp;1&nbsp;</td>\n" +
				"	<td style=\"text-align: center\">&nbsp;1&nbsp;</td>\n" +
				"	<td style=\"text-align: left\">&nbsp;P&nbsp;</td>\n" +
				"</tr>\n" +
				"<tr>\n" +
				"	<td style=\"text-align: center\">&nbsp;2&nbsp;</td>\n" +
				"	<td style=\"text-align: center\">&nbsp;1&nbsp;</td>\n" +
				"	<td style=\"text-align: left\">&nbsp;G&nbsp;</td>\n" +
				"</tr>\n" +
				"<tr>\n" +
				"	<td style=\"text-align: center\">&nbsp;3&nbsp;</td>\n" +
				"	<td style=\"text-align: center\">&nbsp;2&nbsp;</td>\n" +
				"	<td style=\"text-align: left\">&nbsp;G&nbsp;</td>\n" +
				"</tr>\n" +
				"<tr>\n" +
				"	<td style=\"text-align: center\">&nbsp;4&nbsp;</td>\n" +
				"	<td style=\"text-align: center\">&nbsp;3&nbsp;</td>\n" +
				"	<td style=\"text-align: left\">&nbsp;G&nbsp;</td>\n" +
				"</tr>\n" +
				"<tr>\n" +
				"	<td style=\"text-align: center\">&nbsp;5&nbsp;</td>\n" +
				"	<td style=\"text-align: center\">&nbsp;1,2,3&nbsp;</td>\n" +
				"	<td style=\"text-align: left\">&nbsp;P&nbsp;</td>\n" +
				"</tr>\n" +
				"<tr>\n" +
				"	<td style=\"text-align: center\">&nbsp;6&nbsp;</td>\n" +
				"	<td style=\"text-align: center\">&nbsp;1&nbsp;</td>\n" +
				"	<td style=\"text-align: left\">&nbsp;G - situation 5 pour adversaire&nbsp;</td>\n" +
				"</tr>\n" +
				"<tr>\n" +
				"	<td style=\"text-align: center\">&nbsp;6&nbsp;</td>\n" +
				"	<td style=\"text-align: center\">&nbsp;2&nbsp;</td>\n" +
				"	<td style=\"text-align: left\">&nbsp;P - situation 4 pour adversaire&nbsp;</td>\n" +
				"</tr>\n" +
				"<tr>\n" +
				"	<td style=\"text-align: center\">&nbsp;6&nbsp;</td>\n" +
				"	<td style=\"text-align: center\">&nbsp;3&nbsp;</td>\n" +
				"	<td style=\"text-align: left\">&nbsp;P - situation pour adversaire&nbsp;</td>\n" +
				"</tr>\n" +
				"<caption>Jeu de Nim, situation Gagnante ou Perdante</caption></table>\n" +
				"</div>";
		nimTab.setTitle(content.substring(0, END));
		nimTab.setPosition(3);
		nimTab.setExpanded(false);
		nimTab.setSelected(false);
		nimTab.setType(TypeElementCourse.PARAGRAPHE);
		nimTab.setDescription("Jeu de Nim, situation Gagnante ou Perdante");
		nimTab.setContent(content);
		nimTab.setFormat(FormatElementCourse.HTML);

		nimTab.setFather(nimSec);
		nimSec.getSubElements().add(nimTab);

		ElementCourse nimGame = new ElementCourse();
		content = "Au final, si n=4p+1 alors on perd.\n" +
				"\n" +
				"Il s'agit donc d'un jeu qui ne demande aucune IA pour gagner il suffit d'appliquer la formule et faire en sorte que l'adversaire soit dans une situation ou n=4p+1";
		nimGame.setTitle(content.substring(0, END));
		nimGame.setPosition(4);
		nimGame.setExpanded(false);
		nimGame.setSelected(false);
		nimGame.setType(TypeElementCourse.PARAGRAPHE);
		nimGame.setDescription("Illustration avec le jeu de Nim");
		nimGame.setContent(content);
		nimGame.setFormat(FormatElementCourse.TEXTE);

		nimGame.setFather(nimSec);
		nimSec.getSubElements().add(nimGame);

		return ia;
	}

	private Course buildCoursePattern() {
		Course pattern = new Course();
		pattern.setTitle("Design patterns");
		pattern.setDescription("L'objectif de ce cours est d'apprendre les bonnes pratiques d'utilisation des patrons de conception et\n" +
				"leur mise en oeuvre dans un langage objet.");
		pattern.setRoot(new ElementCourse());

		return pattern;
	}

	private Course buildCourseJEE() {
		Course jee = new Course();
		jee.setTitle("Web avancé");
		jee.setDescription("Apprendre le développement web avec le framework J2E (Java Enterprise Edition). Création de Servlet,\n" +
				"utilisation et mise en relation avec JSP, JSPEL. Utilisation d’Hibernate en tant qu’ORM. Déploiement\n" +
				"sous conteneur de servlet Tomcat ou Glassfish.");
		jee.setRoot(new ElementCourse());

		return jee;
	}

	private Course buildCourseRDF() {
		Course rdf = new Course();
		rdf.setTitle("Web des données");
		rdf.setDescription("Représentation de connaissances et de données destinées à être publiées sur le web ; langage RDF.\n" +
				"Données ouvertes ; Open data ; Linked open data.\n" +
				"Définition de vocabulaires permettant le raisonnement ; RDF-Schéma ; OWL.\n" +
				"Interrogation des données et connaissances ; SPARQL.\n" +
				"Mise en œuvre des technologies du web sémantique au sein d’une application.");
		rdf.setRoot(new ElementCourse());

		return rdf;
	}

	private void buildStructures() {
		structures = new HashMap<>();

		Structure angers = this.buildStructureAngers();
		structures.put(angers.getTitle(), angers);
	}

	private Structure buildStructureAngers() {
		Structure angers = new Structure();
		angers.setTitle("Université d'Angers");
		angers.setDescription("Structure");
		angers.setPosition(0);
		angers.setExpanded(false);
		angers.setSelected(false);

		Structure sciences = new Structure();
		sciences.setTitle("UFR Sciences");
		sciences.setDescription("Unité");
		sciences.setPosition(0);
		sciences.setExpanded(false);
		sciences.setSelected(false);

		sciences.setFather(angers);
		angers.getSubStructures().add(sciences);
		structures.put(sciences.getTitle(), sciences);

		Structure info = new Structure();
		info.setTitle("Informatique");
		info.setDescription("Département");
		info.setPosition(0);
		info.setExpanded(false);
		info.setSelected(false);

		info.setFather(sciences);
		sciences.getSubStructures().add(info);
		structures.put(info.getTitle(), info);

		Structure master = new Structure();
		master.setTitle("Master 1");
		master.setDescription("Filière");
		master.setPosition(0);
		master.setExpanded(false);
		master.setSelected(false);

		master.setFather(info);
		info.getSubStructures().add(master);
		structures.put(master.getTitle(), master);

		Structure ter = new Structure();
		ter.setTitle("Virtual Teacher Courses");
		ter.setDescription("TER");
		ter.setPosition(0);
		ter.setExpanded(false);
		ter.setSelected(false);

		ter.setFather(master);
		master.getSubStructures().add(ter);
		structures.put(ter.getTitle(), ter);

		Structure spring = new Structure();
		spring.setTitle("Spring Boot");
		spring.setDescription("Groupe serveur");
		spring.setPosition(0);
		spring.setExpanded(false);
		spring.setSelected(false);

		spring.setFather(ter);
		ter.getSubStructures().add(spring);
		structures.put(spring.getTitle(), spring);

		Structure angular = new Structure();
		angular.setTitle("Angular");
		angular.setDescription("Groupe web");
		angular.setPosition(1);
		angular.setExpanded(false);
		angular.setSelected(false);

		angular.setFather(ter);
		ter.getSubStructures().add(angular);
		structures.put(angular.getTitle(), angular);

		Structure java = new Structure();
		java.setTitle("Java FX");
		java.setDescription("Groupe java");
		java.setPosition(2);
		java.setExpanded(false);
		java.setSelected(false);

		java.setFather(ter);
		ter.getSubStructures().add(java);
		structures.put(java.getTitle(), java);

		return sciences;
	}
}