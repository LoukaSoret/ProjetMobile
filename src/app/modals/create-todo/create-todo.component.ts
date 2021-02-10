import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ListService } from 'src/app/services/list.service';
import { ModalController } from '@ionic/angular';
import { Todo } from 'src/app/models/todo';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-create-todo',
  templateUrl: './create-todo.component.html',
  styleUrls: ['./create-todo.component.scss'],
})
export class CreateTodoComponent implements OnInit {
  @Input() listId: string;

  private newTodoForm: FormGroup;

  constructor(private listService: ListService, private formBuilder: FormBuilder, private modalController: ModalController) { }

ngOnInit(){
    this.newTodoForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      description: ['', [Validators.maxLength(255)]],
   })
  }

  dismissModal() {
      this.modalController.dismiss(); 
  }

  createNewTodo(){
    if(this.newTodoForm.valid){
      this.listService.addTodo(new Todo(this.newTodoForm.get('name').value, this.newTodoForm.get('description').value), this.listId);
      this.dismissModal();
    }
  }

  get errorControl() {
    return this.newTodoForm.controls;
  }

}
