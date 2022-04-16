export interface TodoTask {
  name: string;
  isCompleted: boolean;
  parentTaskName: string;
  dueDate?: Date;
}
