import { Component, Output, EventEmitter } from '@angular/core';
import { TodoListService }                 from '../services/todo-list.service';


@Component({
  selector : 'app-todo-input',
  styleUrls : [ './todo-input.component.css' ],

  template : `
    <input class="new-todo"
           placeholder="What needs to be done?"
           autofocus
           #newTodoInput
           (keyup.enter)="addItem(newTodoInput)">
  `


})

export class TodoInputComponent {

  @Output() addNewItem : EventEmitter<any> = new EventEmitter();

  constructor (private todoListService : TodoListService) {

  }


  addItem (inputElement) : void {

    this.todoListService.addItem(inputElement.value);

    inputElement.value = '';
  }

}
