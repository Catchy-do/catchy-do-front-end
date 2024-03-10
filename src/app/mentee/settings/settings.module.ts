import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SettingsRoutingModule } from './settings-routing.module';
import { SettingsComponent } from './settings.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgbAlertModule, NgbDatepickerModule, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { JsonPipe } from '@angular/common';
import { ToastrModule } from 'ngx-toastr';


@NgModule({
  declarations: [SettingsComponent],
  imports: [CommonModule, SettingsRoutingModule, FormsModule, ReactiveFormsModule, NgSelectModule,
    NgbDatepickerModule, NgbAlertModule, FormsModule, JsonPipe, ToastrModule.forRoot(),]

})
export class SettingsModule { }
