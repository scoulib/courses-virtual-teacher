import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StructuresSectionComponent } from './structures-section.component';

describe('StructuresSectionComponent', () => {
  let component: StructuresSectionComponent;
  let fixture: ComponentFixture<StructuresSectionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StructuresSectionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StructuresSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
