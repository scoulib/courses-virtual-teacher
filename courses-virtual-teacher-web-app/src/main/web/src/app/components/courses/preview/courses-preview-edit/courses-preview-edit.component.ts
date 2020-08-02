import {Component, OnInit, Input, ViewChild, ElementRef} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CourseService } from 'src/app/services/course.service';
import { Course } from 'src/app/models/course/course.model';


/**
 * Composant qui permet d'afficher tous les éléments d'un cours dans un format document
 */
@Component({
  selector: 'app-courses-preview-edit',
  templateUrl: './courses-preview-edit.component.html',
  styleUrls: ['./courses-preview-edit.component.css']
})
export class CoursesPreviewEditComponent implements OnInit {

  /**
   * Le cours à afficher
   */
  @Input()
  public course: Course;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private courseService: CourseService) { }

  public ngOnInit(): void {
    this.course.sort();
  }
}
