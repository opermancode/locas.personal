import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { TextInput, Button } from 'react-native-paper';
import { addAccount } from '../database/queries';
import { theme } from '../theme/theme';

export default function AccountsScreen() {
  const [name, setName] = useState('');
  const [balance, setBalance] = useState('');

  return (
    <View style={styles.container}>
      <TextInput
        label="Account Name"
        mode="outlined"
        onChangeText={setName}
        style={styles.input}
      />

      <TextInput
        label="Balance"
        mode="outlined"
        keyboardType="numeric"
        onChangeText={setBalance}
        style={styles.input}
      />

      <Button
        mode="contained"
        onPress={() => addAccount(name, 'bank', Number(balance))}
        style={styles.btn}
      >
        Add Bank Account
      </Button>

      <Button
        mode="contained"
        onPress={() => addAccount(name, 'credit', Number(balance))}
        style={styles.btnSecondary}
      >
        Add Credit Card
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
    marginBottom: 15,
  },
  btn: {
    marginTop: 10,
  },
  btnSecondary: {
    marginTop: 10,
    backgroundColor: theme.colors.secondary,
  },
});