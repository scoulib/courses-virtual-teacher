import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ResourceService} from './resource.service';
import {Structure} from '../models/structure/structure.model';

@Injectable({
  providedIn: 'root'
})
export class StructuresService  extends ResourceService<Structure>{

  constructor(httpClient: HttpClient) {
    super(
      httpClient,
      'http://localhost:9220/api',
      'structures',
      new Structure());
  }

}
