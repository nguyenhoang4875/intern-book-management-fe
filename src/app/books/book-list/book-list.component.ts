import { DataStorageService } from "./../../shared/data-storage.service";
import { Component, OnInit, OnDestroy } from "@angular/core";
import { Book } from "src/app/model/book.model";
import { Subscription } from "rxjs";
import { BookService } from "src/app/services/book.service";
import { Router, ActivatedRoute } from "@angular/router";

@Component({
  selector: "app-book-list",
  templateUrl: "./book-list.component.html",
  styleUrls: ["./book-list.component.scss"],
})
export class BookListComponent implements OnInit, OnDestroy {
  books: Book[];
  subscription: Subscription;

  constructor(
    private dataStorageService: DataStorageService,
    private bookService: BookService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.dataStorageService.fetchBooks().subscribe();
    this.subscription = this.bookService.booksChange.subscribe(
      (books: Book[]) => {
        this.books = books;
      }
    );
    this.books = this.bookService.getBooks();
  }
  onNewRecipe() {
    this.router.navigate(["new"], { relativeTo: this.route });
  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
