import {Component, OnInit, ViewChild} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { StructuresService } from 'src/app/services/structures.service';
import {MatDialog, MatDialogConfig} from "@angular/material/dialog";
import {MatTable, MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {Structure} from "../../../models/structure/structure.model";
import {SuccessDialogComponent} from "../../shared/dialogs/success-dialog/success-dialog.component";
import {ErrorDialogComponent} from "../../shared/dialogs/error-dialog/error-dialog.component";

@Component({
  selector: 'app-structures-section',
  templateUrl: './structures-section.component.html',
  styleUrls: ['./structures-section.component.css']
})
export class StructuresSectionComponent implements OnInit {

  /**
   * Configuration de la pop-up pour les confirmations d'opérations CRUD
   */
  private dialogConfig: MatDialogConfig;

  /**
   * La liste de tous les structures
   */
  public structures: Structure[] = [];

  /**
   * Les colonnes utilisées dans la table pour afficher les caractéristiques de chaque structure
   */
  public displayedColumns: string[] = ['title', 'description', 'position' , 'expanded' , 'selected' , 'actions'];

  /**
   * Les données utilisées dans la table
   */
  public dataSource = new MatTableDataSource<Structure>();

  /**
   * La table
   */
  @ViewChild(MatTable, { static: true })
  public table: MatTable<Structure>;

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
    private dialog: MatDialog,
    private structuresService: StructuresService) { }


  public ngOnInit(): void {

    this.structuresService.readAll().subscribe(structures => {
      this.dataSource.data = structures;
      this.structures = structures;
    });

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

  public onEditStructure(structure: Structure): void {
    console.log("edit structure", structure);
    this.router.navigate(['/structures-edit', structure.id]);
  }


  public onDeleteAccount(structure: Structure): void {
    console.log("delete structure", structure);

    this.structuresService.delete(structure).subscribe(
      data => {
        console.log("structure delete confirm", data);

        this.dialogConfig.data = {
          title: "Suppression réussie",
          content: "La structure " + structure.title + " a bien été supprimé"
        }

        let dialogRef = this.dialog.open(SuccessDialogComponent, this.dialogConfig);

        dialogRef.afterClosed().subscribe(_ => {
          this.structures = this.structures.filter(u => u.id != structure.id);
          this.dataSource.data = this.structures; 
        });
      },
      error => {
        console.error("structure delete error", error);

        this.dialogConfig.data = {
          title: "Suppression échouée",
          content: "La structure " + structure.title + " n'a pas été supprimé"
        }

        this.dialog.open(ErrorDialogComponent, this.dialogConfig);
      }
    );

  }

}
