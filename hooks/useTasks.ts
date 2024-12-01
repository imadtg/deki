import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import * as Crypto from "expo-crypto";
import AppStorage from "./sync-client";

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
  rotateTask: (taskId: string) => void;
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
      rotateTask: (taskId: string) =>
        set(({ tasks }: TasksState) => {
          let task = tasks.find(({ id }) => id === taskId);
          if (typeof task === "undefined") {
            throw new Error("Task not found");
          }
          return {
            tasks: [...tasks.filter(({ id }) => id !== taskId), task],
          };
        }),
    }),
    {
      name: "tasks",
      storage: createJSONStorage(() => AppStorage),
    }
  )
);
