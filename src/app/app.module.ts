import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
// import { ManageAssetComponent } from './admin/manage-asset/manage-asset.component';
// import { ManageAssetFormDialogComponent } from './admin/manage-asset/manage-asset-form-dialog.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDialogModule } from '@angular/material/dialog';
// import { Page1Component } from './admin/manage-asset/pages/page1/page1.component';
// import { Page2Component } from './admin/manage-asset/pages/page2/page2.component';

import { AssetService } from './services/asset.service'; // Update the path
import { HttpClientModule } from '@angular/common/http';
// import { OwnersDetailsDialogComponent } from './admin/manage-asset/owners-details-dialog/owners-details-dialog.component';
// import { StatsComponent } from './admin/stats/stats.component';
// import {NavbarComponent} from './user/nav-bar/nav-bar.component'
// import { LoginComponent } from './user/login/login.component';
// import { RegistrationComponent } from './user/registration/registration.component';
// import { AdminComponent } from './admin/admin.component';
// import { ReportsAnalyticsComponent } from './admin/reports-analytics/reports-analytics.component';
// import { ManageUserComponent } from './admin/manage-user/manage-user.component';
import { AdminLoginComponent } from './admin-login/admin-login.component';
import { AppRoutingModule } from './app-routing.module';
import { AdminModule } from './admin/admin.module';
import { UserModule } from './user/user.module';
// const routes: Routes = [
//   { path: 'manage-asset', component: ManageAssetComponent },
//   { path: 'stats', component: StatsComponent },
//   { path: 'admin', component: AdminComponent },
//   {path:'reports-analytics', component:ReportsAnalyticsComponent},
//   {path:'manage-user', component:ManageUserComponent},
// {path:'admin-login', component:adminLoginComponent},
//   { path: '', redirectTo: '/manage-asset', pathMatch: 'full' },
// ];

@NgModule({
  declarations: [
    AppComponent,
    // ManageAssetComponent,
    // ManageAssetFormDialogComponent,
    // Page1Component,
    // Page2Component,
    // OwnersDetailsDialogComponent,
    // StatsComponent,
    // NavbarComponent,
    // LoginComponent,
    // RegistrationComponent,

    // ReportsAnalyticsComponent,
    // ManageUserComponent,
    AdminLoginComponent,

  ],
  imports: [
    BrowserModule,
    RouterModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,MatDialogModule,
    HttpClientModule,
    FormsModule,
    AppRoutingModule,
    AdminModule,
    UserModule


  ],
  providers: [AssetService],
  bootstrap: [AppComponent]
})
export class AppModule { }
