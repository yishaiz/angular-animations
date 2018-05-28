import {Component, Input, Output, EventEmitter} from '@angular/core';
import {TodoListService} from '../services/todo-list.service';

@Component({
  selector: 'app-footer',
  styleUrls: ['./footer.component.css'],

  template: `
    <footer class="footer">
      <span class="todo-count">

        <!--<strong>{{itemsLeft}}</strong> item left-->
        <strong>{{ getCountMessage() }}</strong>
        
      </span>
      <button class="clear-completed"
        (click) = "clearCompletedItems()">Clear completed</button>
    </footer>
  `
})

export class FooterComponent {
  @Input() itemsLeft: number;
  @Output() clearCompleted: EventEmitter<any> = new EventEmitter();

  constructor(private todoListService: TodoListService) {
  }


  clearCompletedItems(): void {
    console.log("clearCompletedItems");

    this.clearCompleted.emit();
  }


  getCountMessage(): string {

    const total: number = this.todoListService.getTotalCount();

    return `
      ${this.itemsLeft === 0 ? 'no' : this.itemsLeft} 
      item${this.itemsLeft === 1 ? '' : 's'} left (out of ${total})
      `;
  }

}
