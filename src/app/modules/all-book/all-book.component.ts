import { ConfirmationDialogComponent } from "./../../shared/components/confirmation-dialog/confirmation-dialog.component";
import { BookStorageService } from "src/app/shared/services/book-storage.service";
import { Component, OnInit } from "@angular/core";
import { BookAbstract } from "../book-abstract/book.abstract";
import { Book } from "src/app/shared/model/book.model";
import { BookPage } from "src/app/shared/model/book-page.model";
import { cloneDeep } from "lodash";
import { MatDialog } from "@angular/material";

@Component({
  selector: "app-all-book",
  templateUrl: "./all-book.component.html",
  styleUrls: ["./all-book.component.scss"],
})
export class AllBookComponent extends BookAbstract implements OnInit {
  showedBooks: Book[] = [];
  search: string;
  page: number;
  totalPages: number;
  totalPagesArr: number[] = [];
  pages: [];
  currentPage: number;
  size = 3;

  bookPage: BookPage;

  constructor(
    public bookStorageService: BookStorageService,
    public dialog: MatDialog
  ) {
    super(bookStorageService);
  }
  ngOnInit() {
    this.currentPage = 0;
    this.bookStorageService
      .fetchAllPageBooks(this.currentPage, this.size)
      .subscribe((response) => {
        this.bookPage = response;
        this.books = this.bookPage.content;
        this.totalPages = response.totalPages;
        for (let i = 0; i < response.totalPages; i++) {
          this.totalPagesArr.push(i);
        }
      });
  }
  protected getBooks() {}

  protected getBookPage(page: number, size: number) {
    this.bookStorageService
      .fetchAllPageBooks(page, size)
      .subscribe((response) => {
        this.bookPage = response;
        this.books = this.bookPage.content;
      });
  }

  public changeStatus(id: number) {
    this.bookStorageService
      .changeBookStatus(id)
      .subscribe((status: boolean) => {
        const index = this.books.findIndex((book) => book.id === id);
        this.books[index].enabled = status;
      });
  }

  onNextPage() {
    if (this.currentPage == this.totalPages - 1) {
      return;
    }
    this.currentPage++;
    this.getBookPage(this.currentPage, this.size);
  }

  onPreviousPage() {
    if (this.currentPage == 0) {
      return;
    }
    this.currentPage--;
    this.getBookPage(this.currentPage, this.size);
  }
  onSelectPage(id: number) {
    this.currentPage = id;
    this.getBookPage(id, this.size);
  }

  deleteBook(id: number) {
    let dialogRef = this.dialog.open(ConfirmationDialogComponent);
    dialogRef.afterClosed().subscribe((response: boolean) => {
      console.log(response);

      if (response == true) {
        this.bookStorageService.deleteBookById(id).subscribe();
        const index = this.books.findIndex((book) => book.id === id);
        this.books.splice(index, 1);
      }
    });
  }
}
