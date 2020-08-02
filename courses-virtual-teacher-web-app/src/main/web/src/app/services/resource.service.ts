import { Resource } from '../models/resource.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Serializable } from '../models/serializable.model';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

// https://medium.com/better-programming/a-generic-http-service-approach-for-angular-applications-a7bd8ff6a068
// https://www.djamware.com/post/5d8d7fc10daa6c77eed3b2f2/angular-8-tutorial-rest-api-and-httpclient-examples


export class ResourceService<T extends Resource> {

  protected httpOptions = {
    headers: new HttpHeaders({
      'Access-Control-Allow-Origin' : '*',
      'Content-Type':  'application/json',
    })
  };

  constructor(
      protected httpClient: HttpClient,
      protected url: string,
      protected endpoint: string,
      protected serializer: Serializable<T>) {}

    public create(item: T): Observable<T> {
      return this.httpClient
        .post<T>(`${this.url}/${this.endpoint}`, this.serializer.toJson(item), this.httpOptions)
        .pipe(
          map(data => this.serializer.fromJson(data)),
          catchError(this.handleError<T>('create', null))
          );
    }

    public update(item: T): Observable<T> {
      return this.httpClient
        .put<T>(`${this.url}/${this.endpoint}/${item.id}`, this.serializer.toJson(item), this.httpOptions)
        .pipe(
          map(data => this.serializer.fromJson(data)),
          catchError(this.handleError<T>('update', null))
          );
    }

    public readById(id: string): Observable<T> {
      return this.httpClient
        .get<T>(`${this.url}/${this.endpoint}/${id}`, this.httpOptions)
        .pipe(
          map((data) => this.serializer.fromJson(data)),
          catchError(this.handleError<T>('read by id', null))
        );
    }

    public readAll(): Observable<T[]> {
      return this.httpClient
        .get<T[]>(`${this.url}/${this.endpoint}`)
        .pipe(
          map((data) => data.map(item => this.serializer.fromJson(item))),
          catchError(this.handleError<T[]>('read all', []))
          );
    }

    public delete(item: T): Observable<T> {
     console.log('delete api : ' +this.url + '/' + this.endpoint + '/' + item.id);
      return this.httpClient
        .delete<T>(`${this.url}/${this.endpoint}/${item.id}`)
        .pipe(
          map((data) => this.serializer.fromJson(data)),
          catchError(this.handleError<T>('delete', null))
          );
    }

    protected handleError<K>(operation = 'operation', result?: K) {
      return (error: any): Observable<K> => {
        console.error(error);
        console.log(`${operation} failed: ${error.message}`);

        return of(result as K);
      };
    }
  }
