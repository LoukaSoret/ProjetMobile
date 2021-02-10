import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { CreateTodoComponent } from 'src/app/modals/create-todo/create-todo.component';
import { ListService } from 'src/app/services/list.service';
import { List } from 'src/app/models/list';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-list-details',
  templateUrl: './list-details.page.html',
  styleUrls: ['./list-details.page.scss'],
})
export class ListDetailsPage implements OnInit {
  private list: List;

  constructor(private listService: ListService, private modalController: ModalController, private route: ActivatedRoute) {
   }

  ngOnInit() {
  const listId = this.route.snapshot.paramMap.get('listId');
  this.list = this.listService.getOne(listId)
  }

  async openCreateModal(){
    const modal = await this.modalController.create({
      component: CreateTodoComponent,
      componentProps: {
        'listId': this.list.id
      }
    });
    return await modal.present();
  }

  delete(todo){
    this.listService.deleteTodo(todo, this.list.id);
  }

}
