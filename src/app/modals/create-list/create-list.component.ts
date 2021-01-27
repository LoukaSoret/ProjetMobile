import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ListService } from 'src/app/services/list.service';
import { List } from 'src/app/models/list';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-create-list',
  templateUrl: './create-list.component.html',
  styleUrls: ['./create-list.component.scss'],
})
export class CreateListComponent implements OnInit {

  private listGroup: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private listService: ListService,
    private modalController: ModalController
  ) {
    this.listGroup = this.formBuilder.group({
      name: ['', Validators.required],
    });
  }

  ngOnInit() {}

  onSubmit() {
    if(this.listGroup.valid){
      this.listService.create(this.listGroup.value['name']);
      this.modalController.dismiss();
    }
  }

  dismissModal() {
    this.modalController.dismiss();
  }
}
