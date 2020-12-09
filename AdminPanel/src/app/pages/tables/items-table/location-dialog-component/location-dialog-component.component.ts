import { Component, Input, OnInit } from '@angular/core';
import { NbDialogRef } from '@nebular/theme';
import { Coordinate } from '../../sights-table/sight.service';

@Component({
  selector: 'ngx-location-dialog-component',
  templateUrl: './location-dialog-component.component.html',
  styleUrls: ['./location-dialog-component.component.scss']
})
export class LocationDialogComponentComponent implements OnInit {

  @Input() coordinate: Coordinate;

  marker: marker

  constructor(protected ref: NbDialogRef<LocationDialogComponentComponent>) {
  }

  ngOnInit(): void {
    this.marker = {
      lat: this.coordinate.latitude,
      lng: this.coordinate.longitude,
      label: "1",
      draggable: true
    };
  }

  cancel() {
    this.ref.close();
  }

  submit() {
    this.ref.close(this.coordinate);
  }

  // Google maps zoom level
  zoom: number = 12;

  // Initial center position for the map
  lat: number = 51.2194475;
  lng: number = 4.4024643;

  mapClicked($event) {
    this.marker.lat = $event.coords.lat;
    this.marker.lng = $event.coords.lng;
    this.coordinate.latitude = $event.coords.lat;
    this.coordinate.longitude = $event.coords.lng;
  }

  markerDragEnd(m: marker, $event) {
    m.lat = $event.coords.lat;
    m.lng = $event.coords.lng;
    this.coordinate.latitude = m.lat;
    this.coordinate.longitude = m.lng;
  }
}

interface marker {
  lat: number;
  lng: number;
  label?: string;
  draggable: boolean;
}
