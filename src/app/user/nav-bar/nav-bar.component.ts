// navbar.component.ts
import { Component, OnInit, OnDestroy } from '@angular/core';
import { fromEvent, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';import { DialogService } from 'src/app/services/dialog.service';
import { AuthService } from 'src/app/services/auth.service';
import { landRecordsComponent } from '../land-records/land-records.component';
import { SharedService } from 'src/app/services/shared.service';
import { Location } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavbarComponent {
  
    private unsubscriber: Subject<void> = new Subject<void>();

    constructor(private location: Location, public authService: AuthService,
      private dialogService: DialogService,private sharedService: SharedService,
      private router:Router) {}
  

    ngOnInit(): void {
      
    }
  
    ngOnDestroy(): void {
      this.unsubscriber.next();
      this.unsubscriber.complete();
    }
  
    logout(): void {
      history.scrollRestoration = 'manual'; 
      history.pushState(null, '');
  
      fromEvent(window, 'popstate').pipe(
        takeUntil(this.unsubscriber)
      ).subscribe((_) => {
        history.pushState(null, ''); 
        this.showErrorModal(`You can't make changes or go back at this time.`);
      });
      this.authService.logout();
      this.location.replaceState('/'); // Reset the browser history
    }
  
    private showErrorModal(message: string): void {
      console.error(message);
    }
  openRegistrationDialog() {
    this.dialogService.openRegistrationDialog().subscribe(result => {
    });
  }

  openLoginDialog() {
    this.dialogService.openLoginDialog().subscribe(result => {
    });
  }
  showLandRecordsDropdown: boolean = false;


  toggleLandRecordsDropdown() {
    this.showLandRecordsDropdown = !this.showLandRecordsDropdown;
  }
 
}
