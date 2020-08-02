import { Injectable } from '@angular/core';
import { ResourceService } from './resource.service';
import { HttpClient } from '@angular/common/http';
import { Course } from '../models/treeview/course/course.model';

@Injectable({
  providedIn: 'root'
})
export class CourseService extends ResourceService<Course> {

  constructor(httpClient: HttpClient) {
    super(
      httpClient,
      'http://localhost:9220',
      'course',
      new Course());
  }
}
