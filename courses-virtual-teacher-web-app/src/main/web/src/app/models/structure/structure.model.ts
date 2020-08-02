import { Resource } from '../resource.model';
import { Serializable } from '../serializable.model';
import { ElementStructure } from './element-structure.model';

export class Structure extends Resource implements Serializable<Structure> {

  public id: string;
  public title: string;
  public description: string;
 // public position: string;
 // public expanded: string;
//public selected: string;
  //public father: string;
  public subStructures: Structure[] = [];
  public root: ElementStructure = new ElementStructure();



  /**
   * Convert json to structure object
   * @param json
   */
  fromJson(json: any): Structure {
    console.log('json structure', json);
    if (json == null) return null;

    const structure = new Structure();
    Object.assign(structure, json);
    structure.root = json.root ? new ElementStructure().fromJson(json.root) : new ElementStructure();


    return structure;
  }
  /**
    * Convert course object to json
    * @param course 
    */
  public toJson(structure: Structure): any {
    var json = JSON.stringify(structure);

    console.log("to json structure", json);

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
    public find(id: string): ElementStructure {
        return this.root.find(id);
    }
}
