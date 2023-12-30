import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataTablesModule } from 'angular-datatables';
import { MentorRoutingModule } from './mentor-routing.module';
import { MentorComponent } from './mentor.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [MentorComponent],
  imports: [CommonModule, MentorRoutingModule, DataTablesModule,FormsModule],
})
export class MentorModule {}
