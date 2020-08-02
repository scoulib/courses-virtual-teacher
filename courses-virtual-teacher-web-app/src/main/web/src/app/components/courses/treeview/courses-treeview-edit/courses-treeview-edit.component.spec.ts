import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CoursesTreeviewEditComponent } from './courses-treeview-edit.component';

describe('CoursesTreeviewEditComponent', () => {
  let component: CoursesTreeviewEditComponent;
  let fixture: ComponentFixture<CoursesTreeviewEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CoursesTreeviewEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CoursesTreeviewEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
