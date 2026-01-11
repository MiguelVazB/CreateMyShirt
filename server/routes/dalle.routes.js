import express from "express"
import * as dotenv from 'dotenv'
import OpenAI from "openai"

dotenv.config();

const router = express.Router();

const openAI = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
    fetch: globalThis.fetch,
});

router.route('/').get((req, res) => {
    res.status(200).json({message: "Hello from dalle"})
})

router.route('/').post(async (req, res) => {
    try{
        const { prompt } = req.body;

        // Input validation
        if (!prompt || typeof prompt !== 'string') {
            return res.status(400).json({ message: "Valid prompt is required" });
        }

        if (prompt.length > 1000) {
            return res.status(400).json({ message: "Prompt is too long (max 1000 characters)" });
        }

        if (!process.env.OPENAI_API_KEY) {
            return res.status(503).json({ message: "OpenAI API key not configured" });
        }

        const response = await openAI.images.generate({
            prompt: prompt.trim(),
            n: 1,
            size: "512x512",
            response_format: "b64_json",
            model: "dall-e-2",
        });

        const image = response?.data?.[0]?.b64_json;

        if (!image) {
            return res.status(502).json({ message: "No image returned from OpenAI" });
        }

        res.status(200).json({ photo: image });

    } catch (error){
        console.error('DALL-E error:', error.message);
        
        // Handle specific OpenAI errors
        if (error.status === 400) {
            return res.status(400).json({ 
                message: "Your prompt was rejected by the safety system. Please try a different description." 
            });
        }
        if (error.status === 401) {
            return res.status(503).json({ message: "OpenAI authentication failed" });
        }
        if (error.status === 429) {
            return res.status(429).json({ message: "Rate limit exceeded. Please try again later." });
        }
        
        res.status(500).json({message: "Failed to generate image"})
    }
})

export default router;