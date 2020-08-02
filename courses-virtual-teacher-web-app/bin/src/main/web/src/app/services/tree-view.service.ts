import { Injectable } from '@angular/core';
import { CoursesTreeviewEditComponent } from '../components/courses/treeview/courses-treeview-edit/courses-treeview-edit.component';
import { ElementCourse } from '../models/treeview/course/element-course.model';

@Injectable({
  providedIn: 'root'
})
export class TreeViewService {

  /**
   * Le tree view sélectionné
   */
  public treeViewSelected: CoursesTreeviewEditComponent;

  /**
   * Les éléments copiés depuis le clique droit
   */
  public copyElements: ElementCourse[];

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
      this.treeViewSelected.course.remove(element.id)
      this.treeViewSelected.tree.removeNodes([element.id]);
    });

    this.treeViewSelected.tree.refresh();
  }
}
