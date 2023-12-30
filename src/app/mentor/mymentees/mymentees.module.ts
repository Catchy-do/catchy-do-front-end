import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MymenteesRoutingModule } from './mymentees-routing.module';
import { MymenteesComponent } from './mymentees.component';

@NgModule({
  declarations: [MymenteesComponent],
  imports: [CommonModule, MymenteesRoutingModule],
})
export class MymenteesModule {}
