import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Trello, Task } from '../trello-list.model';
import { DEFAULT_TASK } from '../trello.config';

@Component({
  selector: 'tt-trello-item',
  templateUrl: './trello-item.component.html',
  styleUrls: ['./trello-item.component.scss']
})
export class TrelloItemComponent {
  public changeTrello: boolean = false;

  @Input() public trelloItem: Trello;
  @Input() public userStatus: boolean;

  @Output() private openDialogHandler: EventEmitter<any> = new EventEmitter<any>();
  @Output() private deleteTrelloHandler: EventEmitter<number> = new EventEmitter<number>();
  @Output() private changeTrelloHandler: EventEmitter<Trello> = new EventEmitter<Trello>();
  @Output() private addTaskHandler: EventEmitter<Trello> = new EventEmitter<Trello>();
  @Output() private deleteTaskHandler: EventEmitter<Trello> = new EventEmitter<Trello>();

  constructor () {
  }

  public openDialog (task: Task): void {
    this.openDialogHandler.emit({trello: this.trelloItem, idTask: task.id});
  }

  public clickDeleteTrello (id: number): void {
    this.deleteTrelloHandler.emit(id);
  }

  public clickChange (): void {
    this.changeTrello = !this.changeTrello;
  }

  public onChangeTitleTrello (event: Event): void {
    const newTrello = Object.assign(this.trelloItem, {title: (<HTMLInputElement> event.target).value});

    this.changeTrelloHandler.emit(newTrello);

    this.changeTrello = false;
  }

  public addTask (event: Event): void {
    const newId = this.randomInteger();

    this.trelloItem.taskItems.push(
      Object.assign({}, DEFAULT_TASK, {id: newId, title: (<HTMLInputElement> event.target).value})
    );

    (<HTMLInputElement> event.target).value = '';

    this.addTaskHandler.emit(this.trelloItem);
  }

  public deleteTask (id: number): void {
    this.trelloItem.taskItems = this.trelloItem.taskItems.filter((elem: Task) => {
      return elem.id !== id;
    });

    this.deleteTaskHandler.emit(this.trelloItem);
  }

  private randomInteger(): number {
    const min = 1000;
    const max = 1000000;

    let rand = min - 0.5 + Math.random() * (max - min + 1);
    rand = Math.round(rand);

    return rand;
  }
}
