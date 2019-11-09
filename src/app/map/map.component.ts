import { Component, OnInit } from '@angular/core';
import { Activities } from '../../assets/trip';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {
  lap = Activities.Activity.Lap;
  points = this.lap.Track.Trackpoint
  .filter(point => point.Position)
  .map(point => {
    point.Position.LatitudeDegrees = Number(point.Position.LatitudeDegrees);
    point.Position.LongitudeDegrees = Number(point.Position.LongitudeDegrees);

    return point;
  });
  middle = parseInt(this.points.length / 2);
  latitude = Number(this.points[this.middle].Position.LatitudeDegrees);
  longitude = Number(this.points[this.middle].Position.LongitudeDegrees);
  //Type : "roadmap" | "hybrid" | "satellite" | "terrain" | string
  mapType = 'satellite';
  strokeColor="red";
  polylines = [];
  // colors = [
  //   "#ff0000",
  //   "#ff3e00",
  //   "#ff7600",
  //   "#ffae00",
  //   //"#ffe600",
  //   //"#00EAFF",
  //   "#A3A7A7",
  //   "#A3A7A7",
  //   "#007AFF",
  //   "#0039FF",
  //   "#0002C7",
  //   "#00015E"
  // ];

    colors = [
    "#900C3F",//-9,-10
    "#C70039",//-7,-8
    "#FF5733",//-5,-6
    "#FFC300",//-3,-4
    "#DAF7A6",//-1,-2
    "#9e9e9e",//"#e0f2f1",//0,1
    "#a7ffeb",//2,3
    "#81c784",//4,5
    "#1b5e20",//"#4caf50",//6,7
    "#1b5e20"//8,9
  ];

  constructor() { }

  ngOnInit() {
    let lastLevel;
    let polyline;

    for(let index = 1; index < this.points.length; index++) {
      let altDiff = this.points[index].AltitudeMeters - this.points[index - 1].AltitudeMeters;
      let duration = (Date.parse(this.points[index].Time) - Date.parse(this.points[index-1].Time)) / 1000;
      let diff = altDiff / duration;

      let level = parseInt((diff + 10) / 2);
      if(level < 0) {
        level = 0;
      }
      if(level > 10) {
        level = 10;
      }
      if(lastLevel == undefined || lastLevel != level) {
        polyline = {
          level: level,
          points:[]
        };
        this.polylines.push(polyline);
        polyline.points.push(this.points[index-1]);
        lastLevel = level;
      }
      polyline.points.push(this.points[index]);
    }
  }

}