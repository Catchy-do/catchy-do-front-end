import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MentorProfileRoutingModule } from './mentor-profile-routing.module';
import { MentorProfileComponent } from './mentor-profile.component';

@NgModule({
  declarations: [MentorProfileComponent],
  imports: [CommonModule, MentorProfileRoutingModule],
})
export class MentorProfileModule {}
