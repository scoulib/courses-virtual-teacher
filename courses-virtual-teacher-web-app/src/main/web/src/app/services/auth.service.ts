import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { HttpHeaders, HttpClient } from '@angular/common/http';

const AUTH_API = 'http://localhost:9220/api';
const AUTH_ENDPOINT = 'auth'
const httpOptions = {
  headers: new HttpHeaders({
    'Access-Control-Allow-Methods' : '*',
    'Content-Type': 'application/json',

  })
};

/**
 * Service qui permet d'authentifier le user et de récupérer le token pour accéder à l'API
 */
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private httpClient: HttpClient
  ) { }

  public login(username: string, password: string): Observable<any> {
    return this.httpClient
      .post(`${AUTH_API}/${AUTH_ENDPOINT}/signin`, {
        username: username,
        password: password
      }, httpOptions);
  }
}
