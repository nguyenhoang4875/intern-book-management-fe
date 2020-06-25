import { Component, OnInit } from "@angular/core";
import { BookStorageService } from "src/app/shared/services/book-storage.service";
import { Book } from "src/app/shared/model/book.model";

@Component({
  selector: "app-book",
  templateUrl: "./book.component.html",
  styleUrls: ["./book.component.scss"],
})
export class BookComponent implements OnInit {
  public books: Book[] = [];
  public tempBooks: Book[] = [];
  private search = "";

  constructor(private bookStorageService: BookStorageService) {}

  ngOnInit() {
    this.bookStorageService.fetchBooks().subscribe((response) => {
      this.books = response;
      this.tempBooks = [...this.books];
    });
  }

  public onSearch() {
    var booksSearch: Book[] = [];
    this.books = [...this.tempBooks];
    if (this.search.trim() == "") {
      this.books = this.tempBooks;
    } else {
      this.books.forEach((book: Book) => {
        if (
          book.title.toLowerCase().includes(this.search.toLowerCase()) ||
          book.author.toLowerCase().includes(this.search.toLowerCase())
        ) {
          booksSearch.push(Object.assign({}, book));
        }
      });
      this.books = [...booksSearch];
    }
  }
}
