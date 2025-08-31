import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  hide = true;
  constructor(private fb: FormBuilder, private router: Router,private authService:AuthService) {
   
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(4)]],
    });
  }
  ngOnInit(): void {
    sessionStorage.clear()
  }

  onSubmit() {
    if (this.loginForm.invalid) return;
    this.authService.login(this.loginForm.value).subscribe({
      next: (res) => {
        sessionStorage.setItem('user', JSON.stringify(res));
        this.router.navigate(['user/dashboard']);
      },
      error: (error) => {
        const errorMessage = error?.error?.message || 'Something went wrong';
        alert(errorMessage);
      }
    });
    
  }
  
}
