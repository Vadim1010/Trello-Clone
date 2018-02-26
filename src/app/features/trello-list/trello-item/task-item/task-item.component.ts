import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Task } from '../../trello-list.model';

@Component({
  selector: 'tt-tack-item',
  templateUrl: './task-item.component.html',
  styleUrls: ['./task-item.component.scss']
})
export class TaskItemComponent {
  @Input() public task: Task;
  @Input() public  userStatus: boolean;

  @Output() private onClickHandler: EventEmitter<Task> = new EventEmitter<Task>();
  @Output() private onDeleteTaskHandler: EventEmitter<number> = new EventEmitter<number>();

  constructor () {
  }

  public openDialog (task: Task): void {
    this.onClickHandler.emit(task);
  }

  public onDeleteTask (task: Task): void {
    this.onDeleteTaskHandler.emit(task.id);
  }
}
