import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {CourseService} from 'src/app/services/course.service';
import {
  ContextMenuComponent,
  DragAndDropEventArgs,
  MenuEventArgs,
  NodeCheckEventArgs,
  NodeClickEventArgs,
  NodeEditEventArgs,
  NodeExpandEventArgs,
  NodeSelectEventArgs,
  TreeView
} from '@syncfusion/ej2-angular-navigations';

import {v4 as uuid} from 'uuid';
import {TreeViewService} from 'src/app/services/tree-view.service';

import {MatDialog, MatDialogConfig} from '@angular/material/dialog';
import {CoursesElementEditComponent} from '../courses-element-edit/courses-element-edit.component';
import {Course} from 'src/app/models/course/course.model';
import {ElementCourse} from 'src/app/models/course/element-course.model';
import {TokenStorageService} from "../../../../services/token-storage.service";
import {Role} from "../../../../models/user/role.enum";

const END_TITLE = 20;
/**
 * Composant qui permet d'afficher un cours dans une aborescence
 */
@Component({
  selector: 'app-courses-treeview-edit',
  templateUrl: './courses-treeview-edit.component.html',
  styleUrls: ['./courses-treeview-edit.component.css']
})
export class CoursesTreeviewEditComponent implements OnInit {

  /**
   * Configuration de la pop-up pour les confirmations d'opérations CRUD
   */
  private dialogConfig: MatDialogConfig;

  /**
   * Le cours à éditer
   */
  @Input()
  public course: Course;

  /**
   * S'agit-il d'un enregistrement ou une modification d'un cours ?
   */
  @Input()
  public register: boolean;

  /**
   * Le composant treeview
   */
  @ViewChild('tree', { static: true })
  public tree: TreeView

  /**
   * Le menu qui permet d'interargir avec un élément de l'arbre
   */
  @ViewChild('menu', { static: true })
  public menu: ContextMenuComponent;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private treeViewService: TreeViewService,
    private courseService: CourseService,
    private dialog: MatDialog,
    public tokenStorageService: TokenStorageService) {
  }

  /**
   * Initialisation du composant
   */
  public ngOnInit(): void {
    this.dialogConfig = {
      height: '800px',
      width: '1000px',
      disableClose: true,
    }
    this.course.author = this.tokenStorageService.getUser();

    this.course.sort();
    this.initTreeView();
    if (this.tokenStorageService.getUser().role === Role.TEACHER){
      this.initContextMenu();
    }

  }

  /**
   * Rafraichie le treeview
   */
  public refresh(): void {
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

      //On modifie le titre d'un noeud en prennant les 80 premieres caracteres
      n.title = element.content.substring(0, END_TITLE);
      console.log("node title", n.title);

      element.updateElementFromNode(n, profondeur, position);
      console.log("element maj", element);

      this.updateElement(n, profondeur);

      position++;
    }

    this.course.sort();
    this.tree.refresh();
  }

  /**
   * Mise à jour de l'élément à partir du noeud de facon récursive
   * @param node
   * @param level
   */
  private updateElement(node: { [key: string]: Object }, profondeur: number): void {
    profondeur++;
    if (node.subElements) {
      var position = 0;
      for (var n of Object.values(node.subElements)) {
        console.log("node", JSON.stringify(n));
        console.log("profondeur", profondeur);
        console.log("position", position);

        //On met à jour l'élément selon le noeud correspond dans l'arbre
        var element = this.course.find(n.id as string);

        //On modifie le titre d'un noeud en prennant les 20 premieres caracteres
        n.title = element.content.substring(0, END_TITLE);
        console.log("node title", n.title);

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
      { text: 'Editer', id: 'edit' },
      { text: 'Supprimer', id: 'remove' },
      { separator: true },
      { text: 'Couper', id: 'cut' },
      { text: 'Copier', id: 'copy' },
      { text: 'Coller', id: 'paste' }
    ]

    this.menu.select.subscribe(this.menuClick.bind(this));
  }

  /**
   * Evenenemt déclenché par le context menu
   * @param args
   */
  public menuClick(args: MenuEventArgs): void {
    if (this.tree.selectedNodes.length == 0) return;

    //Création d'un nouveau noeud
    if (args.item.id == 'new') {
      console.log("new element");

      var sourceElement = this.newElement();
      console.log("source element", sourceElement);

      this.dialogConfig.data = sourceElement;

      let dialogRef = this.dialog.open(CoursesElementEditComponent, this.dialogConfig);

      //On ajoute le noeud si confirmé
      dialogRef.afterClosed().subscribe(result => {
        this.addNode(sourceElement);
      });
    }
    //Suppression des noeuds sélectionnés
    else if (args.item.id == 'remove') {
      console.log("remove element");
      this.removeNodes();
    }
    //Editer ou voir un élément
    else if (args.item.id == 'edit') {
      console.log("edit element");

      var targetElementId = this.tree.selectedNodes[0];
      console.log("target element id", targetElementId);

      var targetElement = this.course.find(targetElementId);
      console.log("target element", targetElement);

      this.dialogConfig.data = targetElement;

      let dialogRef = this.dialog.open(CoursesElementEditComponent, this.dialogConfig);

      //On rafraichit le treeview
      dialogRef.afterClosed().subscribe(result => {
        this.refresh();
      });
    }
    //Couper
    else if (args.item.id == 'cut') {
      console.log("cut element");

      this.treeViewService.removeElements = true;
      this.treeViewService.copyElements = this.copyElements();
      this.treeViewService.treeViewSelected = this;

      console.log("cut elements", this.treeViewService.copyElements);
    }
    //Copier
    else if (args.item.id == 'copy') {
      console.log("copy element");

      this.treeViewService.removeElements = false;
      this.treeViewService.copyElements = this.copyElements();
      this.treeViewService.treeViewSelected = this;

      console.log("copy elements", this.treeViewService.copyElements);
    }
    //Coller les noeuds coupés ou copiés
    else if (args.item.id == 'paste') {
      console.log("paste element");

      for (var copyElement of this.treeViewService.copyElements) {
        console.log("paste element", copyElement);
        this.addNode(copyElement.clone(this.tree.selectedNodes[0]));
      }

      //Suppression des noeuds copiés si coupés
      this.treeViewService.removeCopyElements();
    }
  }

  /**
   * Cloner les élements sélectionnés dans les noeuds
   */
  private copyElements(): ElementCourse[] {
    var elements = [];

    for (var sourceElementId of this.tree.selectedNodes) {
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
  private removeNodes(): void {

    for (var sourceElementId of this.tree.selectedNodes) {
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

    //sourceElement.father = targetElementId;

    console.log("before push childrens", targetElement.subElements);
    targetElement.subElements.push(sourceElement);
    console.log("after push childrens", targetElement.subElements);

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
    element.subElements = [];

    return element;
  }

  /**
   * Initialisation du treeview
   */
  private initTreeView(): void {
    this.tree.fields = {
      dataSource: [this.course.root] as any,
      id: 'id',
      text: 'title',
      // parentID: 'father',
      child: 'subElements',
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
