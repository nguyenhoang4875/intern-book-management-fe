import { Component, OnInit } from '@angular/core';
import { BookStorageService } from 'src/app/shared/services/book-storage.service';
import { Book } from 'src/app/model/book.model';

@Component({
  selector: 'app-allbook',
  templateUrl: './allbook.component.html',
  styleUrls: ['./allbook.component.scss']
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
