import { Component, OnInit } from '@angular/core';
import { List } from '../models/list';
import { ListService } from '../services/list.service';
import { ModalController } from '@ionic/angular';
import { CreateListComponent } from '../modals/create-list/create-list.component';
import { Observable } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import {ShareListComponent} from '../modals/share-list/share-list.component';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  private lists: Observable<List[]>;

  constructor(private listService: ListService, private modalController: ModalController, private auth: AngularFireAuth, private router: Router) {}

  ngOnInit(){
    this.lists = this.listService.getAll();
  }

  async openCreateModal(){
    const modal = await this.modalController.create({
      component: CreateListComponent,
    });
    return await modal.present();
  }

  async delete(list){
    this.listService.delete(list);
  }

    async share(list: List) {
      const modal = await this.modalController.create({
        component: ShareListComponent,
      });
      return await modal.present();
    }

  logout() {
    this.auth.signOut().then(
      () => {
        this.router.navigate(['login']);
      },
    );
  }
}
