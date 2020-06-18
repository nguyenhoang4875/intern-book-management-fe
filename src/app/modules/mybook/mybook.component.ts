import { Component, OnInit } from '@angular/core';
import { Book } from 'src/app/model/book.model';
import { BookStorageService } from 'src/app/shared/services/book-storage.service';

@Component({
  selector: 'app-mybook',
  templateUrl: './mybook.component.html',
  styleUrls: ['./mybook.component.scss']
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
