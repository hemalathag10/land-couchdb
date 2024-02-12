import { Component, OnInit } from '@angular/core';
import { AssetService } from 'src/app/services/asset.service';


@Component({
  selector: 'app-stats',
  templateUrl: './stats.component.html',
  styleUrls: ['./stats.component.css']
})
export class StatsComponent implements OnInit {
  totalAssets: number = 0;
  totalUsers: number = 0;
  recentRegistrations: number = 0;
  newAssetsToday: number = 0;
  newUsersToday: number = 0;

  constructor(private assetService: AssetService) {}

  ngOnInit() {
    // Assuming you have a method in your AssetService to fetch all assets
    this.assetService.getAllAssets().subscribe((response: any) => {
      // Ensure that the response structure matches your expectations
      const assetsArrays: any[][] = response.asset || []; // Adjust this based on the actual structure

    console.log(assetsArrays.length);
    this.totalAssets = assetsArrays.length;


    const today = new Date().toISOString().split('T')[0];
    this.newAssetsToday = assetsArrays.filter(assetArray =>
      assetArray.some(asset =>
        asset.created_at && asset.created_at.split('T')[0] === today
      )
    ).length;
    console.log(this.newAssetsToday);

    // Calculate recent registrations (within last 7 days)
    const last7Days = new Date();
    last7Days.setDate(last7Days.getDate() - 7);
    this.recentRegistrations = assetsArrays.filter(assetArray =>
      assetArray.some(asset =>
        asset.created_at &&
        new Date(asset.created_at) > last7Days
      )
    ).length;
    console.log(this.recentRegistrations);
  
  });

  this.assetService.getAllUsers().subscribe((response: any) => {
    // Ensure that the response structure matches your expectations
    const users: any[] = response.user || []; // Adjust this based on the actual structure

  console.log(users.length);
  this.totalUsers = users.length;
  const today = new Date().toISOString().split('T')[0];


  this.newUsersToday = users.filter(user =>
    user.createdAt && user.createdAt.split('T')[0] === today
  ).length;
  
  console.log(this.newUsersToday);
 

  
});
}
}