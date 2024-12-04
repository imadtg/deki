import React from "react";
import { Models, ID, Client, Account } from "react-native-appwrite";
import { useTasks } from "./useTasks";

// TODO: move these to env
const client = new Client()
  .setEndpoint("https://cloud.appwrite.io/v1")
  .setProject("6718b673002ee69ce115");

const account = new Account(client);

export default function useAccount() {
  const [accountInfo, setAccountInfo] =
    React.useState<Models.User<Models.Preferences>>();

  async function getInfo() {
    try {
      const info = await account.get();
      console.log("logged in as:", info.name);
      setAccountInfo(info);
    } catch (e) {
      console.log("couldn't get account info:", e);
      setAccountInfo(undefined);
    }
    // TODO: find a better way to handle this
    useTasks.persist.rehydrate();
  }

  React.useEffect(() => {
    getInfo();
  }, []);

  async function signup(email: string, password: string, name: string) {
    try {
      await account.create(ID.unique(), email, password, name);
    } catch (e) {
      console.log("error in signup:", e);
    }
  }

  async function login(email: string, password: string) {
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
        useTasks.getState().resetTasks();
        getInfo();
      }
    } catch (e) {
      console.log("error in logout:", e);
    }
  }

  return { accountInfo, signup, login, logout };
}
