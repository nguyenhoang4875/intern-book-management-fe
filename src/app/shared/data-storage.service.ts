import { environment } from "./../../environments/environment.prod";
import { Book } from "../model/book.model";
import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { map, tap } from "rxjs/operators";
import { BookService } from "../services/book.service";

@Injectable({
  providedIn: "root",
})
export class DataStorageService {
  url = environment.baseUrl;
  constructor(private http: HttpClient, private bookService: BookService) {}

  storeBook() {
    const books = this.bookService.getBooks();
    return this.http.put(this.url + "/books", books).subscribe((response) => {
      console.log(response);
    });
  }

  fetchBooks() {
    return this.http.get<Book[]>(this.url + "/books").pipe(
      map((books) => {
        return books.map((books) => {
          return {
            ...books,
          };
        });
      }),
      tap((books) => {
        this.bookService.setBooks(books);
      })
    );
  }
}
