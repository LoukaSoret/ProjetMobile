import { Component, OnInit } from '@angular/core';
import { List } from '../models/list';
import { ListService } from '../services/list.service';
import { ModalController } from '@ionic/angular';
import { CreateListComponent } from '../modals/create-list/create-list.component';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss']
})
export class HomePage implements OnInit {

  public lists: List[];

  constructor(
    private listService: ListService,
    private modalController: ModalController,
  ) {}

  ngOnInit(): void {
    this.listService.create('List 1');
    this.listService.create('List 2');
    this.lists = this.listService.getAll();
  }

  async openCreateListModal() {
    const modal = await this.modalController.create({
      component: CreateListComponent
    });
    return await modal.present();
  }
}
