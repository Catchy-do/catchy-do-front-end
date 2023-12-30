import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RegisterRoutingModule } from './register-routing.module';
import { RegisterComponent } from './register.component';
import { HorizondalFormRoutingModule } from '../admin/ui-interface/forms/horizondal-form/horizondal-form-routing.module';
import { NgSelect2Module } from 'ng-select2';
import { MatIconModule } from '@angular/material/icon';
import { NgSelectModule } from '@ng-select/ng-select';

@NgModule({
  declarations: [RegisterComponent],
  imports: [CommonModule, FormsModule, RegisterRoutingModule,ReactiveFormsModule,MatIconModule,
    HorizondalFormRoutingModule,
    NgSelect2Module, NgSelectModule], 
})
export class RegisterModule {}
