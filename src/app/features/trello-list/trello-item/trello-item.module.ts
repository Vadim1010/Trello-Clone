import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DragulaModule } from 'ng2-dragula';
import { TrelloItemComponent } from './trello-item.component';
import { TaskItemModule } from './task-item';

@NgModule({
  imports: [
    CommonModule,
    DragulaModule,
    TaskItemModule
  ],
  declarations: [
    TrelloItemComponent
  ],
  exports: [TrelloItemComponent],
})
export class TrelloItemModule {
}
