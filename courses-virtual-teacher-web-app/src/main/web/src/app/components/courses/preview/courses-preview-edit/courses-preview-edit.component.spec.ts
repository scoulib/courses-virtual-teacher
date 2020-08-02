import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CoursesPreviewEditComponent } from './courses-preview-edit.component';

describe('CoursesPreviewEditComponent', () => {
  let component: CoursesPreviewEditComponent;
  let fixture: ComponentFixture<CoursesPreviewEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CoursesPreviewEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CoursesPreviewEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
