import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Task } from '../models/task';

@Injectable({
  providedIn: 'root'
})
export class StoreService {

  private taskStore$ = new BehaviorSubject<Task[]>([])

  constructor() { 
    let tasksStore = localStorage.getItem('taksStore')
    if (tasksStore) {
      this.taskStore$.next(JSON.parse(tasksStore))
    }
  }

  getTaskList(){
    return this.taskStore$.asObservable();
  }

  private setProducts(taskList: Task[]) {
    this.taskStore$.next([...taskList]);
    localStorage.setItem('taksStore', JSON.stringify(taskList))
  }
  

  addTask(task: Task){
    let current = this.taskStore$.getValue()
    this.setProducts([task, ...current])
  }

  storeChecked(){
    let current = this.taskStore$.getValue()
    this.setProducts(current)
  }

  delete(index: number){
    let current = this.taskStore$.getValue() 
    current.splice(index, 1)
    localStorage.setItem("taksStore", JSON.stringify(current))
    this.setProducts(current)
  }

  clearChecked(){
    let current = this.taskStore$.getValue()
    let activeTasks = current.filter(({checked}) => !checked)
    localStorage.setItem("taksStore", JSON.stringify(activeTasks))
    this.setProducts(activeTasks)
  }

  edit(){
    let current = this.taskStore$.getValue()
    this.setProducts(current)
  }

  dropUpdate(list:Task[]){
    this.setProducts(list)
  }
}
