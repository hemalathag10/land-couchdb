import { Component, OnInit } from '@angular/core';
import { AssetService } from 'src/app/services/asset.service'; // Import the correct path

@Component({
  selector: 'app-manage-user',
  templateUrl: './manage-user.component.html',
  styleUrls: ['./manage-user.component.css'] // You can create a separate CSS file for styling
})
export class ManageUserComponent implements OnInit {
  users: any[] = [];

  constructor(private assetService: AssetService) {}

  ngOnInit(): void {
    this.fetchUsers();
  }
  

  fetchUsers(): void {
    this.assetService.getAllUsers().subscribe(
      (data: any) => {
        this.users = data.user;
      },
      (error: any) => {
        console.error('Error fetching users:', error);
      }
    );
  }
}
