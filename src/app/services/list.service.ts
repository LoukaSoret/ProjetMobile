import { Injectable } from '@angular/core';
import { List } from '../models/list';
import { Todo } from '../models/todo';
import { AngularFirestoreCollection, AngularFirestore } from '@angular/fire/firestore';
import { map, switchMap, tap } from 'rxjs/operators'
import { Observable, of } from 'rxjs';
import { FirebaseApp } from '@angular/fire';

@Injectable({
  providedIn: 'root'
})
export class ListService {
  private readListCollection: AngularFirestoreCollection<List>;
  private writeListCollection: AngularFirestoreCollection<List>;

  constructor(private firestore: AngularFirestore, private firebase: FirebaseApp) {
      this.readListCollection = this.firestore.collection<List>('lists',
              ref => ref.where('canRead', 'array-contains', this.firebase.auth().currentUser.email));
      this.writeListCollection = this.firestore.collection<List>('lists',
              ref => ref.where('canWrite', 'array-contains', this.firebase.auth().currentUser.email));
  }

  getAll(): Observable<List[]>{
    return this.readListCollection.snapshotChanges()
    .pipe(
      map(data => this.convertSnapshotData<List>(data))
    );
  }

  getOne(id: string): Observable<List>{
    return this.readListCollection.doc<List>(id).valueChanges()
    .pipe(
      switchMap(
        list => this.readListCollection.doc<List>(id).collection<Todo>('todos').snapshotChanges()
        .pipe(
          map(data => {
            list.todos = this.convertSnapshotData<Todo>(data);
            return list;
          })
        )
      )
    );
  }

  create(list: List): void {
    this.firestore.collection('lists',
    ref => ref.where('canWrite', 'array-contains', this.firebase.auth().currentUser.email)).add(
        Object.assign({}, {
          name: list.name,
          canRead: list.canRead,
          canWrite: list.canWrite,
          owner: list.owner
        })
    );
  }

  getTodo(listId: string, todoId: string): Observable<Todo>{
    return this.readListCollection.doc<List>(listId).collection<Todo>('todos').doc<Todo>(todoId).valueChanges()
    .pipe(
      tap(console.log)
    );
  }

  addTodo(todo: Todo, listId: string): void{
    this.writeListCollection.doc<List>(listId).collection<Todo>('todos').add(Object.assign({}, todo));
  }

  updateTodo(todo: Todo, listId: string): void{
    this.writeListCollection.doc<List>(listId).collection<Todo>('todos').doc<Todo>(todo.id).set(Object.assign({}, todo));
  }

  deleteTodo(todo: Todo, listId: string): void{
    this.writeListCollection.doc<List>(listId).collection<Todo>('todos').doc<Todo>(todo.id).delete();
  }

  delete(list: List): void{
    this.writeListCollection.doc<List>(list.id).delete(); // .delete();
  }

  private convertSnapshotData<T>(ssData) {
    return ssData.map(d => {
      const id = d.payload.doc.id
      return { id, ...d.payload.doc.data() } as T;
    });
  }
}
