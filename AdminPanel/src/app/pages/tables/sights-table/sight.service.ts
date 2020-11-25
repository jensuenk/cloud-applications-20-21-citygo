import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Challenge } from '../challenges-table/challenge.service';

@Injectable({
  providedIn: 'root'
})

export class SightService {
  private url = "https://citygoaspbackend20201120025600.azurewebsites.net/Sights";

  constructor(private http: HttpClient) { }

  getSights(args: string): Observable<RootObject> {
    console.log(this.url + args);
    return this.http.get<RootObject>(this.url + args);
    
  }

  getSightById(id: number): Observable<Sight> {
    console.log(this.url + "/" + id);
    return this.http.get<Sight>(this.url + "/" + id)
  }

  createSight(sight: Sight) {
    let body = JSON.stringify(sight);
    delete body['id'];
    return this.http.post(this.url, body, {
      headers: {
        'Content-Type': 'application/json',
      }
    });
  }

  updateSight(sight: Sight) {
    let body = JSON.stringify(sight);
    delete body['id'];
    return this.http.put(this.url, body, {
      headers: {
        'Content-Type': 'application/json',
      }
    });
  }

  deleteSight(sight: Sight) {
    return this.http.delete(this.url + "/" + sight.sightId)
  }
}

export interface Coordinate {
  latitude: number;
  longitude: number;
}

export interface Sight {
  sightId: number;
  name: string;
  info: string;
  monument: boolean;
  stop: boolean;
  coordinates: Coordinate[];
  challenges?: Challenge[];
}

export interface RootObject {
  sights: Sight[];
}