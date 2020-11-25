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

  // google maps zoom level
  zoom: number = 12;

  // initial center position for the map
  lat: number = 51.2194475;
  lng: number = 4.4024643;

  clickedMarker(label: string, index: number) {
    console.log(`clicked the marker: ${label || index}`)
  }

  mapClicked($event) {
    this.marker.lat = $event.coords.lat;
    this.marker.lng = $event.coords.lng;
    this.coordinate.latitude = $event.coords.lat;
    this.coordinate.longitude = $event.coords.lng;
  }

  markerDragEnd(m: marker, $event) {
    console.log('dragEnd', m, $event);
    m.lat = $event.coords.lat,
      m.lng = $event.coords.lng,
      this.coordinate.latitude = m.lat
    this.coordinate.longitude = m.lng
  }

  marker: marker
}

interface marker {
  lat: number;
  lng: number;
  label?: string;
  draggable: boolean;
}
