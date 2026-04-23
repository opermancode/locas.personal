import React from 'react';
import { Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { PaperProvider } from 'react-native-paper';

import DashboardScreen from './src/screens/DashboardScreen';
import AccountsScreen from './src/screens/AccountsScreen';
import ExpensesScreen from './src/screens/ExpensesScreen';
import AutomationScreen from './src/screens/AutomationScreen';
import ExtraIncomeScreen from './src/screens/ExtraIncomeScreen';
import BorrowedDebtScreen from './src/screens/BorrowedDebtScreen';
import SettingsScreen from './src/screens/SettingsScreen';

const Tab = createBottomTabNavigator();

const screens = [
  { name: 'Dashboard', component: DashboardScreen, icon: '🏠' },
  { name: 'Accounts', component: AccountsScreen, icon: '🏦' },
  { name: 'Expenses', component: ExpensesScreen, icon: '🧾' },
  { name: 'Automation', component: AutomationScreen, icon: '⚙️' },
  { name: 'Income+', component: ExtraIncomeScreen, icon: '💸' },
  { name: 'Borrowed/Debt', component: BorrowedDebtScreen, icon: '🤝' },
  { name: 'Settings', component: SettingsScreen, icon: '🔧' },
];

export default function App() {
  return (
    <SafeAreaProvider>
      <PaperProvider>
        <NavigationContainer>
          <Tab.Navigator
            screenOptions={({ route }) => ({
              headerShown: false,
              tabBarActiveTintColor: '#0f766e',
              tabBarIcon: ({ color }) => {
                const screen = screens.find((s) => s.name === route.name);
                return <Text style={{ color }}>{screen?.icon ?? '•'}</Text>;
              },
              tabBarLabelStyle: { fontSize: 11 },
            })}
          >
            {screens.map((screen) => (
              <Tab.Screen key={screen.name} name={screen.name} component={screen.component} />
            ))}
          </Tab.Navigator>
        </NavigationContainer>
      </PaperProvider>
    </SafeAreaProvider>
  );
}
