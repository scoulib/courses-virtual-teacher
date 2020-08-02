import { TestBed } from '@angular/core/testing';

import { ResourceService } from './resource.service';
import { Resource } from '../models/resource.model';

describe('ResourceService', () => {
  let service: ResourceService<Resource>;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ResourceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
