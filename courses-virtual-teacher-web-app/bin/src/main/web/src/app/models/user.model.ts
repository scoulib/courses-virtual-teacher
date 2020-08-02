import { Resource } from './resource.model';
import { Role } from './role.enum';
import { Serializable } from './serializable.model';
import { Course } from './treeview/course/course.model';

export class User extends Resource implements Serializable<User> {
    public role: Role;
    public firstname: string;
    public lastname: string;
    public username: string;
    public password: string;
    public birth: Date;
    public mail: string;
    public coursesCreated: Course[] = [];
    public coursesConsulted: Course[] = [];

    public fromJson(json: any): User {
        console.log("json user", json);

        var user = new User();
        Object.assign(user, json);
        user.role = json.role ? Role[json.role as string] : null;
        user.birth = json.birth ? new Date(json.birth as string) : null;
        user.coursesCreated = [];
        user.coursesConsulted = [];

        if(json.coursesCreated != null) {
            json.coursesCreated.map(id => {
                var course = new Course();
                course.id = id;

                user.coursesCreated.push(course);
                course.author = id;
            });
        }

        if(json.coursesConsulted != null) {
            json.coursesConsulted.map(id => {
                var course = new Course();
                course.id = id;

                user.coursesConsulted.push(course);
                course.consultants.push(id);
            });
        }

        console.log("object user", user);

        return user;
    }

    public toJson(user: User): any {
        return JSON.stringify(user);
    }
}
