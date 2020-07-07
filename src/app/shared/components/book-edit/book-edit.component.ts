import { BookStorageService } from "src/app/shared/services/book-storage.service";
import { Component, OnInit } from "@angular/core";
import { FormGroup, Validators, FormBuilder } from "@angular/forms";
import { ActivatedRoute, Router, Params } from "@angular/router";
import { Book } from "src/app/shared/model/book.model";
import { environment } from "src/environments/environment.prod";

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
  private fileToUpload: File = null;
  private readonly environmentUrl = environment.baseUrl;
  private imagePath;
  private imgURL: any;
  private message: string;

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
      if (this.fileToUpload != null && this.fileToUpload != undefined) {
        this.bookStorageService
          .postFile(this.fileToUpload)
          .subscribe((response) => {
            this.bookForm.patchValue({
              image: this.environmentUrl + "images/" + response.fileName,
            });
            this.bookStorageService
              .updateBook(this.id, this.bookForm.value)
              .subscribe((book: Book) => (this.book = book));
          });
      } else {
        this.bookStorageService
          .updateBook(this.id, this.bookForm.value)
          .subscribe((book: Book) => (this.book = book));
      }
      this.router.navigate(["../../"], { relativeTo: this.route });
    } else {
      if (this.fileToUpload != null && this.fileToUpload != undefined) {
        this.bookStorageService
          .postFile(this.fileToUpload)
          .subscribe((response) => {
            console.log(response);
            this.bookForm.patchValue({
              image: this.environmentUrl + "images/" + response.fileName,
            });
            this.bookStorageService
              .addBook(this.bookForm.value)
              .subscribe((response: Book) => {
                console.log(response);
              });
          });
      } else {
        this.bookStorageService
          .addBook(this.bookForm.value)
          .subscribe((response: Book) => {
            console.log(response);
          });
      }
      this.onCancel();
    }
  }

  public onCancel(): void {
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
      image: [null],
      description: [null, Validators.required],
      author: [null, Validators.required],
    });
  }

  public handleFileInput(files: FileList): void {
    this.fileToUpload = files.item(0);
    console.log(this.fileToUpload);
  }

  preview(files) {
    if (files.length === 0) {
      return;
    }

    var mimeType = files[0].type;
    if (mimeType.match(/image\/*/) == null) {
      this.message = "Only images are supported.";
      return;
    }

    var reader = new FileReader();
    this.imagePath = files;
    console.log("image path:");
    reader.readAsDataURL(files[0]);
    reader.onload = (_event) => {
      this.imgURL = reader.result;
    };
  }
}
