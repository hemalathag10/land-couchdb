// asset.service.ts

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';
import { map, } from 'rxjs/operators';


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
  searchAssetByLandId(documentId: string, landId: number): Observable<any> {
    const url = `${this.baseUrl}/doc_asset`;
    return this.http.get(url,{ headers: this.getHeaders() });
  }
  


  updateAsset(Id: string, formData: any): Observable<any> {
  const url = `${this.baseUrl}/doc_asset`;

  return this.http.get(url, { headers: this.getHeaders() }).pipe(
    switchMap((existingData: any) => {
      // Find the correct landId within both outer and inner arrays
     const indexToUpdate = existingData.asset
  .findIndex((outerArray: any[]) => outerArray.some((obj: any) => obj.landId === Id));

console.log('formData:', formData.ownershipDurationFrom);
console.log('existingData.asset:', existingData.asset);
console.log('indexToUpdate:', indexToUpdate);

if (indexToUpdate !== -1) {
  // Navigate to the outermost owners array of the clicked asset
  const ownersArray = existingData.asset[indexToUpdate][0]?.owners;

  console.log('ownersArray:', ownersArray);

  if (ownersArray) {
    // Append formData to the existing data inside the outermost owners array
    let previousOwners=ownersArray[ownersArray.length-1]
    console.log("pre",previousOwners)
    if (previousOwners.ownershipDurationTo==="present")
    {
      const ownershipFromDate = new Date(formData.ownershipDurationFrom);
      
      // Subtract one day from ownershipFromDate
      ownershipFromDate.setDate(ownershipFromDate.getDate() - 1);

      previousOwners.ownershipDurationTo = ownershipFromDate.toISOString().split('T')[0];

    }
    console.log("after",previousOwners)

    ownersArray.push(formData);
    console.log('Updated ownersArray:', ownersArray);
  } else {
    console.error('Owners array is undefined or null');
  }
} else {
  console.error('Index not found for landId:', Id);
}


      // Update the existing document
      return this.http.put(url, existingData, { headers: this.getHeaders() });
    }),
    catchError((error: any) => {
      console.error('Error updating data:', error);
      throw error;
    })
  );
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
console.log(headers)
    return this.http.get<any>(`${this.baseUrl}/doc_asset`, { headers });
  }

  getFeedback(): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Basic ' + btoa(this.credentials)
    });
console.log(headers)
    return this.http.get<any>(`${this.baseUrl}/feedback`, { headers });
  }


  getAllUsers(): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Basic ' + btoa(this.credentials)
    });
console.log("user",headers)
    return this.http.get<any>(`${this.baseUrl}/form`, { headers });
  }

  getLandRecordByDetails(district: string, taluk: string, surveyNumber: string): Observable<any> {
    // Replace this with your actual API call or data retrieval logic
    const url = `${this.baseUrl}/doc_asset`;
    // Include headers in the request
    const headers = this.getHeaders();

    return this.http.get(url, { headers }).pipe(
      map((response: any) => {
        // Search for the specific index in the 'asset' array
        const index = response.asset.findIndex((outerArray: any[]) =>
          outerArray.some((obj: any) =>
            obj.selectedDistrict == district &&
            obj.selectedTaluk == taluk &&
            obj.surveyNumber == surveyNumber
          )
        );
        if (index !== -1) {
          // If the index is found, return the data at that index
          return response.asset[index];
        } else {
          // If not found, return an appropriate message or handle accordingly
          return { error: 'Data not found for the specified details.' };
        }
      }),
      catchError((error: any) => {
        console.error('Error fetching data:', error);
        throw error;
      })
    );
}

  
}
