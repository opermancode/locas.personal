import React from 'react';
import { View, StyleSheet } from 'react-native';
import { theme } from '../theme/theme';

export default function Card({ children }) {
  return <View style={styles.card}>{children}</View>;
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: theme.colors.card,
    padding: 18,
    borderRadius: 18,
    marginVertical: 10,
    borderWidth: 1,
    borderColor: theme.colors.border,
  },
});