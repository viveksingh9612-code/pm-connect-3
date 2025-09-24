import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { LoginComponent } from "./auth/login/login.component";
import { MainComponent } from "./landing/main/main.component";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { ProfileComponent } from "./profile/profile.component";
import { BulkSignUpComponent } from "./bulk-sign-up/bulk-sign-up.component";
import { DriversComponent } from "./drivers/drivers.component";
import { UsersComponent } from "./users/users.component";
import { AdminDashboardComponent } from "./admin-dashboard/admin-dashboard.component";

const routes: Routes = [
  {
    path: '',
    component: MainComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'dashboard',
    component: DashboardComponent
  },
  {
    path: 'profile',
    component: ProfileComponent
  },

  {
    path: 'bulk-sign-up',
    component: BulkSignUpComponent
  },
  {
    path: 'drivers',
    component: DriversComponent
  },
  {
    path: 'users',
    component: UsersComponent
  },
  {
    path: 'admin-dashboard',
    component: AdminDashboardComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FeatureRoutingModule { }