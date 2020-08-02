import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { StructuresService } from 'src/app/services/structures.service';
import { Structure } from 'src/app/models/structure/structure.model';
import { TypeElementStructure } from 'src/app/models/structure/type-element-structure.enum';

@Component({
  selector: 'app-structures-edit',
  templateUrl: './structures-edit.component.html',
  styleUrls: ['./structures-edit.component.css']
})
export class StructuresEditComponent implements OnInit {
  /**
   * La structure à éditer
   */
  public structure: Structure;

  /**
   * S'agit-il d'un enregistrement ou une modification d'une structure ?
   */
  public register: boolean;
  
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private structuresService: StructuresService) { }

  /**
   * Initialisation du composant
   */
  public ngOnInit(): void {
    console.log('edit struct');
    var idstruct = this.route.snapshot.params['idstruct'];
    console.log("structure id", idstruct);

    if(idstruct != null) {
      this.structuresService.readById(idstruct).subscribe(structure => this.structure = structure);
      this.register = false;
    } else {
      this.structure = new Structure();
      this.structure.title = "New Structure";
      this.structure.description = "New Wtructure";
      this.structure.root.type = TypeElementStructure.GROUPE;
      this.structure.root.title = "New Course"
      this.structure.root.description = "New structure";
      this.structure.root.content = "New structure";
      this.register = true;
    }
  }
}
