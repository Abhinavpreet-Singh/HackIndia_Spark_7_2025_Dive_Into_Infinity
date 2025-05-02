import React from 'react';
import { motion } from 'framer-motion';
import { FaGavel, FaShieldAlt, FaFileAlt, FaCheckCircle, FaRegHandshake } from 'react-icons/fa';
import Footer from '../components/Footer';

const Terms = () => {
  // Scroll to top on page load
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  
  // Animation variants
  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  const staggerContainer = {
    initial: { opacity: 0 },
    animate: { 
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.3
      }
    }
  };
  
  const staggerItem = {
    initial: { opacity: 0, y: 15 },
    animate: { opacity: 1, y: 0 }
  };

  return (
    <>
      <div className="pt-28 md:pt-32 pb-20 bg-gradient-to-b from-[#f9f6f1] to-[#f3eee5]/50 min-h-screen">
        <div className="max-w-4xl mx-auto px-6">
          {/* Header */}
          <motion.div 
            className="text-center mb-16"
            initial="initial"
            animate="animate"
            variants={fadeIn}
          >
            <div className="flex justify-center">
              <div className="w-20 h-20 rounded-full bg-[#251c1a] flex items-center justify-center mb-8 shadow-lg">
                <FaFileAlt className="text-3xl text-[#f3eee5]" />
              </div>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#251c1a] mb-6 tracking-tight">
              Terms of Service
            </h1>
            <p className="text-[#251c1a]/70 text-xl max-w-2xl mx-auto leading-relaxed">
              Please read these terms carefully before using the Lawgic platform. By accessing or using our service, you agree to be bound by these terms.
            </p>
            <div className="mt-10 flex justify-center items-center space-x-3 text-sm text-[#251c1a]/60 bg-[#251c1a]/5 py-2 px-5 rounded-full w-max mx-auto">
              <FaRegHandshake className="text-[#251c1a]/60" />
              <span>Last Updated:</span>
              <span className="font-medium">May 2, 2025</span>
            </div>
          </motion.div>

          {/* Content */}
          <motion.div 
            className="prose prose-lg max-w-none text-[#251c1a]/80 bg-white p-10 md:p-14 rounded-2xl shadow-md border border-[#251c1a]/5"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.8 }}
          >
            <motion.div variants={staggerContainer} initial="initial" animate="animate">
              <motion.section variants={staggerItem} className="mb-12">
                <h2 className="text-2xl md:text-3xl font-semibold text-[#251c1a] flex items-center gap-3 pb-2 border-b border-[#251c1a]/10">
                  <span className="h-8 w-8 rounded-full bg-[#251c1a]/10 flex items-center justify-center text-[#251c1a]">1</span>
                  Acceptance of Terms
                </h2>
                <p className="mt-5 text-lg leading-relaxed">
                  By accessing or using the Lawgic platform, website, or any applications (collectively, the "Service") made available by Lawgic ("we", "us", or "our"), you agree to be bound by these Terms of Service ("Terms"). If you disagree with any part of the terms, you do not have permission to access the Service.
                </p>
              </motion.section>

              <motion.section variants={staggerItem} className="mb-12">
                <h2 className="text-2xl md:text-3xl font-semibold text-[#251c1a] flex items-center gap-3 pb-2 border-b border-[#251c1a]/10">
                  <span className="h-8 w-8 rounded-full bg-[#251c1a]/10 flex items-center justify-center text-[#251c1a]">2</span>
                  Description of Service
                </h2>
                <p className="mt-5 text-lg leading-relaxed">
                  Lawgic provides an AI-powered legal research and assistance platform that includes case analysis, document summarization, IPC section finder, and other related services. We reserve the right to modify, suspend or discontinue any aspect of the Service at any time.
                </p>
              </motion.section>

              <motion.section variants={staggerItem} className="mb-12">
                <h2 className="text-2xl md:text-3xl font-semibold text-[#251c1a] flex items-center gap-3 pb-2 border-b border-[#251c1a]/10">
                  <span className="h-8 w-8 rounded-full bg-[#251c1a]/10 flex items-center justify-center text-[#251c1a]">3</span>
                  User Accounts
                </h2>
                <div className="mt-5 space-y-5 text-lg leading-relaxed">
                  <p>
                    When you create an account with us, you must provide information that is accurate, complete, and current at all times. Failure to do so constitutes a breach of the Terms, which may result in immediate termination of your account.
                  </p>
                  <p>
                    You are responsible for safeguarding the password that you use to access the Service and for any activities or actions under your password. You agree not to disclose your password to any third party. You must notify us immediately upon becoming aware of any breach of security or unauthorized use of your account.
                  </p>
                </div>
              </motion.section>

              <motion.section variants={staggerItem} className="mb-12">
                <h2 className="text-2xl md:text-3xl font-semibold text-[#251c1a] flex items-center gap-3 pb-2 border-b border-[#251c1a]/10">
                  <span className="h-8 w-8 rounded-full bg-[#251c1a]/10 flex items-center justify-center text-[#251c1a]">4</span>
                  Intellectual Property
                </h2>
                <p className="mt-5 text-lg leading-relaxed">
                  The Service and its original content, features, and functionality are and will remain the exclusive property of Lawgic and its licensors. The Service is protected by copyright, trademark, and other laws of both India and foreign countries. Our trademarks and trade dress may not be used in connection with any product or service without the prior written consent of Lawgic.
                </p>
              </motion.section>

              <motion.section variants={staggerItem} className="mb-12">
                <h2 className="text-2xl md:text-3xl font-semibold text-[#251c1a] flex items-center gap-3 pb-2 border-b border-[#251c1a]/10">
                  <span className="h-8 w-8 rounded-full bg-[#251c1a]/10 flex items-center justify-center text-[#251c1a]">5</span>
                  User Content
                </h2>
                <div className="mt-5 space-y-5 text-lg leading-relaxed">
                  <p>
                    Our Service allows you to post, link, store, share and otherwise make available certain information, text, graphics, videos, or other material ("Content"). You are responsible for the Content that you post to the Service, including its legality, reliability, and appropriateness.
                  </p>
                  <p>
                    By posting Content to the Service, you grant us the right and license to use, modify, perform, display, reproduce, and distribute such Content on and through the Service. You retain any and all of your rights to any Content you submit, post or display on or through the Service and you are responsible for protecting those rights.
                  </p>
                </div>
              </motion.section>

              <motion.section variants={staggerItem} className="mb-12">
                <h2 className="text-2xl md:text-3xl font-semibold text-[#251c1a] flex items-center gap-3 pb-2 border-b border-[#251c1a]/10">
                  <span className="h-8 w-8 rounded-full bg-[#251c1a]/10 flex items-center justify-center text-[#251c1a]">6</span>
                  Limitation of Liability
                </h2>
                <p className="mt-5 text-lg leading-relaxed">
                  In no event shall Lawgic, nor its directors, employees, partners, agents, suppliers, or affiliates, be liable for any indirect, incidental, special, consequential or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from (i) your access to or use of or inability to access or use the Service; (ii) any conduct or content of any third party on the Service; (iii) any content obtained from the Service; and (iv) unauthorized access, use or alteration of your transmissions or content, whether based on warranty, contract, tort (including negligence) or any other legal theory, whether or not we have been informed of the possibility of such damage.
                </p>
              </motion.section>

              <motion.section variants={staggerItem} className="mb-12">
                <h2 className="text-2xl md:text-3xl font-semibold text-[#251c1a] flex items-center gap-3 pb-2 border-b border-[#251c1a]/10">
                  <span className="h-8 w-8 rounded-full bg-[#251c1a]/10 flex items-center justify-center text-[#251c1a]">7</span>
                  Disclaimer
                </h2>
                <div className="mt-5 space-y-5 text-lg leading-relaxed">
                  <p>
                    Your use of the Service is at your sole risk. The Service is provided on an "AS IS" and "AS AVAILABLE" basis. The Service is provided without warranties of any kind, whether express or implied, including, but not limited to, implied warranties of merchantability, fitness for a particular purpose, non-infringement or course of performance.
                  </p>
                  <p>
                    Lawgic, its subsidiaries, affiliates, and its licensors do not warrant that a) the Service will function uninterrupted, secure or available at any particular time or location; b) any errors or defects will be corrected; c) the Service is free of viruses or other harmful components; or d) the results of using the Service will meet your requirements.
                  </p>
                </div>
              </motion.section>

              <motion.section variants={staggerItem} className="mb-12">
                <h2 className="text-2xl md:text-3xl font-semibold text-[#251c1a] flex items-center gap-3 pb-2 border-b border-[#251c1a]/10">
                  <span className="h-8 w-8 rounded-full bg-[#251c1a]/10 flex items-center justify-center text-[#251c1a]">8</span>
                  Legal Disclaimer
                </h2>
                <div className="mt-5 space-y-5 text-lg leading-relaxed">
                  <p>
                    Lawgic is not a law firm and does not provide legal services, legal advice, or legal representation. The information provided through our Service is for general informational purposes only and should not be construed as professional legal advice. You should consult with a qualified legal professional for advice regarding your specific situation.
                  </p>
                  <p>
                    AI-generated content and analysis may contain errors or inaccuracies. Always verify any legal information with official sources or consult with a licensed attorney for professional advice.
                  </p>
                </div>
              </motion.section>

              <motion.section variants={staggerItem} className="mb-12">
                <h2 className="text-2xl md:text-3xl font-semibold text-[#251c1a] flex items-center gap-3 pb-2 border-b border-[#251c1a]/10">
                  <span className="h-8 w-8 rounded-full bg-[#251c1a]/10 flex items-center justify-center text-[#251c1a]">9</span>
                  Governing Law
                </h2>
                <p className="mt-5 text-lg leading-relaxed">
                  These Terms shall be governed and construed in accordance with the laws of India, without regard to its conflict of law provisions. Our failure to enforce any right or provision of these Terms will not be considered a waiver of those rights.
                </p>
              </motion.section>

              <motion.section variants={staggerItem} className="mb-12">
                <h2 className="text-2xl md:text-3xl font-semibold text-[#251c1a] flex items-center gap-3 pb-2 border-b border-[#251c1a]/10">
                  <span className="h-8 w-8 rounded-full bg-[#251c1a]/10 flex items-center justify-center text-[#251c1a]">10</span>
                  Changes to Terms
                </h2>
                <div className="mt-5 space-y-5 text-lg leading-relaxed">
                  <p>
                    We reserve the right, at our sole discretion, to modify or replace these Terms at any time. If a revision is material, we will try to provide at least 30 days' notice prior to any new terms taking effect. What constitutes a material change will be determined at our sole discretion.
                  </p>
                  <p>
                    By continuing to access or use our Service after those revisions become effective, you agree to be bound by the revised terms. If you do not agree to the new terms, please stop using the Service.
                  </p>
                </div>
              </motion.section>

              <motion.section variants={staggerItem}>
                <h2 className="text-2xl md:text-3xl font-semibold text-[#251c1a] flex items-center gap-3 pb-2 border-b border-[#251c1a]/10">
                  <span className="h-8 w-8 rounded-full bg-[#251c1a]/10 flex items-center justify-center text-[#251c1a]">11</span>
                  Contact Us
                </h2>
                <div className="mt-5 text-lg leading-relaxed">
                  <p>
                    If you have any questions about these Terms, please contact us at:
                  </p>
                  <div className="mt-4 p-5 bg-[#251c1a]/5 rounded-lg flex flex-col md:flex-row md:items-center gap-3 md:gap-8">
                    <FaCheckCircle className="text-[#251c1a] text-xl" />
                    <span className="font-medium text-[#251c1a]">support@lawgic.com</span>
                  </div>
                </div>
              </motion.section>
            </motion.div>
            
            {/* Call to Action */}
            <motion.div 
              className="mt-16 p-6 bg-gradient-to-r from-[#251c1a] to-[#382a26] rounded-xl text-center text-[#f3eee5] shadow-lg"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <h3 className="text-xl font-semibold mb-3">Ready to experience Lawgic?</h3>
              <p className="mb-5 opacity-90">Access AI-powered legal research tools and much more</p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a href="/" className="px-6 py-2 bg-[#f3eee5] text-[#251c1a] rounded-md font-medium hover:bg-[#f3eee5]/90 transition-colors">
                  Return to Homepage
                </a>
                <a href="/signup" className="px-6 py-2 bg-transparent border border-[#f3eee5]/50 text-[#f3eee5] rounded-md font-medium hover:bg-[#f3eee5]/10 transition-colors">
                  Create an Account
                </a>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Terms;