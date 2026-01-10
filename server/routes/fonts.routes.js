import express from "express"
import * as dotenv from 'dotenv'

dotenv.config();

const router = express.Router();

router.route('/').get(async (req, res) => {
    try {
        const apiKey = process.env.GOOGLE_FONTS_API_KEY;
        
        if (!apiKey) {
            return res.status(503).json({ message: "Google Fonts API key not configured" });
        }

        const response = await globalThis.fetch(
            `https://www.googleapis.com/webfonts/v1/webfonts?sort=popularity&key=${apiKey}`
        );

        if (!response.ok) {
            throw new Error(`Google Fonts API returned ${response.status}`);
        }

        const data = await response.json();
        
        if (!data.items || !Array.isArray(data.items)) {
            throw new Error('Invalid response from Google Fonts API');
        }
        
        // Return top 50 most popular fonts
        res.status(200).json({ fonts: data.items.slice(0, 50) });

    } catch (error) {
        console.error('Fonts API error:', error.message);
        res.status(500).json({ message: "Failed to fetch fonts" });
    }
});

export default router;
