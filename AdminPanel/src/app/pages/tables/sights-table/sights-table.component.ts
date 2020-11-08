import { Component, NgModule, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { NbButtonModule } from '@nebular/theme';
import { ISight, SightService } from './sight.service';

@Component({
  selector: 'ngx-sights-table',
  templateUrl: './sights-table.component.html',
  styleUrls: ['./sights-table.component.scss']
})

export class SightsTableComponent implements OnInit {
  sights : ISight;
  errorMessage: string
  successfulSave: boolean;
  successMessage: string;
  errors: string[];

  sight: ISight

  filterSightId: string = "";
  filterName: string = "";
  filterLocation: string = "";
  filterSort: string = "";
  filterPage: string = "";
  filterLength: string = "";
  filterDir: string = "";

  constructor(private svc : SightService) { }

  ngOnInit() {
    this.getSights();
    this.errorMessage = "";
    this.successMessage = "";
    this.errors = [];
  }

  getSights(urlArgs: string = "") {
    this.svc.getSights(urlArgs).subscribe(
        result => {
          this.errors = [];
          this.sights = result;
          console.log(this.sights)
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

  createSight(name, info, monument, stop, polygon1, polygon2, polygon3, polygon4, challenge) {
    let newSight: ISight = {
      sightId: 0,
      name: name,
      info: info,
      monument: monument,
      stop: stop,
      polygon1: polygon1,
      polygon2: polygon2,
      polygon3: polygon3,
      polygon4: polygon4,
      challenge: challenge
    }
    this.svc.createSight(newSight).subscribe(
        data => {
          this.errors = [];
          // refresh the list
          this.getSights();
          this.showSuccess("Successfully created a new sight!")
          this.successfulSave = true
          return true;
        },error => {
          this.errors = [];
          console.error("Error creating sight!");
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
    
  updateSight(updatedSight) {
    this.svc.updateSight(updatedSight).subscribe(
        data => {
          this.errors = [];
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

  filter() {
    var urlArgs: string = "?";
    if (this.filterSightId != "" && this.filterSightId != null) {
      urlArgs += "id=" + this.filterSightId + "&"
    }
    if (this.filterName != "") {
      urlArgs += "name=" + this.filterName + "&"
    }
    if (this.filterLocation != "") {
      urlArgs += "location=" + this.filterLocation + "&"
    }
    if (this.filterSort != "") {
      urlArgs += "sort=" + this.filterSort + "&"
    }
    if (this.filterPage != "") {
      urlArgs += "page=" + this.filterPage + "&"
    }
    if (this.filterLength != "") {
      urlArgs += "length=" + this.filterLength + "&"
    }
    if (this.filterDir != "") {
      urlArgs += "dir=" + this.filterDir + "&"
    }
  
    urlArgs = urlArgs.substring(0, urlArgs.length - 1);
    this.getSights(urlArgs);
    
  }
}