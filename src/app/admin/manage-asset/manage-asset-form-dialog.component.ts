// manage-asset-form-dialog.component.ts
import { Component, Inject, ViewChildren, QueryList, AfterViewInit, ChangeDetectorRef } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Page1Component } from './pages/page1/page1.component';
import { Page2Component } from './pages/page2/page2.component';
import { AssetService } from 'src/app/services/asset.service';


@Component({
  selector: 'app-manage-asset-form-dialog',
  templateUrl: './manage-asset-form-dialog.component.html',
  styleUrls: ['./manage-asset-form-dialog.component.css']
})
export class ManageAssetFormDialogComponent implements AfterViewInit {
  formData: any; // Assuming formData is populated in some way


  ngOnInit() {
      // Use the updated formData in your component logic
      // Update your local formData property or perform necessary operations
  
  }
  page1Form: FormGroup;
  page2Form: FormGroup;
  assetForm!: FormGroup;
  page1Data: any[] = [];
  page1:any[]=[]

  // Array to hold form groups for each page
  pageForms: FormGroup[] = [];
  success:string='';
  // Use 'any' type for dynamic page components
  pageComponents: { [key: string]: QueryList<any> } = {};
  currentPage: number = 1;

  // ViewChildren for your page components
  @ViewChildren(Page1Component) page1Components!: QueryList<Page1Component>;
  @ViewChildren(Page2Component) page2Components!: QueryList<Page2Component>;

  constructor(
    private cdRef: ChangeDetectorRef,
    private AssetService: AssetService,
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<ManageAssetFormDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,    

    
    private assetService: AssetService // Inject AssetService
  ) {
    // Initialize your form controls for each page
    this.page1Form = this.fb.group({
      barcode: ['', Validators.required],
      landArea: ['', Validators.required],
      selectedDistrict: ['', Validators.required],
      selectedTaluk: ['', Validators.required],
      state: ['', Validators.required],
      // Add more controls as needed
    });

    this.page2Form = this.fb.group({
      ownershipDurationFrom: ['', []],
      ownershipDurationTo: ['', Validators.required],
      numOwners: ['', Validators.required],
      owners: this.fb.array([]), // Ensure this is initialized correctly
      // Add more controls as needed
    });

    // Set the values of the current page form to the data received
    this.page1Form.patchValue(data);
    this.page2Form.patchValue(data);


    
    // Push the form groups into the array
    this.pageForms.push(this.page1Form);
    this.pageForms.push(this.page2Form);

  }

  
  // Function to set page components
  setPageComponents(pageNumber: number, components: QueryList<any>) {
    // Use type assertion to tell TypeScript the type of the dynamic property
    this.pageComponents[`page${pageNumber}Components` as keyof ManageAssetFormDialogComponent] = components;
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
 

 // Inside onSubmit method in ManageAssetFormDialogComponent
onSubmit() {
  // Get the existing data from the dialog component
  const existingData = this.data;

  // Combine form data from all pages
  const formData = this.pageForms.map(form => form.value);


  // Use the updateAsset method instead of createAsset
  this.assetService.updateAsset(existingData._id, formData[0]).subscribe(
    (response: any) => {
      console.log('Data updated in the database successfully:', response);
    },
    (error) => {
      console.error('Error updating data in the database:', error);
    });

  // Close the dialog
  this.dialogRef.close();
}

onSubmitting() {
  
  const existingData = this.data;

  const page2Data = this.page2Form.value;
  console.log("page2",page2Data)
 
  if (!page2Data.ownershipDurationTo) {
    page2Data.ownershipDurationTo = 'present';
  }


  if(existingData){
console.log("exist")
 
  this.assetService.updateAsset(this.data.barcode, page2Data).subscribe(
    (response: any) => {
      console.log('Data updated in the database successfully:', response);
      this.dialogRef.close();
    },
    (error) => {
      console.error('Error updating data in the database:', error);
    }
  );
  }
  else{

    const page1=this.page1Form.value;
    page1.owners=[page2Data]
    page1.created_at = new Date();

  
 console.log('All page data:', [page1]);
    
this.assetService.createAsset([page1], 'doc_asset').subscribe(
    (response: any) => {
   console.log('Data stored in the database successfully:', response);
   this.success="Data stored successfully"
   this.dialogRef.close()
  },
      (error) => {
      console.error('Error storing data in the database:', error);
  
  this.dialogRef.close();
  });

  }
}

}