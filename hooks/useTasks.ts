import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import * as Crypto from "expo-crypto";

interface Task {
  id: string;
  content: string;
}

interface TasksState {
  tasks: Task[];
}

interface TasksAction {
  addTask: (task: string) => void;
  removeTask: (taskId: string) => void;
}

export const useTasks = create<TasksState & TasksAction>()(
  persist(
    (set) => ({
      tasks: [],
      addTask: (task: string) =>
        set(({ tasks }: TasksState) => ({
          tasks: [...tasks, { content: task, id: Crypto.randomUUID() }],
        })),
      removeTask: (taskId: string) =>
        set(({ tasks }: TasksState) => ({
          tasks: tasks.filter(({ id }) => id !== taskId),
        })),
    }),
    {
      name: "tasks",
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);
