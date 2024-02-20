// warning-dialog.service.ts
import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { LoginComponent } from './login.component';


@Injectable({
  providedIn: 'root'
})
export class WarningDialogService {

  constructor(private dialog: MatDialog) { }

  openLoginDialog(): void {
    this.dialog.open(LoginComponent, {
      width: '400px', // Set the width as per your requirement
    });
  }
}
