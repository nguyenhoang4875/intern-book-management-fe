import { BookStorageService } from "src/app/shared/services/book-storage.service";
import { Component, OnInit } from "@angular/core";
import { FormGroup, FormArray, FormControl, Validators } from "@angular/forms";
import { ActivatedRoute, Router, Params } from "@angular/router";
import { Book } from "src/app/model/book.model";

@Component({
  selector: "app-book-edit",
  templateUrl: "./book-edit.component.html",
  styleUrls: ["./book-edit.component.scss"],
})
export class BookEditComponent implements OnInit {
  private id: number;
  private editMode = false;
  private bookForm: FormGroup;
  private book: Book;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private bookStorageService: BookStorageService
  ) {}

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.id = +params["id"];
      this.editMode = params["id"] != null;
      this.initForm();
    });
  }

  onSubmit() {
    if (this.editMode) {
      // this.recipeService.updateRecipe(this.id, this.recipeForm.value);
      console.log("on edit mode");

      this.bookStorageService
        .updateBook(this.id, this.bookForm.value)
        .subscribe((book: Book) => console.log(book));
    } else {
      this.bookStorageService
        .addBook(this.bookForm.value)
        .subscribe((response: Book) => {
          console.log("this book added");
          console.log(response);
        });
    }
    this.onCancel();
  }

  onCancel() {
    this.router.navigate(["../"], { relativeTo: this.route });
  }

  private initForm() {
    let bookTitle = "";
    let bookImage = "";
    let bookDescription = "";
    let bookAuthor = "";

    if (this.editMode) {
      this.bookStorageService
        .getBookById(this.id)
        .subscribe((response: Book) => {
          console.log("book inside of book edit");

          this.book = response;
          console.log(this.book);

          bookTitle = this.book.title;
          bookImage = this.book.image;
          bookDescription = this.book.description;
          bookAuthor = this.book.author;
          console.log("get data form book edit: ");

          console.log(bookTitle);
          console.log(bookImage);
          console.log(bookDescription);
          console.log(bookAuthor);
          this.bookForm = new FormGroup({
            title: new FormControl(bookTitle, Validators.required),
            image: new FormControl(bookImage, Validators.required),
            description: new FormControl(bookDescription, Validators.required),
            author: new FormControl(bookAuthor, Validators.required),
          });
        });
    }

    this.bookForm = new FormGroup({
      title: new FormControl(bookTitle, Validators.required),
      image: new FormControl(bookImage, Validators.required),
      description: new FormControl(bookDescription, Validators.required),
      author: new FormControl(bookAuthor, Validators.required),
    });
  }
}
