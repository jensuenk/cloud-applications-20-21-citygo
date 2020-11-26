import { Component, OnInit } from '@angular/core';
import { NbDialogService } from '@nebular/theme';
import { Challenge, ChallengeService } from '../challenges-table/challenge.service';
import { ChallengesDialogComponentComponent } from './challenges-dialog-component/challenges-dialog-component.component';
import { PolygonDialogComponentComponent } from './polygon-dialog-component/polygon-dialog-component.component';
import { Coordinate, Sight, SightService } from './sight.service';

@Component({
  selector: 'ngx-sights-table',
  templateUrl: './sights-table.component.html',
  styleUrls: ['./sights-table.component.scss']
})

export class SightsTableComponent implements OnInit {
  errorMessage: string = "";
  successMessage: string = "";
  errors: string[] = [];

  sights: Sight[] = [];
  sight: Sight;
  coordinates: Coordinate[] = [];
  challenges: Challenge[];

  constructor(private dialogService: NbDialogService, private sightService: SightService, private challengeService: ChallengeService) { }

  ngOnInit() {
    this.getSights();
  }

  // Open dialog popup with a ui to edit the polygon coordinates
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

  // Open dialog popup with a ui to create a new polygon with coordinates
  openNewPolygonDialog() {
    // Create default 4 coordinates
    if (this.coordinates.length < 4) {
      for (let i = 0; i < 4; i++) {
        let cord: Coordinate = {
          latitude: 51.2194475,
          longitude: 4.4024643
        };
        this.coordinates.push(cord);
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

  // Open dialog popup with a ui to select challenges
  openChallengeSelector(selectedChallenges: Challenge[]) {
    this.challenges = [];
    // Get list of challenges (get request)
    this.challengeService.getChallenges("").toPromise().then((res) => {
      let challenges: Challenge[] = res.challenges;
      // Check if there are already challenges linked to this sight (=selectedChallenges)
      if (selectedChallenges == null) {
        selectedChallenges = [];
      }

      this.dialogService.open(ChallengesDialogComponentComponent, {
        context: {
          challenges: challenges,
          selectedChallenges: selectedChallenges
        },
      }).onClose.subscribe(res => {
        if (res != null) {
          this.challenges = res;
        }
      })
    }).catch(error => {
      this.showError(error.message);
    });
  }

  getSights(urlArgs: string = "") {
    this.sightService.getSights(urlArgs).subscribe(
      result => {
        this.sights = result.sights;
      },
      error => {
        this.showError(error.message);
      }
    );
  }

  createSight(name, info, monument, stop) {
    let newSight: Sight = {
      sightId: 0,
      name: name,
      info: info,
      monument: monument,
      stop: stop,
      coordinates: this.coordinates,
      challenges: this.challenges
    };

    this.sightService.createSight(newSight).subscribe(
      data => {
        this.getSights();
        this.showSuccess("Successfully created a new sight!");
      }, error => {
        this.showError("Could not create a new sight!", this.getVilidationErrors(error));
      }
    );
  }

  updateSight(updatedSight: Sight) {
    updatedSight.challenges = this.challenges
    this.sightService.updateSight(updatedSight).subscribe(
      data => {
        console.log(updatedSight);
        this.getSights();
        this.showSuccess("Successfully updated the sight!");
      },
      error => {
        this.showError("Could not create a new sight!", this.getVilidationErrors(error));
      }
    );
  }

  deleteSight(sight: Sight) {
    this.sightService.deleteSight(sight).subscribe(
      data => {
        this.getSights();
        this.showSuccess("Successfully deleted the sight!");
      },
      error => {
        this.showError(error.message);
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

  getVilidationErrors(error): string[] {
    let errors: string[] = []
    if (error.status == 400) {
      const validationErrors = error.error;
      Object.keys(validationErrors).forEach(prop => {
        errors.push(validationErrors[prop])
      });
    }
    return errors;
  }
}