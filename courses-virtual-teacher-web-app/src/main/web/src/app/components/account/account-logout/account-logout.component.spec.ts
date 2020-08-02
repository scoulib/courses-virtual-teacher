import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountLogoutComponent } from './account-logout.component';

describe('AccountLogoutComponent', () => {
  let component: AccountLogoutComponent;
  let fixture: ComponentFixture<AccountLogoutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AccountLogoutComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountLogoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
