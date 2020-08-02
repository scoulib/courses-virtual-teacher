import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AccountService } from 'src/app/services/account.service';
import { AuthService } from 'src/app/services/auth.service';
import { TokenStorageService } from 'src/app/services/token-storage.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { SuccessDialogComponent } from '../../shared/dialogs/success-dialog/success-dialog.component';

/**
 * Composant qui permet de déconnecter un utilisateur
 */
@Component({
  selector: 'app-account-logout',
  templateUrl: './account-logout.component.html',
  styleUrls: ['./account-logout.component.css']
})
export class AccountLogoutComponent implements OnInit {

  /**
   * Configuration de la boite de dialogue pour se déconnecter
   */
  private dialogConfig: MatDialogConfig;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private accountService: AccountService,
    private authService: AuthService,
    private tokenStorageService: TokenStorageService,
    private dialog: MatDialog) { }

  /**
   * Initialisation du composant
   */
  public ngOnInit(): void {
    this.dialogConfig = {
      height: '200px',
      width: '400px',
      disableClose: true,
    }

    // On vide la session
    this.tokenStorageService.signOut();

    this.dialogConfig.data = {
      title: "Déconnexion réussie",
      content: "A bientôt"
    }

    let dialogRef = this.dialog.open(SuccessDialogComponent, this.dialogConfig);

    //On redirige l'utilisateur vers la page d'accueil
    dialogRef.afterClosed().subscribe(result => {
      this.router.navigate(['/home']);
    });
  }
}
