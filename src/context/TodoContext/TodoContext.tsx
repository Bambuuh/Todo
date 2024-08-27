import { createContext } from "react";

type TaskCategory = "work" | "personal";

type Task = {
  title: string;
  dueDate: number;
  completed: boolean;
  category: TaskCategory;
};

type TodoContextValue = {
  completedTasks: Task[];
  activeTasks: Task[];
};

const TodoContext = createContext(undefined!);
