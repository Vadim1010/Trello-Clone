import { TaskDetailComponent } from './features/trello-list/task-detail';
import { AuthenticationComponent } from './shared';

export const REST: { [key: string]: string } = {
  user: 'users',
  trello: 'groupItem'
};

export const CONFIG_MODAL: { [key: string]: string } = {
  AuthenticationComponent: '400px',
  TaskDetailComponent: '500px'
};
