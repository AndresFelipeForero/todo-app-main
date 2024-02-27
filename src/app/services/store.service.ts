import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StoreService {

  private taskStore = new BehaviorSubject<any[]>([])

  constructor() { }

  getTask(){
    return this.taskStore.asObservable();
  }

  postTask(task:any){
    let current = this.taskStore.getValue()
    this.taskStore.next([task, ...current])
  }
}
