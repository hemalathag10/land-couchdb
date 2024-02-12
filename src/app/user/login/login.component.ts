import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm: FormGroup;
  isLoginSuccess?: boolean;
  isFormSubmitted: boolean = false; // Add this flag


  constructor(private fb: FormBuilder, private authService: AuthService) {
    this.loginForm = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  onSubmit() {
    this.isFormSubmitted = true;
    if (this.loginForm.valid) {
      const { email, password } = this.loginForm.value;
      this.authService.login(email, password).subscribe(
        (isValidUser) => {
          this.isLoginSuccess = isValidUser;
          if (isValidUser) {
            console.log('Login successful');
            // Redirect or display a success message
          } else {
            console.error('Invalid email or password');
            // Display an error message to the user
          }
        },
        (error) => {
          console.error('Login failed:', error);
          // Display an error message to the user
        }
      );
    }
  }
}