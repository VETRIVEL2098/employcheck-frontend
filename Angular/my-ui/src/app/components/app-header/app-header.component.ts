import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './app-header.component.html',
  styleUrls: ['./app-header.component.css']
})
export class AppHeaderComponent {
  user: any = null;

  constructor(private router: Router) {
    const storedUser = sessionStorage.getItem('user');
    if (storedUser) {
      this.user = JSON.parse(storedUser);
    }
  }

  ngOnInit(): void {
  }
  showUserDetails(){
    this.router.navigate(['user/user-record']);
  }
  logout() {
    sessionStorage.removeItem('user');
    this.user = null;
    this.router.navigate(['/login']);
  }
}
