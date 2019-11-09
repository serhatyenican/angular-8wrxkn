import { Component, OnInit } from '@angular/core';
import { Activities } from '../../assets/trip';
import {MatTableModule} from '@angular/material/table';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent {
  lap = Activities.Activity.Lap;
  points = this.lap.Track.Trackpoint;
  displayedColumns: string[] = ['index', 'Time', 'Lon', 'Lat', 'Altitude', 'HeartBeat'];
  dataSource = this.points;

  share() {
    window.alert('The product has been shared!');
  }

  onNotify(txt) {
    window.alert(txt);
  }

}


/*
Copyright Google LLC. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at http://angular.io/license
*/