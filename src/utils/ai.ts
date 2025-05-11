import axios from 'axios';
import { AI_API_KEYS } from '@env';

const AI_API_URL = 'https://openrouter.ai/api/v1/chat/completions';

// Check if the API key is loaded
if (!AI_API_KEYS) {
  console.warn('Warning: AI_API_KEYS is not defined. Please check your .env file.');
}

export const sendMessageToAi = async (messages: { role: 'user' | 'assistant'; content: string }[]) => {
  try {
    const response = await axios.post(
      AI_API_URL,
      {
        model: 'gpt-3.5-turbo',
        messages,
      },
      {
        headers: {
          'Authorization': `Bearer ${AI_API_KEYS}`,
          'HTTP-Referer': 'http://localhost:8081',
          'X-Title': 'BisaEngress',
          'Content-Type': 'application/json',
        },
      }
    );

    return response.data.choices[0].message.content; // Return the response content
  } catch (error:any) {
    console.error('Error communicating with AI:', error.response?.data || error.message);
    throw new Error('Failed to communicate with AI.');
  }
};
