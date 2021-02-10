import { Injectable } from '@angular/core';
import { List } from '../models/list';
import { Todo } from '../models/todo';

@Injectable({
  providedIn: 'root'
})
export class ListService {
  public lists: List[];

  constructor() { 
    this.lists = [];
  }

  getAll(){
    return this.lists;
  }

  getOne(id: string){
    return Object.assign({}, this.lists.find(l => l.id === id));
  }

  create(list: List){
    this.lists.push(list);
  }

  addTodo(todo: Todo, listId: string){
    this.getOne(listId).todos.push(todo);
  }

  deleteTodo(todo: Todo, listId: string){
    const list = this.getOne(listId);
    list.todos.splice(list.todos.indexOf(todo), 1);
  }

  delete(list){
    this.lists.splice(this.lists.indexOf(list), 1);
  }
}
