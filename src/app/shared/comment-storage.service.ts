// import { environment } from "../../environments/environment.prod";
// import { Injectable } from "@angular/core";
// import { HttpClient } from "@angular/common/http";
// import { map, tap } from "rxjs/operators";
// import { CommentService } from "../services/comment.service";

// @Injectable({
//   providedIn: "root",
// })
// export class CommentStorageService {
//   url = environment.baseUrl;
//   constructor(
//     private http: HttpClient,
//     private commentService: CommentService
//   ) {}
//   fetchCommentsByPost(postId: number) {
//     return this.http.get<Comment[]>(this.url + "/comments/" + postId).pipe(
//       map((comments) => {
//         return comments.map((comments) => {
//           return {
//             ...comments,
//           };
//         });
//       }),
//       tap((comments) => {
//          this.commentService.setComments(comments);
//       }) CommentService
//     );
//   }
//   storeComment(postId: number, comment: Comment) {
//     return this.http
//       .post(this.url + "/comments/" + postId, comment)
//       .subscribe((response) => {
//         console.log(response);
//       });
//   }
// }
