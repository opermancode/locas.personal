import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Card, Text } from 'react-native-paper';

export default function SettingsScreen() {
  return (
    <View style={styles.container}>
      <Text variant="headlineSmall" style={styles.heading}>Settings</Text>
      <Card>
        <Card.Content>
          <Text variant="titleMedium">Offline First</Text>
          <Text>This version works locally on device and keeps data in app memory.</Text>
        </Card.Content>
      </Card>
      <Card style={{ marginTop: 10 }}>
        <Card.Content>
          <Text variant="titleMedium">Upcoming</Text>
          <Text>Backup/restore and app lock can be added next.</Text>
        </Card.Content>
      </Card>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f5f7fb', padding: 16 },
  heading: { marginBottom: 12, fontWeight: '700' },
});
