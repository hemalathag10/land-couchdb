import { Component } from '@angular/core';
import { AssetService } from 'src/app/services/asset.service';
import { DataService } from 'src/app/services/data.service';
import { Router } from '@angular/router'; 
import { AuthService } from 'src/app/services/auth.service';
import { MatDialog } from '@angular/material/dialog';
import { WarningDialogComponent } from '../warning-dialog.component';


@Component({
  selector: 'app-land-records',
  templateUrl: './land-records.component.html',
  styleUrls: ['./land-records.component.css']
})
export class landRecordsComponent {


  showScanCard = true;
  showScanningSection = false;
  showForm = false;
  district: string = ''; // Declare district property
  taluk: string = ''; // Declare taluk property
  surveyNumber: string = ''; // Declare surveyNumber property

  // Inject AssetService in the constructor
  constructor(private assetService: AssetService, private dataService:DataService,  private router: Router, private dialog: MatDialog, private authService:AuthService) {}

  // Add the method to fetch data based on entered values
  private openWarningDialog(): void {
    this.dialog.open(WarningDialogComponent, {
      width: '400px',
    });
  }
  fetchData() {
    // Replace this with your actual API call or data retrieval logic
    this.assetService.getLandRecordByDetails(this.district, this.taluk, this.surveyNumber).subscribe(
      (data: any) => {
        // Handle the fetched data, e.g., display it or navigate to another component
        this.dataService.setData(data);

        console.log('Fetched Data:', data);
        this.router.navigate(['/page']);

        // TODO: Display the data or navigate to another component with the data
      },
      (error: any) => {
        console.error('Error fetching data:', error);
        // TODO: Handle the error, e.g., display a message like "Not Found"
      }
    );
  }
  


  // toggleScanningSection() {
  //   this.showScanningSection = !this.showScanningSection;
  //   this.showForm = false; // Ensure form is hidden when scanning section is toggled
  // }

  toggleScanningSection() {
    if (this.authService.isUserLoggedIn()) {
      this.showScanningSection = !this.showScanningSection;
      this.showForm = false;
    } else {
      // Redirect to the login page if the user is not logged in
      this.openWarningDialog();
    }
  }

  startScanning() {
  }

  exploreNow() {
    // Additional logic for when the Explore Now button is clicked
  }

  startScanningTab() {
    // Additional logic for when the Start Scanning button in the tab is clicked
  }

  submitForm() {
    // Additional logic for when the Submit button in the form is clicked
    this.showForm = false; // Ensure form is hidden when scanning section is toggled

  }
}
