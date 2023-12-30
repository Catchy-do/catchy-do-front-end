import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MapListRoutingModule } from './map-list-routing.module';
import { MapListComponent } from './map-list.component';
import { GoogleMapsModule } from '@angular/google-maps';
import { NgSelect2Module } from 'ng-select2';
import { CrystalLightboxModule } from '@crystalui/angular-lightbox';
import { TooltipModule } from 'ng2-tooltip-directive';

@NgModule({
  declarations: [MapListComponent],
  imports: [
    CommonModule,
    MapListRoutingModule,
    GoogleMapsModule,
    NgSelect2Module,
    CrystalLightboxModule,
    TooltipModule,
  ],
})
export class MapListModule {}
