import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router, Params } from "@angular/router";
import { Book } from "src/app/model/book.model";
import { Comment } from "src/app/model/comment.model";
import { BookStorageService } from "src/app/shared/services/book-storage.service";
import { BookService } from 'src/app/shared/services/book.service';
import { CommentStorageService } from '../../services/comment-storage.service';


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
    this.bookStorageService.deleteBookById(this.id).subscribe();
    this.router.navigate(["/books"]);
  }

  public saveComment() {
    var comment = new Comment(this.message);
    this.commentStorageService
      .createComment(this.id, comment)
      .subscribe((response: Comment) => {
        this.comments.unshift(response);
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
