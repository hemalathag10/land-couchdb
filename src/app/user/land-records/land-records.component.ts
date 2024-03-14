import { Component, Input, OnInit } from '@angular/core';
import { AssetService } from 'src/app/services/asset.service';
import { DataService } from 'src/app/services/data.service';
import { Router } from '@angular/router'; 
import { AuthService } from 'src/app/services/auth.service';
import { MatDialog } from '@angular/material/dialog';
import { WarningDialogComponent } from '../warning-dialog.component';
import { LoginComponent } from '../login/login.component';
import { SharedService } from 'src/app/services/shared.service';
import { QrCodeScannerComponent } from 'src/app/user/land-records/qr-code-scanner.component';
import { FormBuilder, FormGroup, Validators, AbstractControl, ValidationErrors } from '@angular/forms';


@Component({
  selector: 'app-land-records',
  templateUrl: './land-records.component.html',
  styleUrls: ['./land-records.component.css']
})
export class landRecordsComponent {
  form!: FormGroup;

  showScanCard = true;
  showScanningSection = false;
  showForm = false;
  district: string = ''; 
  taluk: string = ''; 
  surveyNumber: string = ''; 
  barcode:any;
  districts: string[] = ['Ariyalur', 'Chennai', 'Madurai'];
  taluks: { [key: string]: string[] } = {
    'Ariyalur': ['none', 'Andimadam', 'Ariyalur', 'Sendurai', 'Udayarpalayam'],
    'Chennai': ['none', 'Alandur', 'Ambattur', 'Aminjikarai', 'Ayanavaram', 'Egmore', 'Guindy', 'Madhavaram', 'Maduravoyal', 'Mambalam', 'Mylapore', 'Perambur', 'Purasawalkam', 'Sholinganallur', 'Thiruvottiyur', 'Tondiarpet', 'Velachery'],
    'Madurai': ['none', 'Kalligudi', 'Madurai East', 'Madurai North', 'Madurai(South)', 'Madurai West', 'Melur', 'Peraiyur', 'Thirupparankundram', 'Tirumangalam', 'Usilampatti', 'Vadipatti'],
    // Add other districts with taluks
  };  constructor(private fb: FormBuilder,private assetService: AssetService, private dataService:DataService,  
    private router: Router, private dialog: MatDialog, private authService:AuthService,private sharedService: SharedService) {}
 
    
    ngOnInit() {
      this.sharedService.showScanningSection$.subscribe(value => {
        this.showScanningSection = value;
      });

      this.form = this.fb.group({
        district: [''], // Add appropriate default values if needed
        taluk: [''],
        surveyNumber: [''],
        selectedDistrict: [''], // Initialize selectedDistrict and selectedTaluk
        selectedTaluk: ['']
        // Add more form controls if needed
      });
  
      // Set default district and taluk
      this.form.get('selectedDistrict')?.setValue(this.districts[0]);
      this.form.get('selectedTaluk')?.setValue(this.taluks[this.districts[0]][0]);
    }

    onDistrictChange() {
      const selectedDistrict = this.form.get('selectedDistrict')?.value;
      console.log(selectedDistrict)
      const selected=this.form.get('selectedTaluk')?.setValue(this.taluks[selectedDistrict][0]);
      console.log("taluk",selected)
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
      data: { onScanSuccess: this.onScanSuccess.bind(this) }     });

    // Subscribe to the dialog's afterClosed event
    dialogRef.afterClosed().subscribe(() => {
      // Optionally, you can perform additional actions after the dialog is closed
      console.log('QrCodeScannerComponent dialog closed.');
      console.log('Barcode value in Page1Component:', this.barcode);

    });
  }
  onScanSuccess(decodedText: string): void {
    this.barcode = decodedText;
    console.log('Barcode value in landRecordsComponent:', this.barcode);
    this.fetchData()
  }
  

  submitForm() {
    // Additional logic for when the Submit button in the form is clicked
    this.showForm = false; // Ensure form is hidden when scanning section is toggled

  }
 

}
