import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Todo } from 'src/app/models/todo';
import { ListService } from 'src/app/services/list.service';
import { Observable, of } from 'rxjs';
import { Plugins } from '@capacitor/core';

@Component({
  selector: 'app-todo-details',
  templateUrl: './todo-details.page.html',
  styleUrls: ['./todo-details.page.scss'],
})
export class TodoDetailsPage implements OnInit {

  private todo: Observable<Todo>;
  private listId: string;

  constructor(private router: Router, private listService: ListService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.listId = this.route.snapshot.paramMap.get('listId');
    if(this.router.getCurrentNavigation().extras.state){
      this.todo = of(this.router.getCurrentNavigation().extras.state as Todo);
    }else{
      this.todo = this.listService.getTodo(this.listId, this.route.snapshot.paramMap.get('todoId'));
    }
  }

  checkboxChange(event) {
    this.todo.subscribe(todo => {
      todo.isDone = event.detail.checked;
      this.listService.updateTodo(todo, this.listId);
    });
  }

  shareTodo() {
    const { Share } = Plugins;
    this.todo.subscribe(todo => {
      let output = (todo.isDone? '☑ ' : '☐ ') + todo.name + (todo.description? ';\n'+ todo.description : '');
      Share.share({
        title: todo.name,
        text: output,
        dialogTitle: 'Share your todo'
      })
    });    
  }
}
