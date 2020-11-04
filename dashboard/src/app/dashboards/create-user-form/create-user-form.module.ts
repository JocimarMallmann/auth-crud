import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CreateUserFormComponent } from './create-user-form.component';

import { ViewMessageModule } from '../../shared/components/view-message/view-message.module';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    CreateUserFormComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    FormsModule,
    ViewMessageModule
  ],
  exports: [
    CreateUserFormComponent
  ]
})
export class CreateUserFormModule { }
