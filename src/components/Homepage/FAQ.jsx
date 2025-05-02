import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaChevronDown } from "react-icons/fa";

const FAQ = () => {
  const faqs =[
    {
      "question": "What is Lawgic?",
      "answer": "Lawgic is an AI-powered legal research platform designed specifically for the Indian legal context. We help lawyers, legal professionals, and researchers access past court judgments, understand legal precedents, and streamline case research. Our platform offers AI-driven case matching, IPC section finder, legal document analysis, and up-to-date legal news and insights."
    },
    {
      "question": "How does Lawgic improve legal research?",
      "answer": "Lawgic leverages advanced AI and Natural Language Processing (NLP) to provide relevant case recommendations, identify applicable IPC sections, summarize lengthy judgments, and categorize legal data efficiently. Our tools can reduce research time by up to 70% while improving accuracy and comprehensiveness of legal analysis."
    },
    {
      "question": "Which courts and cases does Lawgic cover?",
      "answer": "Lawgic focuses extensively on Indian legal cases, including Supreme Court and High Court judgments across all jurisdictions. Our database includes historical precedents as well as the latest judgments, with daily updates to ensure you always have access to current legal developments."
    },
    {
      "question": "What is the IPC Section Finder feature?",
      "answer": "Our IPC Section Finder uses AI to help you identify relevant Indian Penal Code sections applicable to your case scenario. Simply describe the situation in natural language, and our system will suggest the most relevant IPC sections, provide explanations, and link to related case precedents."
    },
    {
      "question": "How does the Legal Document Analysis work?",
      "answer": "Upload your legal documents (contracts, case files, judgments) to our platform, and our AI will analyze them to extract key insights, arguments, and citations. The system provides comprehensive summaries, identifies important legal principles, and links to relevant cases and statutes."
    },
    {
      "question": "How up-to-date is Lawgic's legal news?",
      "answer": "Our legal news section is updated daily with the latest developments in Indian law and significant global legal trends. All content is curated by legal experts and includes in-depth analysis and expert opinions to help you understand the implications of new legal developments."
    },
    {
      "question": "What kind of support does Lawgic provide?",
      "answer": "We offer 24/7 customer support through multiple channels including live chat, email, and phone. Our support team includes legal research experts who can help you navigate the platform, troubleshoot issues, and provide guidance on using our tools effectively for your specific legal research needs."
    },
    {
      "question": "Is Lawgic free to use?",
      "answer": "Lawgic offers a free basic version with essential search features and limited access to our database. Advanced features like AI-driven insights, document analysis, saved searches, and personalized recommendations are available under our premium plans, which are competitively priced for individual practitioners, law firms, and institutions."
    }
  ];
  
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="bg-gradient-to-br from-[#f3eee5] to-[#e2dac9] py-20 px-6">
      <div className="max-w-4xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-bold mb-4 text-[#251c1a]">Frequently Asked Questions</h2>
          <p className="text-[#251c1a]/70 max-w-2xl mx-auto">
            Find answers to common questions about our legal AI platform and how it can revolutionize your legal research process.
          </p>
        </motion.div>
        
        <div className="space-y-5">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className={`border border-[#251c1a]/10 rounded-xl overflow-hidden ${
                openIndex === index ? "bg-gradient-to-r from-[#251c1a] to-[#3c2b26] text-[#f3eee5]" : "bg-[#f3eee5] text-[#251c1a]"
              }`}
            >
              <div 
                className={`p-6 cursor-pointer flex justify-between items-center transition-colors duration-300 ${
                  openIndex === index ? "" : "hover:bg-[#251c1a]/5"
                }`} 
                onClick={() => toggleFAQ(index)}
              >
                <h3 className="text-xl font-semibold pr-8">
                  {faq.question}
                </h3>
                <motion.div
                  animate={{ rotate: openIndex === index ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                  className={`flex-shrink-0 ${openIndex === index ? "text-[#f3eee5]" : "text-[#251c1a]/60"}`}
                >
                  <FaChevronDown />
                </motion.div>
              </div>

              <AnimatePresence>
                {openIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="px-6 pb-6 text-[#f3eee5]/90 leading-relaxed">
                      {faq.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>

        {/* Removed Call to Action section with Contact Support button */}
      </div>
    </section>
  );
};

export default FAQ;