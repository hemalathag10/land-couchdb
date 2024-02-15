import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDialogModule } from '@angular/material/dialog';

import {NavbarComponent} from './nav-bar/nav-bar.component'
import { LoginComponent } from './login/login.component';
import { RegistrationComponent } from './registration/registration.component';
import { AssetService } from '../services/asset.service'; 
import { HttpClientModule } from '@angular/common/http';
import { UserRoutingModule } from './user-routing.module';
import { landRecordsComponent } from './land-records/land-records.component';



@NgModule({
  declarations: [
NavbarComponent,
LoginComponent,
RegistrationComponent,
landRecordsComponent

  ],
  imports: [
    BrowserModule,
    RouterModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,MatDialogModule,HttpClientModule,
    FormsModule,
    UserRoutingModule


  ],
  providers: [AssetService],
  bootstrap: []
})
export class UserModule { }
