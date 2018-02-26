import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { Trello, Task } from '../trello-list.model';
import { TrelloListService } from '../trello-list.service';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'tt-trello-detail',
  templateUrl: './task-detail.component.html',
  styleUrls: ['./task-detail.component.scss']
})
export class TaskDetailComponent implements OnInit, OnDestroy {
  public changeIs: boolean = true;
  public index: number;
  public trello: Trello;

  private subscriptions: Subscription[] = [];

  constructor (private dialogRef: MatDialogRef<TaskDetailComponent>,
               private trelloListService: TrelloListService,
               @Inject(MAT_DIALOG_DATA) public date: any) {
  }

  public ngOnInit (): void {
    this.date.trello.taskItems.forEach(
      (elem, index) => {
        if (elem.id === this.date.idTask) {
          this.index = index;
        }
      });

    this.trello = this.date.trello;
  }

  public onNoClick (): void {
    this.dialogRef.close();
  }

  public change (): void {
    this.changeIs = !this.changeIs;
  }

  public onSubmit (task: Task): void {
    this.trello.taskItems[this.index] = Object.assign({}, task);

    this.subscriptions.push(this.trelloListService.changeTrello(this.trello)
      .subscribe());

    this.changeIs = true;
  }

  public ngOnDestroy (): void {
    if (this.subscriptions.length) {
      this.subscriptions.forEach((elem: Subscription): void => {
        elem.unsubscribe();
      });
    }
  }
}
