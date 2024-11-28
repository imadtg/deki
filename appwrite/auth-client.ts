import client from "./appwrite-client";
import { Account } from "react-native-appwrite";

const account = new Account(client);

export default account;