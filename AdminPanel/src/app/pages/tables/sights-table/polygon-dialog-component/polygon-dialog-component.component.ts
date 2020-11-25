import { Component, Input, OnInit } from '@angular/core';
import { NbDialogRef } from '@nebular/theme';
import { LatLngLiteral } from 'leaflet';
import { Coordinate } from '../sight.service';

@Component({
  selector: 'ngx-polygon-dialog-component',
  templateUrl: './polygon-dialog-component.component.html',
  styleUrls: ['./polygon-dialog-component.component.scss']
})
export class PolygonDialogComponentComponent implements OnInit {

  @Input() coordinates: Coordinate[];

  constructor(protected ref: NbDialogRef<PolygonDialogComponentComponent>) {
  }

  ngOnInit(): void {
    this.coordinates.forEach(coordinate => {
      this.markers.push({
        lat: coordinate.latitude,
        lng: coordinate.longitude,
        label: (this.coordinates.indexOf(coordinate) + 1).toString(),
        draggable: true
      });
    });
  }

  cancel() {
    this.ref.close();
  }

  submit() {
    this.ref.close(this.coordinates);
  }

  // Google maps zoom level
  zoom: number = 12;

  // Initial center position for the map
  lat: number = 51.2194475;
  lng: number = 4.4024643;

  clickedMarker(label: string, index: number) {
    console.log(`clicked the marker: ${label || index}`)
  }

  mapClicked($event) {
    if (this.markers.length < 4) {
      this.markers.push({
        lat: $event.coords.lat,
        lng: $event.coords.lng,
        label: (this.markers.length + 1).toString(),
        draggable: true
      });
      this.coordinates[this.markers.length - 1].latitude = $event.coords.lat
      this.coordinates[this.markers.length - 1].longitude = $event.coords.lng
    }
  }

  markerDragEnd(m: marker, $event) {
    console.log('dragEnd', m, $event);
    m.lat = $event.coords.lat,
      m.lng = $event.coords.lng,
      this.coordinates[this.markers.indexOf(m)].latitude = m.lat
    this.coordinates[this.markers.indexOf(m)].longitude = m.lng
  }

  markers: marker[] = []
}

interface marker {
  lat: number;
  lng: number;
  label?: string;
  draggable: boolean;
}
