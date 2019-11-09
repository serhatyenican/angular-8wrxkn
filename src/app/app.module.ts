import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

import {MatTableModule} from '@angular/material/table';
import { AgmCoreModule } from '@agm/core';

import { AppComponent } from './app.component';
import { ProductListComponent } from './product-list/product-list.component';
import { ProductAlertsComponent } from './product-alerts/product-alerts.component';
import { MapComponent } from './map/map.component';
import { Map3dComponent } from './map3d/map3d.component';

@NgModule({
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    MatTableModule,
    AgmCoreModule.forRoot({
      apiKey: ''
      //apiKey: 'AIzaSyDaMU9pr-yAQ49lphN9oK6fTaDrq7p8o-0'
      /* apiKey is required, unless you are a 
      premium customer, in which case you can 
      use clientId 
      */
    }),
    RouterModule.forRoot([
      { path: 'points', component: ProductListComponent },
      { path: '', component: MapComponent },
      { path: 'map3d', component: Map3dComponent },
    ])
  ],
  declarations: [
    AppComponent,
    ProductListComponent,
    ProductAlertsComponent,
    MapComponent,
    Map3dComponent
  ],
  bootstrap: [ AppComponent ],
})
export class AppModule { }


/*
Copyright Google LLC. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at http://angular.io/license
*/