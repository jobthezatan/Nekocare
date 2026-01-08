import React, { useState } from 'react';
import { View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { PetProvider } from './src/store/PetStore';
import DashboardScreen from './src/screens/DashboardScreen';
import RiskAssessmentScreen from './src/screens/RiskAssessmentScreen';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState('Dashboard');

  const navigateTo = (screenName) => {
    setCurrentScreen(screenName);
  };

  return (
    <PetProvider>
      <View style={{ flex: 1 }}>
        <StatusBar style="auto" />
        {currentScreen === 'Dashboard' ? (
          <DashboardScreen navigateTo={navigateTo} />
        ) : (
          <RiskAssessmentScreen navigateTo={navigateTo} />
        )}
      </View>
    </PetProvider>
  );
}
