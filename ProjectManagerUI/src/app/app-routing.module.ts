import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UserComponent } from './ui/user/user.component';
import { ProjectComponent } from './ui/project/project.component';
import { ViewtaskComponent } from './ui/task/viewtask/viewtask.component';
import { AddtaskComponent } from './ui/task/addtask/addtask.component';

const routes: Routes = [
  { path: '', redirectTo: '/user', pathMatch: 'full' },
  { path: 'user', component: UserComponent },
  { path: 'project', component: ProjectComponent },
  { path: 'task', component: ViewtaskComponent },
  { path: 'addtask', component: AddtaskComponent },
  { path: 'edittask/:id', component: AddtaskComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
