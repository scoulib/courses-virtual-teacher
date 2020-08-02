import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MailsEditComponent } from './mails-edit.component';

describe('MailsEditComponent', () => {
  let component: MailsEditComponent;
  let fixture: ComponentFixture<MailsEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MailsEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MailsEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
