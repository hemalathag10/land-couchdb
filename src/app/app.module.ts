import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDialogModule } from '@angular/material/dialog';

import { AssetService } from './services/asset.service'; 
import { HttpClientModule } from '@angular/common/http';

import { AdminLoginComponent } from './admin-login/admin-login.component';
import { AppRoutingModule } from './app-routing.module';
import { AdminModule } from './admin/admin.module';
import { UserModule } from './user/user.module';


@NgModule({
  declarations: [
    AppComponent,
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
