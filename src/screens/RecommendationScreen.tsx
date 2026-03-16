/**
 * Plant Recommendation Screen
 * Helps users find the perfect first plant based on their conditions
 */

import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  Alert,
} from 'react-native';
import claudeService from '../services/claudeService';
import { PlantRecommendationRequest } from '../types';

interface RecommendationScreenProps {
  onNavigate: (screen: string) => void;
  onBack: () => void;
}

const RecommendationScreen: React.FC<RecommendationScreenProps> = ({ onNavigate, onBack }) => {
  const [step, setStep] = useState<'questions' | 'loading' | 'results'>('questions');
  const [recommendations, setRecommendations] = useState<string>('');
  const [loading, setLoading] = useState(false);

  // Form state
  const [experience, setExperience] = useState<'beginner' | 'intermediate' | 'advanced'>('beginner');
  const [light, setLight] = useState<'low' | 'medium' | 'high' | 'indirect'>('medium');
  const [watering, setWatering] = useState<'minimal' | 'weekly' | 'regular'>('weekly');
  const [space, setSpace] = useState<'small' | 'medium' | 'large'>('medium');
  const [pets, setPets] = useState(false);

  const handleGetRecommendations = async () => {
    setLoading(true);
    setStep('loading');

    try {
      const request: PlantRecommendationRequest = {
        experience,
        light,
        wateringCapability: watering,
        space,
        pets,
      };

      console.log('📤 Sending recommendation request:', request);
      const response = await claudeService.getPlantRecommendations(request);
      console.log('📥 Received response:', response);

      if (response.success && response.data?.recommendations) {
        console.log('✅ Success! Setting recommendations');
        setRecommendations(response.data.recommendations);
        setStep('results');
      } else {
        console.log('❌ Response failed:', response.error);
        Alert.alert('Error', response.error || 'Failed to get recommendations');
        setStep('questions');
      }
    } catch (error) {
      console.log('❌ Exception caught:', error);
      Alert.alert('Error', 'An error occurred while getting recommendations');
      setStep('questions');
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setStep('questions');
    setRecommendations('');
    setExperience('beginner');
    setLight('medium');
    setWatering('weekly');
    setSpace('medium');
    setPets(false);
  };

  // Question Section Component
  const QuestionSection = () => (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={styles.container}>
        <TouchableOpacity onPress={onBack} style={styles.backButton}>
          <Text style={styles.backButtonText}>← Back</Text>
        </TouchableOpacity>

        <View style={styles.header}>
          <Text style={styles.title}>Find Your Perfect First Plant</Text>
          <Text style={styles.subtitle}>Answer a few questions and get personalized recommendations</Text>
        </View>

        <View style={styles.questionsContainer}>
          {/* Experience Level */}
          <View style={styles.questionGroup}>
            <Text style={styles.questionTitle}>Your Experience Level</Text>
            <View style={styles.optionsContainer}>
              {(['beginner', 'intermediate', 'advanced'] as const).map((option) => (
                <TouchableOpacity
                  key={option}
                  style={[
                    styles.optionButton,
                    experience === option && styles.optionButtonActive,
                  ]}
                  onPress={() => setExperience(option)}
                >
                  <Text
                    style={[
                      styles.optionText,
                      experience === option && styles.optionTextActive,
                    ]}
                  >
                    {option.charAt(0).toUpperCase() + option.slice(1)}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* Light Conditions */}
          <View style={styles.questionGroup}>
            <Text style={styles.questionTitle}>Available Light</Text>
            <View style={styles.optionsContainer}>
              {(['low', 'medium', 'high', 'indirect'] as const).map((option) => (
                <TouchableOpacity
                  key={option}
                  style={[
                    styles.optionButton,
                    light === option && styles.optionButtonActive,
                  ]}
                  onPress={() => setLight(option)}
                >
                  <Text
                    style={[
                      styles.optionText,
                      light === option && styles.optionTextActive,
                    ]}
                  >
                    {option.charAt(0).toUpperCase() + option.slice(1)}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* Watering Frequency */}
          <View style={styles.questionGroup}>
            <Text style={styles.questionTitle}>How Often Can You Water?</Text>
            <View style={styles.optionsContainer}>
              {(['minimal', 'weekly', 'regular'] as const).map((option) => (
                <TouchableOpacity
                  key={option}
                  style={[
                    styles.optionButton,
                    watering === option && styles.optionButtonActive,
                  ]}
                  onPress={() => setWatering(option)}
                >
                  <Text
                    style={[
                      styles.optionText,
                      watering === option && styles.optionTextActive,
                    ]}
                  >
                    {option === 'minimal' ? 'Rarely' : option.charAt(0).toUpperCase() + option.slice(1)}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* Space Available */}
          <View style={styles.questionGroup}>
            <Text style={styles.questionTitle}>Space Available</Text>
            <View style={styles.optionsContainer}>
              {(['small', 'medium', 'large'] as const).map((option) => (
                <TouchableOpacity
                  key={option}
                  style={[
                    styles.optionButton,
                    space === option && styles.optionButtonActive,
                  ]}
                  onPress={() => setSpace(option)}
                >
                  <Text
                    style={[
                      styles.optionText,
                      space === option && styles.optionTextActive,
                    ]}
                  >
                    {option.charAt(0).toUpperCase() + option.slice(1)}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* Pets */}
          <View style={styles.questionGroup}>
            <Text style={styles.questionTitle}>Do you have pets?</Text>
            <View style={styles.optionsContainer}>
              {(['No', 'Yes'] as const).map((option, index) => (
                <TouchableOpacity
                  key={option}
                  style={[
                    styles.optionButton,
                    pets === (index === 1) && styles.optionButtonActive,
                  ]}
                  onPress={() => setPets(index === 1)}
                >
                  <Text
                    style={[
                      styles.optionText,
                      pets === (index === 1) && styles.optionTextActive,
                    ]}
                  >
                    {option}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* Get Recommendations Button */}
          <TouchableOpacity
            style={styles.submitButton}
            onPress={handleGetRecommendations}
            disabled={loading}
          >
            <Text style={styles.submitButtonText}>Get My Recommendations</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );

  // Loading Section
  const LoadingSection = () => (
    <View style={styles.centerContainer}>
      <ActivityIndicator size="large" color="#4CAF50" />
      <Text style={styles.loadingText}>Finding perfect plants for you...</Text>
    </View>
  );

  // Results Section
  const ResultsSection = () => (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={styles.container}>
        <TouchableOpacity onPress={handleReset} style={styles.backButton}>
          <Text style={styles.backButtonText}>← Back</Text>
        </TouchableOpacity>

        <View style={styles.header}>
          <Text style={styles.title}>Your Plant Recommendations</Text>
        </View>

        <View style={styles.resultsContainer}>
          <Text style={styles.recommendationsText}>{recommendations}</Text>
        </View>

        <TouchableOpacity
          style={styles.submitButton}
          onPress={handleReset}
        >
          <Text style={styles.submitButtonText}>Get New Recommendations</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );

  if (step === 'loading') {
    return <LoadingSection />;
  }

  if (step === 'results') {
    return <ResultsSection />;
  }

  return <QuestionSection />;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
    paddingHorizontal: 20,
    paddingTop: 12,
  },
  centerContainer: {
    flex: 1,
    backgroundColor: '#F5F5F5',
    justifyContent: 'center',
    alignItems: 'center',
  },
  backButton: {
    paddingVertical: 8,
    marginBottom: 16,
  },
  backButtonText: {
    fontSize: 14,
    color: '#4CAF50',
    fontWeight: '600',
  },
  header: {
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
  questionsContainer: {
    marginBottom: 32,
  },
  questionGroup: {
    marginBottom: 24,
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
  },
  questionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 12,
  },
  optionsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  optionButton: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: '#E0E0E0',
    minWidth: '30%',
    alignItems: 'center',
  },
  optionButtonActive: {
    backgroundColor: '#4CAF50',
    borderColor: '#4CAF50',
  },
  optionText: {
    fontSize: 14,
    color: '#666',
    fontWeight: '500',
  },
  optionTextActive: {
    color: 'white',
  },
  submitButton: {
    backgroundColor: '#4CAF50',
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 8,
    marginBottom: 40,
  },
  submitButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  loadingText: {
    marginTop: 16,
    fontSize: 16,
    color: '#666',
  },
  resultsContainer: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    marginTop: 16,
    marginBottom: 24,
  },
  recommendationsText: {
    fontSize: 14,
    color: '#333',
    lineHeight: 22,
  },
});

export default RecommendationScreen;
