import React, { useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { Card, Text, FAB, Portal, Modal, TextInput, Button, HelperText } from 'react-native-paper';
import { useFinanceStore } from '../store/useFinanceStore';

const todayIso = () => new Date().toISOString().split('T')[0];

export default function DashboardScreen() {
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState('');
  const [amount, setAmount] = useState('');
  const [note, setNote] = useState('');
  const [date, setDate] = useState(todayIso());

  const addExpense = useFinanceStore((state) => state.addExpense);
  const stats = useFinanceStore((state) => state.summary());

  const submitExpense = () => {
    if (!title || !amount) return;
    addExpense({ title, amount, note, date });
    setTitle('');
    setAmount('');
    setNote('');
    setDate(todayIso());
    setOpen(false);
  };

  return (
    <>
      <ScrollView style={styles.container} contentContainerStyle={styles.content}>
        <Text variant="headlineMedium" style={styles.heading}>locas.personal Dashboard</Text>

        <Card style={styles.card}><Card.Content><Text variant="titleMedium">Current Balance</Text><Text variant="headlineSmall">₹ {stats.balance.toFixed(2)}</Text></Card.Content></Card>

        <View style={styles.row}>
          <Card style={[styles.card, styles.rowCard]}><Card.Content><Text>Total Earned</Text><Text>₹ {stats.earned.toFixed(2)}</Text></Card.Content></Card>
          <Card style={[styles.card, styles.rowCard]}><Card.Content><Text>Total Spent</Text><Text>₹ {stats.spent.toFixed(2)}</Text></Card.Content></Card>
        </View>

        <Card style={styles.card}><Card.Content><Text>Scheduled Debits (automation)</Text><Text>₹ {stats.scheduledDebit.toFixed(2)}</Text></Card.Content></Card>
        <Text style={styles.tip}>Tap + to add daily expense. Date defaults to today, or edit manually (YYYY-MM-DD).</Text>
      </ScrollView>

      <Portal>
        <Modal visible={open} onDismiss={() => setOpen(false)} contentContainerStyle={styles.modal}>
          <Text variant="titleLarge">Add Daily Expense</Text>
          <TextInput label="Expense Title" mode="outlined" value={title} onChangeText={setTitle} style={styles.input} />
          <TextInput label="Amount" mode="outlined" keyboardType="numeric" value={amount} onChangeText={setAmount} style={styles.input} />
          <TextInput label="Note (optional)" mode="outlined" value={note} onChangeText={setNote} style={styles.input} />
          <TextInput label="Date (YYYY-MM-DD)" mode="outlined" value={date} onChangeText={setDate} style={styles.input} />
          <HelperText type="info">Auto-captured today by default. Change manually anytime.</HelperText>
          <Button mode="contained" onPress={submitExpense}>Save Expense</Button>
        </Modal>
      </Portal>

      <FAB icon="plus" style={styles.fab} onPress={() => setOpen(true)} />
    </>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f5f7fb' },
  content: { padding: 16, paddingBottom: 100 },
  heading: { marginBottom: 12, fontWeight: '700' },
  card: { marginBottom: 12 },
  row: { flexDirection: 'row', gap: 8 },
  rowCard: { flex: 1 },
  tip: { opacity: 0.75, marginTop: 8 },
  fab: { position: 'absolute', margin: 16, right: 0, bottom: 0, backgroundColor: '#0f766e' },
  modal: { margin: 16, backgroundColor: '#fff', borderRadius: 12, padding: 16 },
  input: { marginTop: 10 },
});
