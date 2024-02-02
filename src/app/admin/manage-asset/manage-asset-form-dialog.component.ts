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
})
export class ManageAssetFormDialogComponent implements AfterViewInit {
  page1Form: FormGroup;
  page2Form: FormGroup;

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
      // Add more controls as needed
    });

    this.page2Form = this.fb.group({
      landId: ['', Validators.required],
      barcode: ['', Validators.required],
      // Add more controls as needed
    });

    // Initially, set the values of page2Form to an empty state
    this.page2Form.reset();
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
  }

  // Function to move to the next page
  nextPage() {
    // Validate the current page's form before moving to the next page
    const currentComponents = this.pageComponents[`page${this.currentPage}Components`];
    if (currentComponents && this.isPageValid(currentComponents)) {
      this.currentPage++;
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
    const formData = {
      page1: this.page1Form.value,
      page2: this.page2Form.value,
      // Add more pages as needed
    };

    // Log combined form data to the console
    console.log('All page data:', formData);

    // Assuming you want to store the data in your database using the AssetService
    this.assetService.createAsset(formData).subscribe(
      (response: any) => {
        console.log('Data stored in the database successfully:', response);
        // Optionally, you can navigate to another page or perform other actions after successful storage
      },
      (error) => {
        console.error('Error storing data in the database:', error);
        // Handle error (show error message, log, etc.)
      }
    );

    // Close the dialog
    this.dialogRef.close();
  }
}
