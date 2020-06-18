import { BooksComponent } from "./books/books.component";
import { NgModule, Component } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { LogoutComponent } from "./logout/logout.component";
import { AuthGuardService } from "./shared/services/auth-guard.service";

const routes: Routes = [
  { path: "", redirectTo: "/books", pathMatch: "full" },
  { path: "login",
    loadChildren: () => import('./modules/login/login.module').then(m => m.LoginModule)
  },
  {
    path: "logout",
    component: LogoutComponent,
    canActivate: [AuthGuardService],
  },
  {
    path: "mybooks",
    component: BooksComponent,
    canActivate: [AuthGuardService],
  },
  {
    path: "allbooks",
    component: BooksComponent,
    canActivate: [AuthGuardService],
  },
  {
    path: 'books',
    loadChildren: () => import('./modules/book/book.module').then(m => m.BookModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
