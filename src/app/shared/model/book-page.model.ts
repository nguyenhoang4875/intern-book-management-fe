import { Book } from './book.model';

export class BookPage {
  public content: Book[];
  public totalPages: number;
  public totalElements: number;
  public size: number;
  public number: number;
  public numberOfElements: number;

  constructor(init?: Partial<BookPage>) {
    Object.assign(this, init);
  }
}
