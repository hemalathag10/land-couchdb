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
  successMessage: string = ''; // Initialize properties in the constructor
  errorMessage: string = '';

  constructor(private fb: FormBuilder, private http: HttpClient) {
    this.myForm = this.fb.group({
      emailId: ['', Validators.required],
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
  
      this.http.get('http://localhost:5984/demo/form', { headers })
        .subscribe(
          (existingFormData: any) => {
            const usersArray: User[] = existingFormData.user || [];
  
            // Check if the email already exists
            const emailExists = usersArray.some((user: User) => user.emailId === formData.emailId);
  
            if (emailExists) {
              this.errorMessage = 'Email already exists.';
            } else {
              usersArray.push(formData);
  
              existingFormData.user = usersArray;
  
              this.http.put('http://localhost:5984/demo/form', existingFormData, { headers })
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
  
}
