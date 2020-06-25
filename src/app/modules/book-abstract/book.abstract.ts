import { OnInit } from '@angular/core';
import { BookStorageService } from 'src/app/shared/services/book-storage.service';
import { Book } from 'src/app/shared/model/book.model';

export abstract class BookAbstract implements OnInit {
    protected books: Book[] = [];
    protected originBooks: Book[] = [];

    constructor(public bookStorageService: BookStorageService) {}

    ngOnInit() {
        this.getBooks();
    }

    protected abstract getBooks();

    protected onSearch(books: Book[]): void {
        this.books = books;
    }
}