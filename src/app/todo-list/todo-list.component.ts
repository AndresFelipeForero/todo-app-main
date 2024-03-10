import { Component, HostListener, ViewChild, inject } from '@angular/core';
import { FormsModule } from '@angular/forms'
import { AsyncPipe, CommonModule} from '@angular/common';
import { StoreService } from '../services/store.service';
import { Subscription } from 'rxjs';
import { Task } from '../models/task';
import { CdkDragDrop, CdkDropList, CdkDrag, moveItemInArray } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-todo-list',
  standalone: true,
  imports: [FormsModule, CommonModule, AsyncPipe, CdkDropList, CdkDrag],
  templateUrl: './todo-list.component.html',
  styleUrl: './todo-list.component.scss',
})

export class TodoListComponent {
  
  inputDisable: boolean = true;
  mediaChanged!: number;
  activeStatus: string = "all";
  newTaskInput!: string;
  changedTheme: boolean = false;
  leftCounter: number = 0;
  
  subscription?: Subscription;
  showTaskList$?: Task[];

  _store = inject(StoreService)

  drop(event: CdkDragDrop<Task[]>) {
    if (this.showTaskList$) {
      moveItemInArray(this.showTaskList$, event.previousIndex, event.currentIndex);
      this._store.dropUpdate(this.showTaskList$)
    }
  }
 

  ngOnInit() {
    this.subscription = this._store.getTaskList().subscribe((taskList) => {
      this.showTaskList$ = taskList
      this.leftCounter = taskList.filter(({checked}) => !checked).length
    })

    this.mediaChanged = window.innerWidth
    
    /* -------------set status in store--------------- */
    let status = localStorage.getItem('status')
    if (status) {
      this.activeStatus = JSON.parse(status)
    }

    /* -------------set theme in store--------------- */
    let theme = localStorage.getItem('theme')
    if (theme) {
      this.changedTheme = JSON.parse(theme)
    }

  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any){
    this.mediaChanged = window.innerWidth;
    console.log(this.mediaChanged, event)
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

  edit(){
    this._store.edit()
  }

  editable(){
    this.inputDisable = !this.inputDisable
    console.log(this.inputDisable)
  }

  ngOnDestroy(){
    this.subscription?.unsubscribe()
  }
}
