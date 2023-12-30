import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataTablesModule } from 'angular-datatables';
import { MenteeRoutingModule } from './mentee-routing.module';
import { MenteeComponent } from './mentee.component';

@NgModule({
  declarations: [MenteeComponent],
  imports: [CommonModule, MenteeRoutingModule, DataTablesModule],
})
export class MenteeModule {}
