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

  constructor(private router: Router, private listService: ListService, private route: ActivatedRoute) { }

  ngOnInit() {
    if(this.router.getCurrentNavigation().extras.state){
      this.todo = of(this.router.getCurrentNavigation().extras.state as Todo);
    }else{
      this.todo = this.listService.getTodo(this.route.snapshot.paramMap.get('listId'), this.route.snapshot.paramMap.get('todoId'));
    }
  }

  shareTodo() {
    const { Share } = Plugins;
    this.todo.subscribe(todo => {
      Share.share({
        title: todo.name,
        text: 'Todo: ' + todo.name + '\n Description: ' + todo.description,
        dialogTitle: 'Share your todo'
      })
    });    
  }
}
