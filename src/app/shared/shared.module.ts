import { SearchComponent } from "./components/search/search.component";
import { RouterModule } from "@angular/router";
import { BookDetailComponent } from "./components/book-detail/book-detail.component";
import { BookEditComponent } from "./components/book-edit/book-edit.component";
import { BookItemComponent } from "./components/book-item/book-item.component";
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MaterialModule } from "../material.module";
import { ConfirmationDialogComponent } from "./components/confirmation-dialog/confirmation-dialog.component";
import { MatDialogModule } from "@angular/material";
import { DropdownDirective } from "./dropdown.directive";
import { DateAgoPipe } from "./pipes/date-ago.pipe";

const components = [
  BookItemComponent,
  BookEditComponent,
  BookDetailComponent,
  SearchComponent,
  DropdownDirective,
  ConfirmationDialogComponent,
  DateAgoPipe,
];

const modules = [
  FormsModule,
  ReactiveFormsModule,
  MaterialModule,
  RouterModule,
  MatDialogModule,
];

@NgModule({
  declarations: [...components],
  entryComponents: [ConfirmationDialogComponent],
  imports: [CommonModule, ...modules],
  exports: [...components, ...modules],
})
export class SharedModule {}
