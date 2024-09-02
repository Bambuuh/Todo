import { useAsyncStorage } from "@react-native-async-storage/async-storage";
import { PropsWithChildren, createContext, useEffect, useState } from "react";

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

export type TaskCollection = {
  all: TaskMap;
  completed: TaskMap;
  active: TaskMap;
};

type NewTask = Omit<Task, "completed" | "id">;

type TodoContextValue = {
  tasks: TaskCollection;
  addTask: (newTask: NewTask) => void;
  completeTask: (task: Task) => void;
  deleteTask: (task: Task) => void;
};

const INITIAL: TaskCollection = {
  all: {},
  completed: {},
  active: {},
};

const key = "@todo/tasks";

export const TodoContext = createContext<TodoContextValue>(undefined!);

export function TodoProvider({ children }: PropsWithChildren) {
  const { getItem, setItem } = useAsyncStorage(key);
  const [tasks, setTasks] = useState<TaskCollection>(INITIAL);

  useEffect(() => {
    const init = async () => {
      const storedJson = await getItem();
      if (storedJson) {
        const storedData = JSON.parse(storedJson) as TaskCollection;
        setTasks(storedData);
      }
    };

    // Leaving this here to be able to initialize with a lot of items for testing purposes

    // const init = () => {
    //   const base: TaskCollection = {
    //     active: {},
    //     all: {},
    //     completed: {},
    //   };
    //   Array.from({ length: 1000 }, (_, index) => index).forEach((i) => {
    //     const task: Task = {
    //       id: i,
    //       title: `index ${i}`,
    //       completed: false,
    //       category: i % 2 ? "personal" : "work",
    //     };
    //     base.active[i] = task;
    //     base.all[i] = task;
    //     base.completed[i] = task;
    //   });

    //   setTasks(base);
    // };
    // init();

    init();
  }, []);

  function updateStorage(updated: TaskCollection) {
    setItem(JSON.stringify(updated));
  }

  function deleteTask(task: Task) {
    setTasks((prevTasks) => {
      delete prevTasks.all[task.id];
      delete prevTasks.active[task.id];
      delete prevTasks.completed[task.id];
      updateStorage(prevTasks);
      return { ...prevTasks };
    });
  }

  function completeTask(task: Task) {
    setTasks((prevTasks) => {
      const mutated = { ...task };
      mutated.completed = true;
      prevTasks.completed[mutated.id] = mutated;

      delete prevTasks.active[task.id];

      if (prevTasks.all[task.id]) {
        prevTasks.all[task.id].completed = true;
      }

      updateStorage(prevTasks);
      return { ...prevTasks };
    });
  }

  function addTask(newTask: NewTask) {
    const taskToAdd: Task = {
      ...newTask,
      id: Date.now(),
      completed: false,
    };

    setTasks((prevTasks) => {
      prevTasks.all[taskToAdd.id] = taskToAdd;
      prevTasks.active[taskToAdd.id] = taskToAdd;
      updateStorage(prevTasks);
      return { ...prevTasks };
    });
  }

  return (
    <TodoContext.Provider
      value={{
        tasks,
        addTask,
        completeTask,
        deleteTask,
      }}
    >
      {children}
    </TodoContext.Provider>
  );
}
