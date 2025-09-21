import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FeatureRoutingModule } from './features-routing.module';
import { LoginComponent } from './auth/login/login.component';



@NgModule({
  declarations: [
    LoginComponent
  ],
  imports: [
    CommonModule,
    FeatureRoutingModule
  ]
})
export class FeaturesModule { }
