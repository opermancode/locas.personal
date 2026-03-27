import React from 'react';
import { View, Text } from 'react-native';
import { theme } from '../theme/theme';

export default function PortfolioScreen() {
  return (
    <View style={{ flex: 1, backgroundColor: theme.colors.background, justifyContent: 'center', alignItems: 'center' }}>
      <Text style={{ color: '#fff' }}>Portfolio Coming Soon</Text>
    </View>
  );
}
