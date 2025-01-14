import { View, Text, Button, StyleSheet } from "react-native";
import { useTasks } from "@/hooks/useTasks";


export default function HomeScreen() {
  const {tasks, rotateTask, removeTask} = useTasks((state) => state);
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

