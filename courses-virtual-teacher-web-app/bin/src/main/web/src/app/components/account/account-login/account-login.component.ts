import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AccountService } from 'src/app/services/account.service';

@Component({
  selector: 'app-account-login',
  templateUrl: './account-login.component.html',
  styleUrls: ['./account-login.component.css']
})
export class AccountLoginComponent implements OnInit {

  /**
   * Le formulaire avec les controles
   */
  public loginForm: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private accountService: AccountService) { }

  public ngOnInit() {
    this.loginForm = new FormGroup({
      login: new FormControl('', [Validators.required, Validators.maxLength(60)]),
      password: new FormControl('', [Validators.required, Validators.maxLength(60)]),
    });
  }

  public hasError(controlName: string, errorName: string): boolean {
    return this.loginForm.controls[controlName].hasError(errorName);
  }

  public onSubmit(loginFormValue: any): void {
    if (this.loginForm.valid) {
      this.onSave(loginFormValue);
    }
  }

  private onSave(loginFormValue: any): void {
    
  }
}
