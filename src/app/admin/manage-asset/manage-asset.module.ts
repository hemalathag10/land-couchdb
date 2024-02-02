// src/app/manage-asset/manage-asset.module.ts

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'; // Import ReactiveFormsModule

import { ManageAssetComponent } from './manage-asset.component';
import { RouterModule } from '@angular/router';
@NgModule({
  declarations: [ManageAssetComponent,],
  imports: [CommonModule, FormsModule, ReactiveFormsModule,RouterModule
  ], // Add ReactiveFormsModule here
})
export class ManageAssetModule {}
