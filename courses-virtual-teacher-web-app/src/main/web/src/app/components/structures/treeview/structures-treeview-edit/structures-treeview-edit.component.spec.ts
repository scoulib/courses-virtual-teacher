import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StructuresTreeviewEditComponent } from './structures-treeview-edit.component';

describe('StructuresTreeviewEditComponent', () => {
  let component: StructuresTreeviewEditComponent;
  let fixture: ComponentFixture<StructuresTreeviewEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StructuresTreeviewEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StructuresTreeviewEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
