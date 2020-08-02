import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TokenStorageService } from 'src/app/services/token-storage.service';
import { Role } from 'src/app/models/user/role.enum';
import { Structure } from 'src/app/models/structure/structure.model';
import { StructuresService } from 'src/app/services/structures.service';



/**
 * Composant qui permet d'afficher une structure dans une section dédié
 */
@Component({
  selector: 'app-structures-treeview-section',
  templateUrl: './structures-treeview-section.component.html',
  styleUrls: ['./structures-treeview-section.component.css']
})
export class StructuresTreeviewSectionComponent implements OnInit {

  /**
   * La structure à éditer
   */
  @Input()
  public structure: Structure;

  /**
   * S'agit-il d'un enregistrement ou une modification d'une structure ?
   */
  @Input()
  public register: boolean;


  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private structuresService: StructuresService,
    private tokenStorageService: TokenStorageService) { }

  /**
   * Initialisation du composant
   */
  public ngOnInit(): void {
    this.structure.sort();
  }

  /**
   * Sauvegarder le cours
   */
  public onSave(): void {
    if (this.register) {


      this.structuresService.create(this.structure).subscribe(
        course => {
          console.log("structure create confirm", course);
          this.router.navigate(['/structures']);
        },
        error => {
          console.error("structure create error", error);
        }
      );
    } else {
      this.structuresService.update(this.structure).subscribe(
        course => {
          console.log("structure after update", course);
          this.router.navigate(['/structures']);
        },
        error => {
          console.error(error);
        }
      );
    }
  }

  public TestIsTeacher(): boolean {
    return this.tokenStorageService.getUser().role === Role.TEACHER;
  }
}
