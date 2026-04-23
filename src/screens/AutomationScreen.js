import React, { useState } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import { Card, Text, TextInput, Button, SegmentedButtons } from 'react-native-paper';
import { useFinanceStore } from '../store/useFinanceStore';

export default function AutomationScreen() {
  const automations = useFinanceStore((state) => state.automations);
  const addAutomation = useFinanceStore((state) => state.addAutomation);

  const [title, setTitle] = useState('');
  const [type, setType] = useState('credit');
  const [amount, setAmount] = useState('');
  const [dayOfMonth, setDayOfMonth] = useState('1');
  const [note, setNote] = useState('');

  const submit = () => {
    if (!title || !amount || !dayOfMonth) return;
    addAutomation({ title, type, amount, dayOfMonth, note });
    setTitle('');
    setAmount('');
    setDayOfMonth('1');
    setNote('');
  };

  return (
    <View style={styles.container}>
      <Text variant="headlineSmall" style={styles.heading}>Automation</Text>
      <Text style={styles.sub}>Example: salary +25k monthly, EMI auto debit, interest payments.</Text>

      <TextInput label="Automation Title" mode="outlined" value={title} onChangeText={setTitle} style={styles.input} />
      <SegmentedButtons
        value={type}
        onValueChange={setType}
        buttons={[{ value: 'credit', label: 'Credit' }, { value: 'debit', label: 'Debit' }]}
      />
      <TextInput label="Amount" mode="outlined" keyboardType="numeric" value={amount} onChangeText={setAmount} style={styles.input} />
      <TextInput label="Day of month (1-28)" mode="outlined" keyboardType="numeric" value={dayOfMonth} onChangeText={setDayOfMonth} style={styles.input} />
      <TextInput label="Note" mode="outlined" value={note} onChangeText={setNote} style={styles.input} />
      <Button mode="contained" onPress={submit} style={styles.btn}>Save Automation</Button>

      <FlatList
        data={automations}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Card style={styles.card}><Card.Content><Text variant="titleMedium">{item.title}</Text><Text>{item.type.toUpperCase()} ₹ {item.amount} on day {item.dayOfMonth}</Text><Text>{item.note}</Text></Card.Content></Card>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f5f7fb', padding: 16 },
  heading: { marginBottom: 8, fontWeight: '700' },
  sub: { marginBottom: 8, opacity: 0.75 },
  input: { marginVertical: 8 },
  btn: { marginBottom: 12, backgroundColor: '#0f766e' },
  card: { marginBottom: 8 },
});
