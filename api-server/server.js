import express from 'express';
import OpenAI from 'openai';

const app = express();
const PORT = 5000;

console.log("Checking API Key presence:", !!process.env.OPENROUTER_API_KEY);

// Initialize OpenAI client pointing to OpenRouter
const openai = new OpenAI({
  baseURL: "https://openrouter.ai/api/v1",
  apiKey: process.env.OPENROUTER_API_KEY || "dummy_key_for_build", // Add a fallback to prevent crash during build
  defaultHeaders: {
    "HTTP-Referer": "http://dragophynix.local", 
    "X-Title": "Dragophynix PaaS",
  }
});

app.get('/data', (req, res) => res.json({ message: "Hello from HTTP Backend!" }));

app.get('/ai-talk', async (req, res) => {
  const userPrompt = req.query.prompt || "Hello!";

  try {
    const completion = await openai.chat.completions.create({
      model: "google/gemini-2.0-flash-lite-preview-02-05:free",
      messages: [
        { role: "user", content: userPrompt }
      ],
    });

    res.json({ 
      message: completion.choices[0].message.content || "No response content." 
    });

  } catch (error) {
    console.error("OpenRouter Error:", error.message);
    res.status(502).json({ error: "AI service failed to respond" });
  }
});

app.listen(PORT, () => console.log(`API Server running on port ${PORT}`));
