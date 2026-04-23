import React, { useState } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import { Card, Text, TextInput, Button, SegmentedButtons } from 'react-native-paper';
import { useFinanceStore } from '../store/useFinanceStore';

export default function AccountsScreen() {
  const accounts = useFinanceStore((state) => state.accounts);
  const addAccount = useFinanceStore((state) => state.addAccount);
  const [name, setName] = useState('');
  const [branch, setBranch] = useState('');
  const [kind, setKind] = useState('bank');

  const submit = () => {
    if (!name || !branch) return;
    addAccount({ name, branch, kind });
    setName('');
    setBranch('');
  };

  return (
    <View style={styles.container}>
      <Text variant="headlineSmall" style={styles.heading}>Banks & Credit Cards</Text>
      <TextInput label="Name" mode="outlined" value={name} onChangeText={setName} style={styles.input} />
      <TextInput label="Branch" mode="outlined" value={branch} onChangeText={setBranch} style={styles.input} />
      <SegmentedButtons
        value={kind}
        onValueChange={setKind}
        buttons={[{ value: 'bank', label: 'Bank' }, { value: 'credit-card', label: 'Credit Card' }]}
      />
      <Button mode="contained" style={styles.btn} onPress={submit}>Add</Button>

      <FlatList
        data={accounts}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Card style={styles.card}><Card.Content><Text variant="titleMedium">{item.name}</Text><Text>{item.kind} • {item.branch}</Text></Card.Content></Card>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f5f7fb', padding: 16 },
  heading: { marginBottom: 12, fontWeight: '700' },
  input: { marginBottom: 10 },
  btn: { marginVertical: 10, backgroundColor: '#0f766e' },
  card: { marginTop: 8 },
});
