import { BookStorageService } from "src/app/shared/services/book-storage.service";
import { Component } from "@angular/core";
import { BookAbstract } from "../book-abstract/book.abstract";

@Component({
  selector: "app-all-book",
  templateUrl: "./all-book.component.html",
  styleUrls: ["./all-book.component.scss"],
})
export class AllBookComponent extends BookAbstract {
  constructor(public bookStorageService: BookStorageService) {
    super(bookStorageService);
  }

  protected getBooks() {
    this.bookStorageService.fetchAllBooks().subscribe((response) => {
      this.books = response;
      this.originBooks = response;
    });
  }
}
