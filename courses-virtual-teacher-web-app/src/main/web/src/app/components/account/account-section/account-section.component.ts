import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MatTableDataSource, MatTable } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { ActivatedRoute, Router } from '@angular/router';
import { AccountService } from 'src/app/services/account.service';
import { MatSort } from '@angular/material/sort';
import { MatDialogConfig, MatDialog } from '@angular/material/dialog';
import { SuccessDialogComponent } from '../../shared/dialogs/success-dialog/success-dialog.component';
import { ErrorDialogComponent } from '../../shared/dialogs/error-dialog/error-dialog.component';
import { User } from 'src/app/models/user/user.model';
import {TokenStorageService} from "../../../services/token-storage.service";

//https://www.freakyjolly.com/angular-material-table-operations-using-dialog/

/**
 * Composant qui permet d'afficher les utilisateurs
 */
@Component({
  selector: 'app-account-section',
  templateUrl: './account-section.component.html',
  styleUrls: ['./account-section.component.css']
})
export class AccountSectionComponent implements OnInit {

  /**
   * Configuration de la pop-up pour les confirmations d'opérations CRUD
   */
  private dialogConfig: MatDialogConfig;

  /**
   * La liste de tous les utilisateurs inscrits
   */
  public users: User[] = [];

  /**
   * Les colonnes utilisées dans la table pour afficher les caractéristiques de chaque user
   */
  public displayedColumns: string[] = [ 'active' , 'role', 'firstname', 'lastname', 'username', 'birth', 'address',  'phone', 'email' , 'actions' ];

  /**
   * Les données utilisées dans la table
   */
  public dataSource = new MatTableDataSource<User>();

  /**
   * La table
   */
  @ViewChild(MatTable, { static: true })
  public table: MatTable<User>;

  /**
   * La pagination sur la table
   */
  @ViewChild(MatPaginator, { static: true })
  public paginator: MatPaginator;

  /**
   * Le trie sur la table
   */
  @ViewChild(MatSort, { static: true })
  public sort: MatSort;

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
    this.accountService.readAll().subscribe(users => {
      this.dataSource.data = users;
      this.users = users;
    });

    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;

    //On prépare la fenetre de la pop-up
    this.dialogConfig = {
      height: '200px',
      width: '400px',
      disableClose: true,
    }
  }

  /**
   * Filtrer les résultats du tableau
   * @param event
   */
  public onFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  /**
   * Editer ou voir les cours qui peut etre accessible par l'utilisateur sélectionné dans le tableau
   * @param user
   */
  public onEditCourses(user: User): void {
    console.log("edit courses", user);
    this.router.navigate(['/courses', user.id]);
  }

  /**
   * Enregistrer un nouveau utilisateur
   */
  public onAddAccount(): void {
    console.log("new user");
    this.router.navigate(['/account-edit']);
  }

  /**
   * Editer ou voir le détail du compte d'un utilisateur dans un formulaire
   * @param user
   */
  public onEditAccount(user: User): void {
    console.log("edit user", user);
    this.router.navigate(['/account-edit', user.id]);
  }

  public onEditCurrentAccount(): void {
        this.router.navigate(['/account-edit', this.tokenStorageService.getUser().id]);
  }
  /**
   * Supprimer le compte = utilisateur
   * @param user
   */
  public onDeleteAccount(user: User): void {
    console.log("delete user", user);

    this.accountService.delete(user).subscribe(
      data => {
        console.log("user delete success", data);

        this.dialogConfig.data = {
          title: "Suppression réussie",
          content: "L'utilisateur " + user.username + " a bien été supprimé"
        }

        let dialogRef = this.dialog.open(SuccessDialogComponent, this.dialogConfig);

        dialogRef.afterClosed().subscribe(_ => {
          this.users = this.users.filter(u => u.id != user.id);
          this.dataSource.data = this.users;
        });
      },
      error => {
        console.error("user delete error", error);

        this.dialogConfig.data = {
          title: "Suppression échouée",
          content: "L'utilisateur " + user.username + " n'a pas été supprimé"
        }

        this.dialog.open(ErrorDialogComponent, this.dialogConfig);
      }
    );
  }
}
