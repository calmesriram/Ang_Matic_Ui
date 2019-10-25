import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { AuthGuard } from './auth.guard';
import { Auth2Guard } from './auth2.guard';
import { PagenotfoundComponent } from './pagenotfound/pagenotfound.component';
import { MenucontentComponent } from './menucontent/menucontent.component';
import { DashboardComponent } from './dashboard/dashboard.component';


const routes: Routes = [
  {
    path:'login',
    component:LoginComponent,
     canActivate:[Auth2Guard]    
  },
  {
    path:'signup',
    component:SignupComponent,
    canActivate:[Auth2Guard]
  },
  {
    path:'createnode',
    component:MenucontentComponent,
    canActivate:[AuthGuard]
  },
  {
    path:'dashboard',
    component:DashboardComponent,
    canActivate:[AuthGuard]
  },
  {
     path: '',
     redirectTo: '/login',
     pathMatch: 'full'
  },
  {
    path:'**',
    component:PagenotfoundComponent
  },
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
