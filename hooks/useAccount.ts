import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import * as Crypto from "expo-crypto";
import { Account } from "react-native-appwrite";
import account from "@/appwrite/auth-client";

interface AccountState {
    account: Account;
}

interface AccountActions {

}

export const useAccount = create<AccountState & AccountActions>()(
  persist(
    (set) => ({
      account,
    }),
    {
      name: "account",
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);
