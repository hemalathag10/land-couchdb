// warning-dialog.component.ts
import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-warning-dialog',
  template: `
    <h1>Warning</h1>
    <p>You need to be logged in to perform this action. Please log in.</p>
    <button mat-button (click)="closeDialog()">Close</button>
  `,
})
export class WarningDialogComponent {
  constructor(private dialogRef: MatDialogRef<WarningDialogComponent>) {}

  closeDialog() {
    this.dialogRef.close();
  }
}
