import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AllBookComponent } from './all-book.component';
import { BookEditComponent } from 'src/app/shared/components/book-edit/book-edit.component';
import { BookDetailComponent } from 'src/app/shared/components/book-detail/book-detail.component';

const routes: Routes = [
  {
    path: '',
    component: AllBookComponent,
  },
  {
    path: 'all-books/new',
    component: BookEditComponent,
  },
  {
    path: 'all-books/:id',
    component: BookDetailComponent,
  },
  {
    path: 'all-books/:id/edit',
    component: BookEditComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AllBookRoutingModule {}
