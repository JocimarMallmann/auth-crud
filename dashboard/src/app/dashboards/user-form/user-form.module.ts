import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { UserFormComponent } from './user-form.component';
import { ViewMessageModule } from 'src/app/shared/components/view-message/view-message.module';


@NgModule({
  declarations: [
    UserFormComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    ViewMessageModule
  ],
  exports: [
    UserFormComponent
  ]
})
export class UserFormModule { }
