import { Todo } from './todo';

export class List {
constructor(name){
    this.id = Math.floor(Math.random() * 10000000000).toString() + Date.now().toString();
    this.todos = [];
    this.name = name;
}

    id: string;
    name: string;
    todos: Todo[];
}
