import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import * as Crypto from "expo-crypto";

interface Task {
  id: string;
  content: string;
  lastInteractionTime: number;
}

interface TasksState {
  tasks: Task[];
}

interface TasksAction {
  addTask: (task: string) => void;
  removeTask: (taskId: string) => void;
  rotateTask: (taskId: string) => void;
  resetTasks: () => void;
  mergeFromJSON: (json: string) => void;
  loadFromJSON: (json: string) => void;
}

const initialTaskState = {
  tasks: [],
};

export const useTasks = create<TasksState & TasksAction>()(
  persist(
    (set) => ({
      ...initialTaskState,
      addTask: (task: string) =>
        set(({ tasks }: TasksState) => ({
          tasks: [
            ...tasks,
            {
              content: task,
              id: Crypto.randomUUID(),
              lastInteractionTime: Date.now(),
            },
          ],
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
            tasks: [
              ...tasks.filter(({ id }) => id !== taskId),
              { ...task, lastInteractionTime: Date.now() },
            ],
          };
        }),
      resetTasks: () => set(initialTaskState),
      mergeFromJSON: (json) => set(JSON.parse(json), false),
      loadFromJSON: (json) => {
        set(initialTaskState);
        console.log(JSON.parse(json))
        set(JSON.parse(json));
      },
    }),
    {
      name: "tasks",
      storage: createJSONStorage(() => AsyncStorage),
      //merge: (persisted, current) => ({ ...current, ...persisted }),
    }
  )
);
