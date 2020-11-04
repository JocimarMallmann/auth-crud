import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardsComponent } from './dashboards.component';

import { DashboardsRoutingModule } from './dashboards.routing.module';
import { ListModule } from './list/list.module';
import { CreateUserFormModule } from './create-user-form/create-user-form.module';


@NgModule({
  declarations: [
    DashboardsComponent
  ],
  imports: [
    CommonModule,
    ListModule,
    CreateUserFormModule,
    DashboardsRoutingModule
  ],
  exports: [
    DashboardsComponent
  ]
})
export class DashboardsModule { }
