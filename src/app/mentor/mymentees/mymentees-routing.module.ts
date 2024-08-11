import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MymenteesComponent } from './mymentees.component';
import { AuthGuardService } from 'src/app/services/auth/auth-guard.service';

const routes: Routes = [
  {
    path: '',
    component: MymenteesComponent, canActivate: [AuthGuardService]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MymenteesRoutingModule {}
