import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MymenteesComponent } from './mymentees.component';

const routes: Routes = [
  {
    path: '',
    component: MymenteesComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MymenteesRoutingModule {}
