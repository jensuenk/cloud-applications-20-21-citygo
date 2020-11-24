import { Component, Input } from '@angular/core';
import { NbDialogRef } from '@nebular/theme';
import { Coordinate } from '../sight.service';

@Component({
  selector: 'ngx-polygon-dialog-component',
  templateUrl: './polygon-dialog-component.component.html',
  styleUrls: ['./polygon-dialog-component.component.scss']
})
export class PolygonDialogComponentComponent {

  @Input() coordinates: Coordinate[];

  constructor(protected ref: NbDialogRef<PolygonDialogComponentComponent>) {}

  cancel() {
    this.ref.close();
  }

  submit(coordinates) {
    this.ref.close(coordinates);
  }
}
