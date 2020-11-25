import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { NbDialogModule, NbDialogService } from '@nebular/theme';
import { Challenge, ChallengeService } from '../challenges-table/challenge.service';
import { PolygonDialogComponentComponent } from './polygon-dialog-component/polygon-dialog-component.component';
import { Coordinate, Sight, SightService } from './sight.service';

@Component({
  selector: 'ngx-sights-table',
  templateUrl: './sights-table.component.html',
  styleUrls: ['./sights-table.component.scss']
})

export class SightsTableComponent implements OnInit {
  errorMessage: string
  successMessage: string;
  errors: string[];

  sights: Sight[] = [];
  sight: Sight

  constructor(private dialogService: NbDialogService, private sightService: SightService, private challengeService: ChallengeService) { }

  ngOnInit() {
    this.getSights();
    this.errorMessage = "";
    this.successMessage = "";
    this.errors = [];
  }

  coordinates: Coordinate[] = [];

  openEditPolygonDialog(sight: Sight) {
    this.dialogService.open(PolygonDialogComponentComponent, {
      context: {
        coordinates: sight.coordinates,
      },
    }).onClose.subscribe(res => {
      if (res != null) {
        sight.coordinates = res;
      }
    })
  }

  openNewPolygonDialog() {
    if (this.coordinates.length < 4) {
      for (let i = 0; i < 4; i++) {
        let cord: Coordinate = {
          latitude: 51.2194475,
          longitude: 4.4024643
        }
        this.coordinates.push(cord)
      }
    }
    this.dialogService.open(PolygonDialogComponentComponent, {
      context: {
        coordinates: this.coordinates,
      },
    }).onClose.subscribe(res => {
      if (res != null) {
        this.coordinates = res;
      }
    })
  }

  getSights(urlArgs: string = "") {
    this.sightService.getSights(urlArgs).subscribe(
      result => {
        this.errors = [];
        this.sights = result.sights
      },
      error => {
        this.showError(error.message)
      }
    );
  }

  createSight(name, info, monument, stop, challenges) {
    this.challengeService.getChallengeById(challenges).toPromise().then((res) => {
      let challenges: Challenge[] = [];
      challenges.push(res)
      
      let newSight: Sight = {
        sightId: 0,
        name: name,
        info: info,
        monument: monument,
        stop: stop,
        coordinates: this.coordinates,
        challenges: challenges
      }

      this.sightService.createSight(newSight).subscribe(
        data => {
          this.errors = [];
          console.log(newSight)
          // refresh the list
          this.getSights();
        }, error => {
          this.errors = [];
          console.error("Error creating sight!");
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
   }).catch(err => {
     console.log(err)
   });
    
    
  }

  updateSight(updatedSight: Sight) {
    console.log(updatedSight)
    
    this.sightService.updateSight(updatedSight).subscribe(
      data => {
        this.errors = [];
        console.log(updatedSight)
        // refresh the list
        this.getSights();
        this.showSuccess("Successfully updated the sight!")
      },
      error => {
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

  deleteSight(sight: Sight) {
    this.sightService.deleteSight(sight).subscribe(
      data => {
        // Refresh list
        this.getSights();
        this.showSuccess("Successfully deleted the sight!")
      },
      error => {
        this.showError(error.message)
      }
    );
  }

  showError(message: string, errors?: string[]) {
    this.errorMessage = message;
    this.errors = errors;
    this.successMessage = "";
  }

  showSuccess(message: string) {
    this.errors = [];
    this.errorMessage = "";
    this.successMessage = message;
  }
}