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
          maxOutputTokens: 1000, // Reduced from 2048 to produce more concise responses
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
      // Create legal context prompt emphasizing brevity
      const legalPrompt = `You are Lawgic AI, a legal research assistant specialized in Indian law.
      Please answer the following legal question concisely but accurately:

      "${prompt}"
      
      When answering:
      - Keep your response brief and to the point (limit to 3-4 paragraphs maximum)
      - Focus on the most relevant Indian law and precedents
      - If discussing IPC sections, provide only the most important information
      - When citing cases, mention only 1-2 key precedents
      - Use bullet points for lists to improve readability
      - End with a brief disclaimer about this being information, not legal advice`;

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
      return `Murder is covered under Section 302 of the Indian Penal Code (IPC).
      
Section 302 IPC states: "Whoever commits murder shall be punished with death, or imprisonment for life, and shall also be liable to fine."

Key cases:
• K.M. Nanavati v. State of Maharashtra (1961) - Distinguished murder from culpable homicide
• Bachan Singh v. State of Punjab (1980) - Established the "rarest of rare" doctrine

This is for informational purposes only and not legal advice.`;
    }
    
    if (prompt.includes('ipc') || prompt.includes('indian penal code') || 
        (prompt.includes('section') && /\d+/.test(prompt))) {
      
      // Try to extract section number
      const sectionMatch = prompt.match(/section\s+(\d+)/i);
      const sectionNum = sectionMatch ? sectionMatch[1] : '';
      
      return `The Indian Penal Code (IPC) is the official criminal code of India, covering all substantive aspects of criminal law.
${sectionNum ? `\nSection ${sectionNum} is a part of the IPC. ` : ''}
For specific legal information, please consult the official legal texts or a qualified legal professional.

This information is provided for educational purposes only.`;
    }
    
    if (prompt.includes('divorce') || prompt.includes('marriage')) {
      return `Divorce in India is governed by various personal laws based on religion:
      
• Hindu Marriage Act (for Hindus, Buddhists, Jains, Sikhs)
• Muslim Personal Law (for Muslims)
• Divorce Act (for Christians)
• Special Marriage Act (for inter-religious marriages)

Common grounds for divorce include:
- Cruelty (mental or physical)
- Adultery
- Desertion for 2+ years
- Conversion to another religion
- Mental disorder

This information is for educational purposes only. Please consult a legal professional for advice.`;
    }
    
    // General fallback response
    return `I understand you have a question about "${prompt}". To provide accurate legal information, I would need to access my legal database, which seems to be unavailable at the moment.

For legal assistance, I recommend:
1. Consulting a qualified lawyer
2. Referring to official legal resources
3. Checking government websites for up-to-date legal information

This is for informational purposes only and not legal advice.`;
  }
}

export default GeminiService;