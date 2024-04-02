// login.component.ts
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { FormGroup,FormBuilder,Validators} from '@angular/forms';

@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.css']
})
export class AdminLoginComponent {
    loginForm!: FormGroup;
  isLoginSuccess?: boolean;
  isFormSubmitted: boolean = false; // Add this flag
  successMessage : string=''
  errorMessage:string=''

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {
    this.loginForm = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  onSubmit() {
    this.isFormSubmitted = true;
    if (this.loginForm.valid) {
      const { email, password } = this.loginForm.value;
      this.authService.adminLogin(email, password).subscribe(
        (isValidUser) => {
          this.isLoginSuccess = isValidUser;
          if (isValidUser) {
            console.log('Login successful');
            this.successMessage='Login Success';
            this.router.navigate(['./admin']);

          } else {
            this.errorMessage='Invalid email or password'
            console.error('Invalid email or password');
            alert("invalid user or password")
          }
        },
        (error) => {
          console.error('Login failed:', error);
        }
      );
    }
  }
}
