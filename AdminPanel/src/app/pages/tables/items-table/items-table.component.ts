import { Component, OnInit } from '@angular/core';
import { NbDialogService } from '@nebular/theme';
import { Coordinate } from '../sights-table/sight.service';
import { Item, ItemService } from './item.service';
import { LocationDialogComponentComponent } from './location-dialog-component/location-dialog-component.component';


@Component({
  selector: 'ngx-item-table',
  templateUrl: './items-table.component.html',
  styleUrls: ['./items-table.component.scss']
})
export class ItemsTableComponent implements OnInit {
  errorMessage: string = "";
  successMessage: string = "";
  errors: string[] = [];

  items: Item[] = [];
  item: Item;
  coordinate: Coordinate;

  constructor(private dialogService: NbDialogService, private itemService: ItemService) { }

  ngOnInit() {
    this.getItems();
  }

  // Open dialog popup with a ui to edit the location coordinates
  openEditLocationDialog(item: Item) {
    this.dialogService.open(LocationDialogComponentComponent, {
      context: {
        coordinate: item.location,
      },
    }).onClose.subscribe(res => {
      if (res != null) {
        item.location = res;
        console.log(item.location);
      }
    })
  }

  // Open dialog popup with a ui to create new location coordinates
  openNewLocationDialog() {
    if (this.coordinate == null) {
      this.coordinate = {
        latitude: 51.2194475,
        longitude: 4.4024643
      };
    }
    this.dialogService.open(LocationDialogComponentComponent, {
      context: {
        coordinate: this.coordinate,
      },
    }).onClose.subscribe(res => {
      if (res != null) {
        this.coordinate = res;
        console.log(this.coordinate);
      }
    })
  }

  getItems(urlArgs: string = "") {
    this.itemService.getItems(urlArgs).subscribe(
      result => {
        this.items = result.items;
      },
      error => {
        this.showError(error.message);
      }
    );
  }

  createItem(name, rarity, picture) {
    let newItem: Item = {
      itemId: 0,
      name: name,
      location: this.coordinate,
      rarity: rarity,
      picture: picture,
      usersItems: null,
      challenge: null
    }
    this.itemService.createItem(newItem).subscribe(
      data => {
        this.getItems();
        this.showSuccess("Successfully created a new item!")
      }, error => {
        this.showError("Could not create a new sight!", this.getVilidationErrors(error));
      }
    );
  }

  updateItem(updatedItem: Item) {
    this.itemService.updateItem(updatedItem).subscribe(
      data => {
        this.getItems();
        this.showSuccess("Successfully updated the item!")
      },
      error => {
        this.showError("Could not update sight!", this.getVilidationErrors(error));
      }
    );
  }

  deleteItem(item) {
    this.itemService.deleteItem(item).subscribe(
      data => {
        this.getItems();
        this.showSuccess("Successfully deleted the item!")
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