import React, { useState } from 'react';
import { View } from 'react-native';
import { TextInput, Button, Text } from 'react-native-paper';
import { registerUser } from '../database/userQueries';

export default function RegisterScreen({ navigation }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');

  const handleRegister = () => {
    if (!username || !password) {
      alert("Fill all fields");
      return;
    }

    if (password !== confirm) {
      alert("Passwords do not match");
      return;
    }

    registerUser(username, password, (success, msg) => {
      if (success) {
        alert("Registered!");
        navigation.replace('Login');
      } else {
        alert(msg || "Error");
      }
    });
  };

  return (
    <View style={{ padding: 20 }}>
      <Text variant="headlineMedium">Create Account</Text>

      <TextInput label="Username" onChangeText={setUsername} />
      <TextInput label="Password" secureTextEntry onChangeText={setPassword} />
      <TextInput label="Confirm Password" secureTextEntry onChangeText={setConfirm} />

      <Button mode="contained" onPress={handleRegister}>
        Register
      </Button>
    </View>
  );
}