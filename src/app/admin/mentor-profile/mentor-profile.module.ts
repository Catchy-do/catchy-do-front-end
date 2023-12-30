import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MentorProfileComponent } from './mentor-profile.component';
import { MentorProfileRoutingModule } from './mentor-profile-routing.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [MentorProfileComponent],
  imports: [CommonModule, MentorProfileRoutingModule, NgbModule],
})
export class MentorProfileModule {}
