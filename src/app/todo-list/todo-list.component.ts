import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms'
import { CommonModule, NgFor } from '@angular/common';
import { trigger, transition, style, animate } from '@angular/animations';

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
  taskList: Array<any> = [
    // { checked: true, taskName: 'comprar carne', isOnlyRead: true },
    // { checked: false, taskName: 'Fumigar el Platano', isOnlyRead: true },
    // { checked: true, taskName: 'Pagar el Internet', isOnlyRead: false },
  ];

  ngOnInit() {
    this.showTaskList = this.taskList;
  }

  addTask(taskName: string) {
    const taskObject = {
      taskName: taskName,
      checked: false,
      isOnlyRead: true,
    };
    this.showTaskList = [taskObject, ...this.showTaskList];
    this.newTask = '';
  }

  statusActive(status: string) {
    this.activeStatus = status;
  }

  delete(number:number){
    this.showTaskList.splice(number, 1)
  }

  changeTheme(){
    this.changedTheme = !this.changedTheme
  }
}
