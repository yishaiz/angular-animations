import { Component, Input, Output, EventEmitter }            from '@angular/core';
import { TodoItem }                                          from '../models/todo-item.model';
import { trigger, style, transition, animate, group, state } from '@angular/animations';

@Component({
  selector : 'app-todo-item',
  styleUrls : [ './todo-item.component.css' ],

  template : `


    <li [ngClass]="getItemClass(item)"
    >
      <!--/[@isVisibleChanged]="!item.isHidden"-->
      
      <div class="view">
        <input class="toggle"
               type="checkbox"
               [checked]="item.completed"

               #completedCheckbox
               (change)="changeCompleted(item, completedCheckbox.checked)">

        <label (click)="editItem(item, $event, editValue)">{{ item.title }}</label>

        <button class="destroy"
                (click)="destroyItem(item)">
        </button>
      </div>
      <input class="edit"
             #editValue
             [value]="item.editedTitle"
             (keyup.enter)="saveChange(item, editValue)"
             (keyup.escape)="undoChange(item)"
             (blur)="undoChange(item)">

    </li>

  `/*,
  animations : [

    trigger('isVisibleChanged', [

      state('true', style({ opacity : 1, transform : 'scale(1.0)' })),

      state('false', style({ opacity : 0, transform : 'scale(0.0)' })),

      /!*    state('true', style({  'background-color' : 'yellow', opacity : 1, transform : 'scale(1.0)' })),

         state('false', style({ 'background-color' : 'green', opacity : 0, transform : 'scale(0.0)' })),

      *!/
      transition('1 => 0', animate('300ms')),

      transition('0 => 1', animate('900ms'))

    ]) ]*/
})

export class TodoItemComponent {

  @Input() item : TodoItem;

  @Output() destroy : EventEmitter<any> = new EventEmitter();
  @Output() notifyCompletedChange : EventEmitter<any> = new EventEmitter();


  getItemClass (item : TodoItem) : any {
    return {
      completed : item.completed,
      editing : item.editing
    };
  }

  changeCompleted (item : TodoItem, checked : boolean) : void {
    item.completed = checked;

    this.notifyCompletedChange.emit(item);
  }

  changeCompletedOtherWay (item : TodoItem) : void {
    item.completed = !item.completed;
  }

  editItem (item : TodoItem, event : any, editValue : any) : void {
    console.log(event);
    console.log(editValue);

    item.editing = true;

    editValue.value = item.title;

    console.log(editValue);
  }

  saveChange (item : TodoItem, editValue : any) : void {
    console.log('saveChange');

    item.title = editValue.value;
    item.editing = false;
  }

  undoChange (item : TodoItem) : void {
    console.log('undoChange');
    item.editing = false;
  }

  destroyItem (item : TodoItem) : void {
    this.destroy.emit(item);
  }

}
