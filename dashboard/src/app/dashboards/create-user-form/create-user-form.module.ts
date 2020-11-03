import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CreateUserFormComponent } from './create-user-form.component';


@NgModule({
  declarations: [
    CreateUserFormComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    CreateUserFormComponent
  ]
})
export class CreateUserFormModule { }
