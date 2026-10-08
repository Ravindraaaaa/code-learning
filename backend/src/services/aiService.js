import { config } from '../config/env.js';
import { logger } from '../utils/logger.js';

export const askAiAssistant = async ({ message, context, type }) => {
  const apiKey = config.ai.geminiApiKey;
  if (!apiKey) {
    const error = new Error('AI Service is currently unavailable. API Key not configured.');
    error.statusCode = 503;
    throw error;
  }

  // Construct a prompt based on type
  let systemPrompt = "You are the CodeForge AI Learning Assistant. Provide clear, concise, and helpful programming explanations. Do not solve assignments completely; instead, guide the student with hints and conceptual understanding.";
  
  if (type === 'debug') {
    systemPrompt = "You are a debugging assistant. The user will provide a code snippet and an error. Identify the root cause and provide a small hint on how to fix it without giving the full corrected code.";
  } else if (type === 'hint') {
    systemPrompt = "You are a hint generator. Provide a single, thought-provoking hint for the programming problem presented.";
  } else if (type === 'concept') {
    systemPrompt = "You are a computer science tutor. Explain the concept clearly using analogies and simple terms.";
  } else if (type === 'recommendation') {
    systemPrompt = "You are a study advisor. Recommend learning paths or practice topics based on the user's query.";
  }

  const promptText = `Context:\n${context || 'No specific context provided.'}\n\nStudent Request:\n${message}`;

  const payload = {
    contents: [
      {
        parts: [
          { text: systemPrompt },
          { text: promptText }
        ]
      }
    ]
  };

  try {
    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    });

    if (!response.ok) {
      const errText = await response.text();
      logger.error(`Gemini API Error: ${errText}`);
      const error = new Error('AI Service responded with an error. Please try again later.');
      error.statusCode = 503;
      throw error;
    }

    const data = await response.json();
    const reply = data.candidates?.[0]?.content?.parts?.[0]?.text;
    
    if (!reply) {
      throw new Error('Received empty response from AI Service.');
    }

    return { reply };

  } catch (error) {
    logger.error(`AI Service Request Failed: ${error.message}`);
    const apiError = new Error('AI Service is temporarily unavailable.');
    apiError.statusCode = 503;
    throw apiError;
  }
};
