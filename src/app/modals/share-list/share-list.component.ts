import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {List} from '../../models/list';
import {ModalController} from '@ionic/angular';
import {ListService} from '../../services/list.service';
import {AngularFireAuth} from '@angular/fire/auth';

@Component({
  selector: 'app-share-list',
  templateUrl: './share-list.component.html',
  styleUrls: ['./share-list.component.scss'],
})
export class ShareListComponent implements OnInit {

  private shareForm: FormGroup;

  constructor(private modalController: ModalController, private formBuilder: FormBuilder,
              private listService: ListService, private firebaseAuth: AngularFireAuth) { }

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
          console.log('shared !');
          });
    }
  }

  debug() {
    console.log(this.shareForm);
  }
}
