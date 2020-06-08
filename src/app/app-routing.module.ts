import { BooksComponent } from "./books/books.component";
import { LoginComponent } from "./login/login.component";
import { NgModule, Component } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { LogoutComponent } from "./logout/logout.component";
import { AuthGuardService } from "./services/auth-guard.service";

const routes: Routes = [
  { path: "login", component: LoginComponent },
  {
    path: "logout",
    component: LogoutComponent,
    canActivate: [AuthGuardService],
  },
  {
    path: "books",
    component: BooksComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
