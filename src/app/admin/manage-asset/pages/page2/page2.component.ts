// page2.component.ts
import { Component, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators ,FormArray} from '@angular/forms';

@Component({
  selector: 'app-page2',
  templateUrl:'./page2.component.html',
  styleUrls: ['./page2.component.css']

})
export class Page2Component  {
  @Input() form: FormGroup = this.fb.group({
    ownershipDurationFrom: ['', []],
    ownershipDurationTo: ['', []],
    numOwners: ['', []],
    name: [''],
    contactInformation: [''],

      address: [''],
      purchasePrice: [''],
      dateOfTransaction: [''],
      transactionType: [''],
      landUsageHistory: [''],
      buyerSellerDetails: [''],
    owners: this.fb.array([]),
  });

  ownershipHistory: any[] = [];

  constructor(private fb: FormBuilder) {}

 
  ngOnInit() {
    // Initialize your form if needed
    this.form.addControl('ownershipDurationFrom', this.fb.control('', Validators.required));
    this.form.addControl('ownershipDurationTo', this.fb.control('', Validators.required));
    this.form.addControl('numOwners', this.fb.control('', Validators.required));

    
    
  }

  isValid(): boolean {
    return this.form.valid;
  }

  get owners() {
    return this.form.get('owners') as FormArray;
  }

  addOwners() {
    const numOwners = this.form.get('numOwners')?.value || 1;
    for (let i = 0; i < numOwners; i++) {
      this.addOwner();
    }
  }

  addOwner() {
    this.owners.push(this.fb.group({
      name:[''],
      contactInformation: [''],
      address: [''],
      purchasePrice: [''],
      dateOfTransaction: [''],
      transactionType: [''],
      landUsageHistory: [''],
      buyerSellerDetails: [''],
      // Add more form controls for other owner details here
    }));
  }

  nextPage() {
    // Handle navigation logic to the next page
  }

  submitForm() {
    // Process and store form data
    // This is where you would save the data to your backend or perform further processing

    // For demonstration purposes, assuming owners have 'name' property
    // You should modify this according to your actual data structure
      this.ownershipHistory = this.form.value.owners.map((owner: any) => {
        const ownershipFrom = new Date(this.form.value.ownershipDurationFrom);
        const ownershipTo = new Date(this.form.value.ownershipDurationTo);
        const ownershipYears = ownershipTo.getFullYear() - ownershipFrom.getFullYear();

        return {
          name: owner.name || 'Unknown Owner',
          duration: `${ownershipFrom.toLocaleDateString()} to ${ownershipTo.toLocaleDateString()} (${ownershipYears} years)`,
          // Add more details as needed
          contactInformation: owner.contactInformation || '',
          address: owner.address || '',
          purchasePrice: owner.purchasePrice || '',
          dateOfTransaction: owner.dateOfTransaction || '',
          transactionType: owner.transactionType || '',
          landUsageHistory: owner.landUsageHistory || '',
          buyerSellerDetails: owner.buyerSellerDetails || '',
        };
      });
    }
  }
