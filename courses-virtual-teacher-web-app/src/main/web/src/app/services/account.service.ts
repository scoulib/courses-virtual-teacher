import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ResourceService } from './resource.service';

import { Observable } from 'rxjs';

import { map, catchError } from 'rxjs/operators';
import { User } from '../models/user/user.model';
import { Course } from '../models/course/course.model';

/**
 * Service qui permet d'accéder aux opérations CRUD sur les comptes utilisateurs
 */
@Injectable({
  providedIn: 'root'
})
export class AccountService extends ResourceService<User> {

  constructor(httpClient: HttpClient) {
    super(
      httpClient,
      'http://localhost:9220/api',
      'users',
      new User());
  }

  /**
   * Récupérer tous les cours à consulter d'un user
   * @param id du user
   */
  public readAllCoursesConsultedById(id: string): Observable<Course[]> {
    console.log(`${this.url}/${this.endpoint}/${id}/coursesconsulted`);
    return this.httpClient
      .get<Course[]>(`${this.url}/${this.endpoint}/${id}/coursesconsulted`)
      .pipe(
        map((data) => data.map(item => new Course().fromJson(item))),
        catchError(this.handleError<Course[]>('read all courses consulted by id', []))
      );
  }


  public readAllAuthorized(): Observable<Course[]> {
    console.log(`${this.url}/current-user/authorizedCourses`);
    return this.httpClient
      .get<Course[]>( `${this.url}/current-user/authorizedCourses`)
      .pipe(
        map((data) => data.map(item => new Course().fromJson(item))),
        catchError(this.handleError<Course[]>('read all authorized', []))
      );
  }



  /**
   * Récupérer tous les cours crées d'un user
   * @param id du user
   */
  public readAllCoursesCreatedById(id: string): Observable<Course[]> {
    return this.httpClient
      .get<Course[]>(`${this.url}/${this.endpoint}/${id}/coursescreated`)
      .pipe(
        map((data) => data.map(item => new Course().fromJson(item))),
        catchError(this.handleError<Course[]>('read all courses created by id', []))
      );
  }
}
