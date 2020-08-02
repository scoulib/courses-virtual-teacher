import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AccountService } from 'src/app/services/account.service';
import { User } from 'src/app/models/user.model';

@Component({
  selector: 'app-account-edit',
  templateUrl: './account-edit.component.html',
  styleUrls: ['./account-edit.component.css']
})
export class AccountEditComponent implements OnInit {

  /**
   * Le formulaire avec les controles
   */
  public accountForm: FormGroup;

  /**
   * L'utilisateur
   */
  public user: User;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private accountService: AccountService) { }

  public ngOnInit(): void {
    var iduser = this.route.snapshot.params['iduser'];
    console.log("id user", iduser);

    this.accountService.readById(iduser)
      .subscribe(user => this.user = user);

    this.accountForm = new FormGroup({
      lastname: new FormControl('', [Validators.required, Validators.maxLength(60)]),
      firstname: new FormControl('', [Validators.required, Validators.maxLength(60)]),
      username: new FormControl('', [Validators.required, Validators.maxLength(60)]),
      dateOfBirth: new FormControl(new Date()),
      mail: new FormControl('', [Validators.required, Validators.maxLength(60)]),
      password: new FormControl('', [Validators.required, Validators.maxLength(60)]),
      confirmPassword: new FormControl('', [Validators.required, Validators.maxLength(60)]),
    });
  }

  public hasError(controlName: string, errorName: string): boolean {
    return this.accountForm.controls[controlName].hasError(errorName);
  }

  public onSubmit(accountFormValue: any): void {
    if (this.accountForm.valid) {
      this.onSave(accountFormValue);
    }
  }

  private onSave(accountFormValue: any): void {
    
  }
}
