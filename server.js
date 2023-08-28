import express from 'express';
import axios from 'axios';
import dotenv from 'dotenv';
import cors from 'cors';
import { prompt } from './prompt.js'

// Load environment variables from .env
dotenv.config();

const app = express();
const port = 3000;

// Middleware to parse JSON requests
app.use(express.json());

// Middleware to allow cross-origin requests
app.use(cors());

// Test endpoint
app.get('/api', (req, res) => {
  res.json({ message: 'Hello from server!' });
});

// POST endpoint to forward data to OpenAI
app.post('/api/ask', async (req, res) => {
  try {
    const { resume, job, userName, jobType } = req.body;

    // Checking if jobType is provided, if not default to "position".
    const jobTitle = jobType ? jobType : 'position';

    const combinedContent = `User: ${userName}\n\nJob Type: ${jobTitle}\n\nResume:\n${resume}\n\nJob Description:\n${job}`;

    if (!combinedContent) {
      return res.status(400).json({ error: "Text is required." });
    }

    const systemMessage = userName
      ? `${prompt} You will always address the user as ${userName} throughout this session.`
      : prompt;

    const requestBody = {
      model: 'gpt-3.5-turbo',
      messages: [
        {
          role: 'system',
          content: systemMessage
        },
        {
          role: 'user',
          content: combinedContent
        }
      ],
      temperature: 0.1
    };

    const openaiResponse = await axios.post('https://api.openai.com/v1/chat/completions', requestBody, {
      headers: {
        'Authorization': `Bearer ${process.env.OPENAPI_KEY}`,
        'Content-Type': 'application/json',
      }
    });

    res.json({ response: openaiResponse.data.choices[0]?.message.content.trim() });

  } catch (error) {
    console.error('Error fetching from OpenAI:', error.response ? error.response.data : error.message);
    res.status(500).json({ error: 'Failed to fetch response from OpenAI.' });
  }
});

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
