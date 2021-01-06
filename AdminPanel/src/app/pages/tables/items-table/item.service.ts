import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Coordinate } from '../sights-table/sight.service';


@Injectable({
  providedIn: 'root'
})
export class ItemService {

  private url = "https://citygoaspbackend20201224141859.azurewebsites.net/Items";

  constructor(private http: HttpClient) { }

  getItems(args: string): Observable<RootObject> {
    console.log(this.url + args);
    return this.http.get<RootObject>(this.url + args);
    
  }

  getItemById(id: number): Observable<Item> {
    console.log(this.url + "/" + id);
    return this.http.get<Item>(this.url + "/" + id)
  }

  createItem(item: Item) {
    let body = JSON.stringify(item);
    delete body['id'];
    return this.http.post(this.url, body, {
      headers: {
        'Content-Type': 'application/json',
      }
    });
  }

  updateItem(item: Item) {
    let body = JSON.stringify(item);
    delete body['id'];
    return this.http.put(this.url, body, {
      headers: {
        'Content-Type': 'application/json',
      }
    });
  }

  deleteItem(item: Item) {
    return this.http.delete(this.url + "/" + item.itemId)
  }
}

export interface Item {
  itemId: number;
  name: string;
  location: Coordinate;
  rarity: string;
  picture: string;
  usersItems?: any;
  challenge?: any;
}

export interface RootObject {
  items: Item[];
}

