import { View, Text, Button, StyleSheet } from "react-native";
import { useTasks } from "@/hooks/useTasks";

export default function HomeScreen() {
  const tasks = useTasks(({tasks}) => tasks);
  const removeTask = useTasks((state) => state.removeTask)
  const shownTasks = tasks.slice(0, 4);
  return (
    <View style={styles.container}>
      {shownTasks.map(({ content, id }) => (
        <View key={id} style={styles.line}>
          <Text>
            {content}
          </Text>
          <Button title="Remove" onPress={() => removeTask(id)} />
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "space-between",
    alignItems: "center",
    padding: "50%",
    height: "100%",
  },
  line: {
    borderStyle: "solid",
    borderWidth: 2,
    width: 200,
  },
});
