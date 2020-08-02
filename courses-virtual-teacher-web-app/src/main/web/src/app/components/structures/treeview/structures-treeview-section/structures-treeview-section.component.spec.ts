import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StructuresTreeviewSectionComponent } from './structures-treeview-section.component';

describe('CoursesTreeviewSectionComponent', () => {
  let component: StructuresTreeviewSectionComponent;
  let fixture: ComponentFixture<StructuresTreeviewSectionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StructuresTreeviewSectionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StructuresTreeviewSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
