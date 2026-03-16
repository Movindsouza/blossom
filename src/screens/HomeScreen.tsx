/**
 * Home Screen - Main Landing Page
 * First screen users see when opening the app
 */

import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';

interface HomeScreenProps {
  onNavigate: (screen: string) => void;
}

const HomeScreen: React.FC<HomeScreenProps> = ({ onNavigate }) => {
  const [loading, setLoading] = useState(false);

  const handleGetRecommendations = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      onNavigate('recommendations');
    }, 500);
  };

  const handleLearnCare = () => {
    onNavigate('care');
  };

  const handleAskQuestion = () => {
    onNavigate('faq');
  };

  const handleViewCollection = () => {
    onNavigate('collection');
  };

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#4CAF50" />
      </View>
    );
  }

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>🌱 Blossom</Text>
        <Text style={styles.subtitle}>Your First Plant Care Companion</Text>
      </View>

      {/* Main Content */}
      <View style={styles.content}>
        {/* Welcome Section */}
        <View style={styles.welcomeSection}>
          <Text style={styles.sectionTitle}>Welcome to Blossom!</Text>
          <Text style={styles.description}>
            New to plants? We'll help you find the perfect first plant and guide you every step of the way.
          </Text>
        </View>

        {/* Main Actions */}
        <View style={styles.actionsContainer}>
          {/* Get Recommendations Button */}
          <TouchableOpacity
            style={[styles.actionButton, styles.primaryButton]}
            onPress={handleGetRecommendations}
          >
            <Text style={styles.actionButtonText}>🌿 Get Plant Recommendations</Text>
            <Text style={styles.actionButtonSubtext}>Find plants perfect for you</Text>
          </TouchableOpacity>

          {/* Learn Care Button */}
          <TouchableOpacity
            style={[styles.actionButton, styles.secondaryButton]}
            onPress={handleLearnCare}
          >
            <Text style={styles.actionButtonText}>📚 Learn Plant Care</Text>
            <Text style={styles.actionButtonSubtext}>Get care tips for any plant</Text>
          </TouchableOpacity>

          {/* Ask Question Button */}
          <TouchableOpacity
            style={[styles.actionButton, styles.secondaryButton]}
            onPress={handleAskQuestion}
          >
            <Text style={styles.actionButtonText}>❓ Ask Questions</Text>
            <Text style={styles.actionButtonSubtext}>Get expert advice instantly</Text>
          </TouchableOpacity>

          {/* View Collection Button */}
          <TouchableOpacity
            style={[styles.actionButton, styles.secondaryButton]}
            onPress={handleViewCollection}
          >
            <Text style={styles.actionButtonText}>🏡 My Plant Collection</Text>
            <Text style={styles.actionButtonSubtext}>Track your plants</Text>
          </TouchableOpacity>
        </View>

        {/* Features Section */}
        <View style={styles.featuresSection}>
          <Text style={styles.featureTitle}>Why Choose Blossom?</Text>
          
          <View style={styles.featureItem}>
            <Text style={styles.featureIcon}>🤖</Text>
            <View style={styles.featureText}>
              <Text style={styles.featureName}>AI-Powered Advice</Text>
              <Text style={styles.featureDescription}>Get personalized recommendations powered by Claude AI</Text>
            </View>
          </View>

          <View style={styles.featureItem}>
            <Text style={styles.featureIcon}>👶</Text>
            <View style={styles.featureText}>
              <Text style={styles.featureName}>Beginner-Friendly</Text>
              <Text style={styles.featureDescription}>Perfect for your first plant purchase</Text>
            </View>
          </View>

          <View style={styles.featureItem}>
            <Text style={styles.featureIcon}>📱</Text>
            <View style={styles.featureText}>
              <Text style={styles.featureName}>Easy Tracking</Text>
              <Text style={styles.featureDescription}>Keep track of your plant collection and care schedules</Text>
            </View>
          </View>

          <View style={styles.featureItem}>
            <Text style={styles.featureIcon}>❤️</Text>
            <View style={styles.featureText}>
              <Text style={styles.featureName}>Made with Care</Text>
              <Text style={styles.featureDescription}>Built by plant lovers for plant lovers</Text>
            </View>
          </View>
        </View>

        {/* Footer */}
        <View style={styles.footer}>
          <Text style={styles.footerText}>Start your plant journey today! 🌿</Text>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  header: {
    backgroundColor: '#4CAF50',
    paddingTop: 20,
    paddingBottom: 30,
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  title: {
    fontSize: 36,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.9)',
  },
  content: {
    flex: 1,
    paddingBottom: 30,
  },
  welcomeSection: {
    paddingHorizontal: 20,
    paddingTop: 24,
    paddingBottom: 20,
    backgroundColor: 'white',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#333',
    marginBottom: 10,
  },
  description: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
  },
  actionsContainer: {
    paddingHorizontal: 20,
    marginBottom: 24,
  },
  actionButton: {
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    flexDirection: 'column',
    justifyContent: 'center',
  },
  primaryButton: {
    backgroundColor: '#4CAF50',
  },
  secondaryButton: {
    backgroundColor: 'white',
    borderWidth: 2,
    borderColor: '#4CAF50',
  },
  actionButtonText: {
    fontSize: 16,
    fontWeight: '600',
  },
  actionButtonSubtext: {
    fontSize: 12,
    marginTop: 4,
    opacity: 0.7,
  },
  featuresSection: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  featureTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 16,
  },
  featureItem: {
    flexDirection: 'row',
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 14,
    marginBottom: 12,
    alignItems: 'flex-start',
  },
  featureIcon: {
    fontSize: 24,
    marginRight: 12,
  },
  featureText: {
    flex: 1,
  },
  featureName: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
  },
  featureDescription: {
    fontSize: 12,
    color: '#999',
    lineHeight: 16,
  },
  footer: {
    alignItems: 'center',
    paddingVertical: 20,
  },
  footerText: {
    fontSize: 14,
    color: '#999',
  },
});

export default HomeScreen;
