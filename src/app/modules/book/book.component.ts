import { Book } from './../../model/book.model';
import { Component, OnInit } from '@angular/core';
import { BookStorageService } from 'src/app/shared/services/book-storage.service';

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
