export interface Task {
  id: string;
  title: string;
  status: TaskStatus;
}

export type TaskStatus = "Open" | "In-progress" | "Done";
