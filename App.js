import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import LoginScreen from './src/screens/LoginScreen';
import RegisterScreen from './src/screens/RegisterScreen';
import MainTabs from './src/navigation/MainTabs';

import { initDB } from './src/database/db';
import { getUser } from './src/database/userQueries';

const Stack = createNativeStackNavigator();

export default function App() {
  const [initialRoute, setInitialRoute] = useState(null);

  useEffect(() => {
    initDB();

    setTimeout(() => {
      getUser((user) => {
        if (user) {
          setInitialRoute('Login');   // 🔒 existing DB → LOGIN
        } else {
          setInitialRoute('Register'); // 🆕 fresh app → REGISTER
        }
      });
    }, 300);
  }, []);

  if (!initialRoute) return null;

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {initialRoute === 'Register' && (
          <Stack.Screen name="Register" component={RegisterScreen} />
        )}
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Main" component={MainTabs} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}