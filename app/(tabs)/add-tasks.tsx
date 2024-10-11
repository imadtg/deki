import { useTasks } from "@/hooks/useTasks";
import React from "react";
import { Button, TextInput, View } from "react-native";

export default function AddTasksTab() {
  const [tentativeTask, setTentativeTask] = React.useState("");
  const addTask = useTasks((state) => state.addTask);
  function handleAddTask() {
    addTask(tentativeTask);
    setTentativeTask("");
  }
  return (
    <View>
      <TextInput
        onChangeText={setTentativeTask}
        value={tentativeTask}
      />
      <Button title="Add Task" onPress={handleAddTask} />
    </View>
  );
}
