/**
 * FAQ / Questions Route
 */

const express = require('express');
const router = express.Router();
const claudeService = require('../utils/claudeService');

/**
 * POST /api/faq
 * Answer plant-related questions
 */
router.post('/', async (req, res, next) => {
  try {
    const { question } = req.body;

    // Validate input
    if (!question) {
      return res.status(400).json({
        success: false,
        message: 'Question is required',
      });
    }

    console.log('📨 Question received:', question);

    const result = await claudeService.answerQuestion(question);

    res.json({
      success: true,
      data: {
        answer: result.data,
        question,
      },
      message: 'Question answered successfully',
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
