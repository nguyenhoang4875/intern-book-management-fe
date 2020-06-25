import { SearchComponent } from './components/search/search.component';
import { RouterModule } from '@angular/router';
import { BookDetailComponent } from './components/book-detail/book-detail.component';
import { BookEditComponent } from './components/book-edit/book-edit.component';
import { BookItemComponent } from './components/book-item/book-item.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../material.module';

const components = [
  BookItemComponent,
  BookEditComponent,
  BookDetailComponent,
  SearchComponent
];

const modules = [
  FormsModule,
  ReactiveFormsModule,
  MaterialModule,
  RouterModule
];

@NgModule({
  declarations: [
    ...components
  ],
  imports: [
    CommonModule,
    ...modules
  ],
  exports: [
    ...components,
    ...modules
  ]
})
export class SharedModule { }
