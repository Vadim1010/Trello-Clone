import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TaskDetailComponent } from './task-detail.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,

  ],
  declarations: [
    TaskDetailComponent
  ],
  exports: [TaskDetailComponent],
})
export class TaskDetailModule {
}
