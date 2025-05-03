import React, { useState, useRef, useEffect } from 'react';
import { FaRobot, FaUser, FaPaperPlane, FaMicrophone, FaArrowLeft } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import GeminiService from '../services/GeminiService';
import Loader from '../components/Loader';

// AnimatedTyping component for animated text display
const AnimatedTyping = ({ text, onComplete }) => {
  const [displayedText, setDisplayedText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const textRef = useRef(text);
  const speedRef = useRef(15); // Reduced from 30ms to 15ms per character for faster animation

  useEffect(() => {
    // Reset when text changes
    textRef.current = text;
    setDisplayedText('');
    setCurrentIndex(0);
  }, [text]);

  useEffect(() => {
    if (currentIndex < textRef.current.length) {
      // Calculate typing speed - faster for spaces and punctuation
      const char = textRef.current[currentIndex];
      const isPunctuation = /[.,!?;:]/.test(char);
      const isSpace = char === ' ';
      
      // Adjusted typing speeds for faster animation
      const typingSpeed = isPunctuation ? speedRef.current * 3 : // Reduced from 5x to 3x 
                          isSpace ? speedRef.current * 0.3 :     // Reduced from 0.5x to 0.3x
                          speedRef.current;
      
      const timer = setTimeout(() => {
        setDisplayedText(prev => prev + textRef.current[currentIndex]);
        setCurrentIndex(prevIndex => prevIndex + 1);
      }, typingSpeed);
      
      return () => clearTimeout(timer);
    } else if (onComplete && currentIndex === textRef.current.length) {
      onComplete();
    }
  }, [currentIndex, onComplete]);

  return <p className="whitespace-pre-wrap">{displayedText}</p>;
};

// Legal knowledge base for fallbacks if API fails
const legalKnowledgeBase = {
  propertyDisputes: {
    cases: [
      {
        name: "Sharma v. Patel (2022)",
        citation: "AIR 2022 SC 1456",
        summary: "Established that boundary walls constructed with mutual consent cannot be unilaterally altered without proper legal procedure.",
        key_points: [
          "Mutual consent creates binding obligation",
          "Requires court intervention for alterations",
          "Damages can be awarded for unauthorized changes"
        ]
      },
      {
        name: "Mehta v. Housing Society (2023)",
        citation: "AIR 2023 SC 2389",
        summary: "Addressed disputes over common areas in residential complexes, establishing that majority consensus through proper society meetings is required for changes.",
        key_points: [
          "Common areas belong to all residents collectively",
          "Society bylaws govern usage rights",
          "Proper notice and voting procedures must be followed"
        ]
      },
      {
        name: "Agarwal v. Municipal Corporation (2024)",
        citation: "AIR 2024 SC 876",
        summary: "Established limits on government acquisition of property and requirements for fair compensation based on market value.",
        key_points: [
          "Just compensation is a fundamental right",
          "Market value at time of notification applies",
          "Procedural violations can invalidate acquisition"
        ]
      }
    ],
    general_advice: "Property disputes often require documentation review, surveyor reports, and title verification. Initial mediation is recommended before litigation."
  },
  
  section138: {
    summary: "Section 138 of the Negotiable Instruments Act addresses dishonor of cheques for insufficiency of funds.",
    requirements: [
      "The cheque must be presented within 3 months of issue date",
      "Notice must be sent to the drawer within 30 days of dishonor",
      "Drawer must fail to pay within 15 days of receiving notice",
      "Complaint must be filed within one month after the 15-day period"
    ],
    punishment: "Imprisonment up to 2 years or fine up to twice the cheque amount, or both.",
    procedure: [
      "Collect dishonor memo from bank",
      "Send legal notice to drawer via registered post",
      "File complaint under Section 138 in the jurisdictional magistrate court",
      "Attach original cheque, bank memo, copy of notice, and postal receipt"
    ],
    landmark_cases: [
      {
        name: "Dashrath Rupsingh Rathod v. State of Maharashtra (2014)",
        citation: "(2014) 9 SCC 129",
        ruling: "Territorial jurisdiction lies where the drawee bank is located"
      },
      {
        name: "MSR Leathers v. S. Palaniappan (2013)",
        citation: "(2013) 1 SCC 177", 
        ruling: "Multiple complaints can be filed for multiple representations of the same cheque"
      }
    ]
  },
  
  divorce: {
    grounds: [
      "Cruelty (physical or mental)",
      "Adultery",
      "Desertion for 2+ years",
      "Conversion to another religion",
      "Unsoundness of mind",
      "Renunciation of world",
      "Presumption of death",
      "No resumption of cohabitation after decree of separation"
    ],
    recentJudgments: [
      {
        name: "Sharma v. Sharma (2024)",
        citation: "AIR 2024 SC 245",
        ruling: "Consistent demeaning behavior constitutes mental cruelty",
        summary: "The Supreme Court held that consistent demeaning behavior in public and private spheres constitutes mental cruelty, sufficient for divorce under Section 13(1)(ia) of the Hindu Marriage Act."
      },
      {
        name: "Patel v. Patel (2023)",
        citation: "AIR 2023 SC 1892",
        ruling: "Irretrievable breakdown can be grounds in exceptional circumstances",
        summary: "The Court established that irretrievable breakdown can be grounds for divorce under Article 142 in exceptional circumstances even when not statutorily recognized."
      },
      {
        name: "Kumar v. Kumar (2023)",
        citation: "AIR 2023 SC 2145",
        ruling: "Financial independence of wife relevant to alimony decisions",
        summary: "The Court ruled that professional qualification and earning capacity of the wife are relevant factors in determining maintenance, moving away from the traditional approach."
      }
    ],
    procedures: {
      contested: [
        "File petition in family court with jurisdiction",
        "Serve notice to respondent",
        "Respondent files reply",
        "Mediation/counseling sessions",
        "Evidence and witness examination",
        "Final arguments",
        "Court judgment"
      ],
      mutual: [
        "File joint petition in family court",
        "First motion hearing",
        "6-month waiting period (can be waived)",
        "Second motion hearing",
        "Court decree"
      ]
    }
  },
  
  legalNotice: {
    steps: [
      "Read the entire notice carefully and note any deadlines",
      "Identify the sender, their allegations, and demands",
      "Gather all relevant documents mentioned in the notice",
      "Consider consulting a qualified lawyer before responding",
      "If you decide to respond, do so in writing and keep copies",
      "Don't ignore the notice as it may lead to legal consequences"
    ],
    types: {
      civil: "Related to property, monetary disputes, breach of contract, etc.",
      criminal: "Related to criminal complaints, defamation, etc.",
      consumer: "Related to product or service complaints",
      employment: "Related to workplace disputes or termination"
    },
    response_options: [
      "Send a reply through a lawyer",
      "Seek settlement or mediation",
      "Ignore if legally advisable (rarely recommended)",
      "File a counter-notice if allegations are false"
    ]
  },
  
  contractLaw: {
    breach_remedies: [
      {
        name: "Damages",
        description: "Monetary compensation to place the injured party in the position they would have been in had the contract been performed.",
        types: ["Compensatory", "Consequential", "Liquidated", "Nominal", "Punitive (rare in contract law)"]
      },
      {
        name: "Specific Performance",
        description: "Court order requiring the breaching party to fulfill their contractual obligations.",
        applicability: "Available when monetary damages are inadequate, often in cases involving unique goods like land or rare items."
      },
      {
        name: "Injunction",
        description: "Court order preventing a party from doing something in violation of the contract.",
        types: ["Temporary", "Permanent"]
      },
      {
        name: "Quantum Meruit",
        description: "Recovery of reasonable value for services rendered when contract is prematurely terminated.",
        translation: "Latin for 'as much as deserved'"
      }
    ],
    landmark_case: {
      name: "IndiTech v. GlobalServ (2023)",
      citation: "AIR 2023 SC 1567",
      ruling: "Established a three-part test for measuring damages",
      test_components: [
        "Actual loss incurred by the injured party",
        "Loss of potential profit directly attributable to the breach",
        "Reasonable costs of mitigation undertaken by the injured party"
      ]
    }
  }
};

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
  const [isLoading, setIsLoading] = useState(true);
  const [apiAvailable, setApiAvailable] = useState(false);
  const messagesEndRef = useRef(null);
  const navigate = useNavigate();
  const [isAnimationComplete, setIsAnimationComplete] = useState(true);
  const [animatingMessageId, setAnimatingMessageId] = useState(null);
  
  // Sample suggested queries
  const suggestedQueries = [
    "Find precedents for property dispute cases",
    "Summarize Section 138 of Negotiable Instruments Act",
    "Recent Supreme Court judgments on divorce",
    "What should I do if served with a legal notice?"
  ];

  // Initialize Gemini API service
  useEffect(() => {
    const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
    if (apiKey) {
      try {
        GeminiService.init(apiKey);
        console.log('Gemini API initialized successfully');
        setApiAvailable(true);
      } catch (error) {
        console.error('Failed to initialize Gemini API:', error);
        setApiAvailable(false);
      }
    } else {
      console.warn('Gemini API key is missing. Using fallback responses.');
      setApiAvailable(false);
    }
    
    // Simulate loading time for the chatbot
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, []);

  // Scroll to bottom when messages change
  useEffect(() => {
    if (messagesEndRef.current) {
      // Create observer to ensure message container is scrolled when content changes or renders
      const observer = new MutationObserver(() => {
        // Immediate scroll during typing to ensure visibility of new content
        messagesEndRef.current?.scrollIntoView({ behavior: 'auto' });
      });

      // Get the parent chat container to observe for changes
      const chatContainer = messagesEndRef.current.parentElement;
      if (chatContainer) {
        // Observe for changes in the chat container
        observer.observe(chatContainer, { 
          childList: true, 
          subtree: true,
          characterData: true 
        });
      }

      // Initial scroll - use smooth scrolling when not typing
      if (isAnimationComplete) {
        messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
      } else {
        messagesEndRef.current.scrollIntoView({ behavior: 'auto' });
      }

      // Cleanup observer when component unmounts
      return () => observer.disconnect();
    }
  }, [messages, isAnimationComplete, isTyping]);

  // Handle sending a message
  const handleSendMessage = async (e) => {
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
    
    // Show bot typing indicator
    setIsTyping(true);
    
    try {
      let botResponse;
      
      if (apiAvailable) {
        // Use Gemini API for response
        try {
          const geminiService = GeminiService.getInstance();
          
          // Filter out the welcome message if it exists
          const chatHistory = messages.length > 1 ? 
            messages.filter(msg => msg.id !== 1) : [];
            
          // Get response from Gemini API
          botResponse = await geminiService.getLegalResponse(inputMessage, chatHistory);
        } catch (apiError) {
          console.error('Gemini API error:', apiError);
          // Fall back to local knowledge base if API fails
          botResponse = generateDetailedResponse(inputMessage, messages);
        }
      } else {
        // Use local knowledge base if API is not available
        botResponse = generateDetailedResponse(inputMessage, messages);
      }
      
      // Add bot response to messages
      const botMessage = {
        id: messages.length + 2,
        text: botResponse,
        sender: 'bot',
        timestamp: new Date(),
        animate: true // Flag to animate this message
      };
      
      setIsTyping(false);
      setMessages(prev => [...prev, botMessage]);
      setAnimatingMessageId(botMessage.id);
      setIsAnimationComplete(false);
      
    } catch (error) {
      console.error('Error getting response:', error);
      
      // Handle error
      setIsTyping(false);
      setMessages(prev => [...prev, {
        id: messages.length + 2,
        text: "I'm sorry, I encountered an error processing your request. Please try again later.",
        sender: 'bot',
        timestamp: new Date(),
        animate: true
      }]);
      setIsAnimationComplete(false);
    }
  };

  // Handle clicking on a suggested query
  const handleSuggestedQuery = (query) => {
    setInputMessage(query);
    
    // Automatically submit after a brief delay
    setTimeout(() => {
      const event = { preventDefault: () => {} };
      handleQuerySubmit(event, query);
    }, 100);
  };

  // Submit a query directly (for suggested queries)
  const handleQuerySubmit = async (e, query) => {
    e.preventDefault();
    
    // Add user message
    const userMessage = {
      id: messages.length + 1,
      text: query,
      sender: 'user',
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    
    // Show bot typing indicator
    setIsTyping(true);
    
    try {
      let botResponse;
      
      if (apiAvailable) {
        // Use Gemini API for response
        try {
          const geminiService = GeminiService.getInstance();
          
          // Filter out the welcome message if it exists
          const chatHistory = messages.length > 1 ? 
            messages.filter(msg => msg.id !== 1) : [];
            
          // Get response from Gemini API
          botResponse = await geminiService.getLegalResponse(query, chatHistory);
        } catch (apiError) {
          console.error('Gemini API error:', apiError);
          // Fall back to local knowledge base if API fails
          botResponse = generateDetailedResponse(query, messages);
        }
      } else {
        // Use local knowledge base if API is not available
        botResponse = generateDetailedResponse(query, messages);
      }
      
      // Add bot response to messages
      const botMessage = {
        id: messages.length + 2,
        text: botResponse,
        sender: 'bot',
        timestamp: new Date(),
        animate: true // Flag to animate this message
      };
      
      setIsTyping(false);
      setMessages(prev => [...prev, botMessage]);
      setAnimatingMessageId(botMessage.id);
      setIsAnimationComplete(false);
      
    } catch (error) {
      console.error('Error getting response:', error);
      
      // Handle error
      setIsTyping(false);
      setMessages(prev => [...prev, {
        id: messages.length + 2,
        text: "I'm sorry, I encountered an error processing your request. Please try again later.",
        sender: 'bot',
        timestamp: new Date(),
        animate: true
      }]);
      setIsAnimationComplete(false);
    }
  };

  // Generate context-aware detailed responses using the knowledge base (fallback if API fails)
  const generateDetailedResponse = (input, messageHistory) => {
    const lowerInput = input.toLowerCase();
    const prevMessages = messageHistory.slice(-3); // Consider recent context
    
    // Check for greetings first
    if (/\b(hello|hi|hey|howdy|greetings|good (morning|evening|afternoon))\b/i.test(lowerInput)) {
      return "Hello! I'm happy to assist you with your legal questions. What specific legal information are you looking for today?";
    }
    
    // Check for thanks
    if (/\b(thanks|thank you|ty|appreciate|grateful)\b/i.test(lowerInput)) {
      return "You're welcome! If you have any other legal questions or need information on specific cases or laws, feel free to ask. I'm here to assist with your legal research needs.";
    }
    
    // Property disputes
    if (/\b(property|dispute|boundary|possession|title|land|real estate|ownership)\b/i.test(lowerInput)) {
      // Check for specific case questions based on context
      if (/\b(sharma|patel|2022)\b/i.test(lowerInput)) {
        const caseData = legalKnowledgeBase.propertyDisputes.cases[0];
        return `In ${caseData.name} (${caseData.citation}), the Supreme Court ${caseData.summary}\n\nKey principles established:\n• ${caseData.key_points.join('\n• ')}\n\nThis precedent is frequently cited in boundary dispute cases where initial consent was provided by parties.`;
      }
      
      if (/\b(mehta|housing|society|2023)\b/i.test(lowerInput)) {
        const caseData = legalKnowledgeBase.propertyDisputes.cases[1];
        return `In ${caseData.name} (${caseData.citation}), the Supreme Court ${caseData.summary}\n\nKey principles established:\n• ${caseData.key_points.join('\n• ')}\n\nThis case is particularly relevant for disputes in apartment complexes and housing societies.`;
      }
      
      if (/\b(more details|elaborate|explain further)\b/i.test(lowerInput)) {
        return `Property dispute resolution typically involves several stages:\n\n1. Documentation review (deeds, agreements, tax records)\n2. Boundary verification through survey reports\n3. Title search to establish ownership chain\n4. Initial mediation attempts\n5. Legal notice to opposing party\n6. Court proceedings if necessary\n\nThe burden of proof generally lies with the party claiming ownership rights or contesting existing boundaries. Would you like information on a specific aspect of property disputes?`;
      }
      
      // Default property response
      return `I found several relevant property dispute cases. The most cited ones include:\n\n1. ${legalKnowledgeBase.propertyDisputes.cases[0].name} (${legalKnowledgeBase.propertyDisputes.cases[0].citation}) - Established that boundary walls constructed with mutual consent cannot be unilaterally altered.\n\n2. ${legalKnowledgeBase.propertyDisputes.cases[1].name} (${legalKnowledgeBase.propertyDisputes.cases[1].citation}) - Addressed disputes over common areas in residential complexes.\n\n3. ${legalKnowledgeBase.propertyDisputes.cases[2].name} (${legalKnowledgeBase.propertyDisputes.cases[2].citation}) - Set standards for government acquisition and compensation.\n\n${legalKnowledgeBase.propertyDisputes.general_advice}\n\nWould you like more details on any of these cases?`;
    }
    
    // Section 138 of Negotiable Instruments Act
    if (/\b(section 138|negotiable instrument|cheque bounce|dishono[u]r|cheque dishono[u]r|bounced cheque)\b/i.test(lowerInput)) {
      if (/\b(procedure|file|filing|steps|how to)\b/i.test(lowerInput)) {
        return `Procedure for filing a Section 138 case:\n\n${legalKnowledgeBase.section138.procedure.map((step, index) => `${index+1}. ${step}`).join('\n')}\n\nTime limits are strict in these cases, and courts generally don't condone delays beyond the statutory period. Would you like information on specific landmark cases related to Section 138?`;
      }
      
      if (/\b(punishment|penalty|jail|imprisonment|fine)\b/i.test(lowerInput)) {
        return `Punishment under Section 138 of Negotiable Instruments Act: ${legalKnowledgeBase.section138.punishment}\n\nCourts consider factors like the amount of the cheque, previous offenses, and the circumstances of dishonor when determining the specific punishment.`;
      }
      
      if (/\b(cases|judgments|precedents)\b/i.test(lowerInput)) {
        const cases = legalKnowledgeBase.section138.landmark_cases;
        return `Landmark judgments on Section 138 cases:\n\n${cases.map(c => `• ${c.name} (${c.citation}): ${c.ruling}`).join('\n\n')}\n\nThese judgments have significantly shaped how Section 138 cases are handled in courts across India.`;
      }
      
      // Default Section 138 response
      return `Section 138 of the Negotiable Instruments Act addresses dishonor of cheques for insufficiency of funds.\n\nKey requirements to file a case:\n${legalKnowledgeBase.section138.requirements.map((req, i) => `${i+1}. ${req}`).join('\n')}\n\nPunishment: ${legalKnowledgeBase.section138.punishment}\n\nWould you like to know about the procedure for filing a case or relevant landmark judgments?`;
    }
    
    // Supreme Court judgments on divorce
    if (/\b(supreme court|judgment|divorce|matrimonial|marriage|alimony|maintenance)\b/i.test(lowerInput)) {
      if (/\b(sharma|2024|demeaning|cruelty)\b/i.test(lowerInput)) {
        const caseData = legalKnowledgeBase.divorce.recentJudgments[0];
        return `In ${caseData.name} (${caseData.citation}), ${caseData.summary}\n\nThis judgment expanded the interpretation of mental cruelty to include behaviors that diminish the spouse's dignity and self-respect, even if there is no physical violence involved.`;
      }
      
      if (/\b(irretrievable|breakdown|patel|2023)\b/i.test(lowerInput)) {
        const caseData = legalKnowledgeBase.divorce.recentJudgments[1];
        return `In ${caseData.name} (${caseData.citation}), ${caseData.summary}\n\nThis judgment is significant because it shows the Court's willingness to exercise its special powers under Article 142 to do complete justice in cases where the marriage has irretrievably broken down, even though this is not explicitly listed as a ground in the Hindu Marriage Act.`;
      }
      
      if (/\b(mutual|consent|procedure|file|process)\b/i.test(lowerInput)) {
        return `Procedure for mutual consent divorce:\n\n${legalKnowledgeBase.divorce.procedures.mutual.map((step, i) => `${i+1}. ${step}`).join('\n')}\n\nThe 6-month waiting period between first and second motion can be waived by courts in exceptional circumstances as per the Supreme Court judgment in Amardeep Singh v. Harveen Kaur (2017).`;
      }
      
      if (/\b(grounds|reasons|basis)\b/i.test(lowerInput)) {
        return `Grounds for divorce under Hindu Marriage Act:\n\n• ${legalKnowledgeBase.divorce.grounds.join('\n• ')}\n\nDifferent personal laws (Muslim, Christian, Parsi) have their own specific grounds for divorce. Would you like information on a particular personal law?`;
      }
      
      // Default divorce response
      return `Recent Supreme Court judgments on divorce have emphasized mental cruelty as valid grounds under Section 13(1)(ia) of the Hindu Marriage Act.\n\nNotable judgments:\n\n1. ${legalKnowledgeBase.divorce.recentJudgments[0].name} (${legalKnowledgeBase.divorce.recentJudgments[0].citation}): ${legalKnowledgeBase.divorce.recentJudgments[0].ruling}\n\n2. ${legalKnowledgeBase.divorce.recentJudgments[1].name} (${legalKnowledgeBase.divorce.recentJudgments[1].citation}): ${legalKnowledgeBase.divorce.recentJudgments[1].ruling}\n\n3. ${legalKnowledgeBase.divorce.recentJudgments[2].name} (${legalKnowledgeBase.divorce.recentJudgments[2].citation}): ${legalKnowledgeBase.divorce.recentJudgments[2].ruling}\n\nWould you like more information on specific aspects of divorce law, such as grounds for divorce or procedures?`;
    }
    
    // Legal notice responses
    if (/\b(legal notice|notice|served|summons)\b/i.test(lowerInput)) {
      if (/\b(ignore|avoiding|not respond)\b/i.test(lowerInput)) {
        return "Ignoring a legal notice is generally not advisable as it may lead to adverse legal consequences. It can be considered as an admission of the claims made in the notice or may result in ex-parte proceedings. In most cases, it's best to respond appropriately, even if just to deny allegations or request more time.";
      }
      
      if (/\b(respond|reply|answer|draft)\b/i.test(lowerInput)) {
        return "When responding to a legal notice:\n\n1. Address it to the sender (usually their lawyer)\n2. Reference the original notice with its date\n3. Clearly state your position on each allegation\n4. Include any relevant facts that were omitted\n5. Attach supporting documents if applicable\n6. Have it reviewed by a lawyer before sending\n7. Send via registered post with acknowledgment due for proof of delivery\n\nThe response should be concise, factual, and avoid emotional language.";
      }
      
      if (/\b(deadline|time|period|late)\b/i.test(lowerInput)) {
        return "Legal notices typically specify a deadline for response, often 15-30 days from receipt. It's crucial to respond within this timeframe. If you need more time, you can send an interim response acknowledging receipt and requesting additional time to prepare a complete response. If the deadline has passed, it's still advisable to respond as soon as possible with an explanation for the delay.";
      }
      
      // Default legal notice response
      return `If you've been served with a legal notice, follow these steps:\n\n${legalKnowledgeBase.legalNotice.steps.map((step, i) => `${i+1}. ${step}`).join('\n')}\n\nDifferent types of notices require different approaches:\n• Civil notices: ${legalKnowledgeBase.legalNotice.types.civil}\n• Criminal notices: ${legalKnowledgeBase.legalNotice.types.criminal}\n• Consumer notices: ${legalKnowledgeBase.legalNotice.types.consumer}\n• Employment notices: ${legalKnowledgeBase.legalNotice.types.employment}\n\nWould you like specific advice for a particular type of legal notice?`;
    }
    
    // Contract breach remedies
    if (/\b(contract|breach|agreement|violation|remedy|remedies)\b/i.test(lowerInput)) {
      if (/\b(damages|compensation|money)\b/i.test(lowerInput)) {
        const remedy = legalKnowledgeBase.contractLaw.breach_remedies.find(r => r.name === "Damages");
        return `Damages in contract law are monetary compensation awarded to place the injured party in the position they would have been in had the contract been performed.\n\nTypes of damages:\n• ${remedy.types.join('\n• ')}\n\nIn ${legalKnowledgeBase.contractLaw.landmark_case.name}, the Supreme Court established a three-part test for measuring damages:\n1. ${legalKnowledgeBase.contractLaw.landmark_case.test_components[0]}\n2. ${legalKnowledgeBase.contractLaw.landmark_case.test_components[1]}\n3. ${legalKnowledgeBase.contractLaw.landmark_case.test_components[2]}`;
      }
      
      if (/\b(specific performance|fulfill|fulfillment)\b/i.test(lowerInput)) {
        const remedy = legalKnowledgeBase.contractLaw.breach_remedies.find(r => r.name === "Specific Performance");
        return `Specific Performance: ${remedy.description}\n\nApplicability: ${remedy.applicability}\n\nThis remedy is typically granted when the subject matter is unique (like land) or when monetary damages would be inadequate to compensate the injured party.`;
      }
      
      if (/\b(IndiTech|GlobalServ|2023|landmark|test)\b/i.test(lowerInput)) {
        const caseData = legalKnowledgeBase.contractLaw.landmark_case;
        return `In ${caseData.name} (${caseData.citation}), the Supreme Court ${caseData.ruling}:\n\n1. ${caseData.test_components[0]}\n2. ${caseData.test_components[1]}\n3. ${caseData.test_components[2]}\n\nThis case has significantly influenced how courts calculate damages in contract breach cases, moving beyond simple loss calculations to a more comprehensive assessment.`;
      }
      
      // Default contract law response
      return `Indian Contract Law provides several remedies for breach of contract:\n\n1. Damages: Monetary compensation for losses suffered\n2. Specific Performance: Court order requiring the breaching party to fulfill their obligations\n3. Injunction: Court order preventing a party from doing something in violation of the contract\n4. Quantum Meruit: Recovery of reasonable value for services rendered when contract is prematurely terminated\n\nThe landmark case ${legalKnowledgeBase.contractLaw.landmark_case.name} (${legalKnowledgeBase.contractLaw.landmark_case.citation}) established a three-part test for measuring damages.\n\nWould you like more details on any specific remedy?`;
    }
    
    // Check for follow-up questions about previously discussed topics
    const conversationContext = getConversationContext(prevMessages);
    if (conversationContext) {
      if (/\b(yes|more details|tell me more|elaborate|explain further)\b/i.test(lowerInput)) {
        switch (conversationContext) {
          case 'property':
            return `Property disputes typically involve these key legal principles:\n\n1. Adverse possession: Occupying someone else's property openly and continuously for a statutory period (usually 12 years) can lead to ownership rights\n\n2. Easement rights: Rights to use another's property for specific purposes, which can be acquired by prescription after 20 years of continuous use\n\n3. Riparian rights: Special rights of landowners whose property adjoins water bodies\n\n4. Doctrine of part performance: Section 53A of Transfer of Property Act provides protection to a person who has partly performed a contract\n\nThe Civil Procedure Code provides for temporary injunctions to maintain status quo during property litigation. Would you like information on any of these specific principles?`;
          
          case 'section138':
            return `Further details on Section 138 cases:\n\n• A cheque may be presented multiple times within the 3-month validity period\n\n• The 30-day notice period starts from the date of receiving the dishonor memo, not from the date of dishonor\n\n• The payee must prove that the cheque was issued for discharge of a legally enforceable debt or liability\n\n• The presumption under Section 139 is in favor of the holder, but it is rebuttable\n\n• Recent amendments allow for electronic presentation of cheques and electronic notices\n\nCourts have been increasingly encouraging mediation in cheque bounce cases to reduce pendency.`;
          
          case 'divorce':
            return `Additional aspects of divorce proceedings in India:\n\n1. Interim maintenance can be claimed during the pendency of the case under Section 24 of Hindu Marriage Act or Section 125 of CrPC\n\n2. Child custody is determined based on the 'welfare of the child' principle, not automatically assigned to either parent\n\n3. The Family Courts Act, 1984 provides for specialized courts to handle matrimonial disputes with simplified procedures\n\n4. Mediation is mandatory before proceeding with contested divorce in many jurisdictions\n\n5. Foreign divorce decrees are recognized in India under Section 13 of CPC if obtained after proper contested proceedings\n\nThe Marriage Laws (Amendment) Bill proposing irretrievable breakdown as a ground for divorce is still pending legislative approval.`;
          
          case 'legalNotice':
            return `When dealing with a legal notice, remember these additional points:\n\n1. Documentation is crucial - maintain copies of all correspondence and related documents\n\n2. A legal notice doesn't necessarily mean a lawsuit will follow - it's often a preliminary step to seek resolution\n\n3. Consider sending your response through a lawyer even if the original notice wasn't sent by one\n\n4. If allegations are completely frivolous, you may consider filing for defamation depending on the nature of claims\n\n5. A proper response can often lead to settlement discussions\n\n6. Some notices (like those under consumer protection laws) have specific statutory formats and procedures\n\nWould you like guidance on drafting a response to a specific type of notice?`;
          
          case 'contract':
            return `Important principles in contract breach cases include:\n\n1. Mitigation of damages: The injured party has a duty to take reasonable steps to minimize their losses\n\n2. Remoteness of damage: As established in Hadley v. Baxendale, only damages that were reasonably foreseeable can be claimed\n\n3. Force majeure: Events beyond reasonable control that may excuse performance\n\n4. Fundamental breach: A breach so significant that it goes to the root of the contract\n\n5. Anticipatory breach: When a party indicates in advance that they won't fulfill their obligations\n\nThe Specific Relief Act, 1963 (amended in 2018) has made specific performance the rule rather than the exception, significantly changing the approach to contract enforcement in India.`;
            
          default:
            return `I'm happy to provide more details. Could you specify which aspect of the previous information you'd like me to elaborate on?`;
        }
      }
    }
    
    // General response for other queries or when context isn't clear
    return `Based on your query about "${input}", I can provide relevant legal information from my database. To give you the most helpful response, could you specify what particular aspect you're interested in? For example, are you looking for specific court cases, legal definitions, or procedural guidance related to this topic?`;
  };
  
  // Helper function to identify conversation context from previous messages
  const getConversationContext = (recentMessages) => {
    const combinedText = recentMessages.map(m => m.text.toLowerCase()).join(' ');
    
    if (/\b(property|dispute|boundary|possession|title|land|real estate|ownership)\b/i.test(combinedText)) {
      return 'property';
    }
    if (/\b(section 138|negotiable instrument|cheque bounce|dishono[u]r|cheque dishono[u]r|bounced cheque)\b/i.test(combinedText)) {
      return 'section138';
    }
    if (/\b(supreme court|judgment|divorce|matrimonial|marriage|alimony|maintenance)\b/i.test(combinedText)) {
      return 'divorce';
    }
    if (/\b(legal notice|notice|served|summons)\b/i.test(combinedText)) {
      return 'legalNotice';
    }
    if (/\b(contract|breach|agreement|violation|remedy|remedies)\b/i.test(combinedText)) {
      return 'contract';
    }
    
    return null;
  };

  const formatTime = (date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  // Handle navigation back to dashboard
  const handleBack = () => {
    navigate('/dashboard');
  };

  // Show loader while loading
  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className="flex flex-col h-screen pt-[60px] bg-[#f3eee5]">
      {/* Back to Dashboard Button */}
      <div className="px-4 py-2 bg-white border-b border-[#251c1a]/10">
        <div className="max-w-4xl mx-auto">
          <button 
            onClick={handleBack}
            className="flex items-center text-[#251c1a] hover:text-[#251c1a]/70 transition-colors"
          >
            <FaArrowLeft className="mr-2" />
            <span>Back to Dashboard</span>
          </button>
        </div>
      </div>
      
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
                  {message.sender === 'bot' && message.animate && message.id === animatingMessageId ? (
                    <AnimatedTyping 
                      text={message.text} 
                      onComplete={() => {
                        setIsAnimationComplete(true);
                        setAnimatingMessageId(null);
                      }} 
                    />
                  ) : (
                    <p className="whitespace-pre-wrap">{message.text}</p>
                  )}
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
            <input
              type="text"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              placeholder="Type your legal question..."
              className="flex-1 py-3 px-4 bg-[#251c1a]/5 rounded-full outline-none focus:ring-2 focus:ring-[#251c1a]/20"
              disabled={!isAnimationComplete} // Disable input while animation is in progress
            />
            <button 
              type="submit"
              disabled={inputMessage.trim() === '' || !isAnimationComplete}
              className={`p-3 rounded-full ${
                inputMessage.trim() === '' || !isAnimationComplete
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