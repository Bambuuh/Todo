import { PropsWithChildren, createContext, useState } from "react";

export type TaskCategory = "work" | "personal";

export type Task = {
  id: number;
  title: string;
  dueDate?: number;
  completed: boolean;
  category: TaskCategory;
};

type TaskMap = {
  [id: number]: Task;
};

type NewTask = Omit<Task, "completed" | "id">;

type TodoContextValue = {
  all: TaskMap;
  completed: TaskMap;
  active: TaskMap;
  addTask: (newTask: NewTask) => void;
  completeTask: (task: Task) => void;
  deleteTask: (task: Task) => void;
};

export const TodoContext = createContext<TodoContextValue>(undefined!);

export function TodoProvider({ children }: PropsWithChildren) {
  const [all, setAll] = useState<TaskMap>([]);
  const [completed, setCompleted] = useState<TaskMap>([]);
  const [active, setActive] = useState<TaskMap>([]);

  function deleteTask(task: Task) {
    setAll((prevAll) => {
      delete prevAll[task.id];
      return { ...prevAll };
    });

    setActive((prevActive) => {
      delete prevActive[task.id];
      return { ...prevActive };
    });

    setCompleted((prevCompleted) => {
      delete prevCompleted[task.id];
      return { ...prevCompleted };
    });
  }

  function completeTask(task: Task) {
    setAll((prevAll) => {
      if (prevAll[task.id]) {
        prevAll[task.id].completed = true;
      }
      return { ...prevAll };
    });

    setActive((prevActive) => {
      delete prevActive[task.id];
      return { ...prevActive };
    });

    setCompleted((prevCompleted) => {
      const mutated = { ...task };
      mutated.completed = true;
      prevCompleted[mutated.id] = mutated;
      return { ...prevCompleted };
    });
  }

  function addTask(newTask: NewTask) {
    const taskToAdd: Task = {
      ...newTask,
      id: Date.now(),
      completed: false,
    };

    setAll((prevAll) => {
      prevAll[taskToAdd.id] = taskToAdd;
      return { ...prevAll };
    });
    setActive((prevActive) => {
      prevActive[taskToAdd.id] = taskToAdd;
      return { ...prevActive };
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
