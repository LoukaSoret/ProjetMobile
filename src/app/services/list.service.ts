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

  public addTodo(todo: Todo, listId: string): void {
    this.getOne(listId).addTodo(todo);
  }

  public removeTodo(todo: Todo, listId: string): void {
    this.getOne(listId).removeTodo(todo);
  }
}
