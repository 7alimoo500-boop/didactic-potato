const express = require('express');
const axios = require('axios');
const app = express();
app.use(express.json());

app.post('/api/chat', async (req, res) => {
    const userPrompt = req.body.prompt;
    try {
        const aiResponse = await axios.post('https://api.openai.com/v1/chat/completions', {
            model: "gpt-4o-mini",
            messages: [{ role: "user", content: userPrompt }]
        }, {
            headers: { 'Authorization': `Bearer YOUR_API_KEY_HERE` }
        });

        const replyText = aiResponse.data.choices[0].message.content;
        res.json({ reply: replyText });
    } catch (error) {
        res.status(500).json({ reply: "عذراً، واجهت مشكلة في معالجة طلبك." });
    }
});

app.listen(3000, () => console.log('AI Proxy Server running!'));
