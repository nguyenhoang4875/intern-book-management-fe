import { Component, OnInit, Input } from "@angular/core";
import { Book } from "src/app/model/book.module";

@Component({
  selector: "app-book-item",
  templateUrl: "./book-item.component.html",
  styleUrls: ["./book-item.component.scss"],
})
export class BookItemComponent implements OnInit {
  @Input() book: Book;
  @Input() index: number;
  constructor() {}

  ngOnInit() {}
}
