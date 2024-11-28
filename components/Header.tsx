import React from "react";
import { View, Text, Button } from "react-native";

import { useAccount } from "@/hooks/useAccount";
import { Models } from "react-native-appwrite";

const account = {
  name: "",
  get: async () => ({ name: account.name }),
  create: async (x: string, y: string, z: string, w: string) => {
    console.log(x, y, z, w);
    account.name = "imad";
  },
};

export default function Header() {
  /*const { account } = useAccount();*/
  const [accountInfo, setAccountInfo] = React.useState<any>();

  React.useEffect(() => {
    async function getInfo() {
      const info = await account.get();
      setAccountInfo(info);
    }
    getInfo();
  }, [account]);

  async function login() {
    await account.create("imad", "i.haidi@outlook.com", "123456789", "imad");
    setAccountInfo(await account.get());
  }
  return (
    <View>
      {accountInfo ? (
        <Text>Logged in as {accountInfo.name}</Text>
      ) : (
        <Text>Not logged in</Text>
      )}
      <Button title="login" onPress={login} />
    </View>
  );
}
