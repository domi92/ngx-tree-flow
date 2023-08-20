import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NgxTreeFlowComponent } from './ngx-tree-flow.component';

describe('NgxTreeFlowComponent', () => {
  let component: NgxTreeFlowComponent;
  let fixture: ComponentFixture<NgxTreeFlowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NgxTreeFlowComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NgxTreeFlowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
