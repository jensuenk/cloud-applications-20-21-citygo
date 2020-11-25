import { Component, Input, OnInit } from '@angular/core';
import { NbDialogRef } from '@nebular/theme';
import { Challenge } from '../../challenges-table/challenge.service';

@Component({
  selector: 'ngx-challenges-dialog-component',
  templateUrl: './challenges-dialog-component.component.html',
  styleUrls: ['./challenges-dialog-component.component.scss']
})
export class ChallengesDialogComponentComponent implements OnInit {

  @Input() challenges: Challenge[];
  @Input() selectedChallenges: Challenge[];

  rows: Row[] = []


  constructor(protected ref: NbDialogRef<ChallengesDialogComponentComponent>) {
  }

  ngOnInit(): void {
    console.log(this.selectedChallenges)
    this.challenges.forEach(challenge => {
      let checked: boolean = false;
      this.selectedChallenges.forEach(selectedChallenge => {
        if (challenge.challengeId == selectedChallenge.challengeId) {
          checked = true;
        }
      })

      let row: Row = {
        checked: checked,
        challenge: challenge
      }
      this.rows.push(row);
    });
  }

  cancel() {
    this.ref.close();
  }

  submit() {
    this.ref.close(this.selectedChallenges);
  }

  FieldsChange(challenge: Challenge, $event) {
    console.log($event.target.checked);
    if ($event.target.checked) {
      this.selectedChallenges.push(challenge)
    }
    else {
      this.selectedChallenges.splice(this.selectedChallenges.indexOf(challenge))
    }
    console.log("Selected items", this.selectedChallenges)
  }

}

interface Row {
  checked: boolean,
  challenge: Challenge
}
