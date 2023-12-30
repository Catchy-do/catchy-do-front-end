import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MenteeComponent } from './mentee.component';

const routes: Routes = [
  {
    path: '',
    component: MenteeComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MenteeRoutingModule {}
