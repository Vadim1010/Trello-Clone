import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TrelloListComponent } from './trello-list.component';
import { TrelloListService } from './trello-list.service';
import { TrelloItemModule } from './trello-item';
import { SharedModule, AuthenticationComponent } from '../../shared';
import { TaskDetailComponent, TaskDetailModule } from './task-detail';

@NgModule({
  imports: [
    CommonModule,
    TrelloItemModule,
    TaskDetailModule,
    SharedModule
  ],
  declarations: [
    TrelloListComponent
  ],
  exports: [TrelloListComponent],
  providers: [
    TrelloListService
  ],
  entryComponents: [AuthenticationComponent, TaskDetailComponent]
})
export class TrelloListModule {

}
