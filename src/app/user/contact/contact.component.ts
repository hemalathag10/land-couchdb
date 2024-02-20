import { AuthService } from 'src/app/services/auth.service';
import { NgForm } from '@angular/forms';
import { Component, ViewChild, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-contact',
  templateUrl:'./contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class contactComponent {
    successMessage: string | null = null;
    submitted: boolean = false;
    @ViewChild('feedbackForm') feedbackForm!: NgForm;
    ngAfterViewInit() {
      }
  
    formData = {
      name: '',
      email: '',
      phone: '',
      feedback: ''
    };
  
    constructor(private authService: AuthService) {}
  
    submitForm() {
      this.submitted = true;
  
      if (this.validateForm()) {
        const feedbackData = {
          name: this.formData.name,
          email: this.formData.email,
          phone: this.formData.phone,
          feedback: this.formData.feedback
        };
  
        this.authService.submitFeedback(feedbackData)
          .subscribe(
            (response) => {
              console.log('Feedback submitted successfully:', response);
              this.successMessage = 'Feedback submitted successfully';

  
              // Optionally, you can reset the form after successful submission
              this.resetForm();
            },
            (error) => {
              console.error('Error submitting feedback:', error);
            }
          );
      } else {
      }
    }
  
    validateForm(): boolean {
      // Additional validation logic can be added here
      return true;
    }
  
    resetForm() {
      this.formData = {
        name: '',
        email: '',
        phone: '',
        feedback: ''
      };
      // Reset form-related variables
      this.submitted = false;
      if (this.feedbackForm && this.feedbackForm.controls) {
        this.feedbackForm.resetForm();
        this.markControlsAsUntouched(this.feedbackForm.controls);
      }
    }
    
    markControlsAsUntouched(controls: { [key: string]: any }) {
      Object.keys(controls).forEach(key => {
        controls[key].markAsUntouched();
      });     
    
    }
}
