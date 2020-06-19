import { Component, OnInit } from '@angular/core';
import { BookStorageService } from 'src/app/shared/services/book-storage.service';
import { Book } from 'src/app/shared/model/book.model';

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.scss']
})
export class BookComponent implements OnInit {

  public books: Book[] = [];

  constructor(
    private bookStorageService: BookStorageService
  ) { }

  ngOnInit() {
    this.bookStorageService.fetchBooks().subscribe(response => {
      this.books = response;
    });
  }

}
