import React, { useState, useRef, useEffect } from 'react';
import { FaRobot, FaUser, FaPaperPlane, FaMicrophone, FaTimes, FaArrowLeft } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const Chatbot = () => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "Hello! I'm Lawgic AI, your legal research assistant. How can I help you today?",
      sender: 'bot',
      timestamp: new Date()
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);
  
  // Sample suggested queries
  const suggestedQueries = [
    "Find precedents for property dispute cases",
    "Summarize Section 138 of Negotiable Instruments Act",
    "Recent Supreme Court judgments on divorce",
    "Explain contract breach remedies"
  ];

  // Scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (inputMessage.trim() === '') return;
    
    // Add user message
    const userMessage = {
      id: messages.length + 1,
      text: inputMessage,
      sender: 'user',
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    
    // Simulate bot thinking
    setIsTyping(true);
    
    // Simulate response after delay
    setTimeout(() => {
      setIsTyping(false);
      
      // Sample responses based on user input
      let botResponse = "I'm analyzing your query about ";
      if (inputMessage.toLowerCase().includes('property') || inputMessage.toLowerCase().includes('dispute')) {
        botResponse = "I found several relevant property dispute cases. The most cited one is 'Sharma v. Patel (2022)' which established that boundary walls constructed with mutual consent cannot be unilaterally altered. Would you like me to provide more details or similar cases?";
      } else if (inputMessage.toLowerCase().includes('supreme court') || inputMessage.toLowerCase().includes('judgment')) {
        botResponse = "There are 24 recent Supreme Court judgments matching your query. The most recent one from April 10, 2025 deals with constitutional rights in digital surveillance. Would you like me to summarize the key points or provide citations?";
      } else if (inputMessage.toLowerCase().includes('contract') || inputMessage.toLowerCase().includes('breach')) {
        botResponse = "Indian Contract Law provides several remedies for breach of contract including damages, specific performance, injunction, and quantum meruit. The case of 'IndiTech v. GlobalServ (2023)' is particularly relevant to your query, establishing a three-part test for measuring damages. Would you like me to elaborate?";
      } else {
        botResponse += inputMessage.toLowerCase() + ". Based on my legal database, I can provide you with relevant cases, statutes, and legal principles. Could you specify what aspect you're most interested in?";
      }
      
      const botMessage = {
        id: messages.length + 2,
        text: botResponse,
        sender: 'bot',
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, botMessage]);
    }, 1500 + Math.random() * 1000);
  };

  const handleSuggestedQuery = (query) => {
    setInputMessage(query);
  };

  const formatTime = (date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className="flex flex-col h-screen pt-[60px] bg-[#f3eee5]">
      {/* Main Chat Area */}
      <div className="flex-1 overflow-y-auto p-4 md:p-6">
        <div className="max-w-4xl mx-auto">
          {/* Messages */}
          <div className="space-y-4 mb-4">
            {messages.map((message) => (
              <div 
                key={message.id}
                className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div className={`
                  max-w-[80%] md:max-w-[70%] rounded-2xl px-4 py-3 
                  ${message.sender === 'user' 
                    ? 'bg-[#251c1a] text-white rounded-tr-none' 
                    : 'bg-white text-[#251c1a] rounded-tl-none border border-[#251c1a]/10'}
                `}>
                  <div className="flex items-center mb-1">
                    <div className={`w-6 h-6 rounded-full flex items-center justify-center mr-2 
                      ${message.sender === 'user' 
                        ? 'bg-[#f3eee5]/20' 
                        : 'bg-[#251c1a]/10'}`
                    }>
                      {message.sender === 'user' 
                        ? <FaUser className="text-xs text-[#f3eee5]" /> 
                        : <FaRobot className="text-xs text-[#251c1a]" />
                      }
                    </div>
                    <div className={`text-xs ${message.sender === 'user' ? 'text-[#f3eee5]/70' : 'text-[#251c1a]/70'}`}>
                      {message.sender === 'user' ? 'You' : 'Lawgic AI'} • {formatTime(message.timestamp)}
                    </div>
                  </div>
                  <p className="whitespace-pre-wrap">{message.text}</p>
                </div>
              </div>
            ))}
            
            {/* Typing indicator */}
            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-white text-[#251c1a] rounded-2xl rounded-tl-none px-4 py-3 max-w-[70%] border border-[#251c1a]/10">
                  <div className="flex items-center space-x-2">
                    <div className="w-6 h-6 rounded-full bg-[#251c1a]/10 flex items-center justify-center">
                      <FaRobot className="text-xs text-[#251c1a]" />
                    </div>
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-[#251c1a]/40 rounded-full animate-bounce" style={{ animationDelay: '0s' }}></div>
                      <div className="w-2 h-2 bg-[#251c1a]/40 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                      <div className="w-2 h-2 bg-[#251c1a]/40 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
                    </div>
                  </div>
                </div>
              </div>
            )}
            
            <div ref={messagesEndRef} />
          </div>

          {/* Suggested queries */}
          {messages.length < 3 && (
            <div className="mb-4">
              <p className="text-sm text-[#251c1a]/70 mb-2">Suggested queries:</p>
              <div className="flex flex-wrap gap-2">
                {suggestedQueries.map((query, index) => (
                  <button
                    key={index}
                    onClick={() => handleSuggestedQuery(query)}
                    className="bg-white border border-[#251c1a]/20 text-[#251c1a] text-sm py-2 px-4 rounded-full hover:bg-[#251c1a]/5 transition-colors whitespace-nowrap"
                  >
                    {query}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Message Input */}
      <div className="p-4 bg-white border-t border-[#251c1a]/10">
        <div className="max-w-4xl mx-auto">
          <form onSubmit={handleSendMessage} className="flex items-center gap-2">
            <button 
              type="button"
              className="p-3 rounded-full bg-[#251c1a]/5 text-[#251c1a] hover:bg-[#251c1a]/10 transition-colors"
            >
              <FaMicrophone />
            </button>
            <input
              type="text"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              placeholder="Type your legal question..."
              className="flex-1 py-3 px-4 bg-[#251c1a]/5 rounded-full outline-none focus:ring-2 focus:ring-[#251c1a]/20"
            />
            <button 
              type="submit"
              disabled={inputMessage.trim() === ''}
              className={`p-3 rounded-full ${
                inputMessage.trim() === '' 
                  ? 'bg-[#251c1a]/20 text-[#251c1a]/50' 
                  : 'bg-[#251c1a] text-white hover:bg-[#251c1a]/80'
              } transition-colors`}
            >
              <FaPaperPlane />
            </button>
          </form>
          <p className="text-xs text-center mt-2 text-[#251c1a]/50">
            Lawgic AI provides information, not legal advice. Consult a qualified lawyer for specific legal matters.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Chatbot;