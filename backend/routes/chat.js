const express = require('express');
const { GoogleGenerativeAI } = require('@google/generative-ai');
const router = express.Router();

// Initialize Gemini AI
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// Set API version to v1 instead of v1beta
const modelParams = {
  model: 'gemini-pro',
};

// System prompt with Highgrounds BLVD context
const SYSTEM_PROMPT = `You are a helpful AI assistant for Highgrounds BLVD, a premier cannabis social club and restaurant in Illovo, Sandton, South Africa.

ABOUT HIGHGROUNDS BLVD:
- Location: Illovo Junction Shopping Centre, Illovo, Gauteng, 2196, South Africa
- Hours: Wednesday to Sunday, 10:00 AM to 10:00 PM
- Contact: info@highgroundsblvd.com
- Instagram: @highgroundsblvd_
- Age Restriction: 21+ only
- Free membership model with monthly exclusive events

SERVICES:
- Cannabis social club and private members club
- Contemporary South African café with Phatsoulfood menu
- Event venue and workspace
- Social gathering space focused on cannabis lifestyle integration

MENU CATEGORIES (from the app):
1. THE FOOD:
   - Edibles: Pineapple Halos (R340), Sour Space Worms (R205), Weedy O's (R165)
   - Breakfast items, Tapas/Lunch, Burgers
   - Café Coffee & Tea

2. THE FLOWER:
   - Greendoor Flower: CBD-dominant strains (R145)
   - Indoor: THC strains (R160-R250)

3. ACCESSORIES:
   - Dabs: Premium concentrates (R745-R810)
   - Vet Pro: CBD products for pets (R340-R405)
   - General: Vapes, pre-rolls, smoking accessories

4. THE GROW CLUB:
   - Membership subscription service
   - Growing supplies and support

YOUR ROLE:
- Answer questions about Highgrounds BLVD, its services, location, and hours
- Help users navigate the menu and make product recommendations
- Explain different cannabis products (flower strains, edibles, accessories)
- Provide information about memberships and events
- Be friendly, professional, and knowledgeable about cannabis
- If asked about pricing, refer to the menu in the app
- Encourage users to visit the location or contact directly for bookings

IMPORTANT:
- Always be helpful and educational about cannabis products
- Comply with South African cannabis laws and regulations
- Encourage responsible consumption (21+ only)
- Don't provide medical advice - suggest consulting healthcare professionals
- If you don't know something specific, direct users to contact info@highgroundsblvd.com

Keep responses concise, friendly, and informative.`;

// POST /api/chat - Send message to AI
router.post('/', async (req, res) => {
  try {
    const { message, conversationHistory } = req.body;

    if (!message) {
      return res.status(400).json({ error: 'Message is required' });
    }

    // Initialize the model - using gemini-pro
    const model = genAI.getGenerativeModel(modelParams);

    // Build conversation history for context
    let prompt = SYSTEM_PROMPT + '\n\n';

    if (conversationHistory && conversationHistory.length > 0) {
      prompt += 'CONVERSATION HISTORY:\n';
      conversationHistory.forEach(msg => {
        prompt += `${msg.role === 'user' ? 'User' : 'Assistant'}: ${msg.content}\n`;
      });
      prompt += '\n';
    }

    prompt += `User: ${message}\nAssistant:`;

    // Generate response
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    res.json({
      response: text,
      success: true
    });

  } catch (error) {
    console.error('Gemini API error:', error);
    res.status(500).json({
      error: 'Failed to get response from AI',
      details: error.message
    });
  }
});

module.exports = router;
