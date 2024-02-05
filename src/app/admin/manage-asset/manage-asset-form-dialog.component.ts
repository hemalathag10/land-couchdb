// manage-asset-form-dialog.component.ts
import { Component, Inject, ViewChildren, QueryList, AfterViewInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Page1Component } from './pages/page1/page1.component';
import { Page2Component } from './pages/page2/page2.component';
import { AssetService } from 'src/app/services/asset.service'; // Update the path based on your actual folder structure

@Component({
  selector: 'app-manage-asset-form-dialog',
  templateUrl: './manage-asset-form-dialog.component.html',
  styleUrls: ['./manage-asset-form-dialog.component.css']

})
export class ManageAssetFormDialogComponent implements AfterViewInit {
  page1Form: FormGroup;
  page2Form: FormGroup;

  // Array to hold form groups for each page
  pageForms: FormGroup[] = [];

  // Use 'any' type for dynamic page components
  pageComponents: { [key: string]: QueryList<any> } = {};

  // Track the current page number
  currentPage: number = 1;

  // ViewChildren for your page components
  @ViewChildren(Page1Component) page1Components!: QueryList<Page1Component>;
  @ViewChildren(Page2Component) page2Components!: QueryList<Page2Component>;

  // Injecting FormBuilder, MatDialogRef, MAT_DIALOG_DATA, and AssetService
  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<ManageAssetFormDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private assetService: AssetService // Inject AssetService
  ) {
    // Initialize your form controls for each page
    this.page1Form = this.fb.group({
      landId: ['', Validators.required],
      barcode: ['', Validators.required],
      landArea: ['', Validators.required],
    selectedDistrict: ['', Validators.required],
    selectedTaluk: ['', Validators.required],
    state: ['', Validators.required],
   
      // Add more controls as needed
    });

    this.page2Form = this.fb.group({
      landId: ['', Validators.required],
      barcode: ['', Validators.required],
      // Add more controls as needed
    });

    // Set the values of the current page form to the data received
    this.page1Form.patchValue(data);

    // Push the form groups into the array
    this.pageForms.push(this.page1Form);
    this.pageForms.push(this.page2Form);
  }

  // Function to set page components
  setPageComponents(pageNumber: number, components: QueryList<any>) {
    const propertyName = `page${pageNumber}Components`;
    // Use type assertion to tell TypeScript the type of the dynamic property
    this.pageComponents[propertyName as keyof ManageAssetFormDialogComponent] = components;
  }

  ngAfterViewInit() {
    // After the view is initialized, set the page components
    this.setPageComponents(1, this.page1Components);
    this.setPageComponents(2, this.page2Components);
    // Set page components for other pages as needed

    // Set the values of the current page form to the data received after view initialization
    this.pageForms[this.currentPage - 1].patchValue(this.data);
  }

  // Function to move to the next page
  nextPage() {
    // Validate the current page's form before moving to the next page
    const currentForm = this.pageForms[this.currentPage - 1];
  
    if (currentForm.valid) {
      this.currentPage++;
    } else {
      // Handle invalid form (show error message, mark invalid fields, etc.)
      console.log('Current page form is not valid.');
    }
  }
  

  // Function to move to the previous page
  previousPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
    }
  }

  // Function to check if the current page is valid
  isPageValid(components: QueryList<any>): boolean {
    return components && components.length > 0 && components.toArray().every(component => component.isValid());
  }

  // Function to handle form submission
  onSubmit() {
    // Combine form data from all pages
    // Combine form data from all pages
        const formData = this.pageForms.map(form => form.value);

    // Log combined form data to the console
    console.log('All page data:', formData);
  
    // Assuming you want to store the data in your database using the AssetService
    this.assetService.createAsset(formData, '9d33b28b729f95638256ab8722005263').subscribe(
      (response: any) => {
        console.log('Data stored in the database successfully:', response);
        // Optionally, you can navigate to another page or perform other actions after successful storage
      },
      (error) => {
        console.error('Error storing data in the database:', error);
        // Handle error (show error message, log, etc.)
      });

    // Close the dialog
    this.dialogRef.close();
  }
}
