import { TestBed } from '@angular/core/testing';

import { TreeViewStructureService } from './tree-view-structures.service';

describe('TreeViewStructureService', () => {
  let service: TreeViewStructureService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TreeViewStructureService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
