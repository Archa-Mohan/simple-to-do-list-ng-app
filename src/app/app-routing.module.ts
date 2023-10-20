import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddTaskComponent } from './components/add-task/add-task.component';
import { ViewTaskComponent } from './components/view-task/view-task.component';

const routes: Routes = [
  { path: 'add', component: AddTaskComponent },
  { path: 'add/:id', component: AddTaskComponent },
  { path: 'view', component: ViewTaskComponent },
  { path: '**', component: ViewTaskComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
