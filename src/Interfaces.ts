export interface Tasks {
  id?: string;
  taskTitle?: string;
  taskDescription?: string;
  pointsValue?: string;
  endTime?: string;
  category?: string;
  isDone: boolean;
  hasRequest: boolean;
}
