import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MailsSectionComponent } from './mails-section.component';

describe('MailsSectionComponent', () => {
  let component: MailsSectionComponent;
  let fixture: ComponentFixture<MailsSectionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MailsSectionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MailsSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
