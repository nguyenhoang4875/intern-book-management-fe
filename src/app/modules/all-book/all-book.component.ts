import { SortByEnum } from "./../../shared/enums/sort-type.enum";
import { ConfirmationDialogComponent } from "./../../shared/components/confirmation-dialog/confirmation-dialog.component";
import { BookStorageService } from "src/app/shared/services/book-storage.service";
import { Component, OnInit } from "@angular/core";
import { BookAbstract } from "../book-abstract/book.abstract";
import { Book } from "src/app/shared/model/book.model";
import { BookPage } from "src/app/shared/model/book-page.model";
import { MatDialog } from "@angular/material";
import { Header } from "src/app/shared/model/header.model";

@Component({
  selector: "app-all-book",
  templateUrl: "./all-book.component.html",
  styleUrls: ["./all-book.component.scss"],
})
export class AllBookComponent extends BookAbstract implements OnInit {
  public search: string;
  public totalPages: number;
  public totalPagesArr: number[] = [];
  public pages: [];
  public currentPage: number;
  public sizeOptions = [1, 3, 5, 10, 20, 50];
  public size = 3;
  public headers: Header[] = [];
  public headerSort: Header;

  bookPage: BookPage;

  constructor(
    public bookStorageService: BookStorageService,
    public dialog: MatDialog
  ) {
    super(bookStorageService);
  }
  ngOnInit() {
    this.initHeader();
    this.getData();
    this.headerSort = this.headers[0];
  }

  private initHeader() {
    this.headers = [
      {
        name: "ID",
        sortedBy: SortByEnum.ASC,
        key: "id",
        size: this.size,
      },
      {
        name: "Image",
        sortedBy: SortByEnum.ASC,
        key: "image",
        size: this.size,
      },
      {
        name: "Title",
        sortedBy: SortByEnum.ASC,
        key: "title",
        size: this.size,
      },
      {
        name: "Author",
        sortedBy: SortByEnum.ASC,
        key: "author",
        size: this.size,
      },
      {
        name: "Created at",
        sortedBy: SortByEnum.ASC,
        key: "createdAt",
        size: this.size,
      },
      {
        name: "Update at",
        sortedBy: SortByEnum.ASC,
        key: "updateAt",
        size: this.size,
      },
      {
        name: "Status",
        sortedBy: SortByEnum.ASC,
        key: "status",
        size: this.size,
      },
      {
        name: "Actions",
        sortedBy: SortByEnum.ASC,
        key: "actions",
        size: this.size,
      },
    ];
  }

  getData() {
    this.currentPage = 0;
    this.totalPagesArr = [];
    this.bookStorageService
      .fetchAllPageBooksSort(this.currentPage, this.size, "id,asc")
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
    var getBook$ = this.bookStorageService.fetchAllPageBooksSort(
      page,
      size,
      this.headerSort.key + "," + this.headerSort.sortedBy
    );
    if (this.search != undefined && this.search != null) {
      this.search = this.search.trim();
      getBook$ = this.bookStorageService.fetchAllPageBooksSearch(
        this.search,
        page,
        size
      );
    }

    getBook$.subscribe((response) => {
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
  onStartPage() {
    this.onSelectPage(0);
  }

  onEndPage() {
    this.onSelectPage(this.totalPages - 1);
  }

  deleteBook(id: number) {
    let dialogRef = this.dialog.open(ConfirmationDialogComponent);
    dialogRef.afterClosed().subscribe((response: string) => {
      if (response == "true") {
        this.bookStorageService.deleteBookById(id).subscribe();
        const index = this.books.findIndex((book) => book.id === id);
        this.books.splice(index, 1);
      }
    });
  }

  public selectedSizeOfPage(): void {
    this.totalPagesArr = [];
    this.getData();
    if (this.search != undefined && this.search != null && this.search != "") {
      this.onSearch();
    }
  }

  public sortBy(header: Header): void {
    this.totalPagesArr = [];
    this.currentPage = 0;
    this.headerSort = header;
    header.sortedBy =
      header.sortedBy == SortByEnum.ASC ? SortByEnum.DESC : SortByEnum.ASC;
    this.bookStorageService
      .fetchAllPageBooksSort(
        this.currentPage,
        this.size,
        header.key + "," + header.sortedBy
      )
      .subscribe((response) => {
        this.bookPage = response;
        this.books = this.bookPage.content;
        this.totalPages = response.totalPages;
        for (let i = 0; i < response.totalPages; i++) {
          this.totalPagesArr.push(i);
        }
      });
  }

  onSearch() {
    this.currentPage = 0;
    this.totalPagesArr = [];
    this.bookStorageService
      .fetchAllPageBooksSearch(this.search.trim(), this.currentPage, this.size)
      .subscribe((response: BookPage) => {
        this.bookPage = response;
        this.bookPage = response;
        this.books = this.bookPage.content;
        this.totalPages = response.totalPages;
        for (let i = 0; i < response.totalPages; i++) {
          this.totalPagesArr.push(i);
        }
      });
  }
}
