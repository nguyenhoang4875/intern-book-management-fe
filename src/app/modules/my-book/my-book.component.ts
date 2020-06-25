import { Component, OnInit } from "@angular/core";
import { BookStorageService } from "src/app/shared/services/book-storage.service";
import { Book } from "src/app/shared/model/book.model";
import { BookAbstract } from "../book-abstract/book.abstract";

@Component({
  selector: "app-my-book",
  templateUrl: "./my-book.component.html",
  styleUrls: ["./my-book.component.scss"],
})
export class MyBookComponent extends BookAbstract {
  constructor(public bookStorageService: BookStorageService) {
    super(bookStorageService);
  }

  getBooks() {
    this.bookStorageService.fetchMyBooks().subscribe((response) => {
      this.books = response;
      this.originBooks = response;
    });
  }
}
