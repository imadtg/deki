import { View, Text } from "react-native";
import { useTasks } from "@/hooks/useTasks";

export default function HomeScreen() {
  const tasks = useTasks((state) => state.tasks);
  return (
    <View>
      {tasks.map(({content, id}) => (
        <Text key={id}>{content}</Text>
      ))}
    </View>
  );
}
