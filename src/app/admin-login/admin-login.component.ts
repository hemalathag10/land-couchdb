import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.css']
})
export class AdminLoginComponent {
  loginForm!: FormGroup;
  isLoginSuccess?: boolean;
  isFormSubmitted: boolean = false; // Add this flag
  successMessage: string = ''
  errorMessage: string = ''

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {
    this.loginForm = this.fb.group({
      userName: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  ngOnInit() {
    // Disable back button on the browser
    history.pushState(null, '', window.location.href);
    window.onpopstate = function () {
      history.go(1);
    };
  }

  onSubmit() {
    this.isFormSubmitted = true;
    if (this.loginForm.valid) {
      const { userName, password } = this.loginForm.value;
      this.authService.adminLogin(userName, password).subscribe(
        (isValidUser) => {
          this.isLoginSuccess = isValidUser;
          if (isValidUser) {
            console.log('Login successful');
            this.successMessage = 'Login Success';
            this.router.navigate(['./admin']);
          } else {
            this.errorMessage = 'Invalid email or password'
            console.error('Invalid email or password');
          }
        },
        (error) => {
          console.error('Login failed:', error);
        }
      );
    }
  }
}
