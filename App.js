import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Login from './src/screens/LoginScreen';
import Register from './src/screens/RegisterScreen';
import Main from './src/navigation/MainTabs';

import { initDB } from './src/database/db';
import { getUser } from './src/database/userQueries';

const Stack = createNativeStackNavigator();

export default function App() {
  const [route, setRoute] = useState(null);

  useEffect(() => {
    initDB();
    setTimeout(() => {
      getUser(user => setRoute(user ? 'Login' : 'Register'));
    }, 300);
  }, []);

  if (!route) return null;

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {route === 'Register' && <Stack.Screen name="Register" component={Register} />}
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Main" component={Main} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
