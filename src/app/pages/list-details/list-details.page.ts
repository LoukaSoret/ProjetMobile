import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { CreateTodoComponent } from 'src/app/modals/create-todo/create-todo.component';
import { ListService } from 'src/app/services/list.service';
import { List } from 'src/app/models/list';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Todo } from 'src/app/models/todo';
import { Plugins } from '@capacitor/core';

@Component({
  selector: 'app-list-details',
  templateUrl: './list-details.page.html',
  styleUrls: ['./list-details.page.scss'],
})
export class ListDetailsPage implements OnInit {
  private list: Observable<List>;
  private listId: string;

    constructor(private listService: ListService, private modalController: ModalController, private route: ActivatedRoute, private router: Router) {
    }

  ngOnInit() {
    this.listId = this.route.snapshot.paramMap.get('listId');
    this.list = this.listService.getOne(this.listId);
  }

  async openCreateModal(){
    const modal = await this.modalController.create({
      component: CreateTodoComponent,
      componentProps: {
        'listId': this.listId
      }
    });
    return await modal.present();
  }

  delete(todo){
    this.listService.deleteTodo(todo, this.listId);
  }

  checkboxChange(todo: Todo) {
    todo.isDone != todo.isDone;
    this.listService.updateTodo(todo, this.listId);
  }

  showDetails(todo: Todo) {
    this.router.navigate(['todo-details', this.listId, todo.id], {state: todo});
  }

  shareTodos() {
    const { Share } = Plugins;
    this.list.subscribe(list => {
      let compiledList = list.name + ':\n';
      for(let i in list.todos){
        const todo = list.todos[i];
        compiledList += todo.isDone? '☑ ' : '☐ '
        compiledList += todo.name + '\n';
      }
      Share.share({
        title: list.name,
        text: compiledList,
        dialogTitle: 'Share your todo list'
      })
    });    
  }
}
