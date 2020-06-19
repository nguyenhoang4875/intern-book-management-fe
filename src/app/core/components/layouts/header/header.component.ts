import { BookService } from 'src/app/shared/services/book.service';
import { BookStorageService } from "src/app/shared/services/book-storage.service";
import { Component, OnInit } from "@angular/core";
import { Book } from 'src/app/shared/model/book.model';

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.scss"],
})
export class HeaderComponent implements OnInit {
  constructor() {}

  ngOnInit() {}
}
