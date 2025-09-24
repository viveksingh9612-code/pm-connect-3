import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FeatureRoutingModule } from './features-routing.module';
import { LoginComponent } from './auth/login/login.component';
import { MainComponent } from './landing/main/main.component';
import { AnalyticsComponent } from './landing/analytics/analytics.component';
import { ContactComponent } from './landing/contact/contact.component';
import { DemoComponent } from './landing/demo/demo.component';
import { DocumentComponent } from './landing/document/document.component';
import { FooterComponent } from './landing/footer/footer.component';
import { GalleryComponent } from './landing/gallery/gallery.component';
import { HeaderComponent } from './landing/header/header.component';
import { HelpComponent } from './landing/help/help.component';
import { HeroComponent } from './landing/hero/hero.component';
import { TestimonialsComponent } from './landing/testimonials/testimonials.component';
import { WorkingComponent } from './landing/working/working.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DashboardComponent } from './dashboard/dashboard.component';
import { BulkSignUpComponent } from './bulk-sign-up/bulk-sign-up.component';
import { UsersComponent } from './users/users.component';
import { DriversComponent } from './drivers/drivers.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { ProfileComponent } from './profile/profile.component';



@NgModule({
  declarations: [
    MainComponent,
    LoginComponent,
    DashboardComponent,
    BulkSignUpComponent,
    UsersComponent,
    DriversComponent,
    AdminDashboardComponent,
    ProfileComponent,

    AnalyticsComponent,
    ContactComponent,
    DemoComponent,
    DocumentComponent,
    FooterComponent,
    GalleryComponent,
    HeaderComponent,
    HelpComponent,
    HeroComponent,
    TestimonialsComponent,
    WorkingComponent
  ],
  imports: [
    CommonModule,
    FeatureRoutingModule,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class FeaturesModule { }
