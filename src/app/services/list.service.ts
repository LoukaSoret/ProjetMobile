import { Injectable } from '@angular/core';
import { List } from '../models/list';
import { Todo } from '../models/todo';
import { AngularFirestoreCollection, AngularFirestore } from '@angular/fire/firestore';
import { map, switchMap, tap } from 'rxjs/operators'
import { Observable, of } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/auth';
import { FirebaseApp } from '@angular/fire';

@Injectable({
  providedIn: 'root'
})
export class ListService {
  private listCollection: AngularFirestoreCollection<List>;

  constructor(private firestore: AngularFirestore, private firebase: FirebaseApp) {
      this.listCollection = this.firestore.collection<List>('lists', ref => ref.where('canRead', 'array-contains', this.firebase.auth().currentUser.email)
   );
  }

  getAll(): Observable<List[]>{
    return this.listCollection.snapshotChanges()
    .pipe(
      map(data => this.convertSnapshotData<List>(data))
    );
  }

  getOne(id: string): Observable<List>{
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

  getTodo(listId: string, todoId: string): Observable<Todo>{
    return this.listCollection.doc<List>(listId).collection<Todo>('todos', ref => ref.where('canRead', 'array-contains', this.firebase.auth().currentUser.email)).doc<Todo>(todoId).valueChanges()
    .pipe(
      tap(console.log)
    )
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
