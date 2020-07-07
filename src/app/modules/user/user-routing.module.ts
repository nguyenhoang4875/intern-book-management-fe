import { AdminGuardService } from './../../shared/services/admin-guard.service';
import { UserEditComponent } from "./user-edit/user-edit.component";
import { UserComponent } from "./user.component";
import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

const routes: Routes = [
  {
    path: "",
    component: UserComponent,
    canActivate:[AdminGuardService]
  },
  {
    path: ":id/edit",
    component: UserEditComponent
  },
  {
    path: "new",
    component: UserEditComponent,
    canActivate:[AdminGuardService]
  },
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UserRoutingModule {}
