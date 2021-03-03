import { Todo } from './todo';

export class List {
constructor(name, owner){
    this.id = Math.floor(Math.random() * 10000000000).toString() + Date.now().toString();
    this.todos = [];
    this.name = name;
    this.canRead = [];
    this.canWrite = [];
    this.owner = owner;
}

    id: string;
    name: string;
    todos: Todo[];
    canRead: string[];
    canWrite: string[];
    owner: string;
}
