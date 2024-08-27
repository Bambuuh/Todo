import { PropsWithChildren, createContext, useState } from "react";

export type TaskCategory = "work" | "personal";

export type Task = {
  id: number;
  title: string;
  dueDate?: number;
  completed: boolean;
  category: TaskCategory;
};

// type TaskMap = {
//   [id: number]: Task
// }

type NewTask = Omit<Task, "completed" | "id">;

type TodoContextValue = {
  all: Task[];
  completed: Task[];
  active: Task[];
  addTask: (newTask: NewTask) => void;
  completeTask: (task: Task) => void;
  deleteTask: (task: Task) => void;
};

export const TodoContext = createContext<TodoContextValue>(undefined!);

export function TodoProvider({ children }: PropsWithChildren) {
  const [all, setAll] = useState<Task[]>([]);
  const [completed, setCompleted] = useState<Task[]>([]);
  const [active, setActive] = useState<Task[]>([]);

  function deleteTask(task: Task) {
    setAll((prevAll) => {
      const index = prevAll.findIndex((t) => t.id === task.id);
      if (index > -1) {
        prevAll.splice(index, 1);
      }
      return [...prevAll];
    });

    setActive((prevActive) => {
      const index = prevActive.findIndex((t) => t.id === task.id);
      if (index > -1) {
        prevActive.splice(index, 1);
      }
      return [...prevActive];
    });

    setCompleted((prevCompleted) => {
      const index = prevCompleted.findIndex((t) => t.id === task.id);
      if (index > -1) {
        prevCompleted.splice(index, 1);
      }
      return [...prevCompleted];
    });
  }

  function completeTask(task: Task) {
    const mutated = { ...task };
    mutated.completed = true;

    setAll((prevAll) => {
      const item = prevAll.find((t) => t.id === mutated.id);
      if (item) {
        item.completed = true;
      }
      return [...prevAll];
    });

    setActive((prevActive) => {
      const item = prevActive.find((t) => t.id === mutated.id);
      if (item) {
        item.completed = true;
      }
      return [...prevActive];
    });

    setCompleted((prevCompleted) => {
      prevCompleted.push(mutated);
      return [...prevCompleted];
    });
  }

  function addTask(newTask: NewTask) {
    const taskToAdd: Task = {
      ...newTask,
      id: Date.now(),
      completed: false,
    };

    setAll((prevAll) => {
      prevAll.push(taskToAdd);
      return [...prevAll];
    });
    setActive((prevActive) => {
      prevActive.push(taskToAdd);
      return [...prevActive];
    });
  }

  return (
    <TodoContext.Provider
      value={{
        all,
        completed,
        active,
        addTask,
        completeTask,
        deleteTask,
      }}
    >
      {children}
    </TodoContext.Provider>
  );
}
