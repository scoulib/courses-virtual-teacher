import { ElementCourse } from './element-course.model';
import { Resource } from '../resource.model';
import { Serializable } from '../serializable.model';
import {User} from '../user/user.model';

export class Course extends Resource implements Serializable<Course> {
    public title: string;
    public description: string;
    public author: User;
    //public consultants: string[] = [];
    public dateCreated: Date = new Date();
    public dateLastModified: Date = new Date();
    public root: ElementCourse = new ElementCourse();

    /**
     * Convert json to course object
     * @param json
     */
    public fromJson(json: any): Course {
        console.log("from json course", json);
        if (json == null) return null;

        var course = new Course();
        Object.assign(course, json);
        course.dateCreated = json.dateCreated ? new Date(json.dateCreated as string) : new Date();
        course.dateLastModified = json.dateLastModified ? new Date(json.dateLastModified as string) : new Date();
        course.root = json.root ? new ElementCourse().fromJson(json.root) : new ElementCourse();

        console.log("object course", course);

        return course;
    }

    /**
     * Convert course object to json
     * @param course
     */
    public toJson(course: Course): any {
        var json = JSON.stringify(course);

        console.log("to json course", json);

        return json;
    }

    /**
    * Trier les éléments
    */
    public sort(): void {
        this.root.sort();
    }

    /**
     * Supprime un élément par son id
     * @param id
     */
    public remove(id: string): void {
        this.root.remove(id);
    }

    /**
     * Récupérer un élément par son id
     * @param id
     */
    public find(id: string): ElementCourse {
        return this.root.find(id);
    }
}
