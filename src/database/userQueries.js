import db from './db';

// CHECK IF USER EXISTS
export const getUser = (callback) => {
  db.transaction(tx => {
    tx.executeSql('SELECT * FROM user LIMIT 1', [], (_, res) => {
      callback(res.rows.length > 0 ? res.rows.item(0) : null);
    });
  });
};

// REGISTER (ONLY IF EMPTY)
export const registerUser = (username, password, callback) => {
  db.transaction(tx => {
    tx.executeSql(
      'SELECT * FROM user LIMIT 1',
      [],
      (_, res) => {
        if (res.rows.length > 0) {
          callback(false, "User already exists");
        } else {
          tx.executeSql(
            'INSERT INTO user (username, password) VALUES (?, ?)',
            [username, password],
            () => callback(true),
            () => callback(false, "Insert failed")
          );
        }
      }
    );
  });
};

// LOGIN
export const loginUser = (username, password, callback) => {
  db.transaction(tx => {
    tx.executeSql(
      'SELECT * FROM user WHERE username=? AND password=?',
      [username, password],
      (_, res) => {
        callback(res.rows.length > 0);
      }
    );
  });
};