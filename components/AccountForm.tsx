import React from "react";
import { View, Text, Button, TextInput, StyleSheet } from "react-native";

import useAccount from "@/hooks/useAccount";

export default function AccountForm({ style={}, ...delegated }) {
  const { accountInfo, login, logout, signup } = useAccount();
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  return (
    <View {...delegated} style={{...styles.container, ...style}}>
      {accountInfo ? (
        <Text style={styles.feedback}>Logged in as {accountInfo.name}</Text>
      ) : (
        <Text style={styles.feedback}>Not logged in</Text>
      )}
      <TextInput
        style={styles.input}
        onChangeText={setName}
        underlineColorAndroid="#f000"
        placeholder="Enter Name"
        placeholderTextColor="#8b9cb5"
        autoCapitalize="sentences"
        value={name}
      />
      <TextInput
        style={styles.input}
        onChangeText={setEmail}
        placeholder="Enter Email" //dummy@abc.com
        placeholderTextColor="#8b9cb5"
        autoCapitalize="none"
        keyboardType="email-address"
        value={email}
      />
      <TextInput
        style={styles.input}
        onChangeText={setPassword}
        placeholder="Enter Password" //12345
        placeholderTextColor="#8b9cb5"
        keyboardType="default"
        blurOnSubmit={false}
        secureTextEntry={true}
        underlineColorAndroid="#f000"
        value={password}
      />
      <Button title="signup" onPress={() => signup(email, password, name)} />
      <Button title="login" onPress={() => login(email, password)} />
      <Button title="logout" onPress={logout} />
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
        alignSelf: "center"
    }
  });