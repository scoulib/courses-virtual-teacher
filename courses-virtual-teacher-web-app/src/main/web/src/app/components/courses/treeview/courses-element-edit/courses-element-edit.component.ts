import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { FormGroup, FormControl, Validators } from '@angular/forms';
import { TypeElementCourse } from 'src/app/models/course/type-element-course.enum';
import { ElementCourse } from 'src/app/models/course/element-course.model';
import { FormatElementCourse } from 'src/app/models/course/format-element-course.enum';


/**
 * Composant qui permet d'éditer un élément de l'aborescence d'un cours dans une boite de dialogue
 */
@Component({
  selector: 'app-courses-element-edit',
  templateUrl: './courses-element-edit.component.html',
  styleUrls: ['./courses-element-edit.component.css']
})
export class CoursesElementEditComponent implements OnInit {

  /**
   * Le formulaire qui permet d'éditer un élément de cours
   */
  public elementForm: FormGroup;

  /**
   * Les types des éléments possible pour chaque cours
   * - SECTION
   * - PARAGRAPHE
   * - IMAGE
   */
  public typesElementCourse = TypeElementCourse;
  public typesElementCourseOptions = [];

   /**
   * Les formats des éléments possible pour chaque cours
   * - TEXTE
   * - HTML
   */
  public formatsElementCourse = FormatElementCourse;
  public formatsElementCourseOptions = [];

  constructor(
    public dialogRef: MatDialogRef<CoursesElementEditComponent>,
    @Inject(MAT_DIALOG_DATA) public element: ElementCourse) { }

  /**
   * Initialisation du composant
   */
  public ngOnInit(): void {
    console.log("element to edit", this.element);

    this.typesElementCourseOptions = Object.keys(this.typesElementCourse);
    this.formatsElementCourseOptions = Object.keys(this.formatsElementCourse);

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
