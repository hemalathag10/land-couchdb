// shared.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SharedService {
  private showScanningSectionSubject = new BehaviorSubject<boolean>(false);
  showScanningSection$ = this.showScanningSectionSubject.asObservable();
  private userLoggedInSubject = new BehaviorSubject<boolean>(false);
  userLoggedIn$ = this.userLoggedInSubject.asObservable();

  constructor() {
    // Initialize with default values
    this.showScanningSectionSubject.next(false);
    this.userLoggedInSubject.next(false);
  }

  updateShowScanningSection(value: boolean) {
    this.showScanningSectionSubject.next(value);
  }

  updateUserLoggedInStatus(loggedIn: boolean) {
    this.userLoggedInSubject.next(loggedIn);
  }
}
