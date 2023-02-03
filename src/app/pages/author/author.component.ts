import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IPost } from 'src/app/models/IPost';
import { IUser } from 'src/app/models/IUser';
import { AuthService } from 'src/app/services/auth.service';
import { PostsService } from 'src/app/services/posts.service';

@Component({
  selector: 'app-author',
  templateUrl: './author.component.html',
  styleUrls: ['./author.component.css'],
})
export class AuthorComponent implements OnInit {
  current: IUser = {};
  id: any = '';
  posts: IPost[] = [];
  count: number = 0;
  constructor(
    private authService: AuthService,
    private postsService: PostsService,
    private activateroute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.id = this.activateroute.snapshot.paramMap.get('id');
    this.authService.currentUser().subscribe((res) => (this.current = res));
    this.getMyPosts();
    this.postsService.refreshNeed.subscribe(() => {
      this.getMyPosts();
    });
  }

  getMyPosts = () => {
    this.postsService.getMyPosts(this.id).subscribe((res) => {
      this.posts = res.posts;
      this.count = res.count;
    });
  };
  deletePost = (id: any) => {
    this.postsService.deletePost(id).subscribe((res) => {
      console.log('Post deleted');
    });
  };
}
