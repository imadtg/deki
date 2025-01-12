import * as SQLite from "expo-sqlite";
import * as FileSystem from 'expo-file-system';
import { createJSONStorage } from "zustand/middleware";
import * as Permissions from 'expo-permissions';

async function getPermissions (){
  const { status } = await Permissions.askAsync(Permissions.MEDIA_LIBRARY);
  if (status !== 'granted') {
    throw new Error("Permission not granted to access external storage.");
  }
};

console.log(FileSystem.documentDirectory)

const dbPromise = (async () => {
  await getPermissions
  // Get a device-wide file path for the database (e.g., external storage on Android)
  const dbPath = `${FileSystem.externalStorageDirectory}deki_zustand_persist.db`;
  console.log('Database path:', dbPath);

  // Open the SQLite database at the specified location
  const db = await SQLite.openDatabaseAsync(dbPath);
  await db.execAsync(`
    CREATE TABLE IF NOT EXISTS storage (
      key TEXT PRIMARY KEY NOT NULL,
      value TEXT NOT NULL
    );
  `);
  console.log('Database opened and table created.');
  return db;
})();

// Abstracted function to handle db queries
const executeDbQuery = async (query: string, params: any[]) => {
  const db = await dbPromise;
  // Use db.runAsync for write operations
  if (query.trim().toUpperCase().startsWith("SELECT")) {
    // Use db.getAllAsync for SELECT queries
    return await db.getAllAsync(query, params);
  } else {
    // Use db.runAsync for INSERT, UPDATE, DELETE
    return await db.runAsync(query, params);
  }
};

const SQLiteStorage = createJSONStorage(() => ({
  getItem: async (key: string): Promise<string | null> => {
    try {
      const result = await executeDbQuery(
        "SELECT value FROM storage WHERE key = ?;",
        [key]
      ) as {value:string}[]; // TODO: unhack this
      if (result.length > 0) {
        return result[0].value || null;
      }
      return null;
    } catch (error) {
      console.error("Error getting item:", error);
      return null;
    }
  },

  setItem: async (key: string, value: string): Promise<void> => {
    try {
      await executeDbQuery(
        "INSERT OR REPLACE INTO storage (key, value) VALUES (?, ?);",
        [key, value]
      );
      console.log(`Item set successfully for key: ${key}`);
    } catch (error) {
      console.error("Error setting item:", error);
    }
  },

  removeItem: async (key: string): Promise<void> => {
    try {
      await executeDbQuery("DELETE FROM storage WHERE key = ?;", [key]);
      console.log(`Item removed successfully for key: ${key}`);
    } catch (error) {
      console.error("Error removing item:", error);
    }
  },
}));

export default SQLiteStorage;
