import React, { useState } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import { Card, Text, TextInput, Button } from 'react-native-paper';
import { useFinanceStore } from '../store/useFinanceStore';

const todayIso = () => new Date().toISOString().split('T')[0];

export default function ExtraIncomeScreen() {
  const items = useFinanceStore((state) => state.extraIncomes);
  const addExtraIncome = useFinanceStore((state) => state.addExtraIncome);

  const [source, setSource] = useState('');
  const [amount, setAmount] = useState('');
  const [date, setDate] = useState(todayIso());
  const [note, setNote] = useState('');

  const submit = () => {
    if (!source || !amount) return;
    addExtraIncome({ source, amount, date, note });
    setSource('');
    setAmount('');
    setDate(todayIso());
    setNote('');
  };

  return (
    <View style={styles.container}>
      <Text variant="headlineSmall" style={styles.heading}>Extra Earnings</Text>
      <TextInput label="Source" mode="outlined" value={source} onChangeText={setSource} style={styles.input} />
      <TextInput label="Amount" mode="outlined" keyboardType="numeric" value={amount} onChangeText={setAmount} style={styles.input} />
      <TextInput label="Date (YYYY-MM-DD)" mode="outlined" value={date} onChangeText={setDate} style={styles.input} />
      <TextInput label="Note" mode="outlined" value={note} onChangeText={setNote} style={styles.input} />
      <Button mode="contained" style={styles.btn} onPress={submit}>Add Income</Button>

      <FlatList
        data={items}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Card style={styles.card}><Card.Content><Text variant="titleMedium">{item.source}</Text><Text>₹ {item.amount} • {item.date}</Text><Text>{item.note}</Text></Card.Content></Card>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f5f7fb', padding: 16 },
  heading: { marginBottom: 12, fontWeight: '700' },
  input: { marginBottom: 10 },
  btn: { marginBottom: 12, backgroundColor: '#0f766e' },
  card: { marginBottom: 8 },
});
