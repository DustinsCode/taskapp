import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  isLoggedIn: boolean = false;
  private userName: BehaviorSubject<string | null> = new BehaviorSubject<string | null>(null);

  constructor() {
    if(sessionStorage.getItem("username")) {
      this.userName.next(sessionStorage.getItem("username"));
      this.isLoggedIn = true;
    }
  }

  login(username?: string | null): Observable<number> {
    if(!username){
      return of(400);
    }
    this.userName.next(username)
    this.isLoggedIn = true;
    sessionStorage.setItem("username", username);
    return of(200);
  }

  logout() {
    this.userName.next(null);
    this.isLoggedIn = false;
    sessionStorage.removeItem("username");
  }

  getUserName(): Observable<string | null> {
    return this.userName;
  }

}
