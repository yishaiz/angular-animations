import {Component} from '@angular/core';

@Component({
  selector: 'app-root',
  styleUrls: ['./app.component.css'],
  templateUrl: './app.component.html'

})

export class AppComponent {
  numberOfNotCompletedItems: number;

  tempVaribaleForClearCompleted: number = 0;


  displayNumberOfItemsLeft(numberOfItems): void {
    this.numberOfNotCompletedItems = numberOfItems;
  }

  clearCompletedItems(): void {
    console.log('clear completed');

    this.tempVaribaleForClearCompleted += 1;

  }
}
