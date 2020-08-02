import {  TypeElementStructure } from './type-element-structure.enum';
import { v4 as uuid } from 'uuid';
import { Resource } from '../resource.model';
import { Serializable } from '../serializable.model';

export class ElementStructure extends Resource implements Serializable<ElementStructure> {
   
    public position : number;

    public profondeur : number;

    public title : string;

    public description : string;

    public expanded : boolean;

    public selected : boolean;

    public type :TypeElementStructure;


    public subElements : ElementStructure[] = [] ;

    public  content : string;

    /**
     * Convert json to element structure object
     * @param json
     */
    public fromJson(json: any): ElementStructure {
        console.log("json element structure", json);
        if (json == null) return null;

        var element = new ElementStructure();
        Object.assign(element, json);
        element.type = json.type ? TypeElementStructure[json.type as string] : null;
        element.subElements = json.subElements ? json.subElements.map(e => new ElementStructure().fromJson(e)) : [];

        console.log("object element structure", element);

        return element;
    }

    /**
     * Convert structure object to json
     */
    public toJson(element: ElementStructure) {
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
    public find(id: string): ElementStructure {
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
    public clone(father: string): ElementStructure {
        var target = new ElementStructure();

        target.id = uuid();
        target.profondeur = this.profondeur;
        target.position = this.position;
        target.title = this.title;
        target.description = this.description;
        target.expanded = this.expanded;
        target.selected = false;
        target.type = this.type;
        target.content = this.content;
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
