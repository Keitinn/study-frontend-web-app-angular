import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  tasks = [
    {
      name: 'ライブの申込み',
      isCompleted: false,
    },
    {
      name: 'セトリの予想',
      isCompleted: true,
    },
  ];

  addTask(taskName: string) {
    this.tasks.push({
      name: taskName,
      isCompleted: false,
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
}
