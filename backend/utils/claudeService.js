/**
 * Claude AI Service
 * Centralized service for all Claude API calls
 */

const Anthropic = require('@anthropic-ai/sdk');

const client = new Anthropic.default({
  apiKey: process.env.CLAUDE_API_KEY,
});

class ClaudeService {
  constructor() {
    this.model = 'claude-3-5-sonnet-20241022';
    this.maxTokens = 1024;
  }

  /**
   * Get plant recommendations based on user preferences
   */
  async getPlantRecommendations(request) {
    const prompt = this.buildRecommendationPrompt(request);
    return this.callClaude(prompt);
  }

  /**
   * Get care tips for a specific plant
   */
  async getCareTips(plantName) {
    const prompt = `You are a helpful plant care expert. Provide detailed care instructions for ${plantName}. 
    Include: watering schedule, light requirements, temperature, humidity, common problems and solutions, and propagation tips.
    Format the response in a clear, beginner-friendly way.`;
    return this.callClaude(prompt);
  }

  /**
   * Answer plant-related questions
   */
  async answerQuestion(question) {
    const prompt = `You are a friendly and knowledgeable plant care expert. Answer the following question about plants:
    "${question}"
    Provide practical, actionable advice suitable for beginners.`;
    return this.callClaude(prompt, 512);
  }

  /**
   * Identify a plant from description
   */
  async identifyPlant(description) {
    const prompt = `Based on the following description, identify the plant and provide basic care information:
    "${description}"
    
    Provide:
    1. Plant name (common and scientific)
    2. Key characteristics
    3. Difficulty level for beginners
    4. Basic care requirements
    
    Format the response clearly.`;
    return this.callClaude(prompt, 512);
  }

  /**
   * Core method to call Claude API
   */
  async callClaude(prompt, maxTokens = this.maxTokens) {
    try {
      console.log('📤 Calling Claude API...');
      
      const message = await client.messages.create({
        model: this.model,
        max_tokens: maxTokens,
        messages: [
          {
            role: 'user',
            content: prompt,
          },
        ],
      });

      const content = message.content[0];
      if (content.type === 'text') {
        console.log('✅ Claude response received');
        return {
          success: true,
          data: content.text,
        };
      }

      throw new Error('Unexpected response format from Claude');
    } catch (error) {
      console.error('❌ Claude API Error:', error.message);
      throw {
        status: error.status || 500,
        message: error.message || 'Failed to call Claude API',
      };
    }
  }

  /**
   * Build prompt for plant recommendations
   */
  buildRecommendationPrompt(request) {
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

module.exports = new ClaudeService();
