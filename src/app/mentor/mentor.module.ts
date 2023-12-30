import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MentorRoutingModule } from './mentor-routing.module';
import { MentorComponent } from './mentor.component';
import { SidemenuComponent } from './sidemenu/sidemenu.component';
import { ModalModule } from 'ngx-bootstrap/modal';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [MentorComponent, SidemenuComponent],
  imports: [CommonModule, MentorRoutingModule, ModalModule.forRoot(),],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class MentorModule {}
