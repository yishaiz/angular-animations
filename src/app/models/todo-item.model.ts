export class TodoItem {
  constructor (
    public title : string = '',
    public completed : boolean = false,
    public editing : boolean = false,
    public isHidden : boolean = false) {
  }
}
