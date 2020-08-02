import { TypeElementCourse } from './type-element-course.enum';
import { FormatElementCourse } from './format-element-course.enum';
import { v4 as uuid } from 'uuid';
import { Resource } from '../resource.model';
import { Serializable } from '../serializable.model';

export class ElementCourse extends Resource implements Serializable<ElementCourse> {
   
    public position : number;

    public profondeur : number;

    public title : string;

    public description : string;

    public expanded : boolean;

    public selected : boolean;

    public type :TypeElementCourse;


    public subElements : ElementCourse[] = [] ;

    public  content : string;

    public format : FormatElementCourse;

    /**
     * Convert json to element course object
     * @param json
     */
    public fromJson(json: any): ElementCourse {
        console.log("json element course", json);
        if (json == null) return null;

        var element = new ElementCourse();
        Object.assign(element, json);
        element.type = json.type ? TypeElementCourse[json.type as string] : null;
        element.format = json.format ? FormatElementCourse[json.format as string] : null;
        element.subElements = json.subElements ? json.subElements.map(e => new ElementCourse().fromJson(e)) : [];

        console.log("object element course", element);

        return element;
    }

    /**
     * Convert course object to json
     */
    public toJson(element: ElementCourse) {
        return JSON.stringify(element);
    }

    /**
     * Trier les éléments par position
     */
    public sort(): void {
        for (var e of this.subElements) {
            e.sort();
        }

        this.subElements.sort((a, b) => a.position - b.position);
    }

    /**
     * Supprimer un élément par son id
     * @param id 
     */
    public remove(id: string): void {
        for (var e of this.subElements) {
            e.remove(id);
        }

        if (this.subElements.find(e => e.id == id)) {
            this.subElements.splice(this.subElements.findIndex(e => e.id == id), 1);
        }
    }

    /**
     * Récupèrer un élément par son id dans la hiérarchie
     * @param id 
     */
    public find(id: string): ElementCourse {
        if (this.id == id) {
            return this;
        } else {
            for (var e of this.subElements) {
                var find = e.find(id);
                if (find != null)
                    return find;
            }
            return null;
        }
    }

    /**
     * Cloner un élément avec un nouveau père
     * @param father
     */
    public clone(father: string): ElementCourse {
        var target = new ElementCourse();

        target.id = uuid();
        target.profondeur = this.profondeur;
        target.position = this.position;
        target.title = this.title;
        target.description = this.description;
        target.expanded = this.expanded;
        target.selected = false;
        target.type = this.type;
        target.content = this.content;
        target.format = this.format;
       // target.father = father;

        target.subElements = [];

        for (var element of this.subElements) {
            target.subElements.push(element.clone(target.id));
        }

        return target;
    }

    /**
     * Mise à jour d'un élément à partir d'un noeud
     * @param node 
     * @param level 
     * @param position 
     */
    public updateElementFromNode(node: { [key: string]: Object }, profondeur: number, position: number): void {
        this.profondeur = profondeur;
        this.position = position;
        this.title = node.title as string;
        this.expanded = node.expanded as boolean || false;
        this.selected = node.selected as boolean || false;
    }

    /**
     * Convertir un élément en un noeud pour l'afficher dans le treeview
     */
    public toNode(): { [key: string]: Object } {
        return {
            id: this.id,
            text: this.title,
            child: this.subElements,
            hasChildren: this.subElements.length > 0,
            expanded: this.expanded,
            selected: this.selected
        };
    }
}
