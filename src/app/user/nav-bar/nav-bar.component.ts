import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { DialogService } from 'src/app/services/dialog.service';
import { Location } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavbarComponent {
  showResponsiveNav: boolean = false;

  navItems = [
    { label: 'Home', link: '/home' },
    { label: 'About Us', link: '/about' },
    { label: 'Contact', link: '/contact' },
    { label: 'Land Records', link: '/land-records' },
    // Add more menu items as needed
  ];

  constructor(private location: Location, public authService: AuthService,
              private dialogService: DialogService, private router: Router) {}

  logout(): void {
    history.scrollRestoration = 'manual'; 
    history.pushState(null, '');

    window.onpopstate = () => {
      history.pushState(null, ''); 
      this.showErrorModal(`You can't make changes or go back at this time.`);
    };

    this.authService.logout();
    this.location.replaceState('/'); // Reset the browser history
  }

  openRegistrationDialog() {
    this.dialogService.openRegistrationDialog().subscribe(result => {});
  }

  openLoginDialog() {
    this.dialogService.openLoginDialog().subscribe(result => {});
  }

  showErrorModal(message: string): void {
    console.error(message);
  }


  toggleResponsiveNav() {
    this.showResponsiveNav = !this.showResponsiveNav;
    console.log('Responsive Nav Toggled:', this.showResponsiveNav);
  }
  
}
