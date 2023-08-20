import { TestBed } from '@angular/core/testing';

import { NgxTreeFlowService } from './ngx-tree-flow.service';

describe('NgxTreeFlowService', () => {
  let service: NgxTreeFlowService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NgxTreeFlowService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
