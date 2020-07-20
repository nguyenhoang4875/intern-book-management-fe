import { Component, OnInit, EventEmitter, Input, Output } from '@angular/core';
import { Book } from '../../model/book.model';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent implements OnInit {
  @Input() books: Array<Book> = [];
  @Output() searchEmitter = new EventEmitter<Book[]>();

  private search: string;

  constructor() {}

  ngOnInit() {}

  public onSearch() {
    let booksSearch: Book[] = [];
    console.log('book on search component: ');
    console.log(this.books);

    if (this.search.trim() == '') {
      booksSearch = [...this.books];
    } else {
      this.books.forEach((book: Book) => {
        if (
          book.title.toLowerCase().includes(this.search.toLowerCase()) ||
          book.author.toLowerCase().includes(this.search.toLowerCase())
        ) {
          booksSearch.push(Object.assign({}, book));
        }
      });
    }
    this.searchEmitter.emit(booksSearch);
  }
}
