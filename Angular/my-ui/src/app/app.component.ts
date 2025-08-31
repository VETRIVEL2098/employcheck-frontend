import { Component ,ChangeDetectorRef } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  isLoggedIn:boolean=false
  title = 'my-ui';
    constructor(private router: Router,private cdr: ChangeDetectorRef) {          
      this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe((event: any) => {
        this.isLoggedIn = event.url.includes('login'); 
        this.cdr.detectChanges();
        console.log('Login page?', this.isLoggedIn);
      });
  }


}
