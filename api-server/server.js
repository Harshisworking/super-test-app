const express = require('express');
const app = express();

const OPENROUTER_API_KEY = process.env.OPENROUTER_API_KEY;
const PORT = 5000;

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
