import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PrivacyPolicyComponent } from './privacy-policy.component';
import { AuthGuardService } from '../services/auth/auth-guard.service';

const routes: Routes = [
  {
    path: '',
    component: PrivacyPolicyComponent, canActivate: [AuthGuardService]
  }
]

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(routes)
  ]
})
export class PrivacyPolicyRoutingModule { }
