import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { Comment } from "../../model/comment.model";

@Injectable({
  providedIn: "root",
})
export class CommentService {
  commentsChange = new Subject<Comment[]>();
  private comments: Comment[] = [];

  constructor() {}

  setComments(comments: Comment[]) {
    this.comments = comments;
    this.commentsChange.next(this.comments.slice());
  }

  getComments() {
    return this.comments.slice();
  }

  getComment(index: number) {
    return this.comments[index];
  }
  addComment(comment: Comment) {
    this.comments.push(comment);
    this.commentsChange.next(this.comments.slice());
  }
  updateComment(index: number, newComment: Comment) {
    this.comments[index] = newComment;
    this.commentsChange.next(this.comments.slice());
  }
  deleteComment(index: number) {
    this.comments.splice(index, 1);
    this.commentsChange.next(this.comments.slice());
  }
}
