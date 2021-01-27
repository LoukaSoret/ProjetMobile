import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ListService } from 'src/app/services/list.service';
import { ModalController } from '@ionic/angular';
import { Todo } from 'src/app/models/todo';
import { List } from 'src/app/models/list';

@Component({
  selector: 'app-create-todo',
  templateUrl: './create-todo.component.html',
  styleUrls: ['./create-todo.component.scss'],
})
export class CreateTodoComponent implements OnInit {

  @Input()
  private list: List;
  private todoGroup: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private listService: ListService,
    private modalController: ModalController
  ) {
    this.todoGroup = this.formBuilder.group({
      name: ['', Validators.required],
      description: [''],
      isDone: [''],
    });
  }

  ngOnInit() {}

  onSubmit() {
    if(this.todoGroup.valid){
      const todo = new Todo(this.todoGroup.value['name'], this.todoGroup.value['description'], this.todoGroup.value['isDone']);
      this.listService.addTodo(todo, this.list.getId());
      this.modalController.dismiss();
    }
  }

  dismissModal() {
    this.modalController.dismiss();
  }
}
