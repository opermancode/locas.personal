import React, { useEffect, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { TextInput, Button } from 'react-native-paper';
import { Picker } from '@react-native-picker/picker';
import { fetchAccounts, addTransaction } from '../database/queries';
import { theme } from '../theme/theme';

export default function AddTransactionScreen() {
  const [accounts, setAccounts] = useState([]);
  const [sel, setSel] = useState(null);
  const [amt, setAmt] = useState('');

  useEffect(() => {
    fetchAccounts(data => {
      setAccounts(data);
      if (data.length) setSel(data[0].id);
    });
  }, []);

  return (
    <View style={styles.container}>
      <Picker selectedValue={sel} onValueChange={setSel}>
        {accounts.map(a => <Picker.Item key={a.id} label={a.name} value={a.id} />)}
      </Picker>

      <TextInput label="Amount" mode="outlined" onChangeText={setAmt} style={styles.input} />

      <Button mode="contained" style={{ backgroundColor: theme.colors.expense }}
        onPress={() => addTransaction(sel, 'expense', Number(amt), 'general')}>
        Add Expense
      </Button>

      <Button mode="contained" style={{ marginTop: 10, backgroundColor: theme.colors.income }}
        onPress={() => addTransaction(sel, 'income', Number(amt), 'salary')}>
        Add Income
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: theme.colors.background, padding: 20 },
  input: { marginVertical: 15 }
});
