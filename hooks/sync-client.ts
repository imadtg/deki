import { StateStorage } from "zustand/middleware";
import {
  Models,
  ID,
  Query,
  Client,
  Account,
  Databases,
} from "react-native-appwrite";
import AsyncStorage from "@react-native-async-storage/async-storage";

// TODO: move to env
export const DATABASE_ID = "674424b7001f5fc2be16";
export const COLLECTION_ID = "674424c1003e75802b0b";

const client = new Client()
  .setEndpoint("https://cloud.appwrite.io/v1")
  .setProject("6718b673002ee69ce115");

const account = new Account(client);

const databases = new Databases(client);

async function getUserId() {
  try {
    return (await account.get()).$id;
  } catch {
    return null;
  }
}


// FIXME: more durable persistence is needed...
// i'm assuming the user won't just switch accounts after logging in
// this should still work if logging in the first time, but i haven't done much to ensure it will always work...
const AppwriteStorage: StateStorage = {
  async getItem(name) {
    console.log("getting", name);
    const documentList = await databases.listDocuments(
      DATABASE_ID,
      COLLECTION_ID,
      [Query.equal("name", name)]
    );
    console.log(documentList);
    console.log("returning", documentList.documents[0]?.value || null);
    return documentList.documents[0]?.value || null;
  },
  async setItem(name, value) {
    console.log("setting", name, "to", value);
    const documentList = await databases.listDocuments(
      DATABASE_ID,
      COLLECTION_ID,
      [Query.equal("name", name)]
    );
    console.log(documentList);
    const documentId = documentList.documents[0]?.$id;
    if (documentId !== undefined) {
      console.log("updating document", documentId);
      await databases.updateDocument(DATABASE_ID, COLLECTION_ID, documentId, {
        value,
      });
    } else {
      console.log("creating document");
      console.log(
        await databases.createDocument(
          DATABASE_ID,
          COLLECTION_ID,
          ID.unique(),
          {
            name,
            value,
          },
          []
        )
      );
    }
  },
  async removeItem(name) {
    console.log("removing", name);
    const documentList = await databases.listDocuments(
      DATABASE_ID,
      COLLECTION_ID,
      [Query.equal("name", name)]
    );
    console.log(documentList);
    const documentId = documentList.documents[0]?.$id;
    if (documentId !== undefined) {
      await databases.deleteDocument(DATABASE_ID, COLLECTION_ID, documentId);
    }
  },
};


// TODO: this should be exported after online support is added instead of AppwriteStorage
// it can use AppwriteStorage but a more composable API is desired...
const AppStorage: StateStorage = {
  async getItem(name) {
    return null;
  },
  async setItem(name, value) {},

  async removeItem(name) {},
};

export default AppwriteStorage;
