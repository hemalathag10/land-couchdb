import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


import {NavbarComponent} from './nav-bar/nav-bar.component'
import { LoginComponent } from './login/login.component';
import { RegistrationComponent } from './registration/registration.component';
import { LIVE_ANNOUNCER_DEFAULT_OPTIONS } from '@angular/cdk/a11y';
import { landRecordsComponent } from './land-records/land-records.component';
const routes: Routes = [
  { path: 'nav-bar', component: NavbarComponent },
{path:'land-records', component:landRecordsComponent},
{path:'registration', component:RegistrationComponent},

  { path: '', redirectTo: '/nav-bar', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }