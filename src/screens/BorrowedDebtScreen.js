import React, { useState } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import { Card, Text, TextInput, Button, SegmentedButtons } from 'react-native-paper';
import { useFinanceStore } from '../store/useFinanceStore';

export default function BorrowedDebtScreen() {
  const items = useFinanceStore((state) => state.debtItems);
  const addDebtItem = useFinanceStore((state) => state.addDebtItem);

  const [person, setPerson] = useState('');
  const [relationType, setRelationType] = useState('i-owe');
  const [amount, setAmount] = useState('');
  const [interest, setInterest] = useState('');
  const [emi, setEmi] = useState('');
  const [note, setNote] = useState('');

  const submit = () => {
    if (!person || !amount) return;
    addDebtItem({ person, relationType, amount, interest, emi, note });
    setPerson('');
    setAmount('');
    setInterest('');
    setEmi('');
    setNote('');
  };

  return (
    <View style={styles.container}>
      <Text variant="headlineSmall" style={styles.heading}>Borrowed / Debt</Text>
      <SegmentedButtons
        value={relationType}
        onValueChange={setRelationType}
        buttons={[{ value: 'i-owe', label: 'I Owe' }, { value: 'owed-to-me', label: 'Owed to Me' }]}
      />
      <TextInput label="Person / Friend Name" mode="outlined" value={person} onChangeText={setPerson} style={styles.input} />
      <TextInput label="Amount" mode="outlined" keyboardType="numeric" value={amount} onChangeText={setAmount} style={styles.input} />
      <TextInput label="Interest %" mode="outlined" keyboardType="numeric" value={interest} onChangeText={setInterest} style={styles.input} />
      <TextInput label="Monthly EMI" mode="outlined" keyboardType="numeric" value={emi} onChangeText={setEmi} style={styles.input} />
      <TextInput label="Note" mode="outlined" value={note} onChangeText={setNote} style={styles.input} />
      <Button mode="contained" style={styles.btn} onPress={submit}>Add Record</Button>

      <FlatList
        data={items}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Card style={styles.card}>
            <Card.Content>
              <Text variant="titleMedium">{item.person}</Text>
              <Text>{item.relationType === 'i-owe' ? 'Debt I need to pay' : 'Borrowed from me'}</Text>
              <Text>₹ {item.amount} • Interest: {item.interest}% • EMI: ₹ {item.emi}</Text>
              <Text>{item.note}</Text>
            </Card.Content>
          </Card>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f5f7fb', padding: 16 },
  heading: { marginBottom: 12, fontWeight: '700' },
  input: { marginVertical: 8 },
  btn: { marginVertical: 8, backgroundColor: '#0f766e' },
  card: { marginBottom: 8 },
});
