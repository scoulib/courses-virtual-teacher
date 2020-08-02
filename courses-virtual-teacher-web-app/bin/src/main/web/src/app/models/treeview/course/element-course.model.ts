import { Element } from '../element.model';
import { TypeElementCourse } from './type-element-course.enum';
import { Format } from './format.enum';
import { Serializable } from '../../serializable.model';
import { v4 as uuid } from 'uuid';

export class ElementCourse extends Element implements Serializable<ElementCourse> {
    public type: TypeElementCourse;
    public father: string;
    public childrens: ElementCourse[];
    public content: string;
    public format: Format;

    public fromJson(json: any): ElementCourse {
        console.log("json element course", json);

        var element = new ElementCourse();
        Object.assign(element, json);
        element.type = json.type ? TypeElementCourse[json.type as string] : null;
        element.format = json.format ? Format[json.format as string] : null;
        element.childrens = json.childrens ? json.childrens.map(e => new ElementCourse().fromJson(e)) : [];

        console.log("object element course", element);

        return element;
    }

    public toJson(element: ElementCourse) {
        return JSON.stringify(element);
    }

    /**
     * Trier les éléments par position
     */
    public sort(): void {
        for (var e of this.childrens) {
            e.sort();
        }

        this.childrens.sort((a, b) => a.position - b.position);
    }

    /**
     * Supprimer un élément par son id
     * @param id 
     */
    public remove(id: string): void {
        for (var e of this.childrens) {
            e.remove(id);
        }

        if (this.childrens.find(e => e.id == id)) {
            this.childrens.splice(this.childrens.findIndex(e => e.id == id), 1);
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
            for (var e of this.childrens) {
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
        target.hasChildren = this.hasChildren;
        target.type = this.type;
        target.content = this.content;
        target.format = this.format;
        target.father = father;

        target.childrens = [];

        for (var element of this.childrens) {
            target.childrens.push(element.clone(target.id));
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
        this.hasChildren = node.hasChildren as boolean || false;
    }

    /**
     * Convertir un élément en un noeud pour l'afficher dans le treeview
     */
    public toNode(): { [key: string]: Object } {
        return {
            id: this.id,
            text: this.title,
            parentID: this.father,
            child: this.childrens,
            hasChildren: this.hasChildren,
            expanded: this.expanded,
            selected: this.selected
        };
    }
}
