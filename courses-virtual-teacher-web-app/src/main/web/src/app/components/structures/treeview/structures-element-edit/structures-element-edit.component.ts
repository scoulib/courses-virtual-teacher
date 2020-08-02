import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { FormGroup, FormControl, Validators } from '@angular/forms';
import { TypeElementStructure } from 'src/app/models/structure/type-element-structure.enum';
import { ElementStructure } from 'src/app/models/structure/element-structure.model';


/**
 * Composant qui permet d'éditer un élément de l'aborescence d'une structure dans une boite de dialogue
 */
@Component({
  selector: 'app-structures-element-edit',
  templateUrl: './structures-element-edit.component.html',
  styleUrls: ['./structures-element-edit.component.css']
})
export class StructuresElementEditComponent implements OnInit {

  /**
   * Le formulaire qui permet d'éditer une sous structure
   */
  public elementForm: FormGroup;

  /**
   * Les types des éléments possible pour chaque structure
   * - Filiere
   * - Departement
   * - Groupe
   */
  public typesElementStructure = TypeElementStructure;
  public typesElementStructureOptions = [];


  constructor(
    public dialogRef: MatDialogRef<StructuresElementEditComponent>,
    @Inject(MAT_DIALOG_DATA) public element: ElementStructure) { }

  /**
   * Initialisation du composant
   */
  public ngOnInit(): void {
    console.log("element to edit", this.element);

    this.typesElementStructureOptions = Object.keys(this.typesElementStructure);


    /**
     * Ajout des vérifications à chaque champ d'un élément
     */
    this.elementForm = new FormGroup({
      types: new FormControl('', [Validators.required]),
      description: new FormControl('', [Validators.required]),
      content: new FormControl('', [Validators.required]),
      formats: new FormControl('', [Validators.required])
    });
  }

   /**
   * Vérifier si un controle enregistré dans le formulaire respecte une condition ou non
   * @param controlName le nom du controle
   * @param errorName le nom de la condition
   */
  public hasError(controlName: string, errorName: string): boolean {
    return this.elementForm.controls[controlName].hasError(errorName);
  }
}
