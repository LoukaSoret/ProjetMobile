import { Injectable } from '@angular/core';
import { List } from '../models/list';
import { Todo } from '../models/todo';

@Injectable({
  providedIn: 'root'
})
export class ListService {

  private lists: List[];

  constructor() { 
    this.lists = [];
  }

  public getAll(): List[] {
    return this.lists;
  }

  public getOne(id: string): List {
    return this.lists.find(list => list.getId() === id);
  }

  public create(name: string): void {
    this.lists.push(new List(name));
  }

  public saveList(list: List): void {
    console.log(this.lists);
    console.log(list);
    const index = this.lists.findIndex(list => list.getId() === list.getId());
    console.log(index);
    if(index >= 0)
      this.lists[index] = list;
  }
}
