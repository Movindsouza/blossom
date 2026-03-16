/**
 * Claude AI Service
 * Handles all API calls to Claude for plant recommendations and care advice
 */

import axios, { AxiosInstance } from 'axios';
import CONFIG from '../config/environment';
import { ClaudeResponse, Plant, PlantRecommendationRequest } from '../types';

class ClaudeService {
  private apiKey: string;
  private model: string;
  private apiBaseUrl = 'https://api.anthropic.com/v1';
  private timeout: number;
  private client: AxiosInstance;

  constructor() {
    this.apiKey = CONFIG.CLAUDE_API_KEY;
    this.model = CONFIG.CLAUDE_MODEL;
    this.timeout = CONFIG.API_TIMEOUT;

    // Initialize Axios client with Claude API configuration
    this.client = axios.create({
      baseURL: this.apiBaseUrl,
      timeout: this.timeout,
      headers: {
        'x-api-key': this.apiKey,
        'anthropic-version': '2023-06-01',
        'content-type': 'application/json',
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
      const prompt = this.buildRecommendationPrompt(request);

      const response = await this.client.post('/messages', {
        model: this.model,
        max_tokens: 1024,
        messages: [
          {
            role: 'user',
            content: prompt,
          },
        ],
      });

      const content = response.data.content[0];
      if (content.type === 'text') {
        return {
          success: true,
          message: 'Plant recommendations retrieved successfully',
          data: {
            recommendations: content.text,
          },
        };
      }
      return {
        success: false,
        message: 'Unexpected response format from Claude',
        error: 'Invalid response type',
      };
    } catch (error) {
      console.error('Error getting plant recommendations:', error);
      return {
        success: false,
        message: 'Failed to get plant recommendations',
        error: error instanceof Error ? error.message : 'Unknown error',
      };
    }
  }

  /**
   * Get care tips for a specific plant
   */
  async getCareTips(plantName: string): Promise<ClaudeResponse> {
    try {
      const prompt = `You are a helpful plant care expert. Provide detailed care instructions for ${plantName}. 
      Include: watering schedule, light requirements, temperature, humidity, common problems and solutions, and propagation tips.
      Format the response in a clear, beginner-friendly way.`;

      const response = await this.client.post('/messages', {
        model: this.model,
        max_tokens: 1024,
        messages: [
          {
            role: 'user',
            content: prompt,
          },
        ],
      });

      const content = response.data.content[0];
      if (content.type === 'text') {
        return {
          success: true,
          message: 'Care tips retrieved successfully',
          data: {
            careTips: content.text,
          },
        };
      }
      return {
        success: false,
        message: 'Unexpected response format from Claude',
        error: 'Invalid response type',
      };
    } catch (error) {
      console.error('Error getting care tips:', error);
      return {
        success: false,
        message: 'Failed to get care tips',
        error: error instanceof Error ? error.message : 'Unknown error',
      };
    }
  }

  /**
   * Answer plant-related questions
   */
  async answerQuestion(question: string): Promise<ClaudeResponse> {
    try {
      const prompt = `You are a friendly and knowledgeable plant care expert. Answer the following question about plants:
      "${question}"
      Provide practical, actionable advice suitable for beginners.`;

      const response = await this.client.post('/messages', {
        model: this.model,
        max_tokens: 512,
        messages: [
          {
            role: 'user',
            content: prompt,
          },
        ],
      });

      const content = response.data.content[0];
      if (content.type === 'text') {
        return {
          success: true,
          message: 'Question answered successfully',
          data: {
            answer: content.text,
          },
        };
      }
      return {
        success: false,
        message: 'Unexpected response format from Claude',
        error: 'Invalid response type',
      };
    } catch (error) {
      console.error('Error answering question:', error);
      return {
        success: false,
        message: 'Failed to answer question',
        error: error instanceof Error ? error.message : 'Unknown error',
      };
    }
  }

  /**
   * Identify a plant from description
   */
  async identifyPlant(description: string): Promise<ClaudeResponse> {
    try {
      const prompt = `Based on the following description, identify the plant and provide basic care information:
      "${description}"
      
      Provide:
      1. Plant name (common and scientific)
      2. Key characteristics
      3. Difficulty level for beginners
      4. Basic care requirements
      
      Format the response clearly.`;

      const response = await this.client.post('/messages', {
        model: this.model,
        max_tokens: 512,
        messages: [
          {
            role: 'user',
            content: prompt,
          },
        ],
      });

      const content = response.data.content[0];
      if (content.type === 'text') {
        return {
          success: true,
          message: 'Plant identified successfully',
          data: {
            identification: content.text,
          },
        };
      }
      return {
        success: false,
        message: 'Unexpected response format from Claude',
        error: 'Invalid response type',
      };
    } catch (error) {
      console.error('Error identifying plant:', error);
      return {
        success: false,
        message: 'Failed to identify plant',
        error: error instanceof Error ? error.message : 'Unknown error',
      };
    }
  }

  /**
   * Build a prompt for plant recommendations based on user preferences
   */
  private buildRecommendationPrompt(request: PlantRecommendationRequest): string {
    return `You are a helpful plant recommendation expert. Based on the following criteria, suggest 3-5 plants perfect for beginners:

    Experience Level: ${request.experience}
    Available Light: ${request.light}
    Watering Capability: ${request.wateringCapability}
    Space Available: ${request.space}
    Pet-Friendly Required: ${request.pets ? 'Yes' : 'No'}
    ${request.budget ? `Budget: $${request.budget}` : ''}

    For each plant recommendation, provide:
    1. Plant name
    2. Why it's perfect for these conditions
    3. Key care points
    4. Price estimate if available
    5. Where to get it

    Make the recommendations friendly and encouraging for a beginner.`;
  }
}

// Export singleton instance
export default new ClaudeService();
