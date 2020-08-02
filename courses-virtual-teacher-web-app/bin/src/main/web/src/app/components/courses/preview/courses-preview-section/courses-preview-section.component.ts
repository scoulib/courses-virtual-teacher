import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CourseService } from 'src/app/services/course.service';
import { Course } from 'src/app/models/treeview/course/course.model';

@Component({
  selector: 'app-courses-preview-section',
  templateUrl: './courses-preview-section.component.html',
  styleUrls: ['./courses-preview-section.component.css']
})
export class CoursesPreviewSectionComponent implements OnInit {

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
