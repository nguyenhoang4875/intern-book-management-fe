import { AllBookComponent } from './allbook.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AllBookRoutingModule } from './allbook-routing.module';


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
