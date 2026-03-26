import React, { useState } from 'react';
import { View } from 'react-native';
import { TextInput, Button, Text } from 'react-native-paper';
import { loginUser } from '../database/userQueries';

export default function LoginScreen({ navigation }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    loginUser(username, password, (success) => {
      if (success) {
        navigation.replace('Main');
      } else {
        alert("Invalid username or password");
      }
    });
  };

  return (
    <View style={{ padding: 20 }}>
      <Text variant="headlineMedium">Login</Text>

      <TextInput label="Username" onChangeText={setUsername} />
      <TextInput label="Password" secureTextEntry onChangeText={setPassword} />

      <Button mode="contained" onPress={handleLogin}>
        Login
      </Button>
    </View>
  );
}