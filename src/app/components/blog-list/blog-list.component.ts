import { Component, OnInit } from '@angular/core';
import { IPost } from 'src/app/models/IPost';
import { IUser } from 'src/app/models/IUser';
import { AuthService } from 'src/app/services/auth.service';
import { PostsService } from 'src/app/services/posts.service';

@Component({
  selector: 'app-blog-list',
  templateUrl: './blog-list.component.html',
  styleUrls: ['./blog-list.component.css'],
})
export class BlogListComponent implements OnInit {
  posts: IPost[] = [];
  current: IUser = {};
  constructor(
    private postService: PostsService,
    public authService: AuthService
  ) {}

  ngOnInit(): void {
    this.authService.currentUser().subscribe((res) => (this.current = res));
    this.getAllPosts();
  }
  getAllPosts = () => {
    this.postService.getAllPosts().subscribe((res) => {
      this.posts = res.posts;
    });
  };
}
