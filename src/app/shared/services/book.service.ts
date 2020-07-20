import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Book } from 'src/app/shared/model/book.model';

@Injectable({
  providedIn: 'root',
})
export class BookService {
  booksChange = new Subject<Book[]>();
  private books: Book[] = [];

  setBooks(books: Book[]) {
    this.books = books;
    this.booksChange.next(this.books.slice());
  }

  getBooks() {
    return this.books.slice();
  }

  getBook(index: number) {
    return this.books[index];
  }
  addBook(book: Book) {
    this.books.push(book);
    this.booksChange.next(this.books.slice());
  }
  updateBook(index: number, newBook: Book) {
    this.books[index] = newBook;
    this.booksChange.next(this.books.slice());
  }
  deleteBook(index: number) {
    this.books.splice(index, 1);
    this.booksChange.next(this.books.slice());
  }
}
