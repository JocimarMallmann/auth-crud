import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { HeaderComponent } from './header.component';

import { ShowIfLoggedModule } from '../../shared/directives/show-if-logged.module';


@NgModule({
  declarations: [
    HeaderComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    ShowIfLoggedModule
  ],
  exports: [
    HeaderComponent
  ]
})
export class HeaderModule { }
