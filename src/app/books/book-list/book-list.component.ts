import { BookStorageService } from "../../shared/book-storage.service";
import { Component, OnInit } from "@angular/core";
import { Book } from "src/app/model/book.model";
import { BookService } from "src/app/services/book.service";
import { Router, ActivatedRoute } from "@angular/router";

@Component({
  selector: "app-book-list",
  templateUrl: "./book-list.component.html",
  styleUrls: ["./book-list.component.scss"],
})
export class BookListComponent implements OnInit {
  public books: Book[];

  constructor(
    private bookStorageService: BookStorageService,
    private bookService: BookService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    console.log(this.router.url);
    var x = this.bookStorageService.fetchBooks();
    if (this.router.url == "/mybooks") {
      x = this.bookStorageService.fetchMyBooks();
    }
    x.subscribe((response: Book[]) => {
      this.books = response;
    });
    this.books = this.bookService.getBooks();
  }

  onNewRecipe() {
    this.router.navigate(["new"], { relativeTo: this.route });
  }
}
