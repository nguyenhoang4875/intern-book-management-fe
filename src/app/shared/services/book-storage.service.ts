import { HttpParams } from "@angular/common/http";
import { BookPage } from "src/app/shared/model/book-page.model";
import { Injectable } from "@angular/core";
import { BaseApiService } from "../../core/services/base-api.service";
import { Observable } from "rxjs";
import { Book } from "../model/book.model";

@Injectable({
  providedIn: "root",
})
export class BookStorageService extends BaseApiService {
  private readonly enabledEP = "/enabled";
  private readonly myBooksEP = "/mybooks";
  private readonly imagesEP = "images";
  private readonly updateStatusEP = "/update-status";

  public baseEndPoint = "books";

  public addBook(book: Book): Observable<Book> {
    return this.createElement("", book);
  }

  public fetchBooks(): Observable<Book[]> {
    return this.getElements(this.enabledEP);
  }

  public fetchMyBooks(): Observable<Book[]> {
    return this.getElements(this.myBooksEP);
  }

  public fetchAllBooks(): Observable<Book[]> {
    return this.getElements("");
  }

  public fetchAllPageBooksSort(
    page: number,
    size: number,
    sort?: string
  ): Observable<BookPage> {
    var params = new HttpParams();
    params = params.append("page", page.toString());
    params = params.append("size", size.toString());
    if (sort != undefined && sort != "" && sort != null) {
      params = params.append("sort", sort);
    }
    return this.getElements("", { params });
  }

  public getBookById(id: number): Observable<Book> {
    return this.getElementById(id);
  }

  public updateBook(id: number, book: Book): Observable<Book> {
    return this.updateElement(id, book);
  }

  public deleteBookById(id: number): Observable<any> {
    return this.deleteElementById(id);
  }

  public postFile(fileToUpload: File): Observable<any> {
    const formData: FormData = new FormData();
    formData.append("file", fileToUpload, fileToUpload.name);
    return this.http.post(this.environmentUrl + this.imagesEP, formData);
  }

  public changeBookStatus(id: number): Observable<boolean> {
    return this.http.put<boolean>(
      this.environmentUrl + this.baseEndPoint + this.updateStatusEP + "/" + id,
      null
    );
  }
}
