export class Todo {
    constructor(name, description){
        this.id = Math.floor(Math.random() * 10000000000).toString() + Date.now().toString();
        this.name = name;
        this.description = description;
        this.isDone = false;
    }
    
    id: string;
    name: string;
    description: string;
    isDone: boolean;
}
