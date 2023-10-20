import { Component, OnInit } from '@angular/core';
import {  Router } from '@angular/router';
import { Task } from 'src/app/utils/TaskInterface';

@Component({
  selector: 'app-view-task',
  templateUrl: './view-task.component.html',
  styleUrls: ['./view-task.component.css'],
})
export class ViewTaskComponent implements OnInit {
  listName: string = 'My Tasks';
  emptyTask: Task[] = [];

  taskList: Task[] = [];

  constructor(private router: Router) {
    // sessionStorage.setItem('lastTaskId', '1');
  }

  ngOnInit(): void {
    const taskLists = sessionStorage.getItem('taskLists');
    taskLists !== null
      ? (this.taskList = JSON.parse(taskLists))
      : this.emptyTask;
  }

  edit(id: number) {
    this.router.navigate(['/add', id]);
  }

  delete(id: number) {
    let indexToDelete = this.taskList.findIndex((item) => item.id == id);
    this.taskList.splice(indexToDelete, 1);
    sessionStorage.setItem('taskLists', JSON.stringify(this.taskList));
  }
}
