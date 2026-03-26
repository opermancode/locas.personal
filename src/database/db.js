import SQLite from 'react-native-sqlite-storage';

const db = SQLite.openDatabase(
  { name: 'locas.db', location: 'default' },
  () => console.log('DB Ready'),
  e => console.log(e)
);

export const initDB = () => {
  db.transaction(tx => {

    // USER TABLE (ONLY 1 USER)
    tx.executeSql(`
      CREATE TABLE IF NOT EXISTS user (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        username TEXT UNIQUE,
        password TEXT
      );
    `);

    // ACCOUNTS
    tx.executeSql(`
      CREATE TABLE IF NOT EXISTS accounts (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT,
        type TEXT,
        balance REAL
      );
    `);

    // TRANSACTIONS
    tx.executeSql(`
      CREATE TABLE IF NOT EXISTS transactions (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        account_id INTEGER,
        type TEXT,
        amount REAL,
        category TEXT,
        date TEXT
      );
    `);

  });
};

export default db;