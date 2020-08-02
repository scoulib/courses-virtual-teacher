import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CourseService } from 'src/app/services/course.service';
import { Course } from 'src/app/models/treeview/course/course.model';
import { ElementCourse } from 'src/app/models/treeview/course/element-course.model';

@Component({
  selector: 'app-courses-preview-edit',
  templateUrl: './courses-preview-edit.component.html',
  styleUrls: ['./courses-preview-edit.component.css']
})
export class CoursesPreviewEditComponent implements OnInit {

  @Input()
  public course: Course;

  public list: ElementCourse[];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private courseService: CourseService) { }

  public ngOnInit(): void {
    this.course.sort();
    this.list = this.course.root.childrens
  }
}
