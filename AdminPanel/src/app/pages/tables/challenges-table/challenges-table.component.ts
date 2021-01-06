import { Component, OnInit } from '@angular/core';
import { NbDialogService } from '@nebular/theme';
import { Item, ItemService } from '../items-table/item.service';
import { Challenge, ChallengeService } from './challenge.service';
import { ItemsDialogComponentComponent } from './items-dialog-component/items-dialog-component.component';

@Component({
  selector: 'ngx-challenges-table',
  templateUrl: './challenges-table.component.html',
  styleUrls: ['./challenges-table.component.scss']
})
export class ChallengesTableComponent implements OnInit {
  errorMessage: string = "";
  successMessage: string = "";
  errors: string[] = [];

  challenges: Challenge[] = [];
  challenge: Challenge
  items: Item[];

  constructor(private dialogService: NbDialogService, private challengeService: ChallengeService, private itemsService: ItemService) { }

  ngOnInit() {
    this.getChallenges();
    this.errorMessage = "";
    this.successMessage = "";
    this.errors = [];
  }

  // Open dialog popup with a ui to select items
  openItemSelector(selectedItems: Item[]) {
    this.items = [];
    // Get list of items (get request)
    this.itemsService.getItems("").toPromise().then((res) => {
      let items: Item[] = res.items;
      // Check if there are already items linked to this challenge (=selectedItems)
      if (selectedItems == null) {
        selectedItems = [];
      }

      this.dialogService.open(ItemsDialogComponentComponent, {
        context: {
          items: items,
          selectedItems: selectedItems
        },
      }).onClose.subscribe(res => {
        if (res != null) {
          this.items = res;
        }
      })
    }).catch(error => {
      this.showError(error.message);
    });
  }

  getChallenges(urlArgs: string = "") {
    this.challengeService.getChallenges(urlArgs).subscribe(
      result => {
        this.challenges = result.challenges;
      },
      error => {
        this.showError(error.message);
      }
    );
  }

  createChallenge(name, task, questionChallenge, answer, score) {
    let newChallenge: Challenge = {
      challengeId: 0,
      name: name,
      task: task,
      questionChallenge: questionChallenge,
      answer: answer,
      items: this.items,
      score: score
    }
    this.challengeService.createChallenge(newChallenge).subscribe(
      data => {
        this.getChallenges();
        this.showSuccess("Successfully created a new challenge!");
      }, error => {
        if (error.status == 200 || error.status == 201) {
          this.getChallenges();
          this.showSuccess("Successfully created a new challenge!");
          return
        }
        this.showError("Could not create a new sight!", this.getVilidationErrors(error));
      }
    );
  }

  updateChallenge(updatedChallenge: Challenge) {
    updatedChallenge.items = this.items
    this.challengeService.updateChallenge(updatedChallenge).subscribe(
      data => {
        console.log(updatedChallenge);
        this.getChallenges();
        this.showSuccess("Successfully updated the challenge!");
        return true;
      },
      error => {
        if (error.status == 200 || error.status == 201) {
          this.getChallenges();
          this.showSuccess("Successfully updated the challenge!");
          return
        }
        this.showError("Could not update sight!", this.getVilidationErrors(error));
      }
    );
  }

  deleteChallenge(challenge) {
    this.challengeService.deleteChallenge(challenge).subscribe(
      data => {
        this.getChallenges();
        this.showSuccess("Successfully deleted the challenge!");
      },
      error => {
        if (error.status == 200 || error.status == 201) {
          this.getChallenges();
          this.showSuccess("Successfully deleted the challenge!");
          return
        }
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
    if (error.status == 400 || error.status == 404) {
      if (typeof error.error === 'object' && error.error !== null) {
        const validationErrors = error.error;
        console.log(validationErrors)
        Object.keys(validationErrors).forEach(err => {
          if (err === 'title') {
            errors.push(validationErrors[err])
          }
        });
      }
      else {
        errors.push(error.error);
      }
    }
    return errors;
  }
}