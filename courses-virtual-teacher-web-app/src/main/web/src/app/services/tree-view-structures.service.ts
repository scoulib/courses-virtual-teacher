import { Injectable } from '@angular/core';
import { ElementStructure} from '../models/structure/element-structure.model';

import { StructuresTreeviewEditComponent } from '../components/structures/treeview/structures-treeview-edit/structures-treeview-edit.component';



/**
 * Service qui permet d'effectuer des opérations supplémentaires sur le treeview
 */
@Injectable({
  providedIn: 'root'
})
export class TreeViewStructureService {

  /**
   * Le tree view sélectionné
   */

  public treeViewSelected: StructuresTreeviewEditComponent;

  /**
   * Les éléments copiés depuis le clique droit
   */
  public copyElements: ElementStructure[];


  /**
   * Faut-il supprimer les éléments copiés après collés ?
   */
  public removeElements: boolean;

  constructor() { }

  /**
   * Supprimer les éléments copiés
   */
  public removeCopyElements() : void {
    if(!this.removeElements) return;

    console.log("remove copy elements");

    this.copyElements.map(element => {
      this.treeViewSelected.structure.remove(element.id)
      this.treeViewSelected.tree.removeNodes([element.id]);
    });

    this.treeViewSelected.refresh();
  }
}
