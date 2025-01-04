import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabase('zustand_persist.db');

// Create a table for key-value storage
db.transaction((tx) => {
  tx.executeSql(
    'CREATE TABLE IF NOT EXISTS storage (key TEXT PRIMARY KEY NOT NULL, value TEXT NOT NULL);'
  );
});

const SQLiteStorage = {
  getItem: async (key) => {
    return new Promise((resolve, reject) => {
      db.transaction((tx) => {
        tx.executeSql(
          'SELECT value FROM storage WHERE key = ?;',
          [key],
          (_, result) => {
            if (result.rows.length > 0) {
              resolve(result.rows.item(0).value);
            } else {
              resolve(null); // Key not found
            }
          },
          (_, error) => {
            reject(error);
            return false;
          }
        );
      });
    });
  },

  setItem: async (key, value) => {
    return new Promise((resolve, reject) => {
      db.transaction((tx) => {
        tx.executeSql(
          'INSERT OR REPLACE INTO storage (key, value) VALUES (?, ?);',
          [key, value],
          () => resolve(true),
          (_, error) => {
            reject(error);
            return false;
          }
        );
      });
    });
  },

  removeItem: async (key) => {
    return new Promise((resolve, reject) => {
      db.transaction((tx) => {
        tx.executeSql(
          'DELETE FROM storage WHERE key = ?;',
          [key],
          () => resolve(true),
          (_, error) => {
            reject(error);
            return false;
          }
        );
      });
    });
  },
};

export default SQLiteStorage;
