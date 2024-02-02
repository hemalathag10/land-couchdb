// manage-asset.component.ts

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ManageAssetFormDialogComponent } from './manage-asset-form-dialog.component';

@Component({
  selector: 'app-manage-asset',
  templateUrl: './manage-asset.component.html',
  styleUrls: ['./manage-asset.component.css']
})
export class ManageAssetComponent implements OnInit {
  assetForm!: FormGroup;

  constructor(private dialog: MatDialog, private fb: FormBuilder) {
    this.assetForm = this.fb.group({
      // ... your form controls ...
    });
  }

  ngOnInit(): void {
    // Initialize your component, if needed
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
}
