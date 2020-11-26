import { Component, Input, OnInit } from '@angular/core';
import { NbDialogRef } from '@nebular/theme';
import { Item } from '../../items-table/item.service';

@Component({
  selector: 'ngx-items-dialog-component',
  templateUrl: './items-dialog-component.component.html',
  styleUrls: ['./items-dialog-component.component.scss']
})
export class ItemsDialogComponentComponent implements OnInit {

  @Input() items: Item[];
  @Input() selectedItems: Item[];

  rows: Row[] = []

  constructor(protected ref: NbDialogRef<ItemsDialogComponentComponent>) {
  }

  ngOnInit(): void {
    console.log(this.selectedItems)
    this.items.forEach(item => {
      let checked: boolean = false;
      this.selectedItems.forEach(selectedItem => {
        if (item.itemId == selectedItem.itemId) {
          checked = true;
        }
      });

      let row: Row = {
        checked: checked,
        item: item
      };
      this.rows.push(row);
    });
  }

  cancel() {
    this.ref.close();
  }

  submit() {
    this.ref.close(this.selectedItems);
  }

  FieldsChange(item: Item, $event) {
    if ($event.target.checked) {
      this.selectedItems.push(item);
    }
    else {
      this.selectedItems.splice(this.selectedItems.indexOf(item));
    }
    console.log("Selected items", this.selectedItems);
  }
}

interface Row {
  checked: boolean,
  item: Item
}
