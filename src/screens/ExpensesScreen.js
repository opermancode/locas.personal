import React, { useMemo, useState } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import { Card, Searchbar, Text } from 'react-native-paper';
import { useFinanceStore } from '../store/useFinanceStore';

export default function ExpensesScreen() {
  const expenses = useFinanceStore((state) => state.expenses);
  const [query, setQuery] = useState('');

  const filtered = useMemo(() => {
    const q = query.toLowerCase();
    return expenses.filter((item) =>
      item.note.toLowerCase().includes(q) ||
      item.title.toLowerCase().includes(q) ||
      String(item.amount).includes(q)
    );
  }, [expenses, query]);

  return (
    <View style={styles.container}>
      <Text variant="headlineSmall" style={styles.heading}>All Expenses</Text>
      <Searchbar placeholder="Search by note or amount" value={query} onChangeText={setQuery} />

      <FlatList
        contentContainerStyle={{ paddingTop: 10, paddingBottom: 20 }}
        data={filtered}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Card style={styles.card}>
            <Card.Content>
              <Text variant="titleMedium">{item.title}</Text>
              <Text>₹ {item.amount.toFixed(2)} • {item.date}</Text>
              {item.note ? <Text>{item.note}</Text> : null}
            </Card.Content>
          </Card>
        )}
        ListEmptyComponent={<Text style={styles.empty}>No expense added yet.</Text>}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f5f7fb', padding: 16 },
  heading: { marginBottom: 12, fontWeight: '700' },
  card: { marginBottom: 8 },
  empty: { textAlign: 'center', marginTop: 20, opacity: 0.7 },
});
