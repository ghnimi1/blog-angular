import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { IPost } from 'src/app/models/IPost';
import { PostsService } from 'src/app/services/posts.service';

@Component({
  selector: 'app-createarticle',
  templateUrl: './createarticle.component.html',
  styleUrls: ['./createarticle.component.css'],
})
export class CreatearticleComponent implements OnInit {
  post: IPost = {
    content: '',
  };
  photo: string = '';
  select(e: any) {
    this.photo = e.target.files[0];
  }
  constructor(private postsService: PostsService, private router: Router) {}
  config: AngularEditorConfig = {
    editable: true,
    spellcheck: true,
    height: '15rem',
    minHeight: '5rem',
    placeholder: 'Enter text here...',
    translate: 'no',
    defaultParagraphSeparator: 'p',
    defaultFontName: 'Arial',
    toolbarHiddenButtons: [['bold']],
    customClasses: [
      {
        name: 'quote',
        class: 'quote',
      },
      {
        name: 'redText',
        class: 'redText',
      },
      {
        name: 'titleText',
        class: 'titleText',
        tag: 'h1',
      },
    ],
  };
  ngOnInit(): void {}
  createPost = () => {
    let formData = new FormData();
    formData.append('content', this.post.content);
    formData.append('photo', this.photo);
    this.postsService.createPost(formData).subscribe(
      (res) => {
        this.router.navigate(['/home']);
      },
      (err) => {
        console.log(err);
      }
    );
  };
}
