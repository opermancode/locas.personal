import React, { useEffect, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { TextInput, Button } from 'react-native-paper';
import { Picker } from '@react-native-picker/picker';
import { fetchAccounts, addTransaction } from '../database/queries';
import { theme } from '../theme/theme';

export default function AddTransactionScreen() {
  const [accounts, setAccounts] = useState([]);
  const [selected, setSelected] = useState(null);
  const [amount, setAmount] = useState('');

  useEffect(() => {
    fetchAccounts((data) => {
      setAccounts(data);
      if (data.length > 0) setSelected(data[0].id);
    });
  }, []);

  return (
    <View style={styles.container}>
      <Picker selectedValue={selected} onValueChange={setSelected}>
        {accounts.map(acc => (
          <Picker.Item key={acc.id} label={acc.name} value={acc.id} />
        ))}
      </Picker>

      <TextInput
        label="Amount"
        mode="outlined"
        keyboardType="numeric"
        onChangeText={setAmount}
        style={styles.input}
      />

      <Button
        mode="contained"
        style={styles.expense}
        onPress={() =>
          addTransaction(selected, 'expense', Number(amount), 'general')
        }
      >
        Add Expense
      </Button>

      <Button
        mode="contained"
        style={styles.income}
        onPress={() =>
          addTransaction(selected, 'income', Number(amount), 'salary')
        }
      >
        Add Income
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
    padding: 20,
  },
  input: {
    marginVertical: 15,
  },
  expense: {
    marginTop: 10,
    backgroundColor: theme.colors.expense,
  },
  income: {
    marginTop: 10,
    backgroundColor: theme.colors.income,
  },
});