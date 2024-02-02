// page1.component.ts
import { Component, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-page1',
  template: `
    <form [formGroup]="form">
      <label for="landId">Land ID:</label>
      <input type="text" id="landId" formControlName="landId" />
      <br>
      <label for="barcode">Barcode:</label>
      <input type="text" id="barcode" formControlName="barcode" />
      <!-- Add more form fields based on your form group -->
    </form>
  `,
})
export class Page1Component {
  @Input() form: FormGroup = this.fb.group({
    landId: ['', Validators.required],
    barcode: ['', Validators.required],
    // Add more controls as needed
  });

  constructor(private fb: FormBuilder) {}

  isValid(): boolean {
    return this.form.valid;
  }

  nextPage() {
    // Handle navigation logic to the next page
  }
}