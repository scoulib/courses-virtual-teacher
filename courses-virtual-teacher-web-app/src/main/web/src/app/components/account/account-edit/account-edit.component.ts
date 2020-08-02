import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AccountService } from 'src/app/services/account.service';

import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { SuccessDialogComponent } from '../../shared/dialogs/success-dialog/success-dialog.component';
import { ErrorDialogComponent } from '../../shared/dialogs/error-dialog/error-dialog.component';
import { User } from 'src/app/models/user/user.model';
import { Role } from 'src/app/models/user/role.enum';
import {TokenStorageService} from "../../../services/token-storage.service";


/**
 * Composant qui permet d'éditer les informations d'un utilisateur
 */
@Component({
  selector: 'app-account-edit',
  templateUrl: './account-edit.component.html',
  styleUrls: ['./account-edit.component.css']
})

export class AccountEditComponent implements OnInit {

  @Input() max: any;
  public tomorrow = new Date();
  public focusState = false;
  public focusStatename = false;
  public focusStatefirst = false;
  public focusStatemail = false;
  public focusStatephone = false;
  public focusStateaddr = false;
  public focusStateid = false;
  public focusStatepass = false;
  public focusStateconfirm = false;

  /**
   * Configuration de la pop-up pour les confirmations d'opérations CRUD
   */
  private dialogConfig: MatDialogConfig;

  /**
   * Le formulaire avec les controles
   */
  public accountForm: FormGroup;

  /**
   * L'utilisateur dont on souhaite modifier ces informations
   */
  public user: User;

  /**
   * Les types des utilisateurs possibles
   * - ADMIN
   * - TEACHER
   * - STUDENT
   */
  public typesUsers = Role;
  public typesUsersOptions = [];

  /**
   * S'agit-il d'un enregistrement ou une modification d'un utilisateur ?
   */
  public register: boolean;


  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private accountService: AccountService,
    private dialog: MatDialog,
    public tokenStorageService: TokenStorageService) { }

  /**
   * Initialisation du composant
   */
  public ngOnInit(): void {
    this.typesUsersOptions = Object.keys(this.typesUsers);

    //Il faut que l'utilisateur est au moins 10 ans
    this.tomorrow.setDate(this.tomorrow.getDate() - 5475);

    //On récupère l'id du user dans l'URL
    var iduser = this.route.snapshot.params['iduser'];
    console.log("id user", iduser);

    //Si l'id est renseigné dans ce cas il s'agit d'une modification
    //Sinon il s'agit d'une création d'un nouvel utilisateur
    if (iduser != null) {
      this.accountService.readById(iduser).subscribe(user => this.user = user);
      this.register = false;
    } else {
      this.user = new User();
      this.register = true;
    }


    //On prépare le formulaire avec les controles pour chaque champs
    this.accountForm = new FormGroup({
      role: new FormControl('', [Validators.required]),
      lastname: new FormControl('', [Validators.required, Validators.maxLength(255)]),
      firstname: new FormControl('', [Validators.required, Validators.maxLength(255)]),
      birth: new FormControl(this.tomorrow, [Validators.required]),
      phone: new FormControl(this.tomorrow, [Validators.required, Validators.minLength(10), Validators.maxLength(10), Validators.pattern('^[0-9]{10}$')]),
      address: new FormControl('', [Validators.required, Validators.maxLength(255)]),
      username: new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(255)]),
      email: new FormControl('', [Validators.required, Validators.maxLength(255), Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(255), Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{8,}')]),
      confirmPassword: new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(255), Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{8,}')]),
    });

    //On prépare la fenetre de la pop-up
    this.dialogConfig = {
      height: '200px',
      width: '400px',
      disableClose: true,
    }
  }

  /**
   * Vérifier si un controle enregistré dans le formulaire respecte une condition ou non
   * @param controlName le nom du controle
   * @param errorName le nom de la condition
   */
  public hasError(controlName: string, errorName: string): boolean {
    return this.accountForm.controls[controlName].hasError(errorName);
  }

  /**
   * Soumettre le formulaire au serveur si il est valide
   * @param accountFormValue
   */
  public onSubmit(accountFormValue: any): void {
    if (this.accountForm.valid) {
      this.onSave(accountFormValue);
    }
  }

  /**
   * Enregistrement des nouvelles informations de l'utilisateur
   * @param accountFormValue
   */
  private onSave(accountFormValue: any): void {
    console.log("account form value", accountFormValue)

    var password = accountFormValue.password;
    console.log("password", password);

    var confirmPassword = accountFormValue.confirmPassword;
    console.log("confirmPassword", confirmPassword);

    if (password == confirmPassword) {
      //Mise à jour du user
      this.user.password = password;

      console.log("user before update", this.user);

      if (this.register) {
        this.accountService.create(this.user).subscribe(
          data => {
            console.log("user create success", data);

            this.dialogConfig.data = {
              title: "Enregistrement réussie",
              content: "L'utilisateur " + this.user.username + " est bien enregistré"
            }

            let dialogRef = this.dialog.open(SuccessDialogComponent, this.dialogConfig);

            dialogRef.afterClosed().subscribe(_ => {
              this.router.navigate(['/account']);
            });
          },
          error => {
            console.error("user create error", error);

            this.dialogConfig.data = {
              title: "Enregistrement échoué",
              content: "L'utilisateur " + this.user.username + " n'a pas été enregistré"
            }

            this.dialog.open(ErrorDialogComponent, this.dialogConfig);
          }
        );
      } else {
        this.accountService.update(this.user).subscribe(
          data => {
            console.log("user after update", data);

            this.dialogConfig.data = {
              title: "Mise à jour réussie",
              content: "L'utilisateur " + this.user.username + " a bien été modifié"
            }

            let dialogRef = this.dialog.open(SuccessDialogComponent, this.dialogConfig);

            dialogRef.afterClosed().subscribe(_ => {
              this.router.navigate(['/account']);
            });
          },
          error => {
            console.error("user update error", error);

            this.dialogConfig.data = {
              title: "Mise à jour échouée",
              content: "L'utilisateur " + this.user.username + " n'a pas été modifié"
            }

            this.dialog.open(ErrorDialogComponent, this.dialogConfig);
          }
        );
      }

    } else {
      console.log("password error");
    }

  }

  public TestIsAdmin(): boolean{
    return this.tokenStorageService.getUser().role === Role.ADMIN;
  }

  public TestIsTeacher(): boolean{
    return this.tokenStorageService.getUser().role === Role.TEACHER;
  }

  public TestIsStudent(): boolean{
    return this.tokenStorageService.getUser().role === Role.STUDENT;
  }

  ToDashboar(){
    this.router.navigate(['/dashboard']);
  }

}
