import { BookDetailComponent } from "./books/book-detail/book-detail.component";
import { BooksComponent } from "./books/books.component";
import { LoginComponent } from "./login/login.component";
import { NgModule, Component } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { LogoutComponent } from "./logout/logout.component";
import { AuthGuardService } from "./services/auth-guard.service";

const routes: Routes = [
  { path: "", redirectTo:"/books",pathMatch:"full" },
  { path: "login", component: LoginComponent },
  {
    path: "logout",
    component: LogoutComponent,
    canActivate: [AuthGuardService],
  },
  {
    path: "books",
    component: BooksComponent,
    canActivate: [AuthGuardService],
  },
  {
    path: "books/:id",
    component: BookDetailComponent,
    canActivate: [AuthGuardService],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
