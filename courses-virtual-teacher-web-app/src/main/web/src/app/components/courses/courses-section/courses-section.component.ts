import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatTable } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { ActivatedRoute, Router } from '@angular/router';
import { CourseService } from 'src/app/services/course.service';

import { MatSort } from '@angular/material/sort';
import { AccountService } from 'src/app/services/account.service';
import { SuccessDialogComponent } from '../../shared/dialogs/success-dialog/success-dialog.component';
import { MatDialogConfig, MatDialog } from '@angular/material/dialog';
import { ErrorDialogComponent } from '../../shared/dialogs/error-dialog/error-dialog.component';
import { Course } from 'src/app/models/course/course.model';
import {TokenStorageService} from "../../../services/token-storage.service";
import {Role} from "../../../models/user/role.enum";

/**
 * Composant qui permet d'afficher les cours
 */
@Component({
  selector: 'app-courses-section',
  templateUrl: './courses-section.component.html',
  styleUrls: ['./courses-section.component.css']
})
export class CoursesSectionComponent implements OnInit {

/**
   * Configuration de la pop-up pour les confirmations d'opérations CRUD
   */
  private dialogConfig: MatDialogConfig;

  /**
   * La liste des cours
   */
  public courses: Course[] = [];

  /**
   * Les colonnes affichées de la table
   */
  public displayedColumns: string[] = ['title', 'description', 'author', 'created', 'lastmodified', 'actions'];

  /**
   * Les données utilisées pour la table
   */
  public dataSource = new MatTableDataSource<Course>();

  /**
   * La table
   */
  @ViewChild(MatTable, { static: true })
  public table: MatTable<Course>;

  /**
   * La pagination de la table
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
    private courseService: CourseService,
    private dialog: MatDialog,
    public tokenStorageService: TokenStorageService) { }

  /**
   * Initialisation du composant
   */
  public ngOnInit(): void {
    var iduser = this.route.snapshot.params['iduser'];
    console.log("id user", iduser);

    //Si l'utilisateur n'est pas renseigné dans le paramétre de la requete
    //alors on récupère tous les cours
    //Sinon uniquement les cours de l'utilisateur
    if (iduser == null) {
      this.courseService.readAll()
        .subscribe(courses => {
          this.dataSource.data = courses;
          this.courses = courses;
        });
    } else {
      console.log('CoursesSectionComponent');
      this.accountService.readAllCoursesConsultedById(iduser)
        .subscribe(courses => {
          this.dataSource.data = courses;
          this.courses = courses;
        });
    }

    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;

    //On prépare la fenetre de la pop-up
    this.dialogConfig = {
      height: '200px',
      width: '400px',
      disableClose: true,
    };
  }

  /**
   * Filtrer les résultats de la table
   * @param event
   */
  public onFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  /**
   * Enregistrer un nouveau cours
   */
  public onAddCourse(): void {
    console.log("new course");
    this.router.navigate(['/courses-edit']);
  }

  /**
   * Editer ou voir le détail d'un cours
   * @param user
   */
  public onEditCourse(course: Course): void {
    console.log("edit course", course);
    this.router.navigate(['/courses-edit', course.id]);
  }

  /**
   * Supprimer un cours
   * @param user
   */
  public onDeleteCourse(course: Course): void {
    console.log("delete course", course);

    this.courseService.delete(course).subscribe(
      data => {
        console.log("course delete confirm", data);

        this.dialogConfig.data = {
          title: "Suppression réussie",
          content: "Le cours " + course.title + " a bien été supprimé"
        }

        let dialogRef = this.dialog.open(SuccessDialogComponent, this.dialogConfig);

        dialogRef.afterClosed().subscribe(_ => {
          this.courses = this.courses.filter(u => u.id != course.id);
          this.dataSource.data = this.courses;
        });
      },
      error => {
        console.error("course delete error", error);

        this.dialogConfig.data = {
          title: "Suppression échouée",
          content: "Le cours " + course.title + " n'a pas été supprimé"
        }

        this.dialog.open(ErrorDialogComponent, this.dialogConfig);
      }
    );
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
}
