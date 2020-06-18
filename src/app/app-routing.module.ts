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
    path: 'books',
    loadChildren: () => import('./modules/book/book.module').then(m => m.BookModule)
  },
  {
    path: 'mybooks',
    loadChildren: () => import('./modules/mybook/mybook.module').then(m => m.MyBookModule),
    canActivate:[AuthGuardService]
  },
  {
    path: "allbooks",
    loadChildren: () => import('./modules/allbook/allbook.module').then(m => m.AllBookModule),
    canActivate: [AuthGuardService],
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
