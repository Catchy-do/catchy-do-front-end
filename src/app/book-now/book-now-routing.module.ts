import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BookNowComponent } from './book-now.component';

const routes: Routes = [
  {
    path: '',
    component: BookNowComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BookNowRoutingModule {}
