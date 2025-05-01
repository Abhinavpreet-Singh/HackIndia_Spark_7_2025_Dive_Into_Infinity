import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  FaArrowLeft, FaBell, FaExternalLinkAlt, 
  FaRegFileAlt, FaGavel, FaNewspaper,
  FaBalanceScale, FaChevronDown, FaTimes,
  FaUpload, FaRegQuestionCircle, FaCheck,
  FaClock, FaSearch, FaRegLightbulb,
  FaBars
} from 'react-icons/fa';
import Loader from './Loader';

const Dashboard = () => {
  const [showMoreNews, setShowMoreNews] = useState(false);
  const [activeModal, setActiveModal] = useState(null);
  const [loading, setLoading] = useState(true);
  const [mobileMenu, setMobileMenu] = useState(false);
  
  // Model instructions with steps
  const modelInstructions = {
    chatbot: {
      title: "Lawgic Research Chatbot",
      description: "An AI-powered legal research assistant that helps you find relevant case law, statutes, and legal analysis.",
      steps: [
        {
          title: "Start your research",
          description: "Begin by typing your legal question or research topic in the chat box.",
          icon: <FaSearch />
        },
        {
          title: "Review the results",
          description: "The AI will provide relevant legal precedents, statutes, and analysis based on your query.",
          icon: <FaRegFileAlt />
        },
        {
          title: "Ask follow-up questions",
          description: "Refine your research by asking more specific questions about the information provided.",
          icon: <FaRegQuestionCircle />
        },
        {
          title: "Export your research",
          description: "Save your research session or export it as a formatted document for your records.",
          icon: <FaCheck />
        }
      ]
    },
    documentReader: {
      title: "Lawgic DocReader",
      description: "Upload and analyze legal documents to extract key information, generate summaries, and get answers to specific questions.",
      steps: [
        {
          title: "Upload your document",
          description: "Select and upload the legal document or case file you want to analyze. Only PDF format is supported.",
          icon: <FaUpload />
        },
        {
          title: "Processing",
          description: "Wait briefly while our AI analyzes and processes your document. The system will extract key information from your file.",
          icon: <FaClock />
        },
        {
          title: "Ask questions",
          description: "Once processed, ask specific questions about the document. The AI will provide answers based on the content of your file.",
          icon: <FaRegQuestionCircle />
        },
        {
          title: "Review summary",
          description: "Get a comprehensive summary of the document highlighting key points, legal principles, and important sections.",
          icon: <FaCheck />
        }
      ]
    },
    ipcFinder: {
      title: "Lawgic IPC Finder",
      description: "Quickly identify relevant Indian Penal Code sections for any legal scenario or case you're working on.",
      steps: [
        {
          title: "Describe the scenario",
          description: "Enter a description of the legal situation or offense you need to find IPC sections for.",
          icon: <FaSearch />
        },
        {
          title: "Review matching sections",
          description: "The AI will identify and display relevant IPC sections that apply to your scenario.",
          icon: <FaRegFileAlt />
        },
        {
          title: "Explore section details",
          description: "Click on any section to see the full text, explanations, and related case precedents.",
          icon: <FaRegQuestionCircle />
        },
        {
          title: "Save for reference",
          description: "Save or export the relevant sections for your case files or legal documentation.",
          icon: <FaCheck />
        }
      ]
    }
  };
  
  // Close modal handler
  const closeModal = () => {
    setActiveModal(null);
  };

  // Toggle mobile menu
  const toggleMobileMenu = () => {
    setMobileMenu(!mobileMenu);
  };

  // Simulate loading when component mounts
  useEffect(() => {
    // Set a timeout to simulate loading data
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1500);

    // Clean up the timer
    return () => clearTimeout(timer);
  }, []);

  // Close mobile menu on resize (if screen becomes larger)
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setMobileMenu(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  
  // Show loader while loading
  if (loading) {
    return <Loader />;
  }
  
  return (
    <div className="min-h-screen bg-[#f3eee5]">
      {/* Header */}
      <header className="bg-[#251c1a] text-white shadow-lg sticky top-0 z-30">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Link to="/" className="mr-4 hover:opacity-80 transition-opacity">
                <FaArrowLeft />
              </Link>
              <h1 className="text-xl font-bold">Lawgic Dashboard</h1>
            </div>
            
            {/* Mobile Menu Button */}
            <button 
              className="md:hidden text-[#f3eee5] focus:outline-none"
              onClick={toggleMobileMenu}
            >
              <FaBars size={20} />
            </button>
            
            {/* Desktop Nav */}
            <div className="hidden md:flex items-center space-x-3">
              <div className="relative">
                <FaBell className="text-[#f3eee5]/70 hover:text-[#f3eee5] transition-colors cursor-pointer" />
                <div className="absolute top-0 right-0 w-2 h-2 bg-[#c8a27c] rounded-full"></div>
              </div>
              
              <div className="h-8 w-8 rounded-full bg-[#c8a27c] flex items-center justify-center font-medium">
                RP
              </div>
            </div>
          </div>
          
          {/* Mobile Menu */}
          {mobileMenu && (
            <div className="md:hidden mt-3 pt-3 border-t border-[#f3eee5]/20 animate-fadeIn">
              <div className="flex items-center justify-between py-2">
                <span className="text-sm text-[#f3eee5]/90">Notifications</span>
                <div className="relative">
                  <FaBell className="text-[#f3eee5]/70" />
                  <div className="absolute top-0 right-0 w-2 h-2 bg-[#c8a27c] rounded-full"></div>
                </div>
              </div>
              <div className="flex items-center justify-between py-2">
                <span className="text-sm text-[#f3eee5]/90">Profile</span>
                <div className="h-6 w-6 rounded-full bg-[#c8a27c] flex items-center justify-center text-xs font-medium">
                  RP
                </div>
              </div>
            </div>
          )}
        </div>
      </header>
      
      {/* Main Content */}
      <main className="container mx-auto px-4 py-6">
        {/* AI Models Section */}
        <div className="mb-8">
          <h2 className="text-xl md:text-2xl font-bold text-[#251c1a] mb-6 pb-2 border-b-2 border-[#c8a27c]">
            AI Legal Assistants
          </h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Lawgic Research Chatbot */}
            <div className="bg-white rounded-xl shadow-md overflow-hidden transition-all duration-300 hover:shadow-xl hover:translate-y-[-5px]">
              <div className="h-28 sm:h-36 bg-gradient-to-r from-[#251c1a] to-[#3b2a25] flex items-center justify-center p-6">
                <div className="bg-[#f3eee5]/30 p-4 rounded-full">
                  <FaBalanceScale className="text-[#f3eee5] text-2xl sm:text-3xl" />
                </div>
              </div>
              <div className="p-4 sm:p-5">
                <h3 className="text-lg sm:text-xl font-semibold text-[#251c1a] mb-2 sm:mb-3">Lawgic Research Chatbot</h3>
                <p className="text-sm text-[#251c1a]/80 mb-3 sm:mb-4">
                  Intelligent assistant for legal research and case law analysis.
                </p>
                <div className="flex mb-4 sm:mb-5 flex-wrap gap-2">
                  <span className="bg-[#c8a27c]/20 text-[#251c1a] text-xs px-2 py-1 rounded">Research</span>
                  <span className="bg-[#c8a27c]/20 text-[#251c1a] text-xs px-2 py-1 rounded">Case Law</span>
                </div>
                <div className="flex space-x-2">
                  <button 
                    onClick={() => setActiveModal('chatbot')} 
                    className="flex-1 bg-[#f3eee5] text-[#251c1a] border border-[#c8a27c]/30 py-2 px-3 rounded-lg hover:bg-[#e8e2d9] transition-colors text-sm"
                  >
                    How It Works
                  </button>
                  <button className="flex-1 bg-[#251c1a] text-[#f3eee5] py-2 px-3 rounded-lg hover:bg-[#3b2a25] transition-colors text-sm">
                    Launch
                  </button>
                </div>
              </div>
            </div>

            {/* Lawgic DocReader */}
            <div className="bg-white rounded-xl shadow-md overflow-hidden transition-all duration-300 hover:shadow-xl hover:translate-y-[-5px]">
              <div className="h-28 sm:h-36 bg-gradient-to-r from-[#3b2a25] to-[#4e3730] flex items-center justify-center p-6">
                <div className="bg-[#f3eee5]/30 p-4 rounded-full">
                  <FaRegFileAlt className="text-[#f3eee5] text-2xl sm:text-3xl" />
                </div>
              </div>
              <div className="p-4 sm:p-5">
                <h3 className="text-lg sm:text-xl font-semibold text-[#251c1a] mb-2 sm:mb-3">Lawgic DocReader</h3>
                <p className="text-sm text-[#251c1a]/80 mb-3 sm:mb-4">
                  Extract insights and analyze legal documents automatically.
                </p>
                <div className="flex mb-4 sm:mb-5 flex-wrap gap-2">
                  <span className="bg-[#c8a27c]/20 text-[#251c1a] text-xs px-2 py-1 rounded">Documents</span>
                  <span className="bg-[#c8a27c]/20 text-[#251c1a] text-xs px-2 py-1 rounded">Analysis</span>
                </div>
                <div className="flex space-x-2">
                  <button 
                    onClick={() => setActiveModal('documentReader')} 
                    className="flex-1 bg-[#f3eee5] text-[#251c1a] border border-[#c8a27c]/30 py-2 px-3 rounded-lg hover:bg-[#e8e2d9] transition-colors text-sm"
                  >
                    How It Works
                  </button>
                  <a 
                    href="https://lawgic-case-doc-reader.onrender.com/" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="flex-1 bg-[#251c1a] text-[#f3eee5] py-2 px-3 rounded-lg hover:bg-[#3b2a25] transition-colors text-sm text-center"
                  >
                    Launch
                  </a>
                </div>
              </div>
            </div>

            {/* Lawgic IPC Finder */}
            <div className="bg-white rounded-xl shadow-md overflow-hidden transition-all duration-300 hover:shadow-xl hover:translate-y-[-5px] sm:col-span-2 lg:col-span-1">
              <div className="h-28 sm:h-36 bg-gradient-to-r from-[#4e3730] to-[#614639] flex items-center justify-center p-6">
                <div className="bg-[#f3eee5]/30 p-4 rounded-full">
                  <FaGavel className="text-[#f3eee5] text-2xl sm:text-3xl" />
                </div>
              </div>
              <div className="p-4 sm:p-5">
                <h3 className="text-lg sm:text-xl font-semibold text-[#251c1a] mb-2 sm:mb-3">Lawgic IPC Finder</h3>
                <p className="text-sm text-[#251c1a]/80 mb-3 sm:mb-4">
                  Quickly identify relevant Indian Penal Code sections.
                </p>
                <div className="flex mb-4 sm:mb-5 flex-wrap gap-2">
                  <span className="bg-[#c8a27c]/20 text-[#251c1a] text-xs px-2 py-1 rounded">IPC</span>
                  <span className="bg-[#c8a27c]/20 text-[#251c1a] text-xs px-2 py-1 rounded">Indian Law</span>
                </div>
                <div className="flex space-x-2">
                  <button 
                    onClick={() => setActiveModal('ipcFinder')} 
                    className="flex-1 bg-[#f3eee5] text-[#251c1a] border border-[#c8a27c]/30 py-2 px-3 rounded-lg hover:bg-[#e8e2d9] transition-colors text-sm"
                  >
                    How It Works
                  </button>
                  <button className="flex-1 bg-[#251c1a] text-[#f3eee5] py-2 px-3 rounded-lg hover:bg-[#3b2a25] transition-colors text-sm">
                    Launch
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Two Column Layout: News and Insights */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Legal News Column */}
          <div>
            <h2 className="text-xl md:text-2xl font-bold text-[#251c1a] mb-4 sm:mb-6 pb-2 border-b-2 border-[#c8a27c]">
              <FaNewspaper className="inline-block mr-2 text-[#c8a27c]" />
              Latest News
            </h2>
            
            <div className="space-y-4">
              <a href="https://www.barandbench.com/news/litigation/pahalgam-terror-attack-supreme-court-refuses-to-entertain-pil-for-probe" target="_blank" rel="noopener noreferrer" className="group block bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-all">
                <div className="h-28 sm:h-44 bg-cover bg-center relative" style={{backgroundImage: "url('https://cdnbbsr.s3waas.gov.in/s3ec0490f1f4972d133619a60c30f3559e/uploads/2023/12/2023121884.png'"}}>
                  <div className="absolute inset-0 bg-gradient-to-t from-[#251c1a]/80 to-transparent flex items-end">
                    <span className="inline-block px-3 py-1 m-3 text-xs bg-[#c8a27c] text-white rounded font-medium">Supreme Court</span>
                  </div>
                </div>
                <div className="p-4">
                  <div className="flex justify-between items-center mb-2">
                    <p className="text-xs text-[#c8a27c] font-medium">MAY 1, 2025</p>
                    <FaExternalLinkAlt className="text-xs text-[#251c1a]/50 group-hover:text-[#c8a27c] transition-colors" />
                  </div>
                  <h3 className="font-medium text-[#251c1a] mb-2 group-hover:text-[#c8a27c] transition-colors">Pahalgam Terror Attack: Supreme Court Refuses to Entertain PIL for Probe</h3>
                  <p className="text-sm text-[#251c1a]/70">The Supreme Court has refused to entertain a PIL seeking probe into the Pahalgam terror attack, stating it falls under the executive's domain. The Court advised the petitioner to approach appropriate authorities...</p>
                  <div className="mt-3 pt-3 border-t border-dashed border-[#c8a27c]/20">
                    <p className="text-xs text-[#251c1a]/50">Source: <a href="https://www.barandbench.com" target="_blank" rel="noopener noreferrer" className="text-[#c8a27c] hover:underline">Bar and Bench</a></p>
                  </div>
                </div>
              </a>
              
              <a href="https://lawtrend.in/delhi-hc-restrains-dda-from-taking-action-against-shahi-idgah-over-use-of-park-for-religious-event/" target="_blank" rel="noopener noreferrer" className="group block bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-all">
                <div className="p-4">
                  <div className="flex justify-between items-center mb-2">
                    <div className="flex items-center">
                      <span className="inline-block w-2 h-2 rounded-full bg-[#c8a27c] mr-2"></span>
                      <p className="text-xs text-[#c8a27c] font-medium">APR 30, 2025</p>
                    </div>
                    <FaExternalLinkAlt className="text-xs text-[#251c1a]/50 group-hover:text-[#c8a27c] transition-colors" />
                  </div>
                  <span className="inline-block px-2 py-1 text-xs bg-[#c8a27c]/10 text-[#c8a27c] rounded mb-2">Delhi High Court</span>
                  <h3 className="font-medium text-[#251c1a] mb-2 group-hover:text-[#c8a27c] transition-colors">Delhi HC Restrains DDA From Taking Action Against Shahi Idgah Over Use of Park</h3>
                  <p className="text-sm text-[#251c1a]/70">The Delhi High Court has restrained the Delhi Development Authority (DDA) from taking any coercive action against Shahi Idgah over the use of a park for a religious event. The court's interim order came after Shahi Idgah petitioned against DDA's notice...</p>
                  <div className="mt-3 pt-3 border-t border-dashed border-[#c8a27c]/20">
                    <p className="text-xs text-[#251c1a]/50">Source: <a href="https://lawtrend.in" target="_blank" rel="noopener noreferrer" className="text-[#c8a27c] hover:underline">Law Trend</a></p>
                  </div>
                </div>
              </a>
              
              <a href="https://www.verdictum.in/court-updates/supreme-court/federation-of-medical-and-sales-representatives-associations-of-india-dolo-650-generic-medicine-1575950" target="_blank" rel="noopener noreferrer" className="group block bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-all">
                <div className="p-4">
                  <div className="flex justify-between items-center mb-2">
                    <div className="flex items-center">
                      <span className="inline-block w-2 h-2 rounded-full bg-[#c8a27c] mr-2"></span>
                      <p className="text-xs text-[#c8a27c] font-medium">APR 29, 2025</p>
                    </div>
                    <FaExternalLinkAlt className="text-xs text-[#251c1a]/50 group-hover:text-[#c8a27c] transition-colors" />
                  </div>
                  <span className="inline-block px-2 py-1 text-xs bg-[#c8a27c]/10 text-[#c8a27c] rounded mb-2">Healthcare Law</span>
                  <h3 className="font-medium text-[#251c1a] mb-2 group-hover:text-[#c8a27c] transition-colors">Supreme Court Examines Rules Governing Generic Medicine Marketing</h3>
                  <p className="text-sm text-[#251c1a]/70">The Supreme Court is examining rules governing marketing practices for generic medicines following a petition by the Federation of Medical and Sales Representatives Associations of India related to Dolo 650 promotional practices...</p>
                  <div className="mt-3 pt-3 border-t border-dashed border-[#c8a27c]/20">
                    <p className="text-xs text-[#251c1a]/50">Source: <a href="https://www.verdictum.in" target="_blank" rel="noopener noreferrer" className="text-[#c8a27c] hover:underline">Verdictum</a></p>
                  </div>
                </div>
              </a>
              
              {/* More Legal News Toggle Button */}
              <button 
                onClick={() => setShowMoreNews(!showMoreNews)} 
                className="flex items-center justify-center w-full bg-[#f3eee5] hover:bg-[#e8e2d9] text-[#251c1a] border border-[#c8a27c]/30 rounded-lg py-2 text-sm transition-colors"
              >
                {showMoreNews ? 'Show Less' : 'More Updates'} 
                <FaChevronDown className={`ml-1 transition-transform ${showMoreNews ? 'rotate-180' : ''}`} />
              </button>
              
              {/* Additional News Articles that show when expanded */}
              {showMoreNews && (
                <div className="space-y-4 mt-4 animate-fadeIn">
                  <a href="https://www.verdictum.in/court-updates/high-courts/allahabad-high-court/reconsideration-of-dismissal-of-commissioner-set-aside-2025-ahc-lko-23735-db-union-of-india-v-kamlesh-kumar-1575949" target="_blank" rel="noopener noreferrer" className="group block bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-all">
                    <div className="p-4">
                      <div className="flex justify-between items-center mb-2">
                        <div className="flex items-center">
                          <span className="inline-block w-2 h-2 rounded-full bg-[#c8a27c] mr-2"></span>
                          <p className="text-xs text-[#c8a27c] font-medium">APR 28, 2025</p>
                        </div>
                        <FaExternalLinkAlt className="text-xs text-[#251c1a]/50 group-hover:text-[#c8a27c] transition-colors" />
                      </div>
                      <span className="inline-block px-2 py-1 text-xs bg-[#c8a27c]/10 text-[#c8a27c] rounded mb-2">Allahabad High Court</span>
                      <h3 className="font-medium text-[#251c1a] mb-2 group-hover:text-[#c8a27c] transition-colors">Allahabad HC: Reconsideration of Dismissal of Commissioner Set Aside</h3>
                      <p className="text-sm text-[#251c1a]/70">The Allahabad High Court has set aside the reconsideration of dismissal of a commissioner in a significant judgment in the case of Union of India v. Kamlesh Kumar. The Court emphasized proper procedural protocols in administrative cases...</p>
                      <div className="mt-3 pt-3 border-t border-dashed border-[#c8a27c]/20">
                        <p className="text-xs text-[#251c1a]/50">Source: <a href="https://www.verdictum.in" target="_blank" rel="noopener noreferrer" className="text-[#c8a27c] hover:underline">Verdictum</a></p>
                      </div>
                    </div>
                  </a>
                  
                  <a href="https://legal.economictimes.indiatimes.com/news/corporate-business/adani-settlement-pleas-delayed-by-sebis-review-of-processes/120755470" target="_blank" rel="noopener noreferrer" className="group block bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-all">
                    <div className="p-4">
                      <div className="flex justify-between items-center mb-2">
                        <div className="flex items-center">
                          <span className="inline-block w-2 h-2 rounded-full bg-[#c8a27c] mr-2"></span>
                          <p className="text-xs text-[#c8a27c] font-medium">APR 27, 2025</p>
                        </div>
                        <FaExternalLinkAlt className="text-xs text-[#251c1a]/50 group-hover:text-[#c8a27c] transition-colors" />
                      </div>
                      <span className="inline-block px-2 py-1 text-xs bg-[#c8a27c]/10 text-[#c8a27c] rounded mb-2">Corporate Law</span>
                      <h3 className="font-medium text-[#251c1a] mb-2 group-hover:text-[#c8a27c] transition-colors">Adani Settlement Pleas Delayed by SEBI's Review of Processes</h3>
                      <p className="text-sm text-[#251c1a]/70">The Securities and Exchange Board of India's ongoing review of its settlement processes has delayed Adani Group's settlement pleas. Legal experts suggest this indicates regulatory scrutiny over high-profile corporate governance cases...</p>
                      <div className="mt-3 pt-3 border-t border-dashed border-[#c8a27c]/20">
                        <p className="text-xs text-[#251c1a]/50">Source: <a href="https://legal.economictimes.indiatimes.com" target="_blank" rel="noopener noreferrer" className="text-[#c8a27c] hover:underline">ET Legal</a></p>
                      </div>
                    </div>
                  </a>
                </div>
              )}
            </div>
          </div>
          
          {/* Legal Insights Column */}
          <div>
            <h2 className="text-xl md:text-2xl font-bold text-[#251c1a] mb-4 sm:mb-6 pb-2 border-b-2 border-[#c8a27c]">
              <FaRegLightbulb className="inline-block mr-2 text-[#c8a27c]" />
              Legal Insights
            </h2>
            
            <div className="bg-white rounded-xl shadow-md overflow-hidden">
              <div className="p-5">
                <div className="space-y-6">
                  <div className="flex items-start border-b border-[#f3eee5] pb-6">
                    <div className="bg-[#c8a27c]/20 p-3 rounded-full mr-4 mt-1">
                      <FaRegLightbulb className="text-[#c8a27c] text-xl" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-[#251c1a] mb-2 text-lg">Legal Tech Adoption Rising</h4>
                      <p className="text-[#251c1a]/80 mb-3">Courts across India are increasingly adopting tech solutions, with 65% now offering virtual hearings. This shift is dramatically changing how legal proceedings are conducted.</p>
                      <div className="flex items-center text-[#c8a27c] text-sm">
                        <p>Tech Innovation Report</p>
                        <span className="mx-2">•</span>
                        <p>May 2025</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-start border-b border-[#f3eee5] pb-6">
                    <div className="bg-[#c8a27c]/20 p-3 rounded-full mr-4 mt-1">
                      <FaGavel className="text-[#c8a27c] text-xl" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-[#251c1a] mb-2 text-lg">Impact of AI on Case Outcomes</h4>
                      <p className="text-[#251c1a]/80 mb-3">Recent studies show that law firms using AI-driven legal research see a 27% improvement in case outcomes. The precision of AI tools is revolutionizing how legal professionals prepare their arguments.</p>
                      <div className="flex items-center text-[#c8a27c] text-sm">
                        <p>Legal AI Journal</p>
                        <span className="mx-2">•</span>
                        <p>April 2025</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="bg-[#c8a27c]/20 p-3 rounded-full mr-4 mt-1">
                      <FaBalanceScale className="text-[#c8a27c] text-xl" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-[#251c1a] mb-2 text-lg">Legal Document Analysis Trends</h4>
                      <p className="text-[#251c1a]/80 mb-3">Automated document analysis has reduced legal research time by an average of 70% while improving accuracy. Law firms report significant cost savings and faster client response times.</p>
                      <div className="flex items-center text-[#c8a27c] text-sm">
                        <p>Legal Practice Today</p>
                        <span className="mx-2">•</span>
                        <p>April 2025</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="mt-6 bg-gradient-to-r from-[#251c1a] to-[#3b2a25] rounded-xl p-5 text-white shadow-md">
              <h3 className="font-semibold text-xl mb-3">Weekly Legal Tip</h3>
              <p className="mb-4">When analyzing case precedents, focus on the court's reasoning rather than just the outcome. Understanding the judicial logic is crucial for effectively applying precedent to your current cases.</p>
              <div className="flex justify-between items-center text-sm text-[#f3eee5]/80">
                <p>Provided by Lawgic AI</p>
                <p>Updated Weekly</p>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      {/* Modal Overlays for AI Model Instructions */}
      {activeModal && (
        <div className="fixed inset-0 bg-[#251c1a]/70 flex items-center justify-center z-50 p-4 animate-fadeIn" onClick={closeModal}>
          <div 
            className="bg-[#f3eee5] rounded-2xl w-full max-w-4xl shadow-2xl max-h-[85vh] flex flex-col overflow-hidden" 
            onClick={(e) => e.stopPropagation()}
          >
            {/* Model info here based on activeModal */}
            {activeModal && (
              <>
                <div className="bg-gradient-to-r from-[#251c1a] to-[#3b2a25] p-5 sm:p-6 relative rounded-t-2xl">
                  <button 
                    onClick={closeModal} 
                    className="absolute top-4 right-4 text-white hover:text-[#c8a27c] transition-colors"
                    aria-label="Close"
                  >
                    <FaTimes size={20} />
                  </button>
                  <h2 className="text-xl sm:text-2xl font-bold text-white mb-2">
                    {modelInstructions[activeModal].title}
                  </h2>
                  <p className="text-[#f3eee5]/90 text-sm sm:text-base max-w-3xl">
                    {modelInstructions[activeModal].description}
                  </p>
                </div>
                
                <div className="p-5 sm:p-6 flex-1 overflow-y-auto">
                  <h3 className="text-lg sm:text-xl font-semibold text-[#251c1a] mb-4 pb-2 border-b border-[#c8a27c]/30">
                    How to use this tool
                  </h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6 mb-6">
                    {modelInstructions[activeModal].steps.map((step, index) => (
                      <div key={index} className="flex">
                        <div className="mr-4 mt-1 flex-shrink-0">
                          <div className="flex items-center justify-center w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-[#c8a27c] text-white font-semibold text-sm">
                            {index + 1}
                          </div>
                        </div>
                        <div>
                          <div className="flex items-center mb-1">
                            <div className="mr-2 text-[#c8a27c]">
                              {step.icon}
                            </div>
                            <h4 className="font-medium text-[#251c1a] text-sm sm:text-base">{step.title}</h4>
                          </div>
                          <p className="text-[#251c1a]/80 text-xs sm:text-sm">
                            {step.description}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="p-5 sm:p-6 border-t border-[#c8a27c]/20 bg-[#f9f6f1] flex justify-end rounded-b-2xl">
                  <a 
                    href={activeModal === 'documentReader' ? 'https://lawgic-case-doc-reader.onrender.com/' : '#'}

                    target={activeModal === 'documentReader' ? '_blank' : '_self'}
                    rel="noopener noreferrer"
                    className="bg-[#251c1a] text-white py-2 px-6 rounded-lg hover:bg-[#3b2a25] transition-colors text-sm sm:text-base font-medium flex items-center"
                  >
                    Launch Tool
                    <FaExternalLinkAlt className="ml-2" size={12} />
                  </a>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;