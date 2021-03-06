import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TaskManagerService } from '../task-manager.service';

@Component({
  selector: 'app-csv-import',
  templateUrl: './csv-import.component.html',
  styleUrls: ['./csv-import.component.scss'],
})
export class CsvImportComponent implements OnInit {
  constructor(
    public taskManager: TaskManagerService,
    public snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {}

  onChange(evt: any) {
    this.csvImport(evt);
  }

  csvImport(evt: any) {
    const file = evt.target.files[0];
    if (file == null) {
      window.alert('ファイルが選択されていません');
      return;
    }

    if (
      file.type &&
      file.type != 'text/csv' &&
      file.type != 'application/vnd.ms-excel'
    ) {
      window.alert('CSVファイルではありません。');
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      console.log(reader);
      if (reader.result == null || typeof reader.result != 'string') {
        return;
      }
      let importTasks = (reader.result as string).split(/\r\n|\r|\n/);
      for (let rawTask of importTasks) {
        let taskArray = rawTask.split(',');
        if (taskArray.length != 2) {
          continue;
        }
        let isCompleted = taskArray[1] == '済';
        let task = {
          name: taskArray[0],
          isCompleted: isCompleted,
          parentTaskName: '',
        };
        if (task.name == 'タスク名') {
          continue;
        }
        let taskIndex = this.getIndexTasks(task.name);
        if (taskIndex != -1) {
          this.taskManager.setIndexOfTask(taskIndex, task);
        } else {
          this.taskManager.pushTask(task);
        }
      }
      this.taskManager.saveTasks();
      this.snackBar.open('CSV取込しました。', undefined, {
        duration: 1000,
      });
    };
    reader.readAsText(file);
  }

  // 引数のタスク名と同一のタスクの配列内のインデックスを返す
  // 存在しない場合は-1を返す
  getIndexTasks(taskName: string) {
    let index = 0;
    for (let task of this.taskManager.getTasks()) {
      if (task.name == taskName) {
        return index;
      }
      index++;
    }
    return -1;
  }
}
