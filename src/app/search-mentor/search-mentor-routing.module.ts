import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SearchMentorComponent } from './search-mentor.component';
import { AuthGuardService } from '../services/auth/auth-guard.service';

const routes: Routes = [
  {
    path: '',
    component: SearchMentorComponent, canActivate: [AuthGuardService]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SearchMentorRoutingModule {}
