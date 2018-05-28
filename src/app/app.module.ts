import { BrowserModule } from '@angular/platform-browser';
import { NgModule }      from '@angular/core';

import { AppComponent }            from './app.component';
import { HeaderComponent }         from './header/header.component';
import { TodoInputComponent }      from './todo-input/todo-input.component';
import { TodoItemComponent }       from './todo-item/todo-item.component';
import { TodoListComponent }       from './todo-list/todo-list.component';
import { FooterComponent }         from './footer/footer.component';
import { TodoListService }         from './services/todo-list.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations : [
    AppComponent,
    HeaderComponent,
    TodoInputComponent,
    FooterComponent,
    TodoListComponent,
    TodoItemComponent
  ],
  imports : [
    BrowserModule,
    // BrowserAnimationsModule
  ],
  providers : [
    TodoListService
  ],
  bootstrap : [
    AppComponent
  ]
})
export class AppModule {
}
