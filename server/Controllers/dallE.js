import dotenv from "dotenv";
import OpenAI from 'openai'

dotenv.config();

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY 
  });

export const imageGenarate = async (req,res) => {
       try {
        const {prompt} = req.body;
        const response = await openai.images.generate({
            prompt: prompt,
            n: 1,
            size: "1024x1024",
            response_format:'b64_json'
        });
      
        const image_url = response.data[0].b64_json;
        res.json({ image_url });
    } catch (error) {
        console.error(error);
        if (error.response) {
            res.status(error.response.status).json(error.response.data);
        } else {
            res.status(500).json({ error: error.message });
        }
    }
};