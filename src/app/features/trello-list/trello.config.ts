import { Trello, Task } from './trello-list.model';

export const DEFAULT_TRELLO: Trello = {
  title: '',
  taskItems: []
};

export const DEFAULT_TASK: Task = {
  id: 0,
  title: 'title1',
  description: 'description',
  dueDate: +new Date(),
  img: 'https://dummyimage.com/600x400'
};
