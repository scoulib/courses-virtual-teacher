package universite.angers.master.info.courses.virtual.teacher.server.app.security;

public class SecurityConstants {
    public static final String SECRET = "SecretKeyToGenJWTs";
    public static final long EXPIRATION_TIME = 864_000_000; // 10 days
    public static final String TOKEN_PREFIX = "Bearer ";
    public static final String HEADER_STRING = "Authorization";
    public static final String SIGN_IN_URL = "/api/auth/**";
    public static final String COURSES_URL = "/api/courses/**";
    public static final String USERS_URL = "/api/users";
    public static final String STRUCTURES_URL = "/api/structures/**";
    public static final String[] SWAGGER_URLS = {
            "/swagger-resources/**",
            "/swagger-ui.html",
            "/v2/api-docs",
            "/webjars/**"
    };
}