import { Comment } from "./../../model/comment.model";
import { CommentStorageService } from "./../../shared/comment-storage.service";
import { BookService } from "src/app/services/book.service";
import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router, Params } from "@angular/router";
import { Book } from "src/app/model/book.model";
import { BookStorageService } from "src/app/shared/book-storage.service";

@Component({
  selector: "app-book-detail",
  templateUrl: "./book-detail.component.html",
  styleUrls: ["./book-detail.component.scss"],
})
export class BookDetailComponent implements OnInit {
  public book: Book;
  public id: number;
  public message: string;
  public comments: Array<Comment> = [];

  constructor(
    private bookService: BookService,
    private route: ActivatedRoute,
    private router: Router,
    private bookStorageService: BookStorageService,
    private commentStorageService: CommentStorageService
  ) {}

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.id = +params["id"];
      console.log("id: " + this.id);
      this.bookStorageService
        .getBookById(this.id)
        .subscribe((response: Book) => {
          this.book = response;
        });

      this.commentStorageService
        .fetchCommentsByPost(this.id)
        .subscribe((response: Comment[]) => {
          this.comments = response;
        });
    });
  }

  public onEditBook() {
    this.router.navigate(["edit"], { relativeTo: this.route });
  }

  public onDeleteBook() {
    console.log("deleting");
    
    this.bookStorageService.deleteBookById(this.id);
    this.router.navigate(["/books"]);
    console.log("deleted");
    
  }

  public saveComment() {
    console.log(this.message);
    var comment = new Comment(this.message);
    this.commentStorageService.createComment(this.id, comment).subscribe();
    this.commentStorageService
      .fetchCommentsByPost(this.id)
      .subscribe((response: Comment[]) => {
        this.comments = response;
      });
    this.message = "";
  }

  public updateComment() {
    console.log(this.message);
    var comment = new Comment(this.message);
    this.commentStorageService.createComment(this.id, comment).subscribe();
    this.commentStorageService
      .fetchCommentsByPost(this.id)
      .subscribe((response: Comment[]) => {
        this.comments = response;
      });
    this.message = "";
  }
  public deleteComment() {
    console.log(this.message);
    var comment = new Comment(this.message);
    this.commentStorageService.createComment(this.id, comment).subscribe();
    this.commentStorageService
      .fetchCommentsByPost(this.id)
      .subscribe((response: Comment[]) => {
        this.comments = response;
      });
    this.message = "";
  }
}
