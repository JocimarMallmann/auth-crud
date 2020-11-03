import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { ListComponent } from './list.component';

import { UserFormModule } from '../user-form/user-form.module';


@NgModule({
  declarations: [
    ListComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    UserFormModule
  ],
  exports: [
    ListComponent
  ]
})
export class ListModule { }
