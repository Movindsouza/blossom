/**
 * Environment Configuration
 * Handles all API keys and configuration settings
 */

export const CONFIG = {
  CLAUDE_API_KEY: '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',
  CLAUDE_MODEL: 'claude-3-5-sonnet-20241022',
  API_TIMEOUT: 30000, // 30 seconds
} as const;

export default CONFIG;
