import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ShowIfLoggedDirective } from './show-if-logged.directive';


@NgModule({
  declarations: [
    ShowIfLoggedDirective
  ],
  imports: [
    CommonModule
  ],
  exports: [
    ShowIfLoggedDirective
  ]
})
export class ShowIfLoggedModule { }
