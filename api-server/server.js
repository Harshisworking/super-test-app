import express from 'express';
import { OpenRouter } from '@openrouter/sdk';

const app = express();
const PORT = 5000;

// Initialize the SDK using the injected environment variable
const openRouter = new OpenRouter({
  apiKey: process.env.OPENROUTER_API_KEY,
  defaultHeaders: {
    'HTTP-Referer': 'http://dragophynix.local', // Your site URL
    'X-OpenRouter-Title': 'Dragophynix PaaS',    // Your site name
  },
});

app.get('/data', (req, res) => res.json({ message: "Hello from HTTP!" }));

app.get('/ai-talk', async (req, res) => {
  const userPrompt = req.query.prompt || "Hello!";

  try {
    const completion = await openRouter.chat.send({
  model: 'google/gemini-2.0-flash-lite-preview-02-05:free',
  messages: [
    {
      role: 'user',
      content: userPrompt,
    },
  ],
  provider: {}, // Add this line to satisfy the "chatGenerationParams" requirement
  stream: false,
});

    // Send the content back to your React frontend
    res.json({ message: completion.choices[0].message.content });

  } catch (error) {
    console.error("OpenRouter SDK Error:", error);
    res.status(502).json({ message: "AI service failed to respond" });
  }
});

app.listen(PORT, () => console.log(`API Server on port ${PORT}`));

app.get('/ai-talk', async (req, res) => {
    try {
        if (!OPENROUTER_API_KEY) {
            return res.status(500).json({ error: "API Key missing in environment" });
        }

        const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${OPENROUTER_API_KEY}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                "model": "google/gemini-2.0-flash-lite-preview-02-05:free", // You can use free models
                "messages": [
                    { "role": "user", "content": "Say hello to my new orchestration platform!" }
                ]
            })
        });

        const data = await response.json();
        
        // OpenRouter returns data in the same format as OpenAI
        const aiMessage = data.choices[0].message.content;

        res.json({ message: aiMessage });

    } catch (error) {
        console.error("OpenRouter Error:", error);
        res.status(502).json({ message: "AI service failed to respond" });
    }
});

app.listen(PORT, () => console.log(`API Server running on port ${PORT}`));
