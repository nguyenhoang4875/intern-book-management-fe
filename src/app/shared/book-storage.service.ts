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

  public addBook(book: Book): Observable<Book> {
    return this.createElement("", book);
  }

  public fetchBooks(): Observable<Book[]> {
    return this.getAll(this.enabledEP);
  }

  public getBookById(id: number): Observable<Book> {
    return this.getElementById(id);
  }

  public updateBook(id: number, book: Book): Observable<Book> {
    return this.updateElement(id, book);
  }
  public deleteBookById(id: number): Observable<any> {
    console.log("id: "+id);
    
    return this.deleteElementById(id);
  }
}
