import { MyBookComponent } from './mybook.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BookComponent } from '../book/book.component';
import { BookEditComponent } from 'src/app/shared/components/book-edit/book-edit.component';
import { BookDetailComponent } from 'src/app/shared/components/book-detail/book-detail.component';


const routes: Routes = [
  {
    path: "",
    component: MyBookComponent,
  },
  {
    path: "new",
    component: BookEditComponent,
  },
  {
    path: ":id",
    component: BookDetailComponent,
  },
  {
    path: ":id/edit",
    component: BookEditComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MyBookRoutingModule { }
