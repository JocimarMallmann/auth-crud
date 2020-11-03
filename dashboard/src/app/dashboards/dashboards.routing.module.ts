import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DashboardsComponent } from './dashboards.component';
import { ListComponent } from './list/list.component';
import { UserFormComponent } from './user-form/user-form.component';
import { CreateUserFormComponent } from './create-user-form/create-user-form.component';

const routes: Routes = [
  {
    path: '',
    component: DashboardsComponent,
    children: [
      {
        path: '',
        component: ListComponent
      },
      {
        path: 'user/:id',
        component: UserFormComponent
      },
      {
        path: 'create-user',
        component: CreateUserFormComponent
      },
    ]
  }
];

@NgModule({
  imports: [ RouterModule.forChild(routes) ],
  exports: [ RouterModule ]
})
export class DashboardsRoutingModule { }
