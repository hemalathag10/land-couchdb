// // manage-asset.component.ts

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ManageAssetFormDialogComponent } from './manage-asset-form-dialog.component';
import { AssetService } from 'src/app/services/asset.service';
import { Page1Component } from './pages/page1/page1.component';
import { Page2Component } from './pages/page2/page2.component';

@Component({
  selector: 'app-manage-asset',
  templateUrl: './manage-asset.component.html',
  styleUrls: ['./manage-asset.component.css']
})
export class ManageAssetComponent implements OnInit {
   assetForm!: FormGroup;
   page1Data: any[] = [];

  constructor(private dialog: MatDialog, private fb: FormBuilder,private assetService: AssetService) {
    this.assetForm = this.fb.group({
      // ... your form controls ...
    });
  }

  ngOnInit(): void {
    // Initialize your component, if needed
    this.fetchAssets();

  }

  showAddNewForm() {
    // Open the dialog
    const dialogRef = this.dialog.open(ManageAssetFormDialogComponent, {
      width: '400px', // Adjust the width as needed
      data: { form: this.assetForm.value } // Pass form data if needed
    });

    // Handle the dialog result
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        // Form submitted, handle the data if needed
        console.log(result);
      }
    });
  }

 
  fetchAssets() {
    console.log('Fetching Assets...');
    this.assetService.getAllAssets().subscribe(
      (response: any) => {
        // Assuming 'assets' is an array inside the response
        this.page1Data = response.asset || [];
      },
      (error) => {
        console.error('Error fetching assets:', error);
      }
    );
  }
}
  
  


  // fetch_Assets() {
  //   this.assetService.getAllAssets().subscribe(
  //     (data: any) => {
  //       // Update the assignment based on your data structure
  //       this.assets = [{ page1: data.page1, page2: data.page2 }];
  //     },
  //     error => {
  //       console.error('Error fetching assets:', error);
  //     }
  //   );
  // }
//   fetchAssets() {
//     this.assetService.getAllAssets('9d33b28b729f95638256ab8722005263').subscribe(
//       (dataPage1: any) => {
//         console.log('Page 1 Data:', dataPage1);
//         this.page1Data = dataPage1.page1 || [];
//       },
//       (errorPage1) => {
//         console.error('Error fetching page 1 data:', errorPage1);
//       }
//     );
  
//     this.assetService.getAllAssets('9d33b28b729f95638256ab8722007bd9').subscribe(
//       (dataPage2: any) => {
//         console.log('Page 2 Data:', dataPage2);
//         this.page2Data = dataPage2.page2 || [];
//       },
//       (errorPage2) => {
//         console.error('Error fetching page 2 data:', errorPage2);
//       }
//     );
//   }
  
  


