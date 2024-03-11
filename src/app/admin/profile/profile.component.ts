import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { AuthService } from 'src/app/services/auth.service';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent {
  constructor(public dialogRef: MatDialogRef<ProfileComponent>, private authService:AuthService) {}
  email:string=""
  name:string=""
  role:string=""
  ngOnInit() {
    // Subscribe to changes in the shared service
    this.authService.profile().subscribe(
      (data: any) => {
        this.email=data.response.user[0].emailId
        this.name=data.response.user[0].name
        this.role=data.response.user[0].role
        console.log("data",data.response.user[0].emailId)
      }
    );
  }
  }
