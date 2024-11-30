import React from "react";
import { View, Text, Button, TextInput } from "react-native";

import { Models, Account, ID } from "react-native-appwrite";
import client from "@/appwrite/appwrite-client";

const account = new Account(client);

export default function Header({ ...delegated }) {
  const [accountInfo, setAccountInfo] =
    React.useState<Models.User<Models.Preferences>>();
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  async function getInfo() {
    try {
      const info = await account.get();
      console.log("logged in as:", info.name);
      setAccountInfo(info);
    } catch (e) {
      console.log("couldn't get account info:", e);
      setAccountInfo(undefined);
    }
  }

  React.useEffect(() => {
    getInfo();
    /*return client.subscribe("account", (payload) => {
      console.log(payload);
      getInfo();
    });*/
  }, []);

  async function signup() {
    try {
      await account.create(ID.unique(), email, password, name);
    } catch (e) {
      console.log("error in signup:", e);
    }
  }
  async function login() {
    try {
      await account.createEmailPasswordSession(email, password);
      getInfo();
    } catch (e) {
      console.log("error in login:", e);
    }
  }
  async function logout() {
    try {
      if (accountInfo) {
        await account.deleteSessions();
        getInfo();
      }
    } catch (e) {
      console.log("error in logout:", e);
    }
  }
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
      <Button title="signup" onPress={signup} />
      <Button title="login" onPress={login} />
      <Button title="logout" onPress={logout} />
    </View>
  );
}
