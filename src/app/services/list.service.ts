import { Injectable } from '@angular/core';
import { List } from '../models/list';
import { Todo } from '../models/todo';
import { AngularFirestoreCollection, AngularFirestore } from '@angular/fire/firestore';
import { map, switchMap } from 'rxjs/operators'
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ListService {
  private listCollection: AngularFirestoreCollection<List>

  constructor(private firestore: AngularFirestore) { 
    this.listCollection = this.firestore.collection('lists');
  }

  getAll(): Observable<List[]>{
    return this.listCollection.snapshotChanges()
    .pipe(
      map(data => this.convertSnapshotData(data))
    );
  }

  getOne(id: string): Observable<List>{
    return this.listCollection.doc<List>(id).valueChanges()
    .pipe(
      switchMap(
        list => this.listCollection.doc(id).collection<Todo>('todos').snapshotChanges()
        .pipe(
          map(data => {
            list.todos = this.convertSnapshotData<Todo>(data);
            return list;
          })
        )
      )
    )
  }

  create(list: List): void{
    this.listCollection.add(list);
  }

  addTodo(todo: Todo, listId: string): void{
    this.listCollection.doc<List>(listId).collection<Todo>('todos').add(todo);
  }

  deleteTodo(todo: Todo, listId: string): void{
    this.listCollection.doc<List>(listId).collection<Todo>('todos').doc<List>(todo.id).delete();
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
