
import { Component, Inject, ViewChildren, QueryList, AfterViewInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';

import { AssetService } from 'src/app/services/asset.service';
import { ChangeDetectorRef } from '@angular/core';

import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent  {
    constructor(private http: HttpClient, private sanitizer: DomSanitizer,
        @Inject(MAT_DIALOG_DATA) public data: any,
        private dialogRef: MatDialogRef<MapComponent>
      ) { }
    openMap(): void {
        const latitude = 37.7749;
        const longitude = -122.4194;
        const zoomLevel = 14;
    
        const googleMapsUrl = `https://www.google.com/maps/d/u/0/`;
        window.open(googleMapsUrl, '_blank');
      }

      selectedPdfFile: File | null = null;
      successMessage: string = '';
      errorMessage: string = '';
      pdfData: string | null = null; // Variable to store the PDF data URL
    
    
      onFileSelected(event: any): void {
        this.selectedPdfFile = event.target.files[0];
        console.log("file", this.selectedPdfFile);
      }
    
      sanitizePdfData(): SafeResourceUrl {
        return this.sanitizer.bypassSecurityTrustResourceUrl(this.pdfData || '');
      }
      private truncatePdfData(pdfData: string, maxLength: number): string {
        if (pdfData.length > maxLength) {
          console.warn('PDF data has been truncated to fit into the database.');
          return pdfData.substring(0, maxLength);
        }
        return pdfData;
      }
      uploadPdf(): void {
        if (!this.selectedPdfFile) {
          this.errorMessage = 'Please select a PDF file.';
          return;
        }
    
        const reader = new FileReader();
    
        reader.onload = (event: any) => {
            const pdfData: string = event.target.result.split(',')[1]; // Get the base64-encoded data
            this.pdfData = 'data:application/pdf;base64,' + this.truncatePdfData(pdfData, 6); // Set a maximum length
      console.log("pdf",this.pdfData)
          const headers = new HttpHeaders({
            'Authorization': 'Basic ' + btoa('admin:admin'),
            'Content-Type': 'application/json',
          });
    
          this.http.get('http://localhost:5984/project/pdf', { headers })
            .subscribe(
              (existingFormData: any) => {
                const emailExists = "hh";
                const id=this.data.barcode
                console.log(id)

                if (emailExists) {
                  const updatedFormData = { ...existingFormData };
                  updatedFormData.attachment = updatedFormData.attachment || {};
                    // Check if the attachment with the given id already exists
        if (updatedFormData.attachment[id]) {
            // Append the new data to the existing attachment
            updatedFormData.attachment[id] = {
              content_type: 'application/pdf',
              data: pdfData,
            };
          } else {
            // Create a new attachment with the given id
            updatedFormData.attachment[id] = {
              content_type: 'application/pdf',
              data: pdfData,
            };
          }
    
                  this.http.put('http://localhost:5984/project/pdf', updatedFormData, { headers })
                    .subscribe(
                      (response: any) => {
                        this.successMessage = 'Successfully registered';
                        console.log('Data stored successfully:', response);
                      },
                      (error: HttpErrorResponse) => {
                        this.errorMessage = 'Error storing data.';
                        console.error('Error storing data:', error);
                      }
                    );
                }
              },
              (error: HttpErrorResponse) => {
                this.errorMessage = 'Error fetching existing data.';
                console.error('Error fetching existing data:', error);
              }
            );
        };
    
        reader.readAsDataURL(this.selectedPdfFile);
      }
    
      retrievePdf(): void {
        const headers = new HttpHeaders({
          'Authorization': 'Basic ' + btoa('admin:admin'),
          'Content-Type': 'application/json',
        });
    
        this.http.get('http://localhost:5984/project/pdf', { headers })
          .subscribe(
            (existingFormData: any) => {
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

      closeDialog(): void {
        this.dialogRef.close();
      }
}