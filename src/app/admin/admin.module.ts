import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ManageAssetComponent } from './manage-asset/manage-asset.component';
import { ManageAssetFormDialogComponent } from './manage-asset/manage-asset-form-dialog.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDialogModule } from '@angular/material/dialog';
import { Page1Component } from './manage-asset/pages/page1/page1.component';
import { Page2Component } from './manage-asset/pages/page2/page2.component';
import { AngularSlickgridModule } from 'angular-slickgrid';
import { AssetService } from 'src/app/services/asset.service'; 
import { HttpClientModule } from '@angular/common/http';
import { OwnersDetailsDialogComponent } from './manage-asset/owners-details-dialog/owners-details-dialog.component';
import { StatsComponent } from './stats/stats.component';
import { AdminComponent } from './admin.component';
import { ReportsAnalyticsComponent } from './reports-analytics/reports-analytics.component';
import { ManageUserComponent } from './manage-user/manage-user.component';
import { AdminRoutingModule } from './admin-routing.module';
import { AuthService } from '../services/auth.service';
import { NgSelectModule } from '@ng-select/ng-select';
import { FeedbackComponent } from './feedback/feedback.component';
import { ChartComponent } from './feedback/chart.component';
import { MatFormFieldModule } from '@angular/material/form-field'; 
import { MatInputModule } from '@angular/material/input'; 
import { ProfileComponent } from './profile/profile.component';

import { CustomInputFilter } from './stats/custom-inputFilter';
@NgModule({
  declarations: [
    ManageAssetComponent,
    ManageAssetFormDialogComponent,
    Page1Component,
    Page2Component,
    OwnersDetailsDialogComponent,
    StatsComponent,
    AdminComponent,
    ReportsAnalyticsComponent,
    ManageUserComponent,
    FeedbackComponent,
    ChartComponent,
    ProfileComponent,

  ],
  imports: [
    BrowserModule,
    RouterModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,MatDialogModule,
    FormsModule,
    AdminRoutingModule,
    HttpClientModule,
    NgSelectModule,
    MatDialogModule,
    MatFormFieldModule, 
    MatInputModule,
    AngularSlickgridModule.forRoot()

  ],
  providers: [AssetService, AuthService, CustomInputFilter,],
  bootstrap: []
})
export class AdminModule { }
