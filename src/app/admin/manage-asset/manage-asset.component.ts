// // // manage-asset.component.ts

// import { Component, OnInit } from '@angular/core';
// import { FormBuilder, FormGroup } from '@angular/forms';
// import { MatDialog } from '@angular/material/dialog';
// import { ManageAssetFormDialogComponent } from './manage-asset-form-dialog.component';
// import { AssetService } from 'src/app/services/asset.service';
// import { Page1Component } from './pages/page1/page1.component';
// import { Page2Component } from './pages/page2/page2.component';

// @Component({
//   selector: 'app-manage-asset',
//   templateUrl: './manage-asset.component.html',
//   styleUrls: ['./manage-asset.component.css']
// })
// export class ManageAssetComponent implements OnInit {
//    assetForm!: FormGroup;
//    page1Data: any[] = [];

//   constructor(private dialog: MatDialog, private fb: FormBuilder,private assetService: AssetService) {
//     this.assetForm = this.fb.group({
//       // ... your form controls ...
//     });
//   }

//   ngOnInit(): void {
//     // Initialize your component, if needed
//     this.fetchAssets();

//   }

//   showAddNewForm() {
//     // Open the dialog
//     const dialogRef = this.dialog.open(ManageAssetFormDialogComponent, {
//       width: '400px', // Adjust the width as needed
//       data: { form: this.assetForm.value } // Pass form data if needed
      
//     });

//     // Handle the dialog result
//     dialogRef.afterClosed().subscribe(result => {
//       if (result) {
//         // Form submitted, handle the data if needed
//         console.log(result);
//       }
//     });
//   }

 
//   fetchAssets() {
//     console.log('Fetching Assets...');
//     this.assetService.getAllAssets().subscribe(
//       (response: any) => {
//         // Assuming 'assets' is an array inside the response
//         this.page1Data = response.asset || [];
//       },
//       (error) => {
//         console.error('Error fetching assets:', error);
//       }
//     );
//   }
// }

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';

import { ManageAssetFormDialogComponent } from './manage-asset-form-dialog.component';
import { AssetService } from 'src/app/services/asset.service';
import { OwnersDetailsDialogComponent } from './owners-details-dialog/owners-details-dialog.component';
import { MapComponent } from './map/map.component';

@Component({
  selector: 'app-manage-asset',
  templateUrl: './manage-asset.component.html',
  styleUrls: ['./manage-asset.component.css']
})
export class ManageAssetComponent implements OnInit {
  assetForm!: FormGroup;
  page1Data: any[] = [];
  page2Form!: FormGroup; 

  
  constructor(private dialog: MatDialog, private fb: FormBuilder, private assetService: AssetService) {
    this.assetForm = this.fb.group({
      landArea: [''],
      selectedDistrict: [''],
    });
  }

  ngOnInit(): void {
   
    this.fetchAssets();
  }

  showAddNewForm(existingData?: any) {
    const dialogRef = this.dialog.open(ManageAssetFormDialogComponent, {
      width: '400px',
      data: existingData // Pass the existing data directly
    });
  
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log(result);
        // Update the data in the table or database if needed
        
        this.fetchAssets(); // Refresh data after update
      }
    });
  }
  
  
  


  fetchAssets() {
    console.log('Fetching Assets...');
    this.assetService.getAllAssets().subscribe(
      (response: any) => {
        this.page1Data = response.asset || [];
      },
      (error) => {
        console.error('Error fetching assets:', error);
      }
    );
  }


  update_Asset(landId: number) {
    // Find the corresponding asset based on the landId
    const clickedAsset = this.page1Data.find(asset => asset.some((a: any) => a.landId === landId));
  
    if (clickedAsset) {
      // Get the index of the asset array where the landId is located
      const assetIndex = clickedAsset.findIndex((a: any) => a.landId === landId);
  
      // Assuming you have the page2 data stored in page2Form.value
      const page2Data = this.assetForm.value;
  
      // Extract only the page2 data from the form value
      const ownersData = page2Data.owners;
  
      // Check if 'owners' array is present in the clickedAsset at the correct index
      if (clickedAsset[assetIndex].owners) {
        // Append new owners to the existing array
        clickedAsset[assetIndex].owners.push(...ownersData);
      } else {
        // Create 'owners' array if it doesn't exist
        clickedAsset[assetIndex].owners = [...ownersData];
      }
  
     
  
    } else {
      console.error('Clicked asset not found. Cannot update.');
    }
  }
  
  showOwnersDetailsDialog(assetArray: any[]) {
    // Open the dialog with the assetArray data
    const dialogRef = this.dialog.open(OwnersDetailsDialogComponent, {
      width: '600px',
      height:'400px',
     
      data: assetArray[0],
      
    });
  
    // You can handle the dialog result if needed
    dialogRef.afterClosed().subscribe(result => {
      console.log('Owners View dialog closed:', result);
    });
  }
  
  showMapDialog(assetArray: any[]) {
    // Open the dialog with the assetArray data
    const dialogRef = this.dialog.open(MapComponent, {
      width: '400px',
      height:'400px',
     
      data: assetArray[0],
      
    });
  
    // You can handle the dialog result if needed
    dialogRef.afterClosed().subscribe(result => {
      console.log('dialog closed:', result);
    });
  }

}
