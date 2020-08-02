import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AccountService } from 'src/app/services/account.service';
import { AuthService } from 'src/app/services/auth.service';
import { TokenStorageService } from 'src/app/services/token-storage.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { SuccessDialogComponent } from '../../shared/dialogs/success-dialog/success-dialog.component';
import { ErrorDialogComponent } from '../../shared/dialogs/error-dialog/error-dialog.component';

/**
 * Composant qui permet d'identifier un utilisateur pour accéder au site
 */
@Component({
  selector: 'app-account-login',
  templateUrl: './account-login.component.html',
  styleUrls: ['./account-login.component.css']
})
export class AccountLoginComponent implements OnInit {

  /**
   * Configuration de la pop-up pour les confirmations d'opérations CRUD
   */
  private dialogConfig: MatDialogConfig;

  /**
   * Le formulaire avec les controles
   */
  public loginForm: FormGroup;

  /**
   * Le focus est-il sur l'identifiant ?
   */
  public focusStateid = false;

  /**
   * Le focus est-il sur le mot de passe ?
   */
  public focusStatepass = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private accountService: AccountService,
    private authService: AuthService,
    private tokenStorage: TokenStorageService,
    private dialog: MatDialog) { }

  /**
   * Initialisation du composant
   */
  public ngOnInit(): void {
    //On prépare le formulaire avec les controles pour chaque champs
    this.loginForm = new FormGroup({
      username: new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(20)]),
      password: new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(20), Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{8,}')]),
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
    return this.loginForm.controls[controlName].hasError(errorName);
  }

  /**
   * Soumettre le formulaire au serveur si il est valide
   * @param accountFormValue
   */
  public onSubmit(loginFormValue: any): void {
    if (this.loginForm.valid) {
      this.onSignIn(loginFormValue);
    }
  }

  /**
   * Connecter l'utilisateur
   * @param loginFormValue
   */
  private onSignIn(loginFormValue: any): void {
    var username = loginFormValue.username;
    console.log("username", username);

    var password = loginFormValue.password;
    console.log("password", password);

    //On vérifie si les identifiants sont correctes
    this.authService.login(username, password).subscribe(
      data => {
        console.log("data", data);

        //On enregistre le token dans la session afin qu'il puisse accéder à l'API
        this.tokenStorage.saveToken(data.accessToken);

        //Si réussi alors on récupère le user grace à son id
        this.accountService.readById(data.id).subscribe(
          user => {
            console.log('user' , user);

            //Si l'utilisateur est trouvé alors
            if (user != null) {
              // On enregistre le user dans la session
              this.tokenStorage.saveUser(user);

              this.dialogConfig.data = {
                title: "Connexion réussie",
                content: "Vous pouvez accéder aux rubriques"
              }

              //On confirme l'accès au site
              let dialogRef = this.dialog.open(SuccessDialogComponent, this.dialogConfig);

              //On redirige l'utilisateur vers le tableau de bord
              dialogRef.afterClosed().subscribe(_ => {
                this.router.navigate(['/dashboard']);
              });
            } else {

              this.dialogConfig.data = {
                title: "Problème avec le serveur",
                content: "L'utilisateur n'est pas retrouvé. Réessayer ultérieurement"
              }

              //On informe d'un problème avec le serveur
              this.dialog.open(ErrorDialogComponent, this.dialogConfig);
            }
          }
        )
      },
      error => {
        console.error("erreur", error);

        this.dialogConfig.data = {
          title: "Connexion échouée",
          content: "L'identifiant ou le mot de passe est incorrect. Réessayer"
        }

        this.dialog.open(ErrorDialogComponent, this.dialogConfig);
      }
    )
  }
}
