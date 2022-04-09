import { Component, OnInit } from '@angular/core';
import { TaskManagerService } from '../task-manager.service';

@Component({
  selector: 'app-csv-export',
  templateUrl: './csv-export.component.html',
  styleUrls: ['./csv-export.component.scss'],
})
export class CsvExportComponent implements OnInit {
  constructor(public taskManager: TaskManagerService) {}

  ngOnInit(): void {}
  csvExport() {
    // タスクが登録されていない場合、警告を出す
    if (this.taskManager.tasks.length == 0) {
      alert('出力するタスクがありません。');
      return;
    }
    let fileName = 'export.csv';
    let outputString = 'タスク名,進捗状況\n';
    const bom = new Uint8Array([0xef, 0xbb, 0xbf]);

    for (let task of this.taskManager.tasks) {
      let completedString = '';
      if (task.isCompleted) {
        completedString = '済';
      } else {
        completedString = '未';
      }
      outputString = outputString + task.name + ',' + completedString + '\n';
    }
    const blob = new Blob([bom, outputString], { type: 'text/csv' });
    //IE10/11用(download属性が機能しないためmsSaveBlobを使用）
    if (window.navigator.msSaveBlob) {
      window.navigator.msSaveBlob(blob, fileName);
    } else {
      //BlobからオブジェクトURLを作成する
      const url = (window.URL || window.webkitURL).createObjectURL(blob);
      //ダウンロード用にリンクを作成する
      const download = document.createElement('a');
      //リンク先に上記で生成したURLを指定する
      download.href = url;
      //download属性にファイル名を指定する
      download.download = fileName;
      //作成したリンクをクリックしてダウンロードを実行する
      download.click();
      //createObjectURLで作成したオブジェクトURLを開放する
      (window.URL || window.webkitURL).revokeObjectURL(url);
    }
  }
}
