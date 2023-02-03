import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  id: string = '';
  constructor(public auth: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.auth.currentUser().subscribe((res) => (this.id = res._id));
  }

  logout() {
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }
}
