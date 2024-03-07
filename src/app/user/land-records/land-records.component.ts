import { Component } from '@angular/core';
import { AssetService } from 'src/app/services/asset.service';
import { DataService } from 'src/app/services/data.service';
import { Router } from '@angular/router'; 
import { AuthService } from 'src/app/services/auth.service';
import { MatDialog } from '@angular/material/dialog';
import { WarningDialogComponent } from '../warning-dialog.component';
import { LoginComponent } from '../login/login.component';
import { SharedService } from 'src/app/services/shared.service';
import { QrCodeScannerComponent } from 'src/app/user/land-records/qr-code-scanner.component';


@Component({
  selector: 'app-land-records',
  templateUrl: './land-records.component.html',
  styleUrls: ['./land-records.component.css']
})
export class landRecordsComponent {


  showScanCard = true;
  showScanningSection = false;
  showForm = false;
  district: string = ''; 
  taluk: string = ''; 
  surveyNumber: string = ''; 
  barcode:any;
  // Inject AssetService in the constructor
  constructor(private assetService: AssetService, private dataService:DataService,  
    private router: Router, private dialog: MatDialog, private authService:AuthService,private sharedService: SharedService) {}
 
    ngOnInit() {
      this.sharedService.showScanningSection$.subscribe(value => {
        this.showScanningSection = value;
      });
    }
  private openLoginDialog(): void {
    this.dialog.open(LoginComponent, {
      width: '400px',
    });
  }

  
  fetchData() {
    if (this.barcode) {
      // Fetch data by barcode
      this.assetService.getLandRecordByBarcode(this.barcode).subscribe(
        (data: any) => {
          this.dataService.setData(data);
          console.log('Fetched Data by Barcode:', data);
          this.router.navigate(['/page']);
        },
        (error: any) => {
          console.error('Error fetching data by Barcode:', error);
        }
      );
    } else {
      // Fetch data by taluk, district, and survey number
      this.assetService.getLandRecordByDetails(this.district, this.taluk, this.surveyNumber).subscribe(
        (data: any) => {
          this.dataService.setData(data);
          console.log('Fetched Data by Details:', data);
          this.router.navigate(['/page']);
        },
        (error: any) => {
          console.error('Error fetching data by Details:', error);
        }
      );
    }
  }


  toggleScanningSection() {
    if (this.authService.isUserLoggedIn()) {
      this.showScanningSection = !this.showScanningSection;
      this.showForm = false;
    } else {
      this.openLoginDialog();
    }
  }

  startScanning():void {
   
  }

  exploreNow() {
  }

  startScanningTab():void {
    const dialogRef = this.dialog.open(QrCodeScannerComponent, {
      width: '400px',
      data: { barcodeControl: this.barcode } // Pass the barcode form control
    });

    // Subscribe to the dialog's afterClosed event
    dialogRef.afterClosed().subscribe(() => {
      // Optionally, you can perform additional actions after the dialog is closed
      console.log('QrCodeScannerComponent dialog closed.');
      console.log('Barcode value in Page1Component:', this.barcode);

    });
  }

  submitForm() {
    // Additional logic for when the Submit button in the form is clicked
    this.showForm = false; // Ensure form is hidden when scanning section is toggled

  }
 

}
