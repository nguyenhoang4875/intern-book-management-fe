import { MatDialog } from '@angular/material';
import { AuthenticationService } from 'src/app/shared/services/authentication.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { Book } from 'src/app/shared/model/book.model';
import { Comment } from 'src/app/shared/model/comment.model';
import { BookStorageService } from 'src/app/shared/services/book-storage.service';
import { CommentStorageService } from '../../services/comment-storage.service';
import { combineLatest } from 'rxjs';
import { ConfirmationDialogComponent } from '../confirmation-dialog/confirmation-dialog.component';

@Component({
  selector: 'app-book-detail',
  templateUrl: './book-detail.component.html',
  styleUrls: ['./book-detail.component.scss'],
})
export class BookDetailComponent implements OnInit {
  public book: Book;
  public id: number;
  public message: string;
  public comments: Array<Comment> = [];
  private isLogin = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private bookStorageService: BookStorageService,
    private commentStorageService: CommentStorageService,
    private authenticationService: AuthenticationService,
    private dialog: MatDialog
  ) {}

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.id = +params['id'];
      console.log('id: ' + this.id);
      const getBookB$ = this.bookStorageService.getBookById(this.id);
      const getComments$ = this.commentStorageService.fetchCommentsByPost(
        this.id
      );
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
    if (this.authenticationService.getUserFromLocalStorage() != null) {
      this.isLogin = true;
    }
  }

  public onEditBook(): void {
    this.router.navigate(['edit'], { relativeTo: this.route });
  }

  public onDeleteBook(): void {
    let dialogRef = this.dialog.open(ConfirmationDialogComponent);
    dialogRef.afterClosed().subscribe((response: boolean) => {
      if (response === true) {
        this.bookStorageService.deleteBookById(this.id).subscribe();
        this.router.navigate(['/books']);
      }
    });
  }

  public saveComment(): void {
    const comment = new Comment(this.message);
    this.commentStorageService
      .createComment(this.id, comment)
      .subscribe((response: Comment) => {
        this.comments.unshift(response);
      });
    this.message = '';
  }

  public updateComment(): void {
    console.log(this.message);
    const comment = new Comment(this.message);
    this.commentStorageService.createComment(this.id, comment).subscribe();
    this.commentStorageService
      .fetchCommentsByPost(this.id)
      .subscribe((response: Comment[]) => {
        this.comments = response;
      });
    this.message = '';
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
    this.message = '';
  }
}
