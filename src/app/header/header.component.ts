import { Component } from '@angular/core';

@Component({
  selector : 'app-header',
  styleUrls : [ './header.component.css' ],

  template : `
    <header class="header">
      <h1>{{ title }}</h1>
      <app-todo-input></app-todo-input>
    </header>
  `
})

export class HeaderComponent {

  title : string = 'Todos';

}
