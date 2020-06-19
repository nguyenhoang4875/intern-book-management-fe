import { Component, OnInit } from '@angular/core';
import { BookStorageService } from 'src/app/shared/services/book-storage.service';
import { Book } from 'src/app/shared/model/book.model';

@Component({
  selector: 'app-my-book',
  templateUrl: './my-book.component.html',
  styleUrls: ['./my-book.component.scss']
})
export class MyBookComponent implements OnInit {
  public books: Book[] = [];

  constructor(
    private bookStorageService: BookStorageService
  ) { }

  ngOnInit() {
    this.bookStorageService.fetchMyBooks().subscribe(response => {
      this.books = response;
    });
  }

}
