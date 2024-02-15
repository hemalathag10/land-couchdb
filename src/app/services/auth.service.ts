import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'http://localhost:5984/project'; // replace with your CouchDB endpoint

  private headers = new HttpHeaders({
    'Authorization': 'Basic ' + btoa('admin:admin'),
    'Content-Type': 'application/json',
    // Add any other headers you need for authentication
  });

  constructor(private http: HttpClient) {}

  // ...

  login(emailId: string, password: string): Observable<any> {
    const url = `${this.apiUrl}/form`; // Assuming 'form' is the documentId for user data

    return this.http.get(url, { headers: this.headers }).pipe(
      switchMap((userData: any) => {
        // Find the correct user within the 'user' array
        const user = userData.user.find((u: any) => u.emailId === emailId && u.password === password);

        if (user) {
          // Update the last login timestamp
          user.lastLogin = new Date().toISOString();
console.log(userData)
          // Update the existing user document
          return this.http.put(url, userData, { headers: this.headers }).pipe(
            switchMap(() => {
              // You can return additional user data or any response needed for the login operation
              return of({ success: true, user });
            })
          );
        } else {
          // User not found or invalid credentials
          return throwError('Invalid credentials');
        }
      }),
      catchError((error: any) => {
        console.error('Error during login:', error);
        throw error;
      })
    );
  }


  adminLogin(emailId: string, password: string): Observable<any> {
    const url = `${this.apiUrl}/admin`; // Assuming 'form' is the documentId for user data

    return this.http.get(url, { headers: this.headers }).pipe(
      switchMap((userData: any) => {
        // Find the correct user within the 'user' array
        const user = userData.user.find((u: any) => u.emailId === emailId && u.password === password);

        if (user) {
          // Update the last login timestamp
          user.lastLogin = new Date().toISOString();
console.log(userData)
          // Update the existing user document
          return this.http.put(url, userData, { headers: this.headers }).pipe(
            switchMap(() => {
              // You can return additional user data or any response needed for the login operation
              return of({ success: true, user });
            })
          );
        } else {
          // User not found or invalid credentials
          return throwError('Invalid credentials');
        }
      }),
      catchError((error: any) => {
        console.error('Error during login:', error);
        throw error;
      })
    );
  }
}
