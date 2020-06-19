import { Component, OnInit } from '@angular/core';
import { BookStorageService } from 'src/app/shared/services/book-storage.service';
import { Book } from 'src/app/shared/model/book.model';

@Component({
  selector: 'app-all-book',
  templateUrl: './all-book.component.html',
  styleUrls: ['./all-book.component.scss']
})
export class AllBookComponent implements OnInit {

  public books: Book[] = [];

  constructor(
    private bookStorageService: BookStorageService
  ) { }

  ngOnInit() {
    this.bookStorageService.fetchAllBooks().subscribe(response => {
      this.books = response;
    });
  }
}
