/**
 * Plant Care Tips Route
 */

const express = require('express');
const router = express.Router();
const claudeService = require('../utils/claudeService');

/**
 * POST /api/care
 * Get care tips for a specific plant
 */
router.post('/', async (req, res, next) => {
  try {
    const { plantName } = req.body;

    // Validate input
    if (!plantName) {
      return res.status(400).json({
        success: false,
        message: 'Plant name is required',
      });
    }

    console.log('📨 Care tips request received for:', plantName);

    const result = await claudeService.getCareTips(plantName);

    res.json({
      success: true,
      data: {
        careTips: result.data,
        plant: plantName,
      },
      message: 'Care tips retrieved successfully',
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
