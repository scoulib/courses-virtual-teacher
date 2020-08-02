import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StructuresElementEditComponent } from './structures-element-edit.component';

describe('StructuresElementEditComponent', () => {
  let component: StructuresElementEditComponent;
  let fixture: ComponentFixture<StructuresElementEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StructuresElementEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StructuresElementEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
