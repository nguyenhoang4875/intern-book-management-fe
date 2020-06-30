import { UserEditComponent } from "./user-edit/user-edit.component";
import { UserComponent } from "./user.component";
import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

const routes: Routes = [
  {
    path: "",
    component: UserComponent,
  },
  {
    path: ":id/edit",
    component: UserEditComponent
  },
  {
    path: "new",
    component: UserEditComponent
  },
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UserRoutingModule {}
