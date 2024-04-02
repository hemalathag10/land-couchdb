
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of, throwError, BehaviorSubject } from 'rxjs';
import { catchError, switchMap, map } from 'rxjs/operators';
import * as CryptoJS from 'crypto-js';


@Injectable({
  providedIn: 'root',
})
export class AuthService {
 
  private isLoggedIn: boolean = false;
  private isAdminLoggedIn: boolean = false;


  private apiUrl = 'http://localhost:5984/project'; 
  private baseUrl = 'http://localhost:5984/project/form'; 


  private headers = new HttpHeaders({
    'Authorization': 'Basic ' + btoa('admin:admin'),
    'Content-Type': 'application/json',
  });

  constructor(private http: HttpClient) {
   
  }


  login(emailId: string, password: string): Observable<any> {
    const url = `${this.apiUrl}/form`;
  
    return this.http.get(url, { headers: this.headers }).pipe(
      switchMap((userData: any) => {
        if (!userData || !userData.user) {
          return throwError('Invalid user data');
        }
  
        const user = userData.user.find((u: any) => u.emailId === emailId);
  
        if (!user) {
          return throwError('User not found');
        }
  
        try {
          console.log("pass",user.password)
          const decryptedPassword = CryptoJS.AES.decrypt(user.password, 'secret key').toString(CryptoJS.enc.Utf8);
  
          console.log('Decrypted password:', decryptedPassword);

          if (decryptedPassword === password) {
            user.lastLogin = new Date().toISOString();
            this.isLoggedIn = true;

            return this.http.put(url, userData, { headers: this.headers }).pipe(
              switchMap(() => {

                return of({ success: true, user });
              })
            );
          } else {
            return throwError('Password mismatch');
          }
        } catch (error) {
          console.error('Error during password decryption:', error);
          return throwError('Decryption error');
        }
      }),
      catchError((error: any) => {
        console.error('Error during login:', error);
        return throwError('Login failed: ' + error.message);
      })
    );
  }
  
  isUserLoggedIn(): boolean {
    return this.isLoggedIn;
  }

  adminLogin(emailId: string, password: string): Observable<any> {
    const url = `${this.apiUrl}/admin`;

    return this.http.get(url, { headers: this.headers }).pipe(
      switchMap((userData: any) => {
        const adminUser = userData.user.find((u: any) => u.emailId === emailId && u.password === password);

        if (adminUser) {
          adminUser.lastLogin = new Date().toISOString();
          this.isAdminLoggedIn = true;

          return this.http.put(url, userData, { headers: this.headers }).pipe(
            switchMap(() => {
              return of({ success: true, adminUser });
            })
          );
        } else {
          alert("invalid user or password")

          return throwError('Invalid credentials');
        }
      }),
      catchError((error: any) => {
        console.error('Error during admin login:', error);
        throw error;
      })
    );
  }

  

  logout():boolean {

    this.isLoggedIn = false;
    return this.isLoggedIn
  }

  adminLogout():boolean {

    this.isAdminLoggedIn = false;
    return this.isAdminLoggedIn
  }

  submitFeedback(feedbackData: any): Observable<any> {
    const url = `${this.apiUrl}/feedback`; 
    console.log("feed",feedbackData)

    return this.http.get(url, { headers: this.headers }).pipe(
      switchMap((feedbackDoc: any) => {
        feedbackDoc.messages.push(feedbackData);

        return this.http.put(url, feedbackDoc, { headers: this.headers }).pipe(
          switchMap(() => {
            return of({ success: true });
          })
        );
      }),
      catchError((error: any) => {
        console.error('Error submitting feedback:', error);
        throw error;
      })
    );
  }

  profile(): Observable<any> {
    const url = `${this.apiUrl}/admin`;

    return this.http.get(url, { headers: this.headers }).pipe(
      map((response: any) => {
        console.log("profile",response)
        return {
          response
        };
      }),
      catchError((error: any) => {
        console.error('Error fetching data:', error);
        throw error;
      })
    );
  }

}
