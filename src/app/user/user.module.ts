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
import { aboutComponent} from './about/about.component';
import { contactComponent } from './contact/contact.component';
import { DataService } from '../services/data.service';
import { PageComponent } from './land-records/page/page.component';
import { CommonModule } from '@angular/common';
import { NgSelectModule } from '@ng-select/ng-select';
import { WarningDialogComponent } from './warning-dialog.component';


@NgModule({
  declarations: [
NavbarComponent,
LoginComponent,
RegistrationComponent,
landRecordsComponent,
aboutComponent,
contactComponent,
PageComponent,
WarningDialogComponent


  ],
  imports: [
    BrowserModule,
    RouterModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,MatDialogModule,HttpClientModule,
    FormsModule,
    UserRoutingModule,
    CommonModule,
    NgSelectModule


  ],
  providers: [AssetService,DataService],
  bootstrap: []
})
export class UserModule { }
