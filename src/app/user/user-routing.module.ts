import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { aboutComponent } from './about/about.component';
import {NavbarComponent} from './nav-bar/nav-bar.component'
import { LoginComponent } from './login/login.component';
import { RegistrationComponent } from './registration/registration.component';
import { landRecordsComponent } from './land-records/land-records.component';
import { AuthGuard } from '../services/auth.guard';
import { contactComponent } from './contact/contact.component';
import { PageComponent } from './land-records/page/page.component';
import { homeComponent } from './home/home.component';
const routes: Routes = [
  { path: 'nav-bar', component: NavbarComponent },
  {path:'land-records', component:landRecordsComponent },
  {path:'registration', component:RegistrationComponent},
  {path:'login',component:LoginComponent},
  {path:'about',component:aboutComponent},
  {path:'contact',component:contactComponent},
  { path: 'page', component: PageComponent, canActivate: [AuthGuard] },
  {path:'home',component:homeComponent},




  { path: '', redirectTo: '/nav-bar', pathMatch: 'full' },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }