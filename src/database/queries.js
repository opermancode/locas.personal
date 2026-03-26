import db from './db';

// ADD ACCOUNT
export const addAccount = (name, type, balance) => {
  db.transaction(tx => {
    tx.executeSql(
      'INSERT INTO accounts (name, type, balance) VALUES (?, ?, ?)',
      [name, type, balance]
    );
  });
};

// GET ACCOUNTS
export const getAccounts = (setAccounts) => {
  db.transaction(tx => {
    tx.executeSql('SELECT * FROM accounts', [], (_, res) => {
      setAccounts(res.rows.raw());
    });
  });
};

// ADD TRANSACTION
export const addTransaction = (account_id, type, amount, category) => {
  db.transaction(tx => {
    tx.executeSql(
      `INSERT INTO transactions (account_id, type, amount, category, date)
       VALUES (?, ?, ?, ?, datetime('now'))`,
      [account_id, type, amount, category]
    );

    // UPDATE ACCOUNT BALANCE
    const operator = type === 'expense' ? '-' : '+';

    tx.executeSql(
      `UPDATE accounts SET balance = balance ${operator} ? WHERE id = ?`,
      [amount, account_id]
    );
  });
};