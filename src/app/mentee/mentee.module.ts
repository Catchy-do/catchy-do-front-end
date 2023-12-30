import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenteeRoutingModule } from './mentee-routing.module';
import { MenteeComponent } from './mentee.component';
import { SidemenuComponent } from './sidemenu/sidemenu.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [MenteeComponent, SidemenuComponent],
  imports: [CommonModule, MenteeRoutingModule, NgbModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class MenteeModule {}
