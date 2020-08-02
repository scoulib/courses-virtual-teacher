import {Component, Input, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {CourseService} from 'src/app/services/course.service';

import {TokenStorageService} from 'src/app/services/token-storage.service';
import {Course} from 'src/app/models/course/course.model';
import {Role} from '../../../../models/user/role.enum';


/**
 * Composant qui permet d'afficher un cours dans une section dédié
 */
@Component({
  selector: 'app-courses-treeview-section',
  templateUrl: './courses-treeview-section.component.html',
  styleUrls: ['./courses-treeview-section.component.css']
})
export class CoursesTreeviewSectionComponent implements OnInit {

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


  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private courseService: CourseService,
    private tokenStorageService: TokenStorageService) { }

  /**
   * Initialisation du composant
   */
  public ngOnInit(): void {
    this.course.sort();
  }

  /**
   * Sauvegarder le cours
   */
  public onSave(): void {
    if (this.register) {


      this.courseService.create(this.course).subscribe(
        course => {
          console.log("course create confirm", course);
          this.router.navigate(['/courses']);
        },
        error => {
          console.error("course create error", error);
        }
      );
    } else {
      this.courseService.update(this.course).subscribe(
        course => {
          console.log("course after update", course);
          this.router.navigate(['/courses']);
        },
        error => {
          console.error(error);
        }
      );
    }
  }

  ToCourse(): void{
    this.router.navigate(['/courses']);
  }

  public TestIsAdmin(): boolean{
    return this.tokenStorageService.getUser().role === Role.ADMIN;
  }

  public TestIsTeacher(): boolean{
    return this.tokenStorageService.getUser().role === Role.TEACHER;
  }

  public TestIsStudent(): boolean{
    return this.tokenStorageService.getUser().role === Role.STUDENT;
  }
}
