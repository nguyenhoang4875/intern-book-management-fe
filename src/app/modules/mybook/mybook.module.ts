import { MyBookComponent } from './mybook.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MyBookRoutingModule } from './mybook-routing.module';


@NgModule({
  declarations: [
    MyBookComponent
  ],
  imports: [
    CommonModule,
    MyBookRoutingModule,
    SharedModule
  ]
})
export class MyBookModule { }
