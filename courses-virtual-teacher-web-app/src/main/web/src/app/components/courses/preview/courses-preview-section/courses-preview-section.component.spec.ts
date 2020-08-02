import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CoursesPreviewSectionComponent } from './courses-preview-section.component';

describe('CoursesPreviewSectionComponent', () => {
  let component: CoursesPreviewSectionComponent;
  let fixture: ComponentFixture<CoursesPreviewSectionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CoursesPreviewSectionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CoursesPreviewSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
