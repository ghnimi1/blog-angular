import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { IComment, IPost } from 'src/app/models/IPost';
import { IUser } from 'src/app/models/IUser';
import { AuthService } from 'src/app/services/auth.service';
import { PostsService } from 'src/app/services/posts.service';

@Component({
  selector: 'app-articledetail',
  templateUrl: './articledetail.component.html',
  styleUrls: ['./articledetail.component.css'],
})
export class ArticledetailComponent implements OnInit {
  id: any;
  post: IPost = {};
  current: IUser = {};
  user: IUser = {};
  comment: IComment = {
    comment: '',
  };

  constructor(
    private postsService: PostsService,
    private authService: AuthService,
    private activate: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.id = this.activate.snapshot.paramMap.get('id');
    this.authService.currentUser().subscribe(
      (res) => {
        this.current = res;
      },
      (err) => console.log(err)
    );
    this.getPost();
    this.postsService.refreshNeed.subscribe(() => {
      this.getPost();
    });
  }
  getUser = (id: any) => {
    this.authService.getUser(id).subscribe((res) => {
      this.user = res;
    });
  };
  getPost() {
    this.postsService.getPost(this.id).subscribe((res) => {
      this.post = res;
      this.getUser(res.createdBy);
    });
  }

  addComment = async () => {
    this.postsService.addComment(this.id, this.comment).subscribe((res) => {
      console.log('Comment added');
      this.comment.comment = '';
    });
  };
}
