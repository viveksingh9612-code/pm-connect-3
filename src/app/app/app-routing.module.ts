import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HeaderComponent } from './features/landing/header/header.component';
import { DemoComponent } from './features/landing/demo/demo.component';
import { AnalyticsComponent } from './features/landing/analytics/analytics.component';
import { LoginComponent } from './features/auth/login/login.component';

const routes: Routes = [
  { path: '', component: HeaderComponent },
  { path: 'demo', component: DemoComponent },
  { path: 'analytics', component: AnalyticsComponent },
  { path: 'login', component: LoginComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }