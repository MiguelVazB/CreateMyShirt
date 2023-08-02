import express from "express"
import * as dotenv from 'dotenv'
import { Configuration, OpenAIApi } from "openai"

dotenv.config();

const router = express.Router();

const config = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
})

const openAI = new OpenAIApi(config)

router.route('/').get((req, res) => {
    res.status(200).json({message: "Hello from dalle"})
})

router.route('/').post(async (req, res) => {
    try{
        const { prompt } = req.body;

        const response = await openAI.createImage({ 
            prompt: prompt, 
            n: 1, 
            size: '1024x1024', 
        });

        res.status(200).json({photoUrl: response.data.data[0].url})

    } catch (error){
        console.error(error)
        res.status(500).json({message: "Something went wrong!"})
    }
})

export default router;