import React from "react";
import { View, Text, Button, TextInput, StyleSheet } from "react-native";
import * as Clipboard from 'expo-clipboard';

import { useTasks } from "@/hooks/useTasks";

export default function DataForm({ style = {}, ...delegated }) {
  const [data, setData] = React.useState("");
  const state = useTasks((state) => state);
  const { loadFromJSON } = state;
  const copyToClipboard = async () => {
    await Clipboard.setStringAsync(data);
  };

  const fetchCopiedText = async () => {
    const text = await Clipboard.getStringAsync();
    setData(text);
  };

  return (
    <View {...delegated} style={{ ...styles.container, ...style }}>
      <TextInput
        style={styles.input}
        multiline={true}
        numberOfLines={4}
        onChangeText={(data) => setData(data)}
        value={data}
      />
      <Button title="get data" onPress={() => setData(JSON.stringify(state))} />
      <Button title="load data" onPress={() => loadFromJSON(data)} />
      <Button title="copy" onPress={copyToClipboard} />
      <Button title="paste" onPress={fetchCopiedText} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    gap: 20,
    paddingTop: 20,
    paddingBottom: 20,
  },
  input: {
    borderStyle: "solid",
    borderWidth: 1,
    paddingHorizontal: 8,
  },
  feedback: {
    alignSelf: "center",
  },
});
