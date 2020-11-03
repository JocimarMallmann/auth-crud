import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardsComponent } from './dashboards.component';

import { DashboardsRoutingModule } from './dashboards.routing.module';


@NgModule({
  declarations: [
    DashboardsComponent
  ],
  imports: [
    CommonModule,
    DashboardsRoutingModule
  ],
  exports: [
    DashboardsComponent
  ]
})
export class DashboardsModule { }
