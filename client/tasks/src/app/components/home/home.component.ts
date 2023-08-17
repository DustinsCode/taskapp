import { Component, OnInit } from '@angular/core';
import { Task } from 'src/app/models/task';
import { User } from 'src/app/models/user';
import { TaskService } from 'src/app/services/task/task.service';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  user: User;
  currentlyBeingDragged: string;

  constructor(private userService: UserService, private taskService: TaskService){}
  
  ngOnInit(): void {
    this.getUser();
  }

  private getUser() {
    this.userService.getUser().subscribe((data: User) => {
      this.user = data;
    });
  }

  completeTask(task: Task) {
    this.taskService.completeTask(task).subscribe(() => {
      this.getUser();
    });
  }

  deleteTask(task: Task) {
    this.taskService.deleteTask(task).subscribe(() => {
      this.getUser();
    });
  }

  saveTask(event: any){
    this.taskService.addTask({description: event.target.value, createdBy: this.user.username} as Task).subscribe(() => {
      this.getUser();
    });
    event.target.value = '';
  }

  updateTaskOrder() {
    this.userService.updateTaskOrder(this.user).subscribe(() => {});
  }

  handleDragStart(e: any) {
    e.target.classList.add('dragging');
    this.currentlyBeingDragged = e.target.id;
  }

  handleDragEnd(e: any) {
    e.target.classList.remove('dragging');
    this.currentlyBeingDragged = '';
  }

  handleDragOver(e: any) {
    e.preventDefault();
    if(e.target.id !== this.currentlyBeingDragged){
      e.target.classList.add('dragOver');
      e.target.classList.remove('surfaceBackground');
    }
  }

  handleDragLeave(e: any) {
    e.preventDefault();
    e.target.classList.add('surfaceBackground');
    e.target.classList.remove('dragOver');
  }

  handleDrop(e: any) {
    e.target.classList.add('surfaceBackground');
    e.target.classList.remove('dragOver');

    let ids = this.user.tasks.map(task => task._id);
    let dropTargetIndex = ids.indexOf(e.target.id);
    let draggedIndex = ids.indexOf(this.currentlyBeingDragged);

    let newTasks = [...this.user.tasks];

    let movedTask = newTasks.splice(draggedIndex, 1)[0];
    newTasks.splice(dropTargetIndex, 0, movedTask);

    this.user.tasks = newTasks;
    this.updateTaskOrder();
  }

}
