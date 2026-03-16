/**
 * Type Definitions for Blossom App
 */

/**
 * Plant object structure
 */
export interface Plant {
  id: string;
  name: string;
  scientificName: string;
  description: string;
  difficulty: 'easy' | 'medium' | 'hard';
  wateringSchedule: string;
  lightRequirements: 'low' | 'medium' | 'high' | 'indirect';
  temperature: {
    min: number;
    max: number;
  };
  humidity: string;
  size: string;
  petFriendly: boolean;
  imageUrl?: string;
  careNotes: string[];
  commonIssues: Issue[];
}

/**
 * Common plant issues and solutions
 */
export interface Issue {
  title: string;
  description: string;
  solution: string;
  symptoms: string[];
}

/**
 * User's plant collection item
 */
export interface UserPlant {
  id: string;
  plantId: string;
  plantName: string;
  dateAdded: Date;
  location: string;
  wateringFrequency: number; // days
  lastWatered: Date;
  notes: string;
}

/**
 * Claude API Response
 */
export interface ClaudeResponse {
  success: boolean;
  message: string;
  data?: any;
  error?: string;
}

/**
 * Plant recommendation request
 */
export interface PlantRecommendationRequest {
  experience: 'beginner' | 'intermediate' | 'advanced';
  light: 'low' | 'medium' | 'high' | 'indirect';
  wateringCapability: 'minimal' | 'weekly' | 'regular';
  space: 'small' | 'medium' | 'large';
  pets: boolean;
  budget?: number;
}
