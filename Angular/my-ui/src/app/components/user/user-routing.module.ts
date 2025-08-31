import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { UserAcessComponent } from './user-acess/user-acess.component';
import { UserRecordsComponent } from './user-records/user-records.component';

const routes: Routes = [
  { path: 'user-acess', component: UserAcessComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'user-record', component: UserRecordsComponent }
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
