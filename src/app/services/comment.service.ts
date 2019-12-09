import { Injectable } from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Comment} from '../model/comment';

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  URL = environment.commentUrl;

  constructor(private http: HttpClient) { }

  getAllCommentByProduct(id: string): Observable<Comment[]> {
    return this.http.get<Comment[]>(this.URL + 'product/' + id);
  }

  createComment(comment: Comment): Observable<Comment> {
    return this.http.post<Comment>(this.URL , comment);
  }

  editComment(comment: Comment): Observable<Comment> {
    return this.http.put<Comment>(this.URL + comment.id , comment);
  }

  deleteComment(id: string): Observable<void> {
    return this.http.delete<void>(this.URL +  id);
  }
}
