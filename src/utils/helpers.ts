/**
 * Utility Functions
 */

/**
 * Format date to readable string
 */
export const formatDate = (date: Date): string => {
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
};

/**
 * Calculate days until next watering
 */
export const daysUntilWatering = (lastWatered: Date, frequency: number): number => {
  const today = new Date();
  const timeDiff = today.getTime() - lastWatered.getTime();
  const daysDiff = Math.floor(timeDiff / (1000 * 3600 * 24));
  return Math.max(0, frequency - daysDiff);
};

/**
 * Get watering status indicator
 */
export const getWateringStatus = (lastWatered: Date, frequency: number): 'urgent' | 'soon' | 'ok' => {
  const daysUntil = daysUntilWatering(lastWatered, frequency);
  if (daysUntil <= 0) return 'urgent';
  if (daysUntil <= 2) return 'soon';
  return 'ok';
};

/**
 * Generate unique ID
 */
export const generateId = (): string => {
  return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
};

/**
 * Truncate text to specified length
 */
export const truncateText = (text: string, length: number = 100): string => {
  if (text.length <= length) return text;
  return text.substring(0, length) + '...';
};

/**
 * Verify if string is a valid JSON
 */
export const isValidJSON = (str: string): boolean => {
  try {
    JSON.parse(str);
    return true;
  } catch {
    return false;
  }
};

/**
 * Sleep function for async delays
 */
export const sleep = (ms: number): Promise<void> => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

export default {
  formatDate,
  daysUntilWatering,
  getWateringStatus,
  generateId,
  truncateText,
  isValidJSON,
  sleep,
};
