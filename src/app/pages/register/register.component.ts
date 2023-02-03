import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IUser } from 'src/app/models/IUser';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  user = {
    name: '',
    email: '',
    password: '',
  };
  errMessage: string = '';
  constructor(private auth: AuthService, private router: Router) {}

  ngOnInit(): void {}

  register = () => {
    this.auth.register(this.user).subscribe(
      (res) => {
        this.router.navigate(['/login']);
      },
      (err) => {
        this.errMessage = 'Error data';
      }
    );
  };
}
