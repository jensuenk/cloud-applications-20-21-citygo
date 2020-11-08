import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class SightService {
  private url = "https://citygo.azurewebsites.net/Sights";

  constructor(private http: HttpClient) { }

  getSights(args: string): Observable<ISight> {
    console.log(this.url + args);
    return this.http.get(this.url + args).pipe(map(res => res.sights))
    
  }

  getSightById(id: number): Observable<ISight> {
    console.log(this.url + "/" + id);
    return this.http.get<ISight>(this.url + "/" + id)
  }

  createSight(sight: ISight) {
    let body = JSON.stringify(sight);
    delete body['id'];
    return this.http.post(this.url, body, {
      headers: {
        'Content-Type': 'application/json',
      }
    });
  }

  updateSight(sight: ISight) {
    let body = JSON.stringify(sight);
    delete body['id'];
    return this.http.put(this.url, body, {
      headers: {
        'Content-Type': 'application/json',
      }
    });
  }

  deleteSight(sight: ISight) {
    return this.http.delete(this.url + "/" + sight.sightId)
  }

  sight: ISight;
}

export interface ISight {
  sightId: number,
  name: string,
  info: string,
  monument: boolean,
  stop: boolean,
  polygon1: string,
  polygon2: string,
  polygon3: string,
  polygon4: string,
  challenge: string
}
