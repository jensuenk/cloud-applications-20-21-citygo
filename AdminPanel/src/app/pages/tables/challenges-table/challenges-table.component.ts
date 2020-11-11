import { Component, OnInit } from '@angular/core';
import { Challenge, ChallengeService } from './challenge.service';

@Component({
  selector: 'ngx-challenges-table',
  templateUrl: './challenges-table.component.html',
  styleUrls: ['./challenges-table.component.scss']
})
export class ChallengesTableComponent implements OnInit {

  errorMessage: string
  successfulSave: boolean;
  successMessage: string;
  errors: string[];

  challenges: Challenge[] = [];
  challenge: Challenge

  filterChallengeId: string = "";
  filterName: string = "";
  filterLocation: string = "";
  filterSort: string = "";
  filterPage: string = "";
  filterLength: string = "";
  filterDir: string = "";

  constructor(private svc: ChallengeService) { }

  ngOnInit() {
    this.getChallenges();
    this.errorMessage = "";
    this.successMessage = "";
    this.errors = [];
  }

  getChallenges(urlArgs: string = "") {
    this.svc.getChallenges(urlArgs).subscribe(
      result => {
        this.errors = [];
        console.log(result.challenges)
        this.challenges = result.challenges
        return true;
      },
      error => {
        console.error("Error while retreiving challenges!");
        this.showError(error.message)
      }
    );
  }

  getChallenge(id: number) {
    this.svc.getChallengeById(id).subscribe(
      result => {
        this.errors = [];
        this.challenge = result
        return true;
      },
      error => {
        console.error("Error while retreiving challenge!");
        this.showError(error.message)
      }
    );
  }

  createChallenge(name, task, questionChallenge, answer, itemId) {
    let newChallenge: Challenge = {
      challengeId: 0,
      name: name,
      task: task,
      taskDone: false,
      questionChallenge: questionChallenge,
      answer: answer,
      items: null
    }
    this.svc.createChallenge(newChallenge).subscribe(
      data => {
        this.errors = [];
        console.log(newChallenge)
        // refresh the list
        this.getChallenges();
        this.showSuccess("Successfully created a new challenge!")
        this.successfulSave = true
        return true;
      }, error => {
        this.errors = [];
        this.showError("Error accured trying to create a challenge!")
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

  updateChallenge(updatedChallenge: Challenge) {
    updatedChallenge.items = null
    
    this.svc.updateChallenge(updatedChallenge).subscribe(
      data => {
        this.errors = [];
        console.log(updatedChallenge)
        // refresh the list
        this.getChallenges();
        this.showSuccess("Successfully updated the challenge!")
        this.successfulSave = true
        return true;
      },
      error => {
        this.errors = [];
        this.showError("Error accured trying to update this challenge!")
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

  deleteChallenge(challenge) {
    this.svc.deleteChallenge(challenge).subscribe(
      data => {
        this.errors = [];
        // refresh the list
        this.getChallenges();
        this.showSuccess("Successfully deleted the challenge!")
        return true;
      },
      error => {
        console.error("Error deleting challenge!");
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