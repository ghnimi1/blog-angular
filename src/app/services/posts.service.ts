import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject, tap } from 'rxjs';
import { IComment, IPost } from '../models/IPost';

@Injectable({
  providedIn: 'root',
})
export class PostsService {
  private url = 'http://localhost:8000/api';
  private token = localStorage.getItem('token');
  private config = {
    headers: { Authorization: `Bearer ${this.token}` },
  };
  constructor(private http: HttpClient) {}
  private refreshNeeded = new Subject<void>();

  get refreshNeed() {
    return this.refreshNeeded;
  }
  getAllPosts(): Observable<any> {
    return this.http.get<any>(this.url + '/posts/p');
  }

  getMyPosts(id: any): Observable<any> {
    return this.http.get<any>(this.url + '/posts/c/' + id, this.config);
  }

  createPost(post: any) {
    return this.http.post<any>(this.url + '/posts/create', post, this.config);
  }
  getPost(id: any): Observable<IPost> {
    return this.http.get<any>(this.url + '/posts/' + id, this.config);
  }
  addComment(id: any, comment: IComment): Observable<IComment[]> {
    return this.http
      .post<any>(
        this.url + '/posts/' + id + '/commentPost',
        comment,
        this.config
      )
      .pipe(
        tap(() => {
          this.refreshNeeded.next();
        })
      );
  }
  deletePost(id: any): Observable<any> {
    return this.http.delete(this.url + '/posts/' + id, this.config).pipe(
      tap(() => {
        this.refreshNeeded.next();
      })
    );
  }
}
