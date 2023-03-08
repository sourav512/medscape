import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutUsComponent } from './component/about-us/about-us.component';
import { DiseaseDetailComponent } from './component/disease-detail/disease-detail.component';
import { ForgotPasswordComponent } from './component/forgot-password/forgot-password.component';
import { LoginComponent } from './component/login/login.component';
import { PageNotFoundComponent } from './component/page-not-found/page-not-found.component';
import { ResetPasswordComponent } from './component/reset-password/reset-password.component';
import { SelectSymptomComponent } from './component/select-symptom/select-symptom.component';
import { SignUpComponent } from './component/sign-up/sign-up.component';
import { UserDashboardComponent } from './component/user-dashboard/user-dashboard.component';
import { AuthenticationGuard } from './config/authentication.guard';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignUpComponent },
  { path: '', component: LoginComponent },
  { path: 'predict', component: SelectSymptomComponent,canActivate:[AuthenticationGuard] },
  { path: 'forgot', component: ForgotPasswordComponent },
  { path: 'aboutUs', component: AboutUsComponent },
  { path: 'reset/:id', component: ResetPasswordComponent },
  { path: 'disease/:id', component: DiseaseDetailComponent,canActivate:[AuthenticationGuard]  },
  { path: 'dashboard', component: UserDashboardComponent, canActivate: [AuthenticationGuard] },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
