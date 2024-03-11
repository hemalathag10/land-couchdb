// src/app/app.component.ts

import { Component } from '@angular/core';
import { ProfileComponent } from './profile/profile.component'; 
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-admin',
  templateUrl:'./admin.component.html',
  styleUrls: ['./admin.component.css']  // Ensure this line includes the correct path to your CSS file

})
export class AdminComponent {
  constructor(private dialog: MatDialog) {}

  openProfileDialog(): void {
    this.dialog.open(ProfileComponent, {
      width: '400px',
    });
  }
}

