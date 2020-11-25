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

  errorMessage: string
  successfulSave: boolean;
  successMessage: string;
  errors: string[];

  items: Item[] = [];
  item: Item

  filterItemId: string = "";
  filterName: string = "";
  filterLocation: string = "";
  filterSort: string = "";
  filterPage: string = "";
  filterLength: string = "";
  filterDir: string = "";

  constructor(private dialogService: NbDialogService, private svc: ItemService) { }

  ngOnInit() {
    this.getItems();
    this.errorMessage = "";
    this.successMessage = "";
    this.errors = [];
  }

  coordinate: Coordinate;

  openEditLocationDialog(item: Item) {
    this.dialogService.open(LocationDialogComponentComponent, {
      context: {
        coordinate: item.location,
      },
    }).onClose.subscribe(res => {
      if (res != null) {
        item.location = res;
        console.log(item.location)
      }
    })
  }

  openNewLocationDialog() {
    if (this.coordinate == null) {
      this.coordinate = {
        latitude: 51.2194475,
        longitude: 4.4024643
      }
    }
    this.dialogService.open(LocationDialogComponentComponent, {
      context: {
        coordinate: this.coordinate,
      },
    }).onClose.subscribe(res => {
      if (res != null) {
        this.coordinate = res;
        console.log(this.coordinate)
      }
    })
  }

  getItems(urlArgs: string = "") {
    this.svc.getItems(urlArgs).subscribe(
      result => {
        this.errors = [];
        console.log(result.items)
        this.items = result.items
        return true;
      },
      error => {
        console.error("Error while retreiving items!");
        this.showError(error.message)
      }
    );
  }

  getItem(id: number) {
    this.svc.getItemById(id).subscribe(
      result => {
        this.errors = [];
        this.item = result
        return true;
      },
      error => {
        console.error("Error while retreiving item!");
        this.showError(error.message)
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
    this.svc.createItem(newItem).subscribe(
      data => {
        this.errors = [];
        console.log(newItem)
        // refresh the list
        this.getItems();
        this.showSuccess("Successfully created a new item!")
        this.successfulSave = true
        return true;
      }, error => {
        this.errors = [];
        this.showError("Error accured trying to create a item!")
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

  updateItem(updatedItem: Item) {
    this.svc.updateItem(updatedItem).subscribe(
      data => {
        this.errors = [];
        console.log(updatedItem)
        // refresh the list
        this.getItems();
        this.showSuccess("Successfully updated the item!")
        this.successfulSave = true
        return true;
      },
      error => {
        this.errors = [];
        this.showError("Error accured trying to update this item!")
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

  deleteItem(item) {
    this.svc.deleteItem(item).subscribe(
      data => {
        this.errors = [];
        // refresh the list
        this.getItems();
        this.showSuccess("Successfully deleted the item!")
        return true;
      },
      error => {
        console.error("Error deleting item!");
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