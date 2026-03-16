import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView, StyleSheet } from 'react-native';
import HomeScreen from './src/screens/HomeScreen';
import RecommendationScreen from './src/screens/RecommendationScreen';
import CareScreen from './src/screens/CareScreen';
import FAQScreen from './src/screens/FAQScreen';
import CollectionScreen from './src/screens/CollectionScreen';

type ScreenName = 'home' | 'recommendations' | 'care' | 'faq' | 'collection';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<ScreenName>('home');

  const handleNavigate = (screen: string) => {
    setCurrentScreen(screen as ScreenName);
  };

  const handleBack = () => {
    setCurrentScreen('home');
  };

  const renderScreen = () => {
    switch (currentScreen) {
      case 'recommendations':
        return <RecommendationScreen onNavigate={handleNavigate} onBack={handleBack} />;
      case 'care':
        return <CareScreen onNavigate={handleNavigate} onBack={handleBack} />;
      case 'faq':
        return <FAQScreen onNavigate={handleNavigate} onBack={handleBack} />;
      case 'collection':
        return <CollectionScreen onNavigate={handleNavigate} onBack={handleBack} />;
      case 'home':
      default:
        return <HomeScreen onNavigate={handleNavigate} />;
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {renderScreen()}
      <StatusBar style="dark" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
