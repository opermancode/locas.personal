import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { TextInput, Button } from 'react-native-paper';
import { loginUser } from '../database/userQueries';
import { theme } from '../theme/theme';

export default function LoginScreen({ navigation }) {
  const [u, setU] = useState('');
  const [p, setP] = useState('');

  const handleLogin = () => {
    loginUser(u, p, ok => {
      if (ok) navigation.replace('Main');
      else alert('Invalid credentials');
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>LocasDot Personal</Text>
      <Text style={styles.subtitle}>Secure your finances</Text>

      <TextInput label="Username" mode="outlined" onChangeText={setU} style={styles.input} />
      <TextInput label="Password" secureTextEntry mode="outlined" onChangeText={setP} style={styles.input} />

      <Button mode="contained" onPress={handleLogin} style={styles.button}>
        Login
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: theme.colors.background, padding: 20, justifyContent: 'center' },
  title: { color: '#fff', fontSize: 28, fontWeight: '600' },
  subtitle: { color: theme.colors.muted, marginBottom: 20 },
  input: { marginBottom: 15 },
  button: { marginTop: 10 }
});
