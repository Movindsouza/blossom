/**
 * Plant Identification Route
 */

const express = require('express');
const router = express.Router();
const claudeService = require('../utils/claudeService');

/**
 * POST /api/identify
 * Identify a plant from description
 */
router.post('/', async (req, res, next) => {
  try {
    const { description } = req.body;

    // Validate input
    if (!description) {
      return res.status(400).json({
        success: false,
        message: 'Plant description is required',
      });
    }

    console.log('📨 Plant identification request received');

    const result = await claudeService.identifyPlant(description);

    res.json({
      success: true,
      data: {
        identification: result.data,
      },
      message: 'Plant identified successfully',
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
