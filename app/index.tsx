import { View, Text, Button, StyleSheet } from "react-native";
import { useTasks } from "@/hooks/useTasks";

import { MMKV } from 'react-native-mmkv';

// Initialize MMKV instance
const mmkv = new MMKV({
  id: 'zustand-mmkv-storage', // Unique ID for MMKV instance
  encryptionKey: 'your-encryption-key', // Optional encryption
  path: '/path/to/shared/storage', // Optional: Set custom shared path
});

// MMKV adapter for Zustand persist
export const mmkvStorage = {
  getItem: (key) => {
    const value = mmkv.getString(key);
    return value ? JSON.parse(value) : null;
  },
  setItem: (key, value) => {
    mmkv.set(key, JSON.stringify(value));
  },
  removeItem: (key) => {
    mmkv.delete(key);
  },
};


export default function HomeScreen() {
  const tasks = useTasks(({ tasks }) => tasks);
  const removeTask = useTasks((state) => state.removeTask);
  const rotateTask = useTasks((state) => state.rotateTask);
  const shownTasks = tasks.slice(0, 1); // i have to fight the decision fatigue
  return (
    <View style={styles.container}>
      {shownTasks.length > 0 ? (
        shownTasks.map(({ content, id }) => (
          <View key={id} style={styles.line}>
            <Text style={styles.task}>{content}</Text>
            <View style={styles.buttons}>
              <Button title="Finish" onPress={() => removeTask(id)} />
              <Button title="Continue later" onPress={() => rotateTask(id)} />
            </View>
          </View>
        ))
      ) : (
        <Text style={styles.splash}> All done! </Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    gap: 30,
    padding: "50%",
    height: "100%",
  },
  task: {
    textAlign: "center",
    fontSize: 20,
  },
  line: {
    borderStyle: "solid",
    borderWidth: 1,
    borderRadius: 16,
    overflow: "hidden",
    width: 300,
    padding: 10,
    gap: 10,
  },
  buttons: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  splash: {
    width: 200,
    textAlign: "center",
    fontSize: 30,
  }
});