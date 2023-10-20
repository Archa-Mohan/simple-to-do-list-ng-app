import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Task } from 'src/app/utils/TaskInterface';

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.css'],
})
export class AddTaskComponent implements OnInit {
  addTaskForm: FormGroup;
  editedTaskId!: number;
  constructor(
    private fb: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {
    this.addTaskForm = this.fb.group({
      id: [this.generateTaskId()],
      name: ['', [Validators.required]],
      description: [''],
      dueDate: [''],
      priority: ['low'],
      category: ['official'],
      progress:['not-started']
    });
  }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe((params) => {
      const id = params.get('id');
      if (id !== null) {
        this.getDataById(parseInt(id, 10));
      }
    });
  }

  isEditMode(): boolean {
    return this.activatedRoute.snapshot.paramMap.has('id');
  }

  submitAddForm() {
    if (this.addTaskForm.valid) {
      const formValue: Task = this.addTaskForm.value;
      this.saveFormData(formValue);
      this.router.navigate(['/view']);
    }
  }

  generateTaskId(): number {
    const lastIdStr = sessionStorage.getItem('lastTaskId');
    let parsedId;
    if (lastIdStr !== null) {
      parsedId = parseInt(lastIdStr, 10) + 1;
    } else {
      parsedId = 1; // Or another default value
    }
    sessionStorage.setItem('lastTaskId', JSON.stringify(parsedId));
    return parsedId;
  }

  saveFormData(formValue: Task) {
    let sessionLists = sessionStorage.getItem('taskLists');
    if (sessionLists !== null && sessionLists !== '') {
      let currentSessionList = JSON.parse(sessionLists);
      if (this.isEditMode()) {
        currentSessionList[this.editedTaskId]=formValue;
      } else {
        currentSessionList.push(formValue);
      }
      sessionStorage.setItem('taskLists', JSON.stringify(currentSessionList));
    } else {
      sessionStorage.setItem('taskLists', JSON.stringify([formValue]));
    }
  }

  getDataById(id: number) {
    let sessionLists = sessionStorage.getItem('taskLists');
    if (sessionLists !== null && sessionLists !== '') {
      let currentSessionList: Task[] = JSON.parse(sessionLists);
      let index = currentSessionList.findIndex((item) => item.id === id);
      this.editedTaskId = index;
      if (index !== -1) {
        this.addTaskForm.setValue(currentSessionList[index]);
      }
    }
  }
}
