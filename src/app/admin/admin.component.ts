// src/app/app.component.ts

import { Component } from '@angular/core';
import { ProfileComponent } from './profile/profile.component'; 
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-admin',
  templateUrl:'./admin.component.html',
  styleUrls: ['./admin.component.css']  

})
export class AdminComponent {
  constructor(private dialog: MatDialog,private router: Router, public authService: AuthService,private location: Location) {}

  openProfileDialog(): void {
    this.dialog.open(ProfileComponent, {
      width: '400px',
    });
  }
  confirmLogout(): void {
    const confirmLogout = confirm("Are you sure you want to logout?");
    if (confirmLogout) {
      this.authService.logout();
      this.router.navigate(['/admin-login']);
         ;} 
      else {
      console.log("Logout canceled. Staying on the same page.");
    }
  
   
  }
  

}



