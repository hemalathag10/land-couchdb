import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { ManageAssetComponent } from './admin/manage-asset/manage-asset.component';
import { ManageAssetFormDialogComponent } from './admin/manage-asset/manage-asset-form-dialog.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDialogModule } from '@angular/material/dialog';
import { Page1Component } from './admin/manage-asset/pages/page1/page1.component';
import { Page2Component } from './admin/manage-asset/pages/page2/page2.component';

import { AssetService } from './services/asset.service'; // Update the path
import { HttpClientModule } from '@angular/common/http';
import { OwnersDetailsDialogComponent } from './admin/manage-asset/owners-details-dialog/owners-details-dialog.component';
import { StatsComponent } from './admin/stats/stats.component';
import {NavbarComponent} from './user/nav-bar/nav-bar.component'
import { LoginComponent } from './user/login/login.component';
import { RegistrationComponent } from './user/registration/registration.component';
import { AdminComponent } from './admin/admin.component';
import { ReportsAnalyticsComponent } from './admin/reports-analytics/reports-analytics.component';
const routes: Routes = [
  { path: 'manage-asset', component: ManageAssetComponent },
  { path: 'stats', component: StatsComponent },
  { path: 'admin', component: AdminComponent },
{path:'reports-analytics', component:ReportsAnalyticsComponent},
  
  { path: '', redirectTo: '/manage-asset', pathMatch: 'full' },
];

@NgModule({
  declarations: [
    AppComponent,
    ManageAssetComponent,
    ManageAssetFormDialogComponent,
    Page1Component,
    Page2Component,
    OwnersDetailsDialogComponent,
    StatsComponent,
    NavbarComponent,
    LoginComponent,
    RegistrationComponent,
    AdminComponent,
    ReportsAnalyticsComponent

  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    ReactiveFormsModule,
    BrowserAnimationsModule,MatDialogModule,HttpClientModule,
    FormsModule
  ],
  providers: [AssetService],
  bootstrap: [AppComponent]
})
export class AppModule { }
