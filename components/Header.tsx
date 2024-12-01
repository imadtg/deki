import React from "react";
import { View, Text, Button, TextInput } from "react-native";

import useAccount from "@/hooks/useAccount";

export default function Header({ ...delegated }) {
  const { accountInfo, login, logout, signup } = useAccount();
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  return (
    <View {...delegated}>
      {accountInfo ? (
        <Text>Logged in as {accountInfo.name}</Text>
      ) : (
        <Text>Not logged in</Text>
      )}
      <TextInput
        onChangeText={setName}
        underlineColorAndroid="#f000"
        placeholder="Enter Name"
        placeholderTextColor="#8b9cb5"
        autoCapitalize="sentences"
        value={name}
      />
      <TextInput
        onChangeText={setEmail}
        placeholder="Enter Email" //dummy@abc.com
        placeholderTextColor="#8b9cb5"
        autoCapitalize="none"
        keyboardType="email-address"
        value={email}
      />
      <TextInput
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
