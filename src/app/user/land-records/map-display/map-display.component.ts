// map-display.component.ts
import { Component, Inject, InjectionToken, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
export const FETCHED_DATA_TOKEN = new InjectionToken<any>('FETCHED_DATA');

@Component({
  selector: 'app-map-display',
  templateUrl: './map-display.component.html',
  styleUrls: ['./map-display.component.css']
})
export class MapDisplayComponent implements OnInit {
  pdfData: string = '';
  errorMessage: string = '';
  fetchedData: any;

  constructor(private http: HttpClient, @Inject(FETCHED_DATA_TOKEN) private injectedData: any) { }

  ngOnInit(): void {
    this.fetchedData = this.injectedData;
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
            console.log("barcode",this.fetchedData.barcode)
          const pdfAttachment = existingFormData.attachment?.user1;

          if (pdfAttachment && pdfAttachment.data) {
            this.pdfData = 'data:application/pdf;base64,' + pdfAttachment.data;
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
