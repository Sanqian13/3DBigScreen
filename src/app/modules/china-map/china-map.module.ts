import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ChinaMapRoutingModule } from './china-map-routing.module';
import { ChinaMapComponent } from './china-map/china-map.component';


@NgModule({
  declarations: [
    ChinaMapComponent
  ],
  imports: [
    CommonModule,
    ChinaMapRoutingModule
  ]
})
export class ChinaMapModule { }
