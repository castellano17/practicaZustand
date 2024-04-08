import { StateCreator, create } from "zustand";
import type { Task, TaskStatus } from "../../interfaces";
import { devtools } from "zustand/middleware";

interface TaskState {
  draggingTaskId?: string;

  tasks: Record<string, Task>; //{[key: string]: Task}
  getTaskByStatus: (status: TaskStatus) => Task[];

  setDragginTaskId: (taksId: string) => void;
  removeDragginTaskId: () => void;
  changeTaskStatus: (taskId: string, status: TaskStatus) => void;
  onTaskDrop: (status: TaskStatus) => void;
}

const storeApi: StateCreator<TaskState> = (set, get) => ({
  draggingTaskId: undefined,
  tasks: {
    "ABC-1": { id: "ABC-1", title: "programar 1", status: "Open" },
    "ABC-2": { id: "ABC-2", title: "Task 2", status: "In-progress" },
    "ABC-3": { id: "ABC-3", title: "Task 3", status: "Open" },
    "ABC-4": { id: "ABC-4", title: "Task 2", status: "Open" },
  },

  getTaskByStatus: (status: TaskStatus) => {
    const tasks = get().tasks;
    return Object.values(tasks).filter((task) => task.status === status);
  },

  setDragginTaskId: (taskId: string) => {
    set({ draggingTaskId: taskId });
  },
  removeDragginTaskId: () => {
    set({ draggingTaskId: undefined });
  },

  changeTaskStatus: (taskId: string, status: TaskStatus) => {
    const task = get().tasks[taskId];
    task.status = status;

    set((state) => ({
      tasks: {
        ...state.tasks,
        [taskId]: task,
      },
    }));
  },

  onTaskDrop: (status: TaskStatus) => {
    const taskId = get().draggingTaskId;
    if (!taskId) return;
    get().changeTaskStatus(taskId, status);
    get().removeDragginTaskId();
  },
});

export const useTaskStore = create<TaskState>()(devtools(storeApi));
