/**
 * Plant Care Screen
 * Get detailed care information for specific plants
 */

import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  ActivityIndicator,
  Alert,
} from 'react-native';
import claudeService from '../services/claudeService';

interface CareScreenProps {
  onNavigate: (screen: string) => void;
  onBack: () => void;
}

const CareScreen: React.FC<CareScreenProps> = ({ onNavigate, onBack }) => {
  const [plantName, setPlantName] = useState('');
  const [careTips, setCareTips] = useState('');
  const [loading, setLoading] = useState(false);
  const [showResult, setShowResult] = useState(false);

  const handleGetCareTips = async () => {
    if (!plantName.trim()) {
      Alert.alert('Please enter a plant name');
      return;
    }

    setLoading(true);
    try {
      const response = await claudeService.getCareTips(plantName);

      if (response.success && response.data?.careTips) {
        setCareTips(response.data.careTips);
        setShowResult(true);
      } else {
        Alert.alert('Error', response.error || 'Failed to get care tips');
      }
    } catch (error) {
      Alert.alert('Error', 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  const handleNewSearch = () => {
    setPlantName('');
    setCareTips('');
    setShowResult(false);
  };

  if (showResult) {
    return (
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        <TouchableOpacity onPress={onBack} style={styles.backButton}>
          <Text style={styles.backButtonText}>← Back</Text>
        </TouchableOpacity>

        <View style={styles.header}>
          <Text style={styles.title}>Care Guide for {plantName}</Text>
        </View>

        <View style={styles.resultContainer}>
          <Text style={styles.careTipsText}>{careTips}</Text>
        </View>

        <TouchableOpacity
          style={styles.newButton}
          onPress={handleNewSearch}
        >
          <Text style={styles.buttonText}>Search Another Plant</Text>
        </TouchableOpacity>
      </ScrollView>
    );
  }

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <TouchableOpacity onPress={onBack} style={styles.backButton}>
        <Text style={styles.backButtonText}>← Back</Text>
      </TouchableOpacity>

      <View style={styles.header}>
        <Text style={styles.title}>Plant Care Guide</Text>
        <Text style={styles.subtitle}>Get detailed care instructions for any plant</Text>
      </View>

      <View style={styles.content}>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Plant Name</Text>
          <TextInput
            style={styles.textInput}
            placeholder="e.g., Monstera, Snake Plant, Pothos"
            placeholderTextColor="#999"
            value={plantName}
            onChangeText={setPlantName}
            editable={!loading}
          />
        </View>

        <TouchableOpacity
          style={[styles.submitButton, loading && styles.submitButtonDisabled]}
          onPress={handleGetCareTips}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color="white" />
          ) : (
            <Text style={styles.submitButtonText}>Get Care Tips</Text>
          )}
        </TouchableOpacity>

        <View style={styles.infoSection}>
          <Text style={styles.infoTitle}>What You'll Learn</Text>
          <View style={styles.infoItem}>
            <Text style={styles.infoIcon}>💧</Text>
            <Text style={styles.infoText}>Watering schedule and requirements</Text>
          </View>
          <View style={styles.infoItem}>
            <Text style={styles.infoIcon}>☀️</Text>
            <Text style={styles.infoText}>Light requirements</Text>
          </View>
          <View style={styles.infoItem}>
            <Text style={styles.infoIcon}>🌡️</Text>
            <Text style={styles.infoText}>Ideal temperature and humidity</Text>
          </View>
          <View style={styles.infoItem}>
            <Text style={styles.infoIcon}>🪴</Text>
            <Text style={styles.infoText}>Soil and potting needs</Text>
          </View>
          <View style={styles.infoItem}>
            <Text style={styles.infoIcon}>⚠️</Text>
            <Text style={styles.infoText}>Common problems and solutions</Text>
          </View>
          <View style={styles.infoItem}>
            <Text style={styles.infoIcon}>🌱</Text>
            <Text style={styles.infoText}>Propagation tips</Text>
          </View>
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
  backButton: {
    paddingHorizontal: 20,
    paddingVertical: 12,
    marginTop: 8,
  },
  backButtonText: {
    fontSize: 14,
    color: '#4CAF50',
    fontWeight: '600',
  },
  header: {
    paddingHorizontal: 20,
    marginBottom: 24,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 14,
    color: '#666',
  },
  content: {
    paddingHorizontal: 20,
    paddingBottom: 40,
  },
  inputContainer: {
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
  },
  textInput: {
    backgroundColor: 'white',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 14,
    color: '#333',
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  submitButton: {
    backgroundColor: '#4CAF50',
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 24,
  },
  submitButtonDisabled: {
    opacity: 0.6,
  },
  submitButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  infoSection: {
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 16,
  },
  infoTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    marginBottom: 12,
  },
  infoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  infoIcon: {
    fontSize: 18,
    marginRight: 10,
  },
  infoText: {
    fontSize: 13,
    color: '#666',
    flex: 1,
  },
  resultContainer: {
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 16,
    marginHorizontal: 20,
    marginBottom: 24,
  },
  careTipsText: {
    fontSize: 14,
    color: '#333',
    lineHeight: 22,
  },
  newButton: {
    backgroundColor: '#4CAF50',
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
    marginHorizontal: 20,
    marginBottom: 40,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default CareScreen;
