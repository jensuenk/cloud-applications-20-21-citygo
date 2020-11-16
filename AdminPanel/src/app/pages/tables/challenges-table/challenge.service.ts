import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

@Injectable({
  providedIn: 'root'
})
export class ChallengeService {

  private url = "https://citygo.azurewebsites.net/Challenges";

  constructor(private http: HttpClient) { }

  getChallenges(args: string): Observable<RootObject> {
    console.log(this.url + args);
    return this.http.get<RootObject>(this.url + args);
    
  }

  getChallengeById(id: number): Observable<Challenge> {
    console.log(this.url + "/" + id);
    return this.http.get<Challenge>(this.url + "/" + id)
  }

  createChallenge(challenge: Challenge) {
    let body = JSON.stringify(challenge);
    delete body['id'];
    return this.http.post(this.url, body, {
      headers: {
        'Content-Type': 'application/json',
      }
    });
  }

  updateChallenge(challenge: Challenge) {
    let body = JSON.stringify(challenge);
    delete body['id'];
    return this.http.put(this.url, body, {
      headers: {
        'Content-Type': 'application/json',
      }
    });
  }

  deleteChallenge(challenge: Challenge) {
    return this.http.delete(this.url + "/" + challenge.challengeId)
  }
}

export interface Challenge {
  challengeId: number;
  name: string;
  task: string;
  taskDone: boolean;
  questionChallenge: string;
  answer: string;
  sight?: any;
  items?: any;
}

export interface RootObject {
  challenges: Challenge[];
}
