import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CoursesTreeviewSectionComponent } from './courses-treeview-section.component';

describe('CoursesTreeviewSectionComponent', () => {
  let component: CoursesTreeviewSectionComponent;
  let fixture: ComponentFixture<CoursesTreeviewSectionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CoursesTreeviewSectionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CoursesTreeviewSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
