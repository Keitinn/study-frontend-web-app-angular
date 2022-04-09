import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TaskManagerService } from '../task-manager.service';

@Component({
  selector: 'app-task-edit',
  templateUrl: './task-edit.component.html',
  styleUrls: ['./task-edit.component.scss'],
})
export class TaskEditComponent implements OnInit {
  constructor(public taskManager: TaskManagerService, private router: Router) {}

  ngOnInit(): void {}

  addTask(taskName: string) {
    this.taskManager.addTask(taskName);
    this.router.navigate(['']);
  }
}
