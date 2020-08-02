import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ResourceService } from './resource.service';
import { User } from '../models/user.model';
import { Observable } from 'rxjs';
import { Course } from '../models/treeview/course/course.model';
import { map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AccountService extends ResourceService<User> {

  constructor(httpClient: HttpClient) {
    super(
      httpClient,
      'http://localhost:9220',
      'user',
      new User());
  }

  public readAllCoursesConsultedById(id: string): Observable<Course[]> {
    return this.httpClient
      .get<Course[]>(`${this.url}/${this.endpoint}/${id}/coursesconsulted`, this.httpOptions)
      .pipe(
        map((data) => data.map(item => new Course().fromJson(item))),
        catchError(this.handleError<Course[]>('read all courses consulted by id', []))
      );
  }

  public readAllCoursesCreatedById(id: string): Observable<Course[]> {
    return this.httpClient
      .get<Course[]>(`${this.url}/${this.endpoint}/${id}/coursescreated`, this.httpOptions)
      .pipe(
        map((data) => data.map(item => new Course().fromJson(item))),
        catchError(this.handleError<Course[]>('read all courses created by id', []))
      );
  }
}
