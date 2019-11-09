import { Component, OnInit } from '@angular/core';
import { Activities } from '../../assets/trip';

@Component({
  selector: 'app-map3d',
  templateUrl: './map3d.component.html',
  styleUrls: ['./map3d.component.css']
})
export class Map3dComponent implements OnInit {
  lap = Activities.Activity.Lap;
  points = this.lap.Track.Trackpoint
  .filter(point => point.Position)
  .map(point => {
    point.Position.LatitudeDegrees = Number(point.Position.LatitudeDegrees);
    point.Position.LongitudeDegrees = Number(point.Position.LongitudeDegrees);
    point.AltitudeMeters = Number(point.AltitudeMeters);

    return point;
  });
  middle = parseInt(this.points.length / 2);
  latitude = Number(this.points[this.middle].Position.LatitudeDegrees);
  longitude = Number(this.points[this.middle].Position.LongitudeDegrees);
  //Type : "roadmap" | "hybrid" | "satellite" | "terrain" | string
  mapType = 'satellite';
  strokeColor="red";
  polylines = [];
    colors = [
      // new WorldWind.Color(1, 0, 0, 0.75),
      // new WorldWind.Color(1, 0.25, 0, 0.75),
      // new WorldWind.Color(1, 0.5, 0, 0.75),
      // new WorldWind.Color(1, 0.75, 0, 0.75),
      // new WorldWind.Color(1, 1, 0, 0.75),
      // new WorldWind.Color(1, 1, 0, 0.75),
      // new WorldWind.Color(0.75, 1, 0, 0.75),
      // new WorldWind.Color(0.5, 1, 0, 0.75),
      // new WorldWind.Color(0.25, 1, 0, 0.75),
      // new WorldWind.Color(0, 1, 0, 0.75),
      
       new WorldWind.Color(1, 0, 0, 0.75),
       new WorldWind.Color(1, 0, 0, 0.75),
       new WorldWind.Color(1, 0, 0, 0.75),
       new WorldWind.Color(1, 0, 0, 0.75),
       new WorldWind.Color(1, 0, 0, 0.75),
       new WorldWind.Color(0, 1, 0, 0.75),
       new WorldWind.Color(0, 1, 0, 0.75),
       new WorldWind.Color(0, 1, 0, 0.75),
       new WorldWind.Color(0, 1, 0, 0.75),
       new WorldWind.Color(0, 1, 0, 0.75),
      
  ];

  constructor() { }

  ngOnInit() {


    // let lastLevel;
    // let polyline;

    // for(let index = 1; index < this.points.length; index++) {
    //   let altDiff = this.points[index].AltitudeMeters - this.points[index - 1].AltitudeMeters;
    //   let duration = (Date.parse(this.points[index].Time) - Date.parse(this.points[index-1].Time)) / 1000;
    //   let diff = altDiff / duration;

    //   let level = parseInt((diff + 10) / 2);
    //   if(level < 0) {
    //     level = 0;
    //   }
    //   if(level > 10) {
    //     level = 10;
    //   }
    //   if(lastLevel == undefined || lastLevel != level) {
    //     polyline = {
    //       level: level,
    //       points:[]
    //     };
    //     this.polylines.push(polyline);
    //     polyline.points.push(this.points[index-1]);
    //     lastLevel = level;
    //   }
    //   polyline.points.push(this.points[index]);
    // }
    var wwd = new WorldWind.WorldWindow("canvasOne");
    wwd.addLayer(new WorldWind.BMNGOneImageLayer());
    wwd.addLayer(new WorldWind.BMNGLandsatLayer());
    wwd.addLayer(new WorldWind.BingAerialLayer());
    wwd.addLayer(new WorldWind.CompassLayer());
    wwd.addLayer(new WorldWind.CoordinatesDisplayLayer(wwd));
    wwd.addLayer(new WorldWind.ViewControlsLayer(wwd));

    // var placemarkLayer = new WorldWind.RenderableLayer("Placemark");
    // wwd.addLayer(placemarkLayer);

    //this.addPlaceMark(this.points[0], placemarkLayer);


    wwd.goTo(new WorldWind.Position(this.points[this.middle].Position.LatitudeDegrees, this.points[this.middle].Position.LongitudeDegrees, 3000));

    var polylineLayer = new WorldWind.RenderableLayer();
    wwd.addLayer(polylineLayer);
    
    let lastLevel;
    let polyline;
    let path = [];

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
        if(path.length) {
          polyline = new WorldWind.Path(path, this.createPolylineAttr(this.colors[level]));
          polyline.extrude = true;
          polylineLayer.addRenderable(polyline);
        }
        path = [];
        path.push(new WorldWind.Position(this.points[index-1].Position.LatitudeDegrees, this.points[index-1].Position.LongitudeDegrees, this.points[index-1].AltitudeMeters));
        lastLevel = level;
      }
      path.push(new WorldWind.Position(this.points[index].Position.LatitudeDegrees, this.points[index].Position.LongitudeDegrees, this.points[index].AltitudeMeters));
    }
  }

  addPlaceMark(point, layer) {
    var placemarkAttributes = new WorldWind.PlacemarkAttributes(null);

placemarkAttributes.imageOffset = new WorldWind.Offset(
    WorldWind.OFFSET_FRACTION, 0.3,
    WorldWind.OFFSET_FRACTION, 0.0);

placemarkAttributes.labelAttributes.color = WorldWind.Color.YELLOW;
placemarkAttributes.labelAttributes.offset = new WorldWind.Offset(
            WorldWind.OFFSET_FRACTION, 0.5,
            WorldWind.OFFSET_FRACTION, 1.0);
            var position = new WorldWind.Position(point.Position.LatitudeDegrees, point.Position.LongitudeDegrees, point.AltitudeMeters);
var placemark = new WorldWind.Placemark(position, false, placemarkAttributes);
placemark.label = "Start";
placemark.alwaysOnTop = true;
layer.addRenderable(placemark);
  }

  createPolylineAttr(color) {
    var polylineAttributes = new WorldWind.ShapeAttributes(null);
    polylineAttributes.interiorColor = color;
    polylineAttributes.outlineColor = WorldWind.Color.BLUE;
    polylineAttributes.drawOutline = true;
    polylineAttributes.applyLighting = true;

    return polylineAttributes;
  }

}