import { AuthenticationService } from "src/app/shared/services/authentication.service";
import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router, Params } from "@angular/router";
import { Book } from "src/app/shared/model/book.model";
import { Comment } from "src/app/shared/model/comment.model";
import { BookStorageService } from "src/app/shared/services/book-storage.service";
import { CommentStorageService } from "../../services/comment-storage.service";
import { combineLatest } from "rxjs";

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
  public isLogin: boolean;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private bookStorageService: BookStorageService,
    private commentStorageService: CommentStorageService,
    private authenticationService: AuthenticationService
  ) {}

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.id = +params["id"];
      console.log("id: " + this.id);
      const getBookB$ = this.bookStorageService.getBookById(this.id);
      const getComments$ = this.commentStorageService.fetchCommentsByPost(
        this.id
      );
      this.isLogin = this.authenticationService.isUserLoggedIn();

      combineLatest(getBookB$, getComments$).subscribe(
        ([bookResponse, commentResponse]) => {
          this.book = bookResponse;
          this.comments = commentResponse;
        },
        (error) => {
          console.log(error);
        }
      );
    });
  }

  public onEditBook(): void {
    this.router.navigate(["edit"], { relativeTo: this.route });
  }

  public onDeleteBook(): void {
    this.bookStorageService.deleteBookById(this.id).subscribe();
    this.router.navigate(["/books"]);
  }

  public saveComment(): void {
    var comment = new Comment(this.message);
    this.commentStorageService
      .createComment(this.id, comment)
      .subscribe((response: Comment) => {
        this.comments.unshift(response);
      });
    this.message = "";
  }

  public updateComment(): void {
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

  public deleteComment(): void {
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
