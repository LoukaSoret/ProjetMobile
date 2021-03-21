import { Component, OnInit } from '@angular/core';
import { List } from '../models/list';
import { ListService } from '../services/list.service';
import {ModalController, ToastController} from '@ionic/angular';
import { CreateListComponent } from '../modals/create-list/create-list.component';
import { Observable } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { ShareListComponent } from '../modals/share-list/share-list.component';
import {FirebaseApp} from '@angular/fire';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  private lists: Observable<List[]>;

  constructor(private listService: ListService, private modalController: ModalController,
              private auth: AngularFireAuth, private router: Router,
              private toastController: ToastController, private firebase: FirebaseApp) {}

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
    if (list.owner === this.firebase.auth().currentUser.email) {
      this.listService.delete(list).then(
          value => {},
          reason => this.presentToast('Error: ' + reason.message, 'danger')
      );
    } else {
      return this.presentToast('Error: Insufficient permission. Only the owner of a list can delete it', 'danger');
    }
  }

    async share(list: List) {
      if (list.owner === this.firebase.auth().currentUser.email) {
        const modal = await this.modalController.create({
          component: ShareListComponent,
          componentProps: {
            list
          }
        });
        return await modal.present();
      } else {
        return this.presentToast('Error: Insufficient permission. Only the owner of a list can share it', 'danger');
      }
    }

  async presentToast(message: string, color: string) {
    const toast = await this.toastController.create({
      message,
      color,
      duration: 2000
    });
    toast.present();
  }

  logout() {
    this.auth.signOut().then(
      () => {
        this.router.navigate(['login']);
      },
    );
  }
}
