import { GoogleGenerativeAI } from '@google/generative-ai';

class GeminiService {
  constructor(apiKey) {
    try {
      this.genAI = new GoogleGenerativeAI(apiKey);
      // Use gemini-1.5-pro with modified generation config for more concise responses
      this.model = this.genAI.getGenerativeModel({ 
        model: "gemini-1.5-pro",
        generationConfig: {
          temperature: 0.2,
          topK: 32,
          topP: 0.95,
          maxOutputTokens: 600, // Reduced from 1000 to produce even more concise responses
        }
      });
      console.log('Gemini model initialized successfully with model: gemini-1.5-pro');
    } catch (error) {
      console.error('Error initializing Gemini model:', error);
      throw error;
    }
  }

  /**
   * Initialize the service with an API key
   * @param {string} apiKey - Your Gemini API key
   */
  static init(apiKey) {
    if (!GeminiService.instance) {
      try {
        GeminiService.instance = new GeminiService(apiKey);
        console.log('GeminiService initialized successfully');
      } catch (error) {
        console.error('Failed to initialize GeminiService:', error);
        throw error;
      }
    }
    return GeminiService.instance;
  }

  /**
   * Get the singleton instance
   */
  static getInstance() {
    if (!GeminiService.instance) {
      throw new Error('GeminiService not initialized. Call GeminiService.init(apiKey) first.');
    }
    return GeminiService.instance;
  }

  /**
   * Generate a response for legal questions
   * @param {string} prompt - The user's legal question
   * @param {Array} history - Chat history for context
   */
  async getLegalResponse(prompt, history = []) {
    try {
      // Create legal context prompt emphasizing extreme brevity
      const legalPrompt = `You are Lawgic AI, a legal research assistant specialized in Indian law.
      Please answer the following legal question very concisely:

      "${prompt}"
      
      IMPORTANT INSTRUCTIONS:
      - Keep your response extremely brief (max 2-3 short paragraphs)
      - Use only 3-5 sentences total
      - Focus only on the most essential legal points
      - Use bullet points for any lists to improve readability
      - Avoid lengthy explanations and unnecessary details
      - If citing cases, mention only the most relevant one
      - End with a very brief disclaimer`;

      try {
        // Try direct generation first
        const result = await this.model.generateContent(legalPrompt);
        return result.response.text();
      } catch (directError) {
        console.error('Direct generation failed, trying with parts API:', directError);
        // Try with parts API as fallback
        const result = await this.model.generateContent({
          parts: [{ text: legalPrompt }],
        });
        return result.response.text();
      }
    } catch (error) {
      console.error('Error getting response from Gemini:', error);
      
      // Provide detailed error message for debugging
      const errorDetails = {
        message: error.message,
        stack: error.stack,
        name: error.name
      };
      console.error('Error details:', JSON.stringify(errorDetails));
      
      // Return a fallback response based on the query type
      return this.getFallbackResponse(prompt);
    }
  }

  /**
   * Generate fallback responses for when API calls fail
   */
  getFallbackResponse(prompt) {
    prompt = prompt.toLowerCase();
    
    // Check for common legal topics
    if (prompt.includes('murder') || prompt.includes('302')) {
      return `Murder (Section 302 IPC): Punishable with death or life imprisonment, and fine.

Key case: K.M. Nanavati v. State of Maharashtra (1961) - Distinguished murder from culpable homicide.

This is for informational purposes only.`;
    }
    
    if (prompt.includes('ipc') || prompt.includes('indian penal code') || 
        (prompt.includes('section') && /\d+/.test(prompt))) {
      
      // Try to extract section number
      const sectionMatch = prompt.match(/section\s+(\d+)/i);
      const sectionNum = sectionMatch ? sectionMatch[1] : '';
      
      return `The IPC is India's official criminal code.${sectionNum ? ` Section ${sectionNum} is part of it.` : ''}

For specific legal information, consult official legal texts or a legal professional.

This is for educational purposes only.`;
    }
    
    if (prompt.includes('divorce') || prompt.includes('marriage')) {
      return `Divorce in India is governed by religion-specific laws:
      
• Hindu Marriage Act (Hindus, Buddhists, Jains, Sikhs)
• Muslim Personal Law (Muslims)
• Divorce Act (Christians)

Common grounds: cruelty, adultery, desertion (2+ years).

For legal advice, consult a professional.`;
    }
    
    // General fallback response
    return `I understand your question about "${prompt}". For accurate legal information, please consult:

1. A qualified lawyer
2. Official legal resources
3. Government websites

This is for informational purposes only.`;
  }
}

export default GeminiService;