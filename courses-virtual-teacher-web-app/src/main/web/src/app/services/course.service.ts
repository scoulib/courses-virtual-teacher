import { Injectable } from '@angular/core';
import { ResourceService } from './resource.service';
import { HttpClient } from '@angular/common/http';
import { Course } from '../models/course/course.model';


/**
 * Service qui permet d'accéder aux opérations CRUD sur les cours
 */
@Injectable({
  providedIn: 'root'
})
export class CourseService extends ResourceService<Course> {

  constructor(httpClient: HttpClient) {
    super(
      httpClient,
      'http://localhost:9220/api',
      'courses',
      new Course());
  }
}
