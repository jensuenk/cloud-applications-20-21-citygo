import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { NbDialogModule, NbDialogService } from '@nebular/theme';
import { PolygonDialogComponentComponent } from './polygon-dialog-component/polygon-dialog-component.component';
import { Coordinate, Sight, SightService } from './sight.service';

@Component({
  selector: 'ngx-sights-table',
  templateUrl: './sights-table.component.html',
  styleUrls: ['./sights-table.component.scss']
})

export class SightsTableComponent implements OnInit {
  errorMessage: string
  successfulSave: boolean;
  successMessage: string;
  errors: string[];

  sights: Sight[] = [];
  sight: Sight

  filterSightId: string = "";
  filterName: string = "";
  filterLocation: string = "";
  filterSort: string = "";
  filterPage: string = "";
  filterLength: string = "";
  filterDir: string = "";

  constructor(private dialogService: NbDialogService, private svc: SightService) { }

  ngOnInit() {
    this.getSights();
    this.errorMessage = "";
    this.successMessage = "";
    this.errors = [];
  }

  coordinates: Coordinate[] = [];

  openPolygonDialog(sight: Sight) {
    console.log(sight.coordinates)
    this.dialogService.open(PolygonDialogComponentComponent, {
      context: {
        coordinates: sight.coordinates,
      },
    }).onClose.subscribe(res => {
      if (res != null) {
        sight.coordinates = res;
        console.log(sight.coordinates)
      }
    })
  }

  getSights(urlArgs: string = "") {
    this.svc.getSights(urlArgs).subscribe(
      result => {
        this.errors = [];
        console.log(result.sights)
        this.sights = result.sights
        return true;
      },
      error => {
        console.error("Error while retreiving sights!");
        this.showError(error.message)
      }
    );
  }

  getSight(id: number) {
    this.svc.getSightById(id).subscribe(
      result => {
        this.errors = [];
        this.sight = result
        return true;
      },
      error => {
        console.error("Error while retreiving sight!");
        this.showError(error.message)
      }
    );
  }

  createSight(name, info, monument, stop, polygon, challenge) {
    let challengeId = challenge.challengeId
    challenge = null
    let newSight: Sight = {
      sightId: 0,
      name: name,
      info: info,
      monument: monument,
      stop: stop,
      coordinates: polygon,
      challenges: challenge
    }
    this.svc.createSight(newSight).subscribe(
      data => {
        this.errors = [];
        console.log(newSight)
        // refresh the list
        this.getSights();
        this.showSuccess("Successfully created a new sight!")
        this.successfulSave = true
        return true;
      }, error => {
        this.errors = [];
        console.error("Error creating sight!");
        this.successfulSave = false
        if (error.status === 400) {
          console.log(error)
          const validationErrors = error.error;
          Object.keys(validationErrors).forEach(prop => {
            console.log(validationErrors[prop])
            this.errors.push(validationErrors[prop])
          });
        }
      }
    );
  }

  updateSight(updatedSight: Sight) {
    updatedSight.challenges = null
    console.log(updatedSight)
    
    this.svc.updateSight(updatedSight).subscribe(
      data => {
        this.errors = [];
        console.log(updatedSight)
        // refresh the list
        this.getSights();
        this.showSuccess("Successfully updated the sight!")
        this.successfulSave = true
        return true;
      },
      error => {
        this.errors = [];
        console.error("Error saving sight!");
        this.successfulSave = false
        if (error.status === 400) {
          const validationErrors = error.error;
          Object.keys(validationErrors).forEach(prop => {
            console.log(validationErrors[prop])
            this.errors.push(validationErrors[prop])
          });
        }
      }
    );
  }

  deleteSight(sight) {
    this.svc.deleteSight(sight).subscribe(
      data => {
        this.errors = [];
        // refresh the list
        this.getSights();
        this.showSuccess("Successfully deleted the sight!")
        return true;
      },
      error => {
        console.error("Error deleting sight!");
        this.showError(error.message)
      }
    );
  }

  showError(message: string) {
    this.errorMessage = message;
    this.successMessage = "";
  }
  showSuccess(message: string) {
    this.errorMessage = "";
    this.successMessage = message;
  }
}