import { useTasks } from "@/hooks/useTasks";
import React from "react";
import { Button, TextInput, View, StyleSheet } from "react-native";

export default function AddTasksTab() {
  const [tentativeTask, setTentativeTask] = React.useState("");
  const addTask = useTasks((state) => state.addTask);
  function handleAddTask() {
    addTask(tentativeTask);
    setTentativeTask("");
  }
  return (
    <View style={StyleSheet.absoluteFill}>
      <View style={[styles.container, StyleSheet.absoluteFill]}>
        <TextInput style={styles.input} onChangeText={setTentativeTask} value={tentativeTask} />
        <Button title="Add Task" onPress={handleAddTask} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    gap: 20
  },
  input: {
    borderStyle: "solid",
    borderWidth: 2,
    width: 200,
  }
});
