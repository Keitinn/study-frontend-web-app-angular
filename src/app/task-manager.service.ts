import { Injectable } from '@angular/core';
import { TodoTask } from './todo-task';

@Injectable({
  providedIn: 'root',
})
export class TaskManagerService {
  tasks: TodoTask[];
  constructor() {
    this.tasks = [];
    this.loadTasks();
  }

  addTask(taskName: string) {
    this.tasks.push({
      name: taskName,
      isCompleted: false,
    });
    this.saveTasks();
  }

  getTasks() {
    return this.tasks;
  }

  loadTasks() {
    let jsonString = window.localStorage.getItem('tasks');
    if (jsonString) {
      this.tasks = JSON.parse(jsonString);
    }
  }

  saveTasks() {
    let jsonString = JSON.stringify(this.tasks);
    window.localStorage.setItem('tasks', jsonString);
  }

  // 完了しているタスク数を返す
  getNumOfCompletedTasks() {
    let cnt = 0;
    for (let task of this.tasks) {
      if (task.isCompleted) {
        cnt++;
      }
    }
    return cnt;
  }

  // チェックされているタスクを削除
  deleteTasks() {
    this.tasks = this.tasks.filter((task) => !task.isCompleted);
  }
}
