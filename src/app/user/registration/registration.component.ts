import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient, HttpHeaders ,HttpErrorResponse} from '@angular/common/http';


interface User {
  emailId: string;
  password: string;
  createdAt: Date;
}

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']

})
export class RegistrationComponent {
  myForm: FormGroup;
  successMessage: string = ''; 
  errorMessage: string = '';
  errorPasswordMessage: string = '';


  constructor(private fb: FormBuilder, private http: HttpClient) {
    this.myForm = this.fb.group({
      emailId: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }
 
  onSubmit() {
    this.successMessage = '';
    this.errorMessage = '';
  
    if (this.myForm.valid) {
      const formData = this.myForm.value as User;
  
      formData.createdAt = new Date();
  
      const headers = new HttpHeaders({
        'Authorization': 'Basic ' + btoa('admin:admin'),
        'Content-Type': 'application/json',
      });
  
      this.http.get('http://localhost:5984/project/form', { headers })
        .subscribe(
          (existingFormData: any) => {
            const usersArray: User[] = existingFormData.user || [];
  
            // Check if the email already exists
            const emailExists = usersArray.some((user: User) => user.emailId === formData.emailId);
  
            if (emailExists) {
            } else {
              usersArray.push(formData);
  
              existingFormData.user = usersArray;
  
              this.http.put('http://localhost:5984/project/form', existingFormData, { headers })
                .subscribe(
                  response => {
                    this.successMessage = 'successfully registered';
                    console.log('Data stored successfully:', response);
                  },
                  (error: HttpErrorResponse) => {
                    this.errorMessage = 'Error storing data.';
                    console.error('Error storing data:', error);
                  }
                );
            }
          },
          (error: HttpErrorResponse) => {
            this.errorMessage = 'Error fetching existing data.';
            console.error('Error fetching existing data:', error);
          }
        );
    }
  }
  
  checkEmailExists() {
    const emailInput = this.myForm.get('emailId');

    if (emailInput && emailInput.valid) { // Check if emailInput is not null
      const formData = { emailId: emailInput.value } as User;

      const headers = new HttpHeaders({
        'Authorization': 'Basic ' + btoa('admin:admin'),
        'Content-Type': 'application/json',
      });

      this.http.get('http://localhost:5984/project/form', { headers })
        .subscribe(
          (existingFormData: any) => {
            const usersArray: User[] = existingFormData.user || [];
            const emailExists = usersArray.some((user: User) => user.emailId === formData.emailId);

            if (emailExists) {
              this.errorMessage = 'Email already exists.';
              if (emailInput) {
                emailInput.setErrors({ 'emailExists': true });
              }
            } else {
              this.errorMessage = '';
              if (emailInput) {
                emailInput.setErrors(null);
              }
            }
          },
          (error: HttpErrorResponse) => {
            this.errorMessage = 'Error fetching existing data.';
            console.error('Error fetching existing data:', error);
          }
        );
    }
  }

  checkPasswordValidity() {
    const passwordInput = this.myForm.get('password');
  
    if (passwordInput && passwordInput.value) {
      const password = passwordInput.value;
      const hasNumber = /\d/.test(password);
      const hasCapitalLetter = /[A-Z]/.test(password);
      const hasSmallLetter = /[a-z]/.test(password);
      const hasSpecialCharacter = /[!@#$%^&*(),.?":{}|<>]/.test(password);
      const isValid = hasNumber && hasCapitalLetter && hasSmallLetter && hasSpecialCharacter && password.length >= 8;
  
      if (!isValid) {
        this.errorPasswordMessage = 'Password must contain at least 8 characters including one number, one capital letter, one small letter, and one special character.';
        if (passwordInput) {
          passwordInput.setErrors({ 'passwordInvalid': true });
        }
      } else {
        if (passwordInput) {
          passwordInput.setErrors(null);
        }
      }
    }
  }
  
}
