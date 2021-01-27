import { Component, OnInit } from '@angular/core';
import { ListService } from 'src/app/services/list.service';
import { List } from 'src/app/models/list';
import { ActivatedRoute } from '@angular/router';
import { Todo } from 'src/app/models/todo';
import { ModalController } from '@ionic/angular';
import { CreateTodoComponent } from 'src/app/modals/create-todo/create-todo.component';

@Component({
  selector: 'app-list-details',
  templateUrl: './list-details.page.html',
  styleUrls: ['./list-details.page.scss'],
})
export class ListDetailsPage implements OnInit {

  private list: List;

  constructor(
    private listService: ListService,
    private activatedRoute: ActivatedRoute,
    private modalController: ModalController
  ) { }

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        this.list = this.listService.getOne(id);
      }
    });
  }

  async openCreateTodoModal() {
    const modal = await this.modalController.create({
      component: CreateTodoComponent,
      componentProps: {
        'list': this.list
      }
    });
    return await modal.present();
  }

  removeTodo(todo: Todo): void {
    this.listService.removeTodo(todo, this.list.getId());
  }

}
