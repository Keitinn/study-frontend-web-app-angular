import { Injectable } from '@angular/core';
import { dateInputsHaveChanged } from '@angular/material/datepicker/datepicker-input-base';
import { TodoTask } from './todo-task';

@Injectable({
  providedIn: 'root',
})
export class TaskManagerService {
  private tasks: TodoTask[];
  constructor() {
    this.tasks = [];
    this.loadTasks();
  }

  addTask(taskName: string, dueDate?: string): boolean {
    if (!taskName) {
      alert('タスク名が設定されていません。');
      return false;
    }

    for (let task of this.tasks) {
      if (task.name == taskName) {
        alert('すでに登録済みです');
        return false;
      }
    }

    this.tasks.push({
      name: taskName,
      isCompleted: false,
      parentTaskName: '',
      dueDate: dueDate ? new Date(dueDate) : undefined,
    });
    this.saveTasks();
    return true;
  }

  getTasks() {
    return this.tasks;
  }

  getChildTasks(parentTaskName: string) {
    let chidTasks: TodoTask[] = [];
    for (let task of this.tasks) {
      if (task.parentTaskName == parentTaskName) {
        chidTasks.push(task);
      }
    }
    return chidTasks;
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

  // タスクを更新する
  updateTask(taskName: string, newName: string, dueDate?: string) {
    for (let task of this.tasks) {
      if (task.name == taskName) {
        task.name = newName;
        task.dueDate = dueDate ? new Date(dueDate) : undefined;
        break;
      }
    }
    this.saveTasks();
  }

  // 子タスクを追加する
  addChildTask(
    parentTaskName: string,
    childTaskName: string,
    dueDate?: string
  ) {
    if (!childTaskName) {
      alert('タスク名が設定されていません。');
      return;
    }
    this.tasks.push({
      name: childTaskName,
      isCompleted: false,
      parentTaskName: parentTaskName,
      dueDate: dueDate ? new Date(dueDate) : undefined,
    });
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
    this.saveTasks();
  }

  // インデックスのタスクを設定
  setIndexOfTask(taskIndex: number, task: TodoTask) {
    this.tasks[taskIndex] = task;
  }

  // taskを追加
  pushTask(task: TodoTask) {
    this.tasks.push(task);
  }
}
