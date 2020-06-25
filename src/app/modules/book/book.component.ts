import { Component, OnInit } from "@angular/core";
import { BookStorageService } from "src/app/shared/services/book-storage.service";
import { Book } from "src/app/shared/model/book.model";
import { BookAbstract } from "../book-abstract/book.abstract";

@Component({
  selector: "app-book",
  templateUrl: "./book.component.html",
  styleUrls: ["./book.component.scss"],
})
export class BookComponent extends BookAbstract {
  constructor(bookStorageService: BookStorageService) {
    super(bookStorageService);
  }

  getBooks() {
    this.bookStorageService.fetchBooks().subscribe((response) => {
      this.books = response;
      this.originBooks = response;
    });
  }
}
