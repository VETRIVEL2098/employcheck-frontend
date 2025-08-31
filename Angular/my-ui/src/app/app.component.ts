import { Component, ChangeDetectorRef, OnInit } from '@angular/core';
import { Router, NavigationEnd, Event as RouterEvent } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  showHeader = false;

  constructor(private router: Router, private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.updateHeaderVisibility(this.router.url);

    this.router.events
      .pipe(filter((event: RouterEvent): event is NavigationEnd => event instanceof NavigationEnd))
      .subscribe((event: RouterEvent) => {
        const url = (event as NavigationEnd).urlAfterRedirects || (event as NavigationEnd).url;
        this.updateHeaderVisibility(url);
        this.cdr.detectChanges();
      });
  }

  updateHeaderVisibility(url: string) {
    const userExists = !!sessionStorage.getItem('user');
    const isLoginRoute = url === '/' || url.includes('/login');
    this.showHeader = userExists && !isLoginRoute;
    console.log('URL:', url, 'Show header:', this.showHeader);
  }
}
