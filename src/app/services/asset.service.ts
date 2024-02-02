// asset.service.ts

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AssetService {
  private baseUrl = 'http://localhost:5984/demo'; // Update with your CouchDB base URL
  private credentials = 'admin:admin'; // Update with your CouchDB credentials

  constructor(private http: HttpClient) {}

  createAsset(formData: any): Observable<any> {
    const documentId = '9035e801ccc4c09637eae436f4000e93'; // Update with the actual document ID
    const url = `${this.baseUrl}/${documentId}`;

    // Check if the document exists
    return this.http.get(url, { headers: this.getHeaders() }).pipe(
      switchMap((existingData: any) => {
        // Get the latest _rev value
        const latestRev = existingData._rev;

        // Append new data to existing arrays
        existingData.page1.push(formData.page1);
        existingData.page2.push(formData.page2);

        // Update the existing document
        return this.http.put(`${url}?rev=${latestRev}`, existingData, { headers: this.getHeaders() });
      }),
      catchError((error: any) => {
        // If the document doesn't exist, create a new one
        if (error.status === 404) {
          const newDocument = {
            page1: [formData.page1],
            page2: [formData.page2],
            // Add other fields as needed
          };

          return this.http.put(url, newDocument, { headers: this.getHeaders() });
        } else {
          throw error;
        }
      })
    );
  }

  getAllAssets(): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Basic ' + btoa('admin:admin')
    });

    return this.http.get<any>(`${this.baseUrl}/9035e801ccc4c09637eae436f4000e93`, { headers });
  }

  updateAsset(updatedData: any): Observable<any> {
    const url = `${this.baseUrl}/${updatedData._id}?rev=${updatedData._rev}`; // Include _id and _rev in the URL
    return this.http.put(url, updatedData, { headers: this.getHeaders() });
  }

  private getHeaders(): HttpHeaders {
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Basic ' + btoa(this.credentials)
    });
  }
}
