import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SettingsRoutingModule } from './settings-routing.module';
import { SettingsComponent } from './settings.component';
import { NgSelectModule } from '@ng-select/ng-select';



@NgModule({
  declarations: [SettingsComponent],
  imports: [CommonModule,SettingsRoutingModule,FormsModule,ReactiveFormsModule,NgSelectModule]
})
export class SettingsModule { }
