// navbar.component.ts
import { Component } from '@angular/core';
import { DialogService } from 'src/app/services/dialog.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavbarComponent {
  constructor(private dialogService: DialogService) {}

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
