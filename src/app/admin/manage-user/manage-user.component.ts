import { Component, OnInit } from '@angular/core';
import { AssetService } from 'src/app/services/asset.service'; // Import the correct path

@Component({
  selector: 'app-manage-user',
  templateUrl: './manage-user.component.html',
  styleUrls: ['./manage-user.component.css'] // You can create a separate CSS file for styling
})
export class ManageUserComponent implements OnInit {
  users: any[] = [];
  columnDefinitions: any[] = [];
  gridOptions: any = {};
  dataset: any[] = [];
  constructor(private assetService: AssetService) {}

  ngOnInit(): void {
    this.fetchUsers();
    
  }
  

  fetchUsers(): void {
    this.assetService.getAllUsers().subscribe(
      (data: any) => {
        this.users = data.user;
        this.columnDefinitions = [
          { id: 'id', name: 'S.No', field: 'id', sortable: true, maxWidth: 80 },
    
          { id: 'email', name: 'Email', field: 'email', sortable: true, maxWidth: 200 },
          { id: 'createdAt', name: 'CreatedAt', field: 'createdAt', sortable: true,  maxWidth: 200},
          { id: 'lastLogin', name: 'LastLogin', field: 'lastLogin', sortable: true,filterable:true, maxWidth: 240},
    
        ];
        
    
        // Populate dataset dynamically
        this.dataset = this.users.map((registration, index) => ({
          id: index + 1,
          email: registration.emailId,
          createdAt: new Date(registration.createdAt).toLocaleString('en-US', { year: 'numeric', month: 'short', day: '2-digit' }),
          lastLogin: new Date(registration.lastLogin).toLocaleString('en-US', { year: 'numeric', month: 'short', day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit' })
        }));
        
       
        // Set grid options
        this.gridOptions = {
          enableAutoResize: true,
          enableCellNavigation: true,
          enableSorting: true,
          autoHeight: true, // Disable autoHeight to enable vertical scrolling
          explicitInitialization: true, // Explicit initialization is needed when using autoHeight or virtual scrolling
          showHeaderRow: true, // Show header row if needed
          headerRowHeight: 10, // Adjust header row height as needed
          rowHeight: 40, // Adjust row height as needed
          enableAsyncPostRender: true, // Enable async post render if needed
          enableVirtualRendering: true ,
          autoResize: {
            maxWidth: 700,
            maxHeight:500
          },
      }     
      },
      (error: any) => {
        console.error('Error fetching users:', error);
      }
    ); 
  
}
}