// src/app/app.component.ts

import { Component } from '@angular/core';
import { ProfileComponent } from './profile/profile.component'; 
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-admin',
  templateUrl:'./admin.component.html',
  styleUrls: ['./admin.component.css']  

})
export class AdminComponent {
  constructor(private dialog: MatDialog) {}

  openProfileDialog(): void {
    this.dialog.open(ProfileComponent, {
      width: '400px',
    });
  }


}

