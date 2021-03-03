import { Injectable } from '@angular/core';
import { List } from '../models/list';
import { Todo } from '../models/todo';
import { AngularFirestoreCollection, AngularFirestore } from '@angular/fire/firestore';
import { map, switchMap, tap } from 'rxjs/operators'
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ListService {
  private listCollection: AngularFirestoreCollection<List>

  constructor(private firestore: AngularFirestore) { 
    this.listCollection = this.firestore.collection<List>('lists');
  }

  getAll(): Observable<List[]>{
    return this.listCollection.snapshotChanges()
    .pipe(
      map(data => this.convertSnapshotData<List>(data))
    );
  }

  getOne(id: string): Observable<List>{
    console.log(id)
    return this.listCollection.doc<List>(id).valueChanges()
    .pipe(
      switchMap(
        list => this.listCollection.doc<List>(id).collection<Todo>('todos').snapshotChanges()
        .pipe(
          map(data => {
            list.todos = this.convertSnapshotData<Todo>(data);
            return list;
          })
        )
      )
    )
  }

  create(list: List): void {
    this.firestore.collection('lists').add(Object.assign({},{
      name: list.name,
      canRead: list.canRead,
      canWrite: list.canWrite,
      owner: list.owner}));
  }

  addTodo(todo: Todo, listId: string): void{
    this.listCollection.doc<List>(listId).collection<Todo>('todos').add(Object.assign({}, todo));
  }

  deleteTodo(todo: Todo, listId: string): void{
    this.listCollection.doc<List>(listId).collection<Todo>('todos').doc<Todo>(todo.id).delete();
  }

  delete(list: List): void{
    this.listCollection.doc<List>(list.id).delete();
  }

  private convertSnapshotData<T>(ssData) {
    return ssData.map(d => {
      const id = d.payload.doc.id
      return { id, ...d.payload.doc.data() } as T;
    })
  }
}
