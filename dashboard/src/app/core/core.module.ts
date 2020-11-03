import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

import { HeaderModule } from './header/header.module';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    HttpClientModule,
    HeaderModule
  ],
  exports: [
    HeaderModule
  ]
})
export class CoreModule { }
