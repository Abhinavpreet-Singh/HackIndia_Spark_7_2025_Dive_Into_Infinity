import React from 'react';
import { motion } from 'framer-motion';
import { FaBalanceScale, FaSearch, FaFileAlt, FaChartLine, FaUserTie, FaRegLightbulb, FaGavel, FaNewspaper, FaLightbulb, FaHeadset } from 'react-icons/fa';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const Services = () => {
  const { currentUser } = useAuth();
  const navigate = useNavigate();

  const services = [
  {
    title: "AI-Powered Legal Research",
    description: "Find relevant legal precedents and case law instantly with our AI-driven search, tailored specifically to Indian legal context.",
    icon: <FaSearch className="text-4xl mb-4 text-[#f3eee5]/80" />,
    features: ["Supreme Court & High Court cases", "Context-aware search", "Citation suggestions"]
  },
  {
    title: "IPC Section Finder",
    description: "Quickly identify relevant Indian Penal Code sections applicable to your case scenario with our intelligent search algorithm.",
    icon: <FaGavel className="text-4xl mb-4 text-[#f3eee5]/80" />,
    features: ["Scenario-based search", "Section explanations", "Related precedents"]
  },
  {
    title: "Legal Document Analysis",
    description: "Upload and analyze legal documents to extract key insights, arguments, and citations with our advanced AI tools.",
    icon: <FaFileAlt className="text-4xl mb-4 text-[#f3eee5]/80" />,
    features: ["Document summarization", "Key argument extraction", "Citation linking"]
  },
  {
    title: "Legal News",
    description: "Stay updated with the latest legal news and updates from around the world.",
    icon: <FaNewspaper className="text-4xl mb-4 text-[#f3eee5]/80" />,
    features: ["Daily updates", "In-depth analysis", "Expert opinions"]
  },
  {
    title: "Legal Insights",
    description: "Gain valuable insights and analysis on various legal topics and trends.",
    icon: <FaLightbulb className="text-4xl mb-4 text-[#f3eee5]/80" />,
    features: ["Expert articles", "Case studies", "Trend analysis"]
  },
  {
    title: "24/7 Support",
    description: "Get round-the-clock support for all your legal research and analysis needs.",
    icon: <FaHeadset className="text-4xl mb-4 text-[#f3eee5]/80" />,
    features: ["Live chat", "Email support", "Phone support"]
  }
];


  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.6 }
    }
  };

  const handleSearchNowClick = () => {
    // Navigate to dashboard if logged in, or signup page if not
    if (currentUser) {
      navigate('/dashboard');
    } else {
      navigate('/signup');
    }
  };

  return (
    <section className="bg-[#251c1a] text-[#f3eee5] py-20 px-6 relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-64 h-64 bg-[#f3eee5]/5 rounded-full -translate-x-1/2 -translate-y-1/2 blur-3xl"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#f3eee5]/5 rounded-full translate-x-1/3 translate-y-1/3 blur-3xl"></div>
      
      <div className="max-w-6xl mx-auto relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <span className="bg-[#f3eee5]/10 text-[#f3eee5] px-4 py-1.5 rounded-full text-sm font-medium inline-block mb-5">
            Our Expertise
          </span>
          <h2 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">Lawgic Services</h2>
          <p className="text-lg text-[#f3eee5]/80 max-w-3xl mx-auto leading-relaxed">
            We combine cutting-edge AI technology with comprehensive legal databases to 
            revolutionize how professionals access, analyze, and leverage legal information.
          </p>
        </motion.div>

        <motion.div 
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {services.map((service, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="bg-gradient-to-br from-[#f3eee5]/10 to-transparent backdrop-blur-sm p-8 rounded-2xl border border-[#f3eee5]/10 group hover:border-[#f3eee5]/30 transition-all duration-300"
              whileHover={{ 
                y: -8, 
                boxShadow: '0 20px 30px -10px rgba(0,0,0,0.2)',
                transition: { duration: 0.3 }
              }}
            >
              <div className="h-16 w-16 rounded-2xl bg-[#f3eee5]/10 flex items-center justify-center mb-6 group-hover:bg-[#f3eee5]/20 transition-colors duration-300">
                {service.icon}
              </div>
              <h3 className="text-2xl font-semibold mb-4 group-hover:text-[#f3eee5] transition-colors">
                {service.title}
              </h3>
              <p className="text-[#f3eee5]/70 mb-6 leading-relaxed">
                {service.description}
              </p>
              <ul className="space-y-2">
                {service.features.map((feature, idx) => (
                  <li key={idx} className="flex items-center text-sm text-[#f3eee5]/60">
                    <span className="h-1.5 w-1.5 rounded-full bg-[#f3eee5]/40 mr-2"></span>
                    {feature}
                  </li>
                ))}
              </ul>
              {/* Removed "Learn more" section */}
            </motion.div>
          ))}
        </motion.div>

        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 0.7 }}
          className="mt-16 text-center"
        >
          <button 
            onClick={handleSearchNowClick}
            className="inline-block bg-[#f3eee5] text-[#251c1a] px-8 py-4 rounded-lg font-semibold hover:bg-[#f3eee5]/90 transition-colors duration-300"
          >
            Search Now
          </button>
          <p className="text-[#f3eee5]/60 mt-4 text-sm">
            See how our AI-powered platform can transform your legal research workflow
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default Services;