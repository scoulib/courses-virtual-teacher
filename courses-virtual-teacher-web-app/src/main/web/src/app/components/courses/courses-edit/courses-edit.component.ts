import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CourseService } from 'src/app/services/course.service';
import { Course } from 'src/app/models/course/course.model';
import { TypeElementCourse } from 'src/app/models/course/type-element-course.enum';
import { FormatElementCourse } from 'src/app/models/course/format-element-course.enum';


/**
 * Composant qui permet d'éditer un cours
 */
@Component({
  selector: 'app-courses-edit',
  templateUrl: './courses-edit.component.html',
  styleUrls: ['./courses-edit.component.css']
})
export class CoursesEditComponent implements OnInit {

  /**
   * Le cours à éditer
   */
  public course: Course;

  /**
   * S'agit-il d'un enregistrement ou une modification d'un cours ?
   */
  public register: boolean;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private courseService: CourseService) { }

  /**
   * Initialisation du composant
   */
  public ngOnInit(): void {
    console.log('edit course');
    var idcourse = this.route.snapshot.params['idcourse'];
    console.log("courses id", idcourse);

    if(idcourse != null) {
      this.courseService.readById(idcourse).subscribe(course => this.course = course);
      this.register = false;
    } else {
      this.course = new Course();
      this.course.title = "New Course";
      this.course.description = "New Course";
      this.course.root.type = TypeElementCourse.SECTION;
      this.course.root.title = "New Course"
      this.course.root.description = "New Course";
      this.course.root.content = "New Course";
      this.course.root.format = FormatElementCourse.TEXTE;
      this.register = true;
    }
  }
}
