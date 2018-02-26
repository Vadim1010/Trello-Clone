import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { Subscription } from 'rxjs/Subscription';
import { Observable } from 'rxjs/Observable';
import { DragulaService } from 'ng2-dragula';
import { Trello, Task } from './trello-list.model';
import { TrelloListService } from './trello-list.service';
import { AuthenticationService } from '../../core';
import { TaskDetailComponent } from './task-detail';
import { AuthenticationComponent } from '../../shared';
import { CONFIG_MODAL } from '../../app.config';

@Component({
  selector: 'tt-trello-list',
  templateUrl: './trello-list.component.html',
  styleUrls: ['./trello-list.component.scss']
})
export class TrelloListComponent implements OnInit, OnDestroy {
  public trelloList: Trello[];
  public userStatus: boolean;

  private subscriptions: Subscription[] = [];

  constructor (private trelloListService: TrelloListService,
               private dragulaService: DragulaService,
               private authentication: AuthenticationService,
               private dialog: MatDialog) {
    dragulaService.setOptions('first-bag', {
      moves: () => {
        return true;
      }
    });
  }

  public ngOnInit (): void {
    this.subscriptions.push(this.trelloListService.getTrello()
      .subscribe(
        (trellos: Trello[]) => {
          this.trelloList = trellos;
        }));

    this.subscriptions.push(this.authentication.userAuthorization.subscribe(
      (userAuthorization: boolean) => {
        this.userStatus = userAuthorization;
      }));
  }

  public openDialog (task: any): void {
    this.userStatus
      ? this.showModal(TaskDetailComponent, task)
      : this.showModal(AuthenticationComponent);
  }

  public createTrello (event: Event): void {
    const value: string = (<HTMLInputElement> event.target).value;

    (<HTMLInputElement> event.target).value = '';

    this.subscriptions.push(this.trelloListService.setTrello(value)
      .subscribe(
        (trello: Trello) => {
          this.trelloList.push(trello);
        }));
  }

  public ngOnDestroy () {
    if (this.subscriptions.length) {
      this.subscriptions.forEach((elem: Subscription): void => {
        elem.unsubscribe();
      });
    }
  }

  public deleteTrello (id: number): void {
    this.subscriptions.push(this.trelloListService.deleteTrello(id)
      .subscribe(() => {
        this.trelloList = this.trelloList.filter((elem: Trello) => {
          return elem.id !== id;
        });
      }));
  }

  public changeTrelloTitle (trello: Trello): void {
    this.subscriptions.push(this.trelloListService.changeTrello(trello)
      .subscribe(() => {
        this.trelloList = this.trelloList.map((elem) => {
          if (elem.id === trello.id) {
            elem.title = trello.title;
          }

          return elem;
        });
      }));
  }

  public changeTrello (trello: Trello): void {
    this.subscriptions.push(this.trelloListService.changeTrello(trello)
      .subscribe());
  }

  private showModal (model, trello?: Trello): void {
    const dialogRef = this.dialog.open(model, {
      width: CONFIG_MODAL[model],
      data: trello
    });
  }
}
