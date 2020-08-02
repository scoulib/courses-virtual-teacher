import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MatTableDataSource, MatTable } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { ActivatedRoute, Router } from '@angular/router';
import { AccountService } from 'src/app/services/account.service';
import { MatSort } from '@angular/material/sort';
import { User } from 'src/app/models/user.model';

//https://www.freakyjolly.com/angular-material-table-operations-using-dialog/

@Component({
  selector: 'app-account-section',
  templateUrl: './account-section.component.html',
  styleUrls: ['./account-section.component.css']
})
export class AccountSectionComponent implements OnInit, AfterViewInit {

  /**
   * Tous les utilisateurs
   */
  public users: User[] = [];

  /**
   * Les colonnes utilisées dans la table
   */
  public displayedColumns: string[] = ['role', 'firstname', 'lastname', 'username', 'birth', 'mail', 'coursesConsulted', 'actions'];

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
    private accountService: AccountService) { }

  public ngOnInit(): void {
    this.accountService.readAll().subscribe(users => {
      this.dataSource.data = users;
      this.users = users;
    });
  }

  public ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
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
   * Editer ou voir le détail du compte d'un utilisateur dans un formulaire
   * @param user 
   */
  public onEditAccount(user: User): void {
    console.log("edit user", user);
    this.router.navigate(['/account-edit', user.id]);
  }

  /**
   * Supprimer le compte = utilisateur
   * @param user
   */
  public onDeleteAccount(user: User): void {
    console.log("delete user", user);
  }
}
