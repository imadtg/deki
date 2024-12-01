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

const AppStorage: StateStorage = {
  async getItem(name) {
    return null;
  },
  async setItem(name, value) {},

  async removeItem(name) {},
};

export default AppwriteStorage;

/*

export function IdeasProvider(props) {
  const [ideas, setIdeas] = useState([]);
  
  async function add(idea) {
    const response = await databases.createDocument(
      IDEAS_DATABASE_ID,
      IDEAS_COLLECTION_ID,
      ID.unique(),
      idea,
      [Permission.write(Role.user(idea.userId))]
    );
    toast('Ideas added');
    setIdeas((ideas) => [response, ...ideas].slice(0, 10));
  }


  async function remove(id) {
    await databases.deleteDocument(IDEAS_DATABASE_ID, IDEAS_COLLECTION_ID, id);
    toast('Idea removed');
    setIdeas((ideas) => ideas.filter((idea) => idea.$id !== id));
    await init(); // Refetch ideas to ensure we have 10 items
  }

  async function init() {
    const response = await databases.listDocuments(
      IDEAS_DATABASE_ID,
      IDEAS_COLLECTION_ID,
      [Query.orderDesc("$createdAt"), Query.limit(10)]
    );
    setIdeas(response.documents);
  }

  useEffect(() => {
    init();
  }, []);

  return (
    <IdeasContext.Provider value={{ current: ideas, add, remove }}>
      {props.children}
    </IdeasContext.Provider>
  );
}*/
