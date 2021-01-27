import { Todo } from './todo';

export class List {

    private todos: Todo[];
    private name: string;
    private id: string;

    constructor(name : string){
        this.name = name;
        this.todos = [];
        this.id = Math.random().toString(20).substr(2, 6)
    }

    public getTodos(): Todo[] {
        return this.todos;
    }

    public addTodo(todo: Todo): void {
        this.todos.push(todo);
    }

    public removeTodo(todo: Todo): void {
        this.todos.splice(this.todos.indexOf(todo), 1);
    }

    public getName(): string {
        return this.name;
    }

    public setName(name: string): void {
        this.name = name;
    }

    public getId(): string {
        return this.id;
    }
}
