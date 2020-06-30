import { UserEditComponent } from "./user-edit/user-edit.component";
import { SharedModule } from "./../../shared/shared.module";
import { UserComponent } from "./user.component";
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { UserRoutingModule } from "./user-routing.module";

@NgModule({
  declarations: [UserComponent, UserEditComponent],
  imports: [CommonModule, UserRoutingModule, SharedModule],
})
export class UserModule {}
