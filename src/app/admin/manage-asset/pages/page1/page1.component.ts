// page1.component.ts
import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl, ValidationErrors } from '@angular/forms';

@Component({
  selector: 'app-page1',
  templateUrl: './page1.component.html',
  styleUrls: ['./page1.component.css']
})
export class Page1Component implements OnInit {
  @Input() form!: FormGroup;

  states: string[] = ['Andhra Pradesh', 'Karnataka', 'Kerala', 'Maharashtra', 'TamilNadu', 'Telangana'];

  districts: string[] = ['Ariyalur', 'Chennai', 'Madurai'];
  taluks: { [key: string]: string[] } = {
    'Ariyalur': ['none', 'Andimadam', 'Ariyalur', 'Sendurai', 'Udayarpalayam'],
    'Chennai': ['none', 'Alandur', 'Ambattur', 'Aminjikarai', 'Ayanavaram', 'Egmore', 'Guindy', 'Madhavaram', 'Maduravoyal', 'Mambalam', 'Mylapore', 'Perambur', 'Purasawalkam', 'Sholinganallur', 'Thiruvottiyur', 'Tondiarpet', 'Velachery'],
    'Madurai': ['none', 'Kalligudi', 'Madurai East', 'Madurai North', 'Madurai(South)', 'Madurai West', 'Melur', 'Peraiyur', 'Thirupparankundram', 'Tirumangalam', 'Usilampatti', 'Vadipatti'],
    // Add other districts with taluks
  };

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    if (!this.form) {
      throw new Error('Form is required for Page1Component');
    }

    // Add controls dynamically to the existing form
    this.form.addControl('landId', this.fb.control('', [Validators.required, this.positiveNumberValidator]));
    this.form.addControl('barcode', this.fb.control('', Validators.required));
    this.form.addControl('landArea', this.fb.control('', [Validators.required, this.positiveNumberValidator]));
    this.form.addControl('ward', this.fb.control('', [Validators.required, this.positiveNumberValidator]));
    this.form.addControl('state', this.fb.control('', Validators.required));
    this.form.addControl('surveyNumber', this.fb.control('', Validators.required));
    this.form.addControl('subdivisionNumber', this.fb.control('', Validators.required));
    this.form.addControl('ownership', this.fb.control('', Validators.required));
    this.form.addControl('landUseType', this.fb.control('', Validators.required));
    this.form.addControl('selectedDistrict', this.fb.control('', Validators.required));
    this.form.addControl('selectedTaluk', this.fb.control('', Validators.required));

    // Set default district and taluk
    this.form.get('selectedDistrict')?.setValue(this.districts[0]);
    this.form.get('selectedTaluk')?.setValue(this.taluks[this.districts[0]][0]);
  }

  // Handle district change event
  onDistrictChange() {
    const selectedDistrict = this.form.get('selectedDistrict')?.value;
    this.form.get('selectedTaluk')?.setValue(this.taluks[selectedDistrict][0]);
  }

  isValid(): boolean {
    return this.form.valid;
  }

  // Custom validator for positive numbers
  positiveNumberValidator(control: AbstractControl): ValidationErrors | null {
    const value = control.value;
    return isNaN(value) || value <= 0 ? { positiveNumber: false } : null;
  }
}
