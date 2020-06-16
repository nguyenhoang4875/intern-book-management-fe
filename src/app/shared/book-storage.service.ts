import { Book } from "../model/book.model";
import { Injectable } from "@angular/core";
import { BaseApiService } from "../core/services/base-api.service";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class BookStorageService extends BaseApiService {
  private readonly enabledEP = "/enabled";

  public baseEndPoint = "books";

  public storeBook(book: Book): Observable<Book> {
    return this.createElement("", book);
  }

  public fetchBooks(): Observable<Book[]> {
    return this.getAll(this.enabledEP);
  }

  public getBookById(id: number): Observable<Book> {
    return this.getElementById(id);
  }
}
