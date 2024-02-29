import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import {NavbarComponent} from './user/nav-bar/nav-bar.component'
import { AdminLoginComponent} from './admin-login/admin-login.component';
import { AdminComponent } from './admin/admin.component';
const routes: Routes = [
  { path:'admin-login', component: AdminLoginComponent },
  { path:'admin', component: AdminComponent },
  {path:'nav-bar', component:NavbarComponent}, 

  { path: '', redirectTo: '/admin', pathMatch: 'full' },
  ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }