import { UserEditComponent } from './user-edit/user-edit.component';
import { SharedModule } from './../../shared/shared.module';
import { UserComponent } from './user.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { UserDetailComponent } from './user-detail/user-detail.component';

@NgModule({
  declarations: [UserComponent, UserEditComponent, UserDetailComponent],
  imports: [CommonModule, UserRoutingModule, SharedModule],
})
export class UserModule {}
