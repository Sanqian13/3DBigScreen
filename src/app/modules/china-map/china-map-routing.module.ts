import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ChinaMapComponent } from './china-map/china-map.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'china',
    pathMatch: 'full'
  },
  {
    path: 'china',
    component: ChinaMapComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ChinaMapRoutingModule { }
