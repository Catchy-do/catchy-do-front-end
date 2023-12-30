import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { ForgotPasswordModule } from './../../forgot-password/forgot-password.module';
import { NgApexchartsModule } from 'ng-apexcharts';

@NgModule({
  declarations: [DashboardComponent],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    ForgotPasswordModule,
    NgApexchartsModule
  ],
})
export class DashboardModule {}
