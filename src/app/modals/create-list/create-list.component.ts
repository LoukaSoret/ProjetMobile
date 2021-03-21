import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ListService } from 'src/app/services/list.service';
import { List } from 'src/app/models/list';
import { AngularFireAuth } from '@angular/fire/auth';

@Component({
  selector: 'app-create-list',
  templateUrl: './create-list.component.html',
  styleUrls: ['./create-list.component.scss'],
})
export class CreateListComponent implements OnInit {

  newListForm: FormGroup;

  constructor(private modalController: ModalController, private formBuilder: FormBuilder,
              private listService: ListService, private firebaseAuth: AngularFireAuth) {

  }

  ngOnInit(){
    this.newListForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
   })
  }

  dismissModal() {
      this.modalController.dismiss(); 
  }

  createNewList(){
    if(this.newListForm.valid){
      this.firebaseAuth.currentUser
      .then(user => {
        this.listService.create(new List(this.newListForm.get('name').value, user.email));
        this.dismissModal();
      });
    }
  }

  get errorControl() {
    return this.newListForm.controls;
  }

}
