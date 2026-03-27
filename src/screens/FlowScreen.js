import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { TextInput, Button } from 'react-native-paper';
import { addFlow } from '../database/queries';
import { theme } from '../theme/theme';

export default function FlowScreen() {
  const [name, setName] = useState('');
  const [amt, setAmt] = useState('');

  return (
    <View style={styles.container}>
      <TextInput label="Person" onChangeText={setName} style={styles.input} />
      <TextInput label="Amount" onChangeText={setAmt} style={styles.input} />

      <Button mode="contained" onPress={() => addFlow(name, Number(amt), 'lent')}>
        Lent
      </Button>

      <Button mode="contained" style={{ marginTop: 10 }}
        onPress={() => addFlow(name, Number(amt), 'borrowed')}>
        Borrowed
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: theme.colors.background, padding: 20 },
  input: { marginBottom: 15 }
});
