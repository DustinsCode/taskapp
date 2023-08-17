import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Task } from 'src/app/models/task';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  
  private baseUrl = environment.baseUrl;

  constructor(private httpClient: HttpClient) { }

  addTask(task: Task) {
    return this.httpClient.post(`${this.baseUrl}/tasks`, task);
  }

  completeTask(task: Task) {
    return this.httpClient.put(`${this.baseUrl}/tasks/complete`, task);
  }

  deleteTask(task: Task){
    let options = {
      body: task
    }
    return this.httpClient.delete(`${this.baseUrl}/tasks/delete`, options);
  }
}
