
import { Role } from './role.enum';
import { Resource } from '../resource.model';
import { Serializable } from '../serializable.model';
import { Structure } from '../structure/structure.model';


export class User extends Resource implements Serializable<User> {
    public role: Role;
    public firstname: string;
    public lastname: string;
    public username: string;
    public password: string;
    public email: string;
    public phone: string;
    public address: string;
    public active: boolean;
    public birth: Date = new Date();
    public structureDTOS : Structure[] = [];
    /**
     * Convert json to user object
     * @param json 
     */
    public fromJson(json: any): User {
        console.log("json user", json);
        if (json == null) return null;

        var user = new User();
        Object.assign(user, json);
        user.birth = json.birth ? new Date(json.birth as string) : new Date();
        user.role = json.role ? Role[json.role as string] : null;

        console.log("object user", user);

        return user;
    }

    /**
     * Convert user object to json
     * @param user 
     */
    public toJson(user: User): any {
        var json = JSON.stringify(user);
        console.log("json user", json);

        return json;
    }
}
