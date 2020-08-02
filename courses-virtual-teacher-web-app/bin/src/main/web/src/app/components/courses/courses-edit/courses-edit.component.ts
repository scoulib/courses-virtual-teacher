import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CourseService } from 'src/app/services/course.service';
import { Course } from 'src/app/models/treeview/course/course.model';

@Component({
  selector: 'app-courses-edit',
  templateUrl: './courses-edit.component.html',
  styleUrls: ['./courses-edit.component.css']
})
export class CoursesEditComponent implements OnInit {

  public course: Course;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private courseService: CourseService) { }

  public ngOnInit(): void {
    var idcourse = this.route.snapshot.params['idcourse'];
    console.log("courses id", idcourse);

    if(idcourse != null) {
      this.courseService.readById(idcourse)
        .subscribe(course => this.course = course);
    }
  }
}
