import { Component, OnInit } from '@angular/core';
import { NbDialogService } from '@nebular/theme';
import { Challenge, ChallengeService } from '../challenges-table/challenge.service';
import { ItemsDialogComponentComponent } from '../challenges-table/items-dialog-component/items-dialog-component.component';
import { Item, ItemService } from '../items-table/item.service';
import { ChallengesDialogComponentComponent } from '../sights-table/challenges-dialog-component/challenges-dialog-component.component';
import { User, UserService } from './user.service';

@Component({
  selector: 'ngx-users-table',
  templateUrl: './users-table.component.html',
  styleUrls: ['./users-table.component.scss']
})
export class UsersTableComponent implements OnInit {
  errorMessage: string = "";
  successMessage: string = "";
  errors: string[] = [];

  users: User[] = [];
  user: User;
  challenges: Challenge[];
  items: Item[];

  constructor(private dialogService: NbDialogService, private userService: UserService, private challengeService: ChallengeService, private itemsService: ItemService) { }

  ngOnInit() {
    this.getUsers();
  }

  // Open dialog popup with a ui to select challenges
  openChallengeSelector(selectedChallenges: Challenge[]) {
    this.challenges = [];
    // Get list of challenges (get request)
    this.challengeService.getChallenges("").toPromise().then((res) => {
      let challenges: Challenge[] = res.challenges;
      // Check if there are already challenges linked to this user (=selectedChallenges)
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

  getUsers(urlArgs: string = "/All") {
    this.userService.getUsers(urlArgs).subscribe(
      result => {
        this.users = result.users;
      },
      error => {
        this.showError(error.message);
      }
    );
  }

  createUser(name, username, email, balls) {
    let newUser: User = {
      userId: 0,
      name: name,
      username: username,
      email: email,
      balls: balls,
      items: this.items,
      usersItems: null,
      challenges: this.challenges,
      friends: null
    };

    this.userService.createUser(newUser).subscribe(
      data => {
        this.getUsers();
        this.showSuccess("Successfully created a new user!");
      }, error => {
        this.showError("Could not create a new user!", this.getVilidationErrors(error));
      }
    );
  }

  updateUser(updatedUser: User) {
    updatedUser.challenges = this.challenges
    updatedUser.items = this.items
    this.userService.updateUser(updatedUser).subscribe(
      data => {
        console.log(updatedUser);
        this.getUsers();
        this.showSuccess("Successfully updated the user!");
      },
      error => {
        this.showError("Could not update user!", this.getVilidationErrors(error));
      }
    );
  }

  deleteUser(user: User) {
    this.userService.deleteUser(user).subscribe(
      data => {
        this.getUsers();
        this.showSuccess("Successfully deleted the user!");
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
    if (error.status == 400 || error.status == 404) {
      console.log(error)
      errors.push(error.error + "")
    }
    return errors;
  }
}