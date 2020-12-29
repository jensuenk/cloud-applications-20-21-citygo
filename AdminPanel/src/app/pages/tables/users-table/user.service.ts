import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Challenge } from '../challenges-table/challenge.service';
import { Item } from '../items-table/item.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private url = "https://citygoaspbackend20201224141859.azurewebsites.net/Users";

  constructor(private http: HttpClient) { }

  getUsers(args: string): Observable<RootObject> {
    console.log(this.url + args);
    return this.http.get<RootObject>(this.url + args);
    
  }

  getUserById(id: number): Observable<User> {
    console.log(this.url + "/" + id);
    return this.http.get<User>(this.url + "/" + id)
  }

  createUser(user: User) {
    let body = JSON.stringify(user);
    delete body['id'];
    return this.http.post(this.url, body, {
      headers: {
        'Content-Type': 'application/json',
      }
    });
  }

  updateUser(user: User) {
    let body = JSON.stringify(user);
    delete body['id'];
    return this.http.put(this.url, body, {
      headers: {
        'Content-Type': 'application/json',
      }
    });
  }

  deleteUser(user: User) {
    return this.http.delete(this.url + "/" + user.userId)
  }
}

export interface User {
  userId: number;
  name: string;
  username: string;
  email: string;
  balls: number;
  items?: any;
  usersItems: Item[];
  challenges: Challenge[];
  friends?: any;
  score: number;
}

export interface RootObject {
  users: User[];
}