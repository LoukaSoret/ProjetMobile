export class Todo {

    private name: string;
    private description: string;
    private done: boolean;
    private id: string;

    constructor(name: string, description: string, done: boolean){
        this.name = name;
        this.description = description;
        this.done = done;
        this.id = Math.random().toString(20).substr(2, 6)
    }

    public getName(): string {
        return this.name;
    }

    public setName(name: string): void {
        this.name = name;
    }

    public getDescription(): string {
        return this.description;
    }

    public setDescription(description: string): void {
        this.description = description;
    }

    public isDone(): boolean {
        return this.done;
    }

    public setDone(isDone: boolean): void {
        this.done = isDone;
    }

    public getId(): string {
        return this.id;
    }
    
}
