/**
 * Claude AI Service
 * Handles all API calls to the backend which communicates with Claude
 */

import axios, { AxiosInstance } from 'axios';
import { ClaudeResponse, Plant, PlantRecommendationRequest } from '../types';

// Use localhost for development, can be changed for production
const API_BASE_URL = 'http://localhost:3000/api';

class ClaudeService {
  private client: AxiosInstance;

  constructor() {
    // Initialize Axios client
    this.client = axios.create({
      baseURL: API_BASE_URL,
      timeout: 30000,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }

  /**
   * Get plant recommendations based on user preferences
   */
  async getPlantRecommendations(
    request: PlantRecommendationRequest
  ): Promise<ClaudeResponse> {
    try {
      console.log('🔗 Calling backend for recommendations...');
      
      const response = await this.client.post('/recommendations', request);

      console.log('✅ Backend response received:', response.data);

      if (response.data.success && response.data.data?.recommendations) {
        return {
          success: true,
          message: response.data.message,
          data: response.data.data,
        };
      }

      return {
        success: false,
        message: 'Unexpected response format',
        error: 'Invalid response structure',
      };
    } catch (error) {
      console.error('❌ Error getting plant recommendations:', error);
      const errorMsg = error instanceof Error ? error.message : 'Unknown error';
      console.error('Full error details:', errorMsg);
      return {
        success: false,
        message: 'Failed to get plant recommendations',
        error: errorMsg,
      };
    }
  }

  /**
   * Get care tips for a specific plant
   */
  async getCareTips(plantName: string): Promise<ClaudeResponse> {
    try {
      console.log('🔗 Calling backend for care tips...');
      
      const response = await this.client.post('/care', { plantName });

      console.log('✅ Backend response received');

      if (response.data.success && response.data.data?.careTips) {
        return {
          success: true,
          message: response.data.message,
          data: response.data.data,
        };
      }

      return {
        success: false,
        message: 'Unexpected response format',
        error: 'Invalid response structure',
      };
    } catch (error) {
      console.error('❌ Error getting care tips:', error);
      const errorMsg = error instanceof Error ? error.message : 'Unknown error';
      return {
        success: false,
        message: 'Failed to get care tips',
        error: errorMsg,
      };
    }
  }

  /**
   * Answer plant-related questions
   */
  async answerQuestion(question: string): Promise<ClaudeResponse> {
    try {
      console.log('🔗 Calling backend to answer question...');
      
      const response = await this.client.post('/faq', { question });

      console.log('✅ Backend response received');

      if (response.data.success && response.data.data?.answer) {
        return {
          success: true,
          message: response.data.message,
          data: response.data.data,
        };
      }

      return {
        success: false,
        message: 'Unexpected response format',
        error: 'Invalid response structure',
      };
    } catch (error) {
      console.error('❌ Error answering question:', error);
      const errorMsg = error instanceof Error ? error.message : 'Unknown error';
      return {
        success: false,
        message: 'Failed to answer question',
        error: errorMsg,
      };
    }
  }

  /**
   * Identify a plant from description
   */
  async identifyPlant(description: string): Promise<ClaudeResponse> {
    try {
      console.log('🔗 Calling backend to identify plant...');
      
      const response = await this.client.post('/identify', { description });

      console.log('✅ Backend response received');

      if (response.data.success && response.data.data?.identification) {
        return {
          success: true,
          message: response.data.message,
          data: response.data.data,
        };
      }

      return {
        success: false,
        message: 'Unexpected response format',
        error: 'Invalid response structure',
      };
    } catch (error) {
      console.error('❌ Error identifying plant:', error);
      const errorMsg = error instanceof Error ? error.message : 'Unknown error';
      return {
        success: false,
        message: 'Failed to identify plant',
        error: errorMsg,
      };
    }
  }
}

// Export singleton instance
export default new ClaudeService();
