// map-display.component.ts
import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { SharedService } from 'src/app/services/shared.service';

@Component({
  selector: 'app-map-display',
  templateUrl: './map-display.component.html',
  styleUrls: ['./map-display.component.css']
})
export class MapDisplayComponent implements OnInit {
  pdfData: SafeResourceUrl = '';
  errorMessage: string = '';
  fetchedData: any;

  constructor(private http: HttpClient, private sharedservice: SharedService, private sanitizer: DomSanitizer) { }

  ngOnInit(): void {
    this.fetchedData = this.sharedservice.fetchedData;
    console.log("amp", this.fetchedData);
    this.retrievePdf();
  }

  retrievePdf(): void {
    const headers = new HttpHeaders({
      'Authorization': 'Basic ' + btoa('admin:admin'),
      'Content-Type': 'application/json',
    });

    this.http.get('http://localhost:5984/project/pdf', { headers })
      .subscribe(
        (existingFormData: any) => {
          const barcode = this.fetchedData[0].barcode;
          const pdfAttachment = existingFormData.attachment[barcode];

          if (pdfAttachment && pdfAttachment.data) {
            // Use DomSanitizer to mark the data URL as safe
            this.pdfData = this.sanitizer.bypassSecurityTrustResourceUrl('data:application/pdf;base64,' + pdfAttachment.data);
          } else {
            this.errorMessage = 'No PDF data found in the document.';
          }
        },
        (error: HttpErrorResponse) => {
          this.errorMessage = 'Error fetching existing data.';
          console.error('Error fetching existing data:', error);
        }
      );
  }
}
