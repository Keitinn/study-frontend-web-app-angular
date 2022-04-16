import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TaskManagerService } from '../task-manager.service';

@Component({
  selector: 'app-task-edit',
  templateUrl: './task-edit.component.html',
  styleUrls: ['./task-edit.component.scss'],
})
export class TaskEditComponent implements OnInit, AfterViewInit {
  @ViewChild('addTaskNameInput')
  addTaskNameInput!: ElementRef;
  constructor(
    public taskManager: TaskManagerService,
    private router: Router,
    private route: ActivatedRoute
  ) {}
  ngAfterViewInit(): void {
    this.addTaskNameInput.nativeElement.focus();
  }

  editTaskName: string | undefined = undefined;
  parentTaskName: string | undefined = undefined;

  ngOnInit(): void {
    this.editTaskName = this.route.snapshot.paramMap
      .get('editTaskName')
      ?.toString();
    this.parentTaskName = this.route.snapshot.paramMap
      .get('parentTaskName')
      ?.toString();
  }

  saveTask(taskName: string, dueDate?: string) {
    if (this.editTaskName) {
      this.taskManager.updateTask(this.editTaskName, taskName, dueDate);
      this.router.navigate(['']);
    } else if (this.parentTaskName) {
      this.taskManager.addChildTask(this.parentTaskName, taskName, dueDate);
      this.router.navigate(['']);
    } else {
      if (this.taskManager.addTask(taskName, dueDate)) {
        this.router.navigate(['']);
      }
    }
  }
}
