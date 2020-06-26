import { AdminGuardService } from "./shared/services/admin-guard.service";
import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { AuthGuardService } from "./shared/services/auth-guard.service";
import { LogoutComponent } from "./core/components/layouts/logout/logout.component";

const routes: Routes = [
  { path: "", redirectTo: "/books", pathMatch: "full" },
  {
    path: "login",
    loadChildren: () =>
      import("./shared/modules/login/login.module").then((m) => m.LoginModule),
  },
  {
    path: "logout",
    component: LogoutComponent,
    canActivate: [AuthGuardService],
  },
  {
    path: "books",
    loadChildren: () =>
      import("./modules/book/book.module").then((m) => m.BookModule),
  },
  {
    path: "my-books",
    loadChildren: () =>
      import("./modules/my-book/my-book.module").then((m) => m.MyBookModule),
    canActivate: [AuthGuardService],
  },
  {
    path: "all-books",
    loadChildren: () =>
      import("./modules/all-book/all-book.module").then((m) => m.AllBookModule),
    canActivate: [AdminGuardService],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
