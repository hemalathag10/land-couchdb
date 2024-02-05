// asset.service.ts

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';
import { map} from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class AssetService {
  private baseUrl = 'http://localhost:5984/project'; // Update with your CouchDB base URL
  private credentials = 'admin:admin'; // Update with your CouchDB credentials

  constructor(private http: HttpClient) {}

  createAsset(formData: any, documentId: string): Observable<any> {
    const url = `${this.baseUrl}/${documentId}`;
  
    // Check if the document exists
    return this.http.get(url, { headers: this.getHeaders() }).pipe(
      switchMap((existingData: any) => {
        // Get the latest _rev value
        const latestRev = existingData._rev;
  
        // Append new data to the asset array
        existingData.asset.push(formData);
  
        // Update the existing document
        return this.http.put(`${url}?rev=${latestRev}`, existingData, { headers: this.getHeaders() });
      }),
      catchError((error: any) => {
        // If the document doesn't exist, create a new one
        if (error.status === 404) {
          const newDocument = {
            asset: [formData],
          };
  
          return this.http.put(url, newDocument, { headers: this.getHeaders() });
        } else {
          throw error;
        }
      })
    );
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


  getAll_Assets(documentId: string): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Basic ' + btoa(this.credentials)
    });

    return this.http.get<any>(`${this.baseUrl}/${documentId}`, { headers }).pipe(
      map((response: any) => {
        // Ensure that the response structure matches your expectations
        return {
          page1: response.page1 || [],
          page2: response.page2 || [],
        };
      }),
      catchError((error: any) => {
        console.error('Error fetching data:', error);
        throw error;
      })
    );
  }
  getAllAssets(): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Basic ' + btoa(this.credentials)
    });

    return this.http.get<any>(`${this.baseUrl}/9d33b28b729f95638256ab8722005263`, { headers });
  }


  
  
}
