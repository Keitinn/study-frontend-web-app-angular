import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TaskManagerService } from '../task-manager.service';

@Component({
  selector: 'app-task-edit',
  templateUrl: './task-edit.component.html',
  styleUrls: ['./task-edit.component.scss'],
})
export class TaskEditComponent implements OnInit {
  constructor(
    public taskManager: TaskManagerService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  editTaskName: string | undefined = undefined;

  ngOnInit(): void {
    this.editTaskName = this.route.snapshot.paramMap
      .get('taskName')
      ?.toString();
  }

  saveTask(taskName: string) {
    if (this.editTaskName) {
      this.taskManager.updateTask(this.editTaskName, taskName);
      this.router.navigate(['']);
    } else {
      if (this.taskManager.addTask(taskName)) {
        this.router.navigate(['']);
      }
    }
  }
}
