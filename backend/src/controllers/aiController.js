import { sendSuccess } from '../utils/apiResponse.js';
import { askAiAssistant } from '../services/aiService.js';

export const askQuestion = async (req, res, next) => {
  try {
    const { context, type } = req.body;
    const message = req.body.message || req.body.question;
    
    if (!message) {
      const error = new Error('Message is required.');
      error.statusCode = 400;
      throw error;
    }

    const aiResponse = await askAiAssistant({ message, context, type: type || 'general' });
    
    return sendSuccess(res, 200, 'AI response generated successfully', aiResponse);
  } catch (error) {
    next(error);
  }
};
