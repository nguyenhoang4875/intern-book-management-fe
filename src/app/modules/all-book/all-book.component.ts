import { ConfirmationDialogComponent } from "./../../shared/components/confirmation-dialog/confirmation-dialog.component";
import { BookStorageService } from "src/app/shared/services/book-storage.service";
import { Component, OnInit } from "@angular/core";
import { BookAbstract } from "../book-abstract/book.abstract";
import { Book } from "src/app/shared/model/book.model";
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
  pages: number;
  pagesArr: number[] = [];
  currentPage: number;
  numberOfPage = 3;

  constructor(
    public bookStorageService: BookStorageService,
    public dialog: MatDialog
  ) {
    super(bookStorageService);
  }
  ngOnInit() {
    this.getBooks();
  }

  protected getBooks() {
    this.bookStorageService.fetchAllBooks().subscribe((response) => {
      this.books = response;
      this.originBooks = response;
      this.separatePage(this.books);
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

  separatePage(books: Book[]) {
    if (books) {
      this.pages = Math.ceil(books.length / this.numberOfPage);

      for (let i = 1; i <= this.pages; i++) {
        this.pagesArr.push(i);
      }

      this.onSelectPage(1);
    }
  }
  onSelectPage(page: number) {
    this.currentPage = page;
    console.log("page: " + page);

    const temp = cloneDeep(this.books);

    this.showedBooks = temp.splice(
      this.numberOfPage * (page - 1),
      this.numberOfPage
    );
  }
  onNextPage() {
    if (this.currentPage == this.pages) {
      return;
    }
    this.onSelectPage(this.currentPage + 1);
  }

  onPreviousPage() {
    if (this.currentPage == 1) {
      return;
    }
    this.onSelectPage(this.currentPage - 1);
  }

  deleteBook(id: number) {
    let dialogRef = this.dialog.open(ConfirmationDialogComponent) ;
    dialogRef.afterClosed().subscribe((response: boolean) => {
      console.log(response);
      
      if(response == true){
        this.bookStorageService.deleteBookById(id).subscribe();
        const index = this.books.findIndex(book => book.id === id);
        this.books.splice(index,1);
      }
    })
    
  }
}
