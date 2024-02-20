// navbar.component.ts
import { Component } from '@angular/core';
import { DialogService } from 'src/app/services/dialog.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavbarComponent {
  constructor(private dialogService: DialogService, public authService: AuthService) {}
  logout(): void {
    this.authService.logout();
  }
  openRegistrationDialog() {
    this.dialogService.openRegistrationDialog().subscribe(result => {
      // Handle the result if needed
    });
  }

  openLoginDialog() {
    this.dialogService.openLoginDialog().subscribe(result => {
      // Handle the result if needed
    });
  }
}
