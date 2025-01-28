const express = require('express');
const { OpenAI } = require('openai');
const router = express.Router();

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// Route to analyze mood
router.post('/', async (req, res) => {
  const { text } = req.body;

  if (!text) {
    return res.status(400).json({ error: 'Text is required' });
  }

  try {
    const response = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [
        {
          role: 'system',
          content: `You are a helpful assistant that extracts mood-related keywords from text. Analyze the following journal entry and provide a comma-separated list of keywords that describe the mood or emotions expressed in the text. Focus on keywords that can be used for music recommendations.`,
        },
        {
          role: 'user',
          content: text,
        },
      ],
    });

    const keywords = response.choices[0].message.content.trim();
    const keywordArray = keywords.split(',').map((keyword) => keyword.trim());
    res.json({ keywords: keywordArray });
  } catch (error) {
    console.error('Error extracting mood keywords:', error.message);
    res.status(500).json({ error: 'Failed to extract mood keywords' });
  }
});

module.exports = router;
