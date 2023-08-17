import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { User } from 'src/app/models/user';
import { environment } from 'src/environments/environment';
import { AuthService } from '../auth/auth.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private baseUrl = environment.baseUrl;
  private userName: string;

  constructor(private httpClient: HttpClient, private authService: AuthService) {
    this.authService.getUserName().subscribe((username) => {
      this.userName = username ? username : '';
    })
  }

  getUser(): Observable<User> {
    return this.httpClient.get<User>(`${this.baseUrl}/users/${this.userName}`);
  }

  updateTaskOrder(user: User): Observable<User> {
    return this.httpClient.put<User>(`${this.baseUrl}/users/`, user);
  }
}
