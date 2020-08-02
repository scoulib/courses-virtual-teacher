import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CourseService } from 'src/app/services/course.service';
import { TreeView, ContextMenuComponent, MenuEventArgs, NodeClickEventArgs, NodeEditEventArgs, NodeSelectEventArgs, NodeCheckEventArgs, NodeExpandEventArgs, DragAndDropEventArgs } from '@syncfusion/ej2-angular-navigations';
import { Course } from 'src/app/models/treeview/course/course.model';
import { v4 as uuid } from 'uuid';
import { TreeViewService } from 'src/app/services/tree-view.service';
import { ElementCourse } from 'src/app/models/treeview/course/element-course.model';

@Component({
  selector: 'app-courses-treeview-edit',
  templateUrl: './courses-treeview-edit.component.html',
  styleUrls: ['./courses-treeview-edit.component.css']
})
export class CoursesTreeviewEditComponent implements OnInit {

  @ViewChild('tree')
  public tree: TreeView

  @ViewChild('menu')
  public menu: ContextMenuComponent;

  @Input()
  public course: Course;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private treeViewService: TreeViewService,
    private courseService: CourseService) {
  }

  public ngOnInit(): void {
    this.course.sort();
  }

  public ngAfterViewInit(): void {
    this.initTreeView();
    this.initContextMenu();
  }

  /**
   * Sauvegarder l'aborescence toute entière
   */
  public onSave(): void {
    this.courseService.update(this.course)
      .subscribe(course => console.log("course update", course));
  }

  public refresh(): void {
    this.tree.refresh();

    //On met à jour les éléments (position, niveau)
    //afin de le recharger plus facilement plus tard
    //Le binding ne fonctionne pas automatiquement
    //Il faut parcourir tous les éléments de l'arbre
    //pour mettre à jours la data source
    var profondeur = 0;
    var position = 0;
    for (var n of this.tree.getTreeData()) {
      console.log("node", JSON.stringify(n));
      console.log("profondeur", profondeur);
      console.log("position", position);

      //On met à jour l'élément selon le noeud correspond dans l'arbre
      var element = this.course.find(n.id as string);
      element.updateElementFromNode(n, profondeur, position);
      console.log("element maj", element);

      this.updateElement(n, profondeur);

      position++;
    }

    this.course.sort();
  }

  /**
   * Mise à jour de l'élément à partir du noeud de facon récursive
   * @param node 
   * @param level 
   */
  public updateElement(node: { [key: string]: Object }, profondeur: number): void {
    profondeur++;
    if (node.hasChildren) {
      var position = 0;
      for (var n of Object.values(node.childrens)) {
        console.log("node", JSON.stringify(n));
        console.log("profondeur", profondeur);
        console.log("position", position);

        var element = this.course.find(n.id);
        element.updateElementFromNode(n, profondeur, position);
        console.log("element maj", element);

        this.updateElement(n, profondeur);

        position++;
      }
    }
  }

  /**
   * Initialement du context menu pour effectuer des opérations sur l'arbre
   * par un clique droit
   */
  private initContextMenu(): void {
    this.menu.items = [
      { text: 'Ajouter', id: 'new' },
      { text: 'Renommer', id: 'rename' },
      { text: 'Supprimer', id: 'remove' },
      { separator: true},
      { text: 'Couper', id: 'cut'},
      { text: 'Copier', id: 'copy'},
      { text: 'Coller', id: 'paste'}
    ]

    this.menu.select.subscribe(this.menuClick.bind(this));
  }

  /**
   * Evenenemt déclenché par le context menu
   * @param args 
   */
  public menuClick(args: MenuEventArgs): void {
    if(this.tree.selectedNodes.length == 0) return;

    //Création d'un nouveau noeud
    if (args.item.id == 'new') {
      console.log("new element");

      var sourceElement = this.newElement();
      console.log("source element", sourceElement);

      this.addNode(sourceElement);
      this.tree.beginEdit(sourceElement.id);
    }
    //Suppression des noeuds sélectionnés
    else if (args.item.id == 'remove') {
      console.log("remove element");
      this.removeNodes();
    }
    //Renommer le noeud courant
    else if (args.item.id == 'rename') {
      console.log("rename element");
      this.tree.beginEdit(this.tree.selectedNodes[0]);
    }
    //Couper
    else if(args.item.id == 'cut') {
      console.log("cut element");

      this.treeViewService.removeElements = true;
      this.treeViewService.copyElements = this.copyElements();
      this.treeViewService.treeViewSelected = this;

      console.log("cut elements", this.treeViewService.copyElements);
    }
    //Copier
    else if(args.item.id == 'copy') {
      console.log("copy element");

      this.treeViewService.removeElements = false;
      this.treeViewService.copyElements = this.copyElements();
      this.treeViewService.treeViewSelected = this;

      console.log("copy elements", this.treeViewService.copyElements);
    }
    //Coller les noeuds coupés ou copiés
    else if(args.item.id == 'paste') {
      console.log("paste element");

      for(var copyElement of this.treeViewService.copyElements) {
        console.log("paste element", copyElement);
        this.addNode(copyElement.clone(this.tree.selectedNodes[0]));
      }

      //Suppression des noeuds copiés si coupés
      this.treeViewService.removeCopyElements();
    }
  }

  /**
   * Clonés les élements sélectionnés dans les noeuds
   */
  private copyElements(): ElementCourse[] {
    var elements = [];

    for(var sourceElementId of this.tree.selectedNodes) {
      console.log("source element id", sourceElementId);

      var sourceElement = this.course.find(sourceElementId);
      console.log("source element", sourceElement);

      elements.push(sourceElement);
    }

    return elements;
  }

  /**
   * Suppression des noeuds sélectionnés
   */
  private removeNodes() : void {

    for(var sourceElementId of this.tree.selectedNodes) {
      console.log("source element id", sourceElementId);

      this.course.remove(sourceElementId);
      this.tree.removeNodes([sourceElementId]);
    }

    this.refresh();
  }

  /**
   * Ajoute un nouveau noeud dans l'arbre à partir du noeud sélectionné
   */
  private addNode(sourceElement: ElementCourse): void {
    var targetElementId = this.tree.selectedNodes[0];
    console.log("target element id", targetElementId);
  
    var targetElement = this.course.find(targetElementId);
    console.log("target element", targetElement);

    sourceElement.father = targetElementId;

    console.log("before push childrens", targetElement.childrens);
    targetElement.childrens.push(sourceElement);
    console.log("after push childrens", targetElement.childrens);

    targetElement.hasChildren = true;
    targetElement.expanded = true;

    this.tree.addNodes([sourceElement.toNode()], targetElementId);
    
    this.refresh();
  }

  /**
   * Création d'un nouveau élément
   */
  private newElement(): ElementCourse {
    var element = new ElementCourse();

    element.id = uuid();
    element.title = "Nouveau élément"
    element.description = "Nouveau élément"
    element.expanded = false;
    element.selected = false;
    element.childrens = [];
    element.hasChildren = false;

    return element;
  }

  private initTreeView() {
    this.tree.fields = {
      dataSource: [this.course.root] as any,
      id: 'id',
      text: 'title',
      parentID: 'father',
      child: 'childrens',
      hasChildren: 'hasChildren',
      expanded: 'expanded',
      selected: 'selected'
    }

    this.tree.nodeClicked.subscribe(this.nodeClicked.bind(this));

    this.tree.allowDragAndDrop = true;
    this.tree.nodeDragStart.subscribe(this.nodeDragStart.bind(this));
    this.tree.nodeDragStop.subscribe(this.nodeDragStop.bind(this));
    this.tree.nodeDragging.subscribe(this.nodeDragging.bind(this));
    this.tree.nodeDropped.subscribe(this.nodeDropped.bind(this));

    this.tree.allowEditing = true;
    this.tree.nodeEditing.subscribe(this.nodeEditing.bind(this));
    this.tree.nodeEdited.subscribe(this.nodeEdited.bind(this));

    this.tree.allowMultiSelection = true;
    this.tree.nodeSelecting.subscribe(this.nodeSelecting.bind(this));
    this.tree.nodeSelected.subscribe(this.nodeSelected.bind(this));

    this.tree.nodeChecking.subscribe(this.nodeChecking.bind(this));
    this.tree.nodeChecked.subscribe(this.nodeChecked.bind(this));

    this.tree.nodeCollapsing.subscribe(this.nodeCollapsing.bind(this));
    this.tree.nodeCollapsed.subscribe(this.nodeCollapsed.bind(this));

    this.tree.nodeExpanding.subscribe(this.nodeExpanding.bind(this));
    this.tree.nodeExpanded.subscribe(this.nodeExpanded.bind(this));
  }

  private nodeClicked(args: NodeClickEventArgs) {
    console.log("node clicked");
    //console.log(JSON.stringify(args));
  };

  private nodeEditing(args: NodeEditEventArgs) {
    console.log("node editing");
    //console.log(JSON.stringify(args));
  };

  private nodeEdited(args: NodeEditEventArgs) {
    console.log("node edited");
    //console.log(JSON.stringify(args));

    var id = args.nodeData.id as string
    console.log("id", id);

    var targetElement = this.course.find(id);
    targetElement.title = args.newText;

    console.log("target element", targetElement);
  };

  private nodeSelecting(args: NodeSelectEventArgs) {
    console.log("node selecting");
    //console.log(JSON.stringify(args));
  };

  private nodeSelected(args: NodeSelectEventArgs) {
    console.log("node selected");
    //console.log(JSON.stringify(args));
  };

  private nodeChecking(args: NodeCheckEventArgs) {
    console.log("node checking");
    //console.log(JSON.stringify(args));
  };

  private nodeChecked(args: NodeCheckEventArgs) {
    console.log("node checked");
    //console.log(JSON.stringify(args));
  };

  private nodeCollapsing(args: NodeExpandEventArgs) {
    console.log("node collapsing");
    //console.log(JSON.stringify(args));
  };

  private nodeCollapsed(args: NodeExpandEventArgs) {
    console.log("node collapsed");
    //console.log(JSON.stringify(args));
  };

  private nodeExpanding(args: NodeExpandEventArgs) {
    console.log("node expanding");
    //console.log(JSON.stringify(args));
  };

  private nodeExpanded(args: NodeExpandEventArgs) {
    console.log("node expanded");
    //console.log(JSON.stringify(args));
  };

  private nodeDragStart(args: DragAndDropEventArgs) {
    console.log("node drag start");
    //console.log(JSON.stringify(args));
  }

  private nodeDragStop(args: DragAndDropEventArgs) {
    console.log("node drag stop");
    //console.log(JSON.stringify(args));
  }

  private nodeDragging(args: DragAndDropEventArgs) {
    //console.log("node dragging");
    //console.log(JSON.stringify(args));
  }

  private nodeDropped(args: DragAndDropEventArgs) {
    console.log("node dropped");
    this.refresh();
    //console.log(JSON.stringify(args));
  }
}
