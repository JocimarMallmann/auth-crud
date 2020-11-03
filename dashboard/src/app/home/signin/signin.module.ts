import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { SigninComponent } from './signin.component';
import { ViewMessageModule } from '../../shared/components/view-message/view-message.module';


@NgModule({
  declarations: [
    SigninComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    FormsModule,
    ViewMessageModule
  ],
  exports: [
    SigninComponent
  ]
})
export class SigninModule { }
