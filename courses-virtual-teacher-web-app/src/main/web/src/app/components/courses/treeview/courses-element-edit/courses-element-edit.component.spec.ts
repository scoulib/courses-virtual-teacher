import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CoursesElementEditComponent } from './courses-element-edit.component';

describe('CoursesElementEditComponent', () => {
  let component: CoursesElementEditComponent;
  let fixture: ComponentFixture<CoursesElementEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CoursesElementEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CoursesElementEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
