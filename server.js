const express = require('express');
const { GoogleGenerativeAI } = require('@google/generative-ai');

const app = express();
const port = 80;
const genAI = new GoogleGenerativeAI('YOUR_API_KEY');

app.use(express.json());
app.use(express.static('public'));

app.post('/generate-pickupline', async (req, res) => {
  try {
    const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash' });
    if (!req.body.situation) {
  return res.status(400).json({ error: 'Situation parameter is required' });
}
const { situation, language = 'english' } = req.body;
    
    const prompt = `Analyze this situation: "${situation}". Generate a perfect pickup line based on the situation. Respond STRICTLY in ${language}. ONLY return the pickup line without any explanations or additional text.`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    
    res.json({ pickupline: response.text() });
  } catch (error) {
    res.status(500).json({ 
  error: 'Failed to generate pickup line',
  details: error.message
});
    console.error('Error generating pickup line:', error);
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
