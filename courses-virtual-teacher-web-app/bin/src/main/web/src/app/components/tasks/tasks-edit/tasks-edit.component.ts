import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TasksService } from 'src/app/services/tasks.service';

@Component({
  selector: 'app-tasks-edit',
  templateUrl: './tasks-edit.component.html',
  styleUrls: ['./tasks-edit.component.css']
})
export class TasksEditComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private tasksService: TasksService) { }

  public ngOnInit(): void {

  }
}
