import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'http://localhost:5984/demo/form'; // replace with your CouchDB endpoint

  private headers = new HttpHeaders({
    'Authorization': 'Basic ' + btoa('admin:admin'),
    'Content-Type': 'application/json',
    // Add any other headers you need for authentication
  });

  constructor(private http: HttpClient) {}

  login(email: string, password: string): Observable<boolean> {
    return this.http.get(this.apiUrl, { headers: this.headers }).pipe(
      map((data: any) => {
        const usersArray = data.user || [];

        // Check if the provided credentials match any user in the array
        const isValidUser = usersArray.some((user: any) => user.emailId === email && user.password === password);

        return isValidUser;
      }),
      catchError((error) => {
        console.error('Error during login:', error);
        return of(false);
      })
    );
  }
}
