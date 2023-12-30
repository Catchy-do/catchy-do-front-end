import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SearchMentorComponent } from './search-mentor.component';

const routes: Routes = [
  {
    path: '',
    component: SearchMentorComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SearchMentorRoutingModule {}
