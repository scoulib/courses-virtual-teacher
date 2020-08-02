import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { StructuresService } from 'src/app/services/structures.service';

@Component({
  selector: 'app-structures-edit',
  templateUrl: './structures-edit.component.html',
  styleUrls: ['./structures-edit.component.css']
})
export class StructuresEditComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private structuresService: StructuresService) { }

  public ngOnInit(): void {

  }
}
