import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TaskEditComponent } from './task-edit/task-edit.component';
import { TaskListComponent } from './task-list/task-list.component';
import { CsvExportComponent } from './csv-export/csv-export.component';
import { CsvImportComponent } from './csv-import/csv-import.component';

const routes: Routes = [
  {
    path: '',
    component: TaskListComponent,
  },
  {
    path: 'add',
    component: TaskEditComponent,
  },
  {
    path: 'edit/:editTaskName',
    component: TaskEditComponent,
  },
  {
    path: 'add-child/:parentTaskName',
    component: TaskEditComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
