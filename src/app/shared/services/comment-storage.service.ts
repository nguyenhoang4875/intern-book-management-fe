import { Comment } from '../model/comment.model';
import { Injectable } from '@angular/core';
import { BaseApiService } from '../../core/services/base-api.service';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root',
})
export class CommentStorageService extends BaseApiService {
  protected baseEndPoint = 'comments';

  public fetchCommentsByPost(postId: number): Observable<Comment[]> {
    return this.getElements('/' + postId.toString());
  }

  public createComment(bookId: number, comment: Comment): Observable<any> {
    return this.createElement('/' + bookId.toString(), comment);
  }
}
