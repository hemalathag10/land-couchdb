// import { Injectable } from '@angular/core';
// import { HttpClient, HttpHeaders } from '@angular/common/http';
// import { Observable, of } from 'rxjs';
// import { catchError, map, switchMap } from 'rxjs/operators';
// import { throwError } from 'rxjs';
// import { BehaviorSubject,  } from 'rxjs';

// @Injectable({
//   providedIn: 'root',
// })
// export class AuthService {
//   private isAuthenticatedSubject!: BehaviorSubject<boolean>;
//   public isAuthenticated$!: Observable<boolean>;

//   private apiUrl = 'http://localhost:5984/project'; // replace with your CouchDB endpoint

//   private headers = new HttpHeaders({
//     'Authorization': 'Basic ' + btoa('admin:admin'),
//     'Content-Type': 'application/json',
//     // Add any other headers you need for authentication
//   });

//   constructor(private http: HttpClient) {}

//   // ...

//   login(emailId: string, password: string): Observable<any> {
//     const url = `${this.apiUrl}/form`; // Assuming 'form' is the documentId for user data

//     return this.http.get(url, { headers: this.headers }).pipe(
//       switchMap((userData: any) => {
//         // Find the correct user within the 'user' array
//         const user = userData.user.find((u: any) => u.emailId === emailId && u.password === password);

//         if (user) {
//           // Update the last login timestamp
//           user.lastLogin = new Date().toISOString();
// console.log(userData)
//           // Update the existing user document
//           return this.http.put(url, userData, { headers: this.headers }).pipe(
//             switchMap(() => {
//               // You can return additional user data or any response needed for the login operation
//               return of({ success: true, user });
//             })
//           );
//         } else {
//           // User not found or invalid credentials
//           return throwError('Invalid credentials');
//         }
//       }),
//       catchError((error: any) => {
//         console.error('Error during login:', error);
//         throw error;
//       })
//     );
//   }


//   adminLogin(emailId: string, password: string): Observable<any> {
//     const url = `${this.apiUrl}/admin`; // Assuming 'form' is the documentId for user data

//     return this.http.get(url, { headers: this.headers }).pipe(
//       switchMap((userData: any) => {
//         // Find the correct user within the 'user' array
//         const user = userData.user.find((u: any) => u.emailId === emailId && u.password === password);

//         if (user) {
//           // Update the last login timestamp
//           user.lastLogin = new Date().toISOString();
// console.log(userData)
//           // Update the existing user document
//           return this.http.put(url, userData, { headers: this.headers }).pipe(
//             switchMap(() => {
//               // You can return additional user data or any response needed for the login operation
//               return of({ success: true, user });
//             })
//           );
//         } else {
//           // User not found or invalid credentials
//           return throwError('Invalid credentials');
//         }
//       }),
//       catchError((error: any) => {
//         console.error('Error during login:', error);
//         throw error;
//       })
//     );
//   }
// }


import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of, throwError, BehaviorSubject } from 'rxjs';
import { catchError, switchMap, map } from 'rxjs/operators';
import * as CryptoJS from 'crypto-js';


@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private isAuthenticatedSubject: BehaviorSubject<boolean>;
  public isAuthenticated$: Observable<boolean>;
  private isLoggedIn: boolean = false;

  private apiUrl = 'http://localhost:5984/project'; 
  private baseUrl = 'http://localhost:5984/project/form'; 


  private headers = new HttpHeaders({
    'Authorization': 'Basic ' + btoa('admin:admin'),
    'Content-Type': 'application/json',
    // Add any other headers you need for authentication
  });

  constructor(private http: HttpClient) {
    this.isAuthenticatedSubject = new BehaviorSubject<boolean>(false);
    this.isAuthenticated$ = this.isAuthenticatedSubject.asObservable();
  }

  // Update the authentication state
 

  isAuthenticated(): Observable<boolean> {

    return this.isAuthenticated$;
  }

  // login(emailId: string, password: string): Observable<any> {
  //   const url = `${this.apiUrl}/form`;
    

  //   return this.http.get(url, { headers: this.headers }).pipe(
  //     switchMap((userData: any) => {
  //       const user = userData.user.find((u: any) => u.emailId === emailId );
  //         console.log(user)

  //       if (user) {
          
          
  //         user.lastLogin = new Date().toISOString();

  //         return this.http.put(url, userData, { headers: this.headers }).pipe(
  //           switchMap(() => {
  //             return of({ success: true, user });
  //           })
  //         );
  //       } else {
  //         return throwError('Invalid credentials');
  //       }
  //     }),
  //     catchError((error: any) => {
  //       console.error('Error during login:', error);
  //       throw error;
  //     })
  //   );
  // }


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

          return this.http.put(url, userData, { headers: this.headers }).pipe(
            switchMap(() => {
              return of({ success: true, adminUser });
            })
          );
        } else {
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
    // You can perform any additional cleanup or server-side logout logic here
    // For simplicity, we'll just update the authentication state to false
    this.isLoggedIn = false;
    return this.isLoggedIn
  }

  submitFeedback(feedbackData: any): Observable<any> {
    const url = `${this.apiUrl}/feedback`; // Adjust the URL based on your CouchDB setup
    console.log("feed",feedbackData)

    return this.http.get(url, { headers: this.headers }).pipe(
      switchMap((feedbackDoc: any) => {
        // Assuming 'messages' is the array inside the 'feedback' document
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
}
