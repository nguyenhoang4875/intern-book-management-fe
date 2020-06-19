import { BookStorageService } from "src/app/shared/services/book-storage.service";
import { Component, OnInit } from "@angular/core";
import { FormGroup, Validators, FormBuilder } from "@angular/forms";
import { ActivatedRoute, Router, Params } from "@angular/router";
import { Book } from "src/app/shared/model/book.model";

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
    private bookStorageService: BookStorageService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit() {
    this.initForm();
    this.route.params.subscribe((params: Params) => {
      this.id = +params["id"];
      this.editMode = params["id"] != null;
      this.initData();
    });
  }

  public onSubmit(): void {
    if (this.editMode) {
      this.bookStorageService
        .updateBook(this.id, this.bookForm.value)
        .subscribe((book: Book) => (this.book = book));
    } else {
      this.bookStorageService
        .addBook(this.bookForm.value)
        .subscribe((response: Book) => {
          console.log(response);
        });
    }
    this.onCancel();
  }

  onCancel() {
    this.router.navigate(["../"], { relativeTo: this.route });
  }

  private initData(): void {
    if (this.editMode) {
      this.bookStorageService
        .getBookById(this.id)
        .subscribe((response: Book) => {
          this.book = response;
          this.bookForm.setValue({
            title: response.title || "",
            image: response.image || "",
            description: response.description || "",
            author: response.author || "",
          });
        });
    }
  }

  private initForm(): void {
    this.bookForm = this.formBuilder.group({
      title: [null, Validators.required],
      image: [null, Validators.required],
      description: [null, Validators.required],
      author: [null, Validators.required],
    });
  }
}
