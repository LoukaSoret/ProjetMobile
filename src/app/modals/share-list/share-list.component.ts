import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {List} from '../../models/list';
import {ModalController, ToastController} from '@ionic/angular';
import {ListService} from '../../services/list.service';
import {AngularFireAuth} from '@angular/fire/auth';

@Component({
  selector: 'app-share-list',
  templateUrl: './share-list.component.html',
  styleUrls: ['./share-list.component.scss'],
})
export class ShareListComponent implements OnInit {
  @Input() list: List;
  private shareForm: FormGroup;

  constructor(private modalController: ModalController, private formBuilder: FormBuilder,
              private listService: ListService, private firebaseAuth: AngularFireAuth,
              private toastController: ToastController) { }

  ngOnInit() {
    this.shareForm = this.formBuilder.group({
      email: ['', [Validators.email, Validators.required]],
    });
  }

  dismissModal() {
    this.modalController.dismiss();
  }

  get errorControl() {
    return this.shareForm.controls;
  }

  share() {
    if (this.shareForm.valid){
      this.firebaseAuth.currentUser
          .then(user => {
            this.list.canRead.push(this.shareForm.get('email').value);
            this.list.canWrite.push(this.shareForm.get('email').value);
            this.listService.updateRights(this.list).then(
                value => {
                  this.presentToast('User successfully added to list', 'primary');
                  this.dismissModal();
                },
                reason => this.presentToast('Error: ' + reason.message, 'danger')
            );
          });
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

  debug() {
    console.log(this.shareForm);
  }
}
