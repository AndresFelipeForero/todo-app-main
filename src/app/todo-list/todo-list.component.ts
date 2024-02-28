import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms'
import { AsyncPipe, CommonModule, NgFor } from '@angular/common';
import { StoreService } from '../services/store.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-todo-list',
  standalone: true,
  imports: [FormsModule, CommonModule, NgFor, AsyncPipe],
  templateUrl: './todo-list.component.html',
  styleUrl: './todo-list.component.scss',
})

export class TodoListComponent {
  
  activeStatus: string = "all";
  newTaskInput!: string;
  changedTheme: boolean = false;
  leftCounter: number = 0;
  
  showTaskList: any[] = [];
  showTaskList$?: any[];

  _store = inject(StoreService)
 

  ngOnInit() {
    this._store.getTaskList().subscribe((taskList) => {
      this.showTaskList$ = taskList
      this.leftCounter = taskList.filter(({checked}) => !checked).length
    })
    
    let status = localStorage.getItem('status')
    if (status) {
      this.activeStatus = JSON.parse(status)
    }

    let theme = localStorage.getItem('theme')
    if (theme) {
      this.changedTheme = JSON.parse(theme)
    }

  }

  addTask(taskName: string) {
    const newTask = {
      taskName: taskName,
      checked: false,
    };
    this._store.addTask(newTask)
    this.newTaskInput = '';
  }

  statusActive(status: string) {
    this.activeStatus = status;
    localStorage.setItem('status', JSON.stringify(status))
  }

  delete(index:number){
    this._store.delete(index)
  }

  changeTheme(){
    this.changedTheme = !this.changedTheme
    localStorage.setItem('theme', JSON.stringify(this.changedTheme))
  }

  storeChecked(){
    this._store.storeChecked()
  }

  clearChecked(){
    this._store.clearChecked()
  }

  
}
