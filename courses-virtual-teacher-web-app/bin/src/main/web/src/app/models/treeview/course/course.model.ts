import { Resource } from '../../resource.model';
import { Serializable } from '../../serializable.model';
import { ElementCourse } from './element-course.model';

export class Course extends Resource implements Serializable<Course> {
    public title: string;
    public description: string;
    public author: string;
    public consultants: string[] = [];
    public created: Date;
    public lastmodified: Date;
    public root: ElementCourse;

    public fromJson(json: any): Course {
        console.log("from json course", json);

        var course = new Course();
        Object.assign(course, json);
        course.created = json.created ? new Date(json.created as string) : null;
        course.lastmodified = json.lastmodified ? new Date(json.lastmodified as string) : null;
        course.root = json.root ? new ElementCourse().fromJson(json.root) : null
        course.consultants = json.consultants ? json.consultants : []

        console.log("object course", course);

        return course;
    }
    
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
