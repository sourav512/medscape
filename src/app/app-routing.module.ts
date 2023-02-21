import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ForgotPasswordComponent } from './component/forgot-password/forgot-password.component';
import { LoginComponent } from './component/login/login.component';
import { PageNotFoundComponent } from './component/page-not-found/page-not-found.component';
import { ResetPasswordComponent } from './component/reset-password/reset-password.component';
import { SelectSymptomComponent } from './component/select-symptom/select-symptom.component';
import { SignUpComponent } from './component/sign-up/sign-up.component';
import { AuthenticationGuard } from './config/authentication.guard';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignUpComponent },
  { path: '', component: LoginComponent },
  { path: 'predict', component: SelectSymptomComponent,canActivate:[AuthenticationGuard] },
  { path: 'forgot', component: ForgotPasswordComponent },
  { path: 'reset/:id', component: ResetPasswordComponent },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
