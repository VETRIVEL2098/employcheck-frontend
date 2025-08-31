import { Injectable } from '@angular/core';
import { CanActivate, CanLoad, Route, UrlSegment, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanLoad {

  constructor(private router: Router) {}

  private isLoggedIn(): boolean {
    const user = sessionStorage.getItem('user');
    return !!user;
  }

  canActivate(): boolean {
    if (this.isLoggedIn()) return true;
    this.router.navigate(['/login']);
    return false;
  }

  canLoad(route: Route, segments: UrlSegment[]): boolean {
    if (this.isLoggedIn()) return true;
    this.router.navigate(['/login']);
    return false;
  }
}
