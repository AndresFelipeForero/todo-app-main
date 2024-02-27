import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms'
import { CommonModule, NgFor } from '@angular/common';

@Component({
  selector: 'app-todo-list',
  standalone: true,
  imports: [FormsModule, CommonModule, NgFor],
  templateUrl: './todo-list.component.html',
  styleUrl: './todo-list.component.scss',
})

export class TodoListComponent {
  activeStatus: string = "all";
  newTask!: string;
  changedTheme: boolean = false;
  leftCounter: number = 0;
  
  showTaskList: any[] = [];
 

  ngOnInit() {
    let store = localStorage.getItem("taskStorage")
    if (store) {
      this.showTaskList = JSON.parse(store);
      console.log(this.showTaskList)
    }
  }

  addTask(taskName: string) {
    const taskObject = {
      taskName: taskName,
      checked: false,
      isOnlyRead: true,
    };
    this.showTaskList = [taskObject, ...this.showTaskList];
    this.newTask = '';
    localStorage.setItem("taskStorage", JSON.stringify(this.showTaskList))
  }

  statusActive(status: string) {
    this.activeStatus = status;
  }

  delete(number:number){
    this.showTaskList.splice(number, 1)
    localStorage.setItem("taskStorage", JSON.stringify(this.showTaskList))
  }

  changeTheme(){
    this.changedTheme = !this.changedTheme
  }

  storeChecked(){
    setTimeout(() =>{

      localStorage.setItem("taskStorage", JSON.stringify(this.showTaskList))
    }, 1)
  }
}
