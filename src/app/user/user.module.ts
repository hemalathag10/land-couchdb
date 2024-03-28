import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';


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
import { homeComponent } from './home/home.component';
import { MapDisplayComponent } from './land-records/map-display/map-display.component';
import { SharedService } from '../services/shared.service';
import { LandPriceComponent } from './land-records/land-price/land-price.component';


@NgModule({
  declarations: [
NavbarComponent,
LoginComponent,
RegistrationComponent,
landRecordsComponent,
aboutComponent,
contactComponent,
PageComponent,
WarningDialogComponent,
homeComponent,
MapDisplayComponent,
LandPriceComponent


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
  providers: [AssetService,DataService,SharedService],
  bootstrap: []
})
export class UserModule { }
