import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountLostPasswordComponent } from './account-lost-password.component';

describe('AccountLostPasswordComponent', () => {
  let component: AccountLostPasswordComponent;
  let fixture: ComponentFixture<AccountLostPasswordComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AccountLostPasswordComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountLostPasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
