import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CockpitComponent } from './cockpit/cockpit.component';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { PasswordComponent } from './auth/password/password.component';

import { AuthGuard } from './auth/auth.guard.service';
import { NotAuthGuard } from './auth/not-auth.guard.service';

const routes: Routes = [
  { path: '', component: CockpitComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent, canActivate: [NotAuthGuard]},
  { path: 'register', component: RegisterComponent, canActivate: [NotAuthGuard] },
  { path: 'reset-password', component: PasswordComponent, canActivate: [NotAuthGuard] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
