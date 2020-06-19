import { AllBookComponent } from './all-book.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AllBookRoutingModule } from './all-book-routing.module';


@NgModule({
  declarations: [
    AllBookComponent
  ],
  imports: [
    CommonModule,
    AllBookRoutingModule,
    SharedModule
  ]
})
export class AllBookModule { }
