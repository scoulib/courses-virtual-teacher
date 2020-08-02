import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { StructuresService } from 'src/app/services/structures.service';

@Component({
  selector: 'app-structures-section',
  templateUrl: './structures-section.component.html',
  styleUrls: ['./structures-section.component.css']
})
export class StructuresSectionComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private structuresService: StructuresService) { }

  public ngOnInit(): void {
    
  }
}
