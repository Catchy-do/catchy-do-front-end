import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppointmentsRoutingModule } from './appointments-routing.module';
import { AppointmentsComponent } from './appointments.component';
import { ModalModule } from 'ngx-bootstrap/modal';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatLegacyFormField as MatFormField} from '@angular/material/legacy-form-field';


@NgModule({
  declarations: [AppointmentsComponent],
  imports: [CommonModule, AppointmentsRoutingModule, ModalModule.forRoot(),
    FormsModule, ReactiveFormsModule],
})
export class AppointmentsModule {}
