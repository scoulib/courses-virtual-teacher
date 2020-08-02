import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TasksService } from 'src/app/services/tasks.service';

@Component({
  selector: 'app-tasks-section',
  templateUrl: './tasks-section.component.html',
  styleUrls: ['./tasks-section.component.css']
})
export class TasksSectionComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private tasksService: TasksService) { }

  public ngOnInit(): void {

  }
}
