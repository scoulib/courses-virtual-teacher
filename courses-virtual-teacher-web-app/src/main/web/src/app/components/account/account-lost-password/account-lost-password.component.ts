import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AccountService } from 'src/app/services/account.service';
import { ActivatedRoute, Router } from '@angular/router';

/**
 * Composant qui permet de réinitialiser le mot de passe
 */
@Component({
  selector: 'app-account-lost-password',
  templateUrl: './account-lost-password.component.html',
  styleUrls: ['./account-lost-password.component.css']
})
export class AccountLostPasswordComponent implements OnInit {

  public lostPasswordForm: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private accountService: AccountService) { }

  public ngOnInit() {
    this.lostPasswordForm = new FormGroup({
      mail: new FormControl('', [Validators.required, Validators.maxLength(60)]),
    });
  }

  public hasError(controlName: string, errorName: string): boolean {
    return this.lostPasswordForm.controls[controlName].hasError(errorName);
  }

  public onSubmit(lostPasswordValue: any): void {
    if (this.lostPasswordForm.valid) {
      this.onSave(lostPasswordValue);
    }
  }

  private onSave(lostPasswordValue: any): void {
    
  }
}
