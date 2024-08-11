import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MentorProfileComponent } from './mentor-profile.component';
import { AuthGuardService } from '../services/auth/auth-guard.service';

const routes: Routes = [
  {
    path: '',
    component: MentorProfileComponent, canActivate: [AuthGuardService]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MentorProfileRoutingModule {}
