/**
 * Plant Recommendations Route
 */

const express = require('express');
const router = express.Router();
const claudeService = require('../utils/claudeService');

/**
 * POST /api/recommendations
 * Get plant recommendations based on user preferences
 */
router.post('/', async (req, res, next) => {
  try {
    const { experience, light, wateringCapability, space, pets, budget } = req.body;

    // Validate input
    if (!experience || !light || !wateringCapability || !space) {
      return res.status(400).json({
        success: false,
        message: 'Missing required fields',
      });
    }

    console.log('📨 Recommendation request received:', { experience, light, wateringCapability, space, pets });

    const request = {
      experience,
      light,
      wateringCapability,
      space,
      pets: Boolean(pets),
      budget,
    };

    const result = await claudeService.getPlantRecommendations(request);

    res.json({
      success: true,
      data: {
        recommendations: result.data,
      },
      message: 'Plant recommendations retrieved successfully',
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
