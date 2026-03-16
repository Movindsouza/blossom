/**
 * FAQ Screen - Ask Plant Care Questions
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

interface FAQScreenProps {
  onNavigate: (screen: string) => void;
  onBack: () => void;
}

const FAQScreen: React.FC<FAQScreenProps> = ({ onNavigate, onBack }) => {
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const [loading, setLoading] = useState(false);
  const [showAnswer, setShowAnswer] = useState(false);

  const handleAskQuestion = async () => {
    if (!question.trim()) {
      Alert.alert('Please enter a question');
      return;
    }

    setLoading(true);
    try {
      const response = await claudeService.answerQuestion(question);

      if (response.success && response.data?.answer) {
        setAnswer(response.data.answer);
        setShowAnswer(true);
      } else {
        Alert.alert('Error', response.error || 'Failed to get answer');
      }
    } catch (error) {
      Alert.alert('Error', 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  const handleNewQuestion = () => {
    setQuestion('');
    setAnswer('');
    setShowAnswer(false);
  };

  if (showAnswer) {
    return (
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        <TouchableOpacity onPress={onBack} style={styles.backButton}>
          <Text style={styles.backButtonText}>← Back</Text>
        </TouchableOpacity>

        <View style={styles.header}>
          <Text style={styles.title}>Your Question</Text>
        </View>

        <View style={styles.questionBox}>
          <Text style={styles.questionText}>{question}</Text>
        </View>

        <View style={styles.answerContainer}>
          <Text style={styles.answerTitle}>Answer</Text>
          <Text style={styles.answerText}>{answer}</Text>
        </View>

        <TouchableOpacity
          style={styles.newButton}
          onPress={handleNewQuestion}
        >
          <Text style={styles.buttonText}>Ask Another Question</Text>
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
        <Text style={styles.title}>Ask Plant Questions</Text>
        <Text style={styles.subtitle}>Get expert advice from our AI assistant</Text>
      </View>

      <View style={styles.content}>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Your Question</Text>
          <TextInput
            style={styles.textInput}
            placeholder="e.g., Why are my plant leaves turning yellow?"
            placeholderTextColor="#999"
            value={question}
            onChangeText={setQuestion}
            multiline
            numberOfLines={4}
            editable={!loading}
          />
        </View>

        <TouchableOpacity
          style={[styles.submitButton, loading && styles.submitButtonDisabled]}
          onPress={handleAskQuestion}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color="white" />
          ) : (
            <Text style={styles.submitButtonText}>Get Answer</Text>
          )}
        </TouchableOpacity>

        <View style={styles.tipsSection}>
          <Text style={styles.tipsTitle}>💡 Tips for Better Answers</Text>
          <Text style={styles.tipText}>• Be specific about your plant</Text>
          <Text style={styles.tipText}>• Describe what you're observing</Text>
          <Text style={styles.tipText}>• Include environmental details (light, water, temperature)</Text>
          <Text style={styles.tipText}>• Ask one question at a time</Text>
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
    padding: 12,
    fontSize: 14,
    color: '#333',
    borderWidth: 1,
    borderColor: '#E0E0E0',
    textAlignVertical: 'top',
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
  tipsSection: {
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 16,
  },
  tipsTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    marginBottom: 12,
  },
  tipText: {
    fontSize: 13,
    color: '#666',
    marginBottom: 8,
    lineHeight: 18,
  },
  questionBox: {
    backgroundColor: '#E8F5E9',
    borderRadius: 8,
    padding: 16,
    marginHorizontal: 20,
    marginBottom: 16,
  },
  questionText: {
    fontSize: 14,
    color: '#2E7D32',
    lineHeight: 20,
    fontWeight: '500',
  },
  answerContainer: {
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 16,
    marginHorizontal: 20,
    marginBottom: 24,
  },
  answerTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    marginBottom: 12,
  },
  answerText: {
    fontSize: 14,
    color: '#666',
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

export default FAQScreen;
