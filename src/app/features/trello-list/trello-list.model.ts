export interface Trello {
  id?: number;
  title: string;
  taskItems?: Task[];
}

export interface Task {
  id?: number;
  title: string;
  description: string;
  dueDate: number;
  img: string;
}
