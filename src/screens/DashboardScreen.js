import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { PieChart } from 'react-native-chart-kit';
import { getMonthlyStats } from '../database/queries';
import Card from '../components/Card';
import { theme } from '../theme/theme';

export default function DashboardScreen() {
  const [stats, setStats] = useState({ income: 0, expense: 0 });

  useEffect(() => {
    getMonthlyStats(setStats);
  }, []);

  const savings = (stats.income || 0) - (stats.expense || 0);

  const data = [
    {
      name: 'Income',
      amount: stats.income || 1,
      color: theme.colors.income,
      legendFontColor: '#fff',
      legendFontSize: 12,
    },
    {
      name: 'Expense',
      amount: stats.expense || 1,
      color: theme.colors.expense,
      legendFontColor: '#fff',
      legendFontSize: 12,
    },
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Dashboard</Text>

      <Card>
        <Text style={styles.label}>Total Savings</Text>
        <Text style={styles.big}>₹ {savings}</Text>
      </Card>

      <View style={styles.row}>
        <Card>
          <Text style={styles.label}>Income</Text>
          <Text style={[styles.value, { color: theme.colors.income }]}>
            ₹ {stats.income}
          </Text>
        </Card>

        <Card>
          <Text style={styles.label}>Expense</Text>
          <Text style={[styles.value, { color: theme.colors.expense }]}>
            ₹ {stats.expense}
          </Text>
        </Card>
      </View>

      <Card>
        <Text style={styles.label}>Monthly Overview</Text>

        <PieChart
          data={data}
          width={Dimensions.get('window').width - 80}
          height={180}
          accessor="amount"
          backgroundColor="transparent"
          chartConfig={{
            color: () => '#fff',
          }}
        />
      </Card>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
    padding: 20,
  },
  title: {
    color: "#fff",
    fontSize: 26,
    marginBottom: 10,
    fontWeight: "600",
  },
  label: {
    color: theme.colors.muted,
    fontSize: 13,
  },
  big: {
    color: "#fff",
    fontSize: 28,
    marginTop: 5,
  },
  value: {
    fontSize: 18,
    marginTop: 5,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
});