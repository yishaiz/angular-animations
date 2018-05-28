import  {Injectable} from '@angular/core';

import {TodoItem} from "../models/todo-item.model";

@Injectable()
export class TodoListService {

  todoList: Array<TodoItem> = [
    {title: 'RSVP Yes', completed: true, editing: false,  isHidden : false},
    {title: 'Set up environment', completed: true, editing: false,  isHidden : false},
    {title: 'Clone project', completed: false, editing: false,  isHidden : false},
    {title: 'Come to meetup', completed: false, editing: false,  isHidden : false},
  ];

  getTodos(): Promise<TodoItem[]> {
    return Promise.resolve(
      this.todoList
    );
  }

  getTotalCount(){
   return this.todoList.length;
  }

  destroyItem(item: TodoItem): void {
    const index = this.todoList.indexOf(item);

    this.todoList.splice(index, 1);
  }

  getNotCompletedItemsCount(): number {

/*
    let notCompletedItems = this.todoList.filter((item: any) => {
      return item.completed == false;
    })

    console.log(notCompletedItems);
*/

    let remainItemsCount = this.todoList.filter((item: TodoItem) => {
      return item.completed == false;
    }).length;

    return remainItemsCount;
  }


  clearCompleted(): void {
    let completed = this.todoList.filter((item: TodoItem) => {
      return item.completed == true;
    });

    completed.forEach((item: TodoItem)=> {
      this.destroyItem(item);
    });
  }

  addItem(title: string): void {
    this.todoList.push(new TodoItem(title));
  }

}
