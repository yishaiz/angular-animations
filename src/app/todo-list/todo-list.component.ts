import { Component, Input, Output, OnInit, EventEmitter, OnChanges, SimpleChange } from '@angular/core';
import { TodoListService }                                                         from '../services/todo-list.service';
import { TodoItem }                                                                from '../models/todo-item.model';

// import { trigger, style, transition, animate, group }                              from '@angular/core';

import { trigger, style, transition, animate, group, state } from '@angular/animations';

@Component({
  selector : 'app-todo-list',
  styleUrls : [ './todo-list.component.css' ],

  template : `
    <ul class="todo-list">

      <app-todo-item *ngFor="let item of todoList"
                     [item]="item"

                     [@isVisibleChanged]="!item.isHidden"

                     style="display: block"

                     class="item-animation"
                     (destroy)="destroyItem($event)"
                     (notifyCompletedChange)="getNotCompletedItemsCount()"

                     [@itemAnim]
                     (@itemAnim.start)="animStart($event)"
                     (@itemAnim.done)="animEnd($event)"

      ></app-todo-item>

      <!--&gt;</app-todo-item>-->

    </ul>
  `

  ,
  animations : [
    trigger('isVisibleChanged', [


      state('true', style({ color : 'red', opacity : 1, transform : 'scale(1.0)' })),

      state('false', style({ color : 'green', opacity : 0, transform : 'scale(0)' })),


      transition('1 => 0', animate('1300ms')),

      transition('0 => 1', animate('3900ms'))

    ])
    ,
    trigger('itemAnim', [
      transition(':enter', [

        // style({ color : 'yellow' ,transform : 'translateX(-100%)' }),
        style({ transform : 'translateX(-100%)' }),
        animate(1350),
      ])


      /*transition(':enter', [

        style({ transform : 'translateX(-100%)' }),
        animate(1350),
        style({ color : 'yellow' }),
        animate(1050)
      ])*/

      ,
      transition(':leave', [
        group([
          animate('0.2s ease', style({
            // animate('0.2s ease', style({
            color : 'blue',
            transform : 'translate(150px,25px)'
          })),
          animate('0.5s 0.2s ease', style({
            // animate('1.1s 0.5s ease', style({


            opacity : 0
          }))
        ])
      ])
    ])
  ]
})

export class TodoListComponent implements OnInit, OnChanges {

  @Input() detectChangeInParent : any;

  changeLog : string[] = [];

  @Output() notifyNumberOfItemsLeft : EventEmitter<any> = new EventEmitter();

  constructor (private todoService : TodoListService) {
    //todoService
  }

  todoList : Array<TodoItem> = [];


  ngOnInit () : void {
    this.getTodos();

    this.getNotCompletedItemsCount();
  }


  getTodos () : void {
    this.todoService.getTodos().then(
      todos => {
        this.todoList = todos;

        this.getNotCompletedItemsCount();
      }
    );
  }

  animStart (event) {
    console.log('Animation Started');
    // debugger;
    // event...addCllass
    // event.element.classList.add('item-hidden')
    // event.element.classList.add('yellow')
    // do more stuff
  }

  animEnd (event) {
    console.log('Animation Ended');
    // do more stuff
  }

  destroyItem (item : TodoItem) : void {
    console.log('remove item');

    // item.isHidden=true;
    item.isHidden = !item.isHidden;

    return;

    //can be also as promise
    // this.todoService.destroyItem(item);
    //
    // this.getTodos();

    //this.getNotCompletedItemsCount();
  }

  getNotCompletedItemsCount () : void {

    let remainItemsCount = this.todoService.getNotCompletedItemsCount();

    this.notifyNumberOfItemsLeft.emit(remainItemsCount);
  }

  ngOnChanges (changes : { [ propKey : string ] : SimpleChange }) : void {
    let log : string[] = [];

    for (let propName in changes) {
      let changedProp = changes[ propName ];
      let from = JSON.stringify(changedProp.previousValue);
      let to = JSON.stringify(changedProp.currentValue);
      log.push(`${propName} changed from ${from} to ${to}`);

      if (to != '0') {
        console.log('clear completed detection');

        this.clearCompleted();
      }
    }
    this.changeLog.push(log.join(', '));

    console.log(this.changeLog);
  }

  clearCompleted () : void {
    this.todoService.clearCompleted();

    this.getTodos();
  }
}

