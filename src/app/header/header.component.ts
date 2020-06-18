import { BookService } from 'src/app/services/book.service';
import { BookStorageService } from "src/app/shared/book-storage.service";
import { Component, OnInit } from "@angular/core";
import { Book } from '../model/book.model';

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.scss"],
})
export class HeaderComponent implements OnInit {
  constructor(private bookStorageService: BookStorageService, private bookService: BookService) {}

  ngOnInit() {}
  public onMyBooks() {
    console.log("on my books");
    this.bookStorageService.fetchMyBooks().subscribe(
      (books: Book[]) => {
        this.bookService.setBooks(books);
      }
    )
  }
}
