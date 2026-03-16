/**
 * My Plant Collection Screen
 * Track and manage user's plant collection
 */

import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  Alert,
} from 'react-native';
import { UserPlant } from '../types';
import { formatDate } from '../utils/helpers';

interface CollectionScreenProps {
  onNavigate: (screen: string) => void;
  onBack: () => void;
}

const CollectionScreen: React.FC<CollectionScreenProps> = ({ onNavigate, onBack }) => {
  const [plants, setPlants] = useState<UserPlant[]>([]);

  const handleAddPlant = () => {
    Alert.alert('Future Feature', 'Plant collection management will be available soon!');
  };

  const EmptyState = () => (
    <View style={styles.emptyContainer}>
      <Text style={styles.emptyIcon}>🪴</Text>
      <Text style={styles.emptyTitle}>No Plants Yet</Text>
      <Text style={styles.emptyText}>Start your collection by adding your first plant</Text>
      <TouchableOpacity
        style={styles.addButton}
        onPress={handleAddPlant}
      >
        <Text style={styles.addButtonText}>+ Add Your First Plant</Text>
      </TouchableOpacity>
    </View>
  );

  const PlantItem = ({ item }: { item: UserPlant }) => (
    <View style={styles.plantItem}>
      <View style={styles.plantInfo}>
        <Text style={styles.plantName}>{item.plantName}</Text>
        <Text style={styles.plantMeta}>Added {formatDate(item.dateAdded)}</Text>
        <Text style={styles.plantMeta}>Location: {item.location}</Text>
      </View>
      <TouchableOpacity style={styles.moreButton}>
        <Text style={styles.moreButtonText}>•••</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <TouchableOpacity onPress={onBack} style={styles.backButton}>
        <Text style={styles.backButtonText}>← Back</Text>
      </TouchableOpacity>

      <View style={styles.header}>
        <Text style={styles.title}>My Plant Collection</Text>
        <Text style={styles.subtitle}>Track and manage your plants</Text>
      </View>

      {plants.length === 0 ? (
        <EmptyState />
      ) : (
        <View style={styles.content}>
          <FlatList
            data={plants}
            keyExtractor={(item) => item.id}
            renderItem={PlantItem}
            scrollEnabled={false}
          />
        </View>
      )}

      <View style={styles.statsSection}>
        <Text style={styles.statsTitle}>💡 Pro Tips</Text>
        <Text style={styles.statText}>• Set watering reminders for your plants</Text>
        <Text style={styles.statText}>• Track plant growth over time</Text>
        <Text style={styles.statText}>• Log care activities and observations</Text>
        <Text style={styles.statText}>• Share plant care achievements</Text>
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
    marginBottom: 24,
  },
  emptyContainer: {
    alignItems: 'center',
    paddingVertical: 60,
    paddingHorizontal: 20,
  },
  emptyIcon: {
    fontSize: 64,
    marginBottom: 16,
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
  },
  emptyText: {
    fontSize: 14,
    color: '#999',
    marginBottom: 24,
  },
  addButton: {
    backgroundColor: '#4CAF50',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 8,
  },
  addButtonText: {
    color: 'white',
    fontSize: 14,
    fontWeight: '600',
  },
  plantItem: {
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 16,
    marginBottom: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  plantInfo: {
    flex: 1,
  },
  plantName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
  },
  plantMeta: {
    fontSize: 12,
    color: '#999',
    marginBottom: 2,
  },
  moreButton: {
    padding: 8,
  },
  moreButtonText: {
    fontSize: 18,
    color: '#999',
  },
  statsSection: {
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 16,
    marginHorizontal: 20,
    marginBottom: 40,
  },
  statsTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    marginBottom: 12,
  },
  statText: {
    fontSize: 13,
    color: '#666',
    marginBottom: 8,
    lineHeight: 18,
  },
});

export default CollectionScreen;
