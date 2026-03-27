import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { TextInput, Button } from 'react-native-paper';
import { addAccount } from '../database/queries';
import { theme } from '../theme/theme';

export default function AccountsScreen() {
  const [name, setName] = useState('');
  const [bal, setBal] = useState('');

  return (
    <View style={styles.container}>
      <TextInput label="Account Name" mode="outlined" onChangeText={setName} style={styles.input} />
      <TextInput label="Balance" mode="outlined" keyboardType="numeric" onChangeText={setBal} style={styles.input} />

      <Button mode="contained" onPress={() => addAccount(name, 'bank', Number(bal))}>
        Add Bank
      </Button>

      <Button mode="contained" style={{ marginTop: 10 }} onPress={() => addAccount(name, 'credit', Number(bal))}>
        Add Credit Card
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: theme.colors.background, padding: 20 },
  input: { marginBottom: 15 }
});
