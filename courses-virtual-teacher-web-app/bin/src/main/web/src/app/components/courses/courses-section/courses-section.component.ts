import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatTable } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { ActivatedRoute, Router } from '@angular/router';
import { CourseService } from 'src/app/services/course.service';
import { Course } from 'src/app/models/treeview/course/course.model';
import { MatSort } from '@angular/material/sort';
import { AccountService } from 'src/app/services/account.service';

@Component({
  selector: 'app-courses-section',
  templateUrl: './courses-section.component.html',
  styleUrls: ['./courses-section.component.css']
})
export class CoursesSectionComponent implements OnInit {

  /**
   * Les cours de l'utilisateur
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
   * Le trie de la table
   */
  @ViewChild(MatSort, { static: true })
  public sort: MatSort;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private accountService: AccountService,
    private courseService: CourseService) { }

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
      this.accountService.readAllCoursesConsultedById(iduser)
        .subscribe(courses => {
          this.dataSource.data = courses;
          this.courses = courses;
        });
    }
  }

  public ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
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
   * Editer ou voir le détail d'un cours
   * @param course
   */
  public onEditCourse(course: Course): void {
    console.log("edit course", course);
    this.router.navigate(['/courses-edit', course.id]);
  }

  /**
   * Supprimer un cours
   * @param course
   */
  public onDeleteCourse(course: Course): void {
    console.log("delete course", course);
  }
}
