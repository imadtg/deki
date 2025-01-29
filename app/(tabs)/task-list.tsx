import { View, Text, Button, StyleSheet, ScrollView } from "react-native";
import { useTasks } from "@/hooks/useTasks";

export default function TaskList() {
  const { tasks, rotateTask, removeTask } = useTasks((state) => state);
  return (
    <ScrollView 
      contentContainerStyle={styles.container}
      style={styles.scrollView} // Add this
    >
      {tasks.length > 0 ? (
        tasks.map(({ content, id }) => (
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
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollView: {
    flex: 1, // Takes full height from parent
  },
  container: {
    justifyContent: "flex-start", // Changed from "center"
    alignItems: "center",
    gap: 30,
    padding: 20, // Reduced from 50%
    flexGrow: 1, // Allows content to expand
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
  },
});
