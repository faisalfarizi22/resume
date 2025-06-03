import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from './Navbar';

interface LayoutProps {
  children: React.ReactNode;
  title?: string;
  description?: string;
}

const Layout: React.FC<LayoutProps> = ({ 
  children, 
  title = 'Faisal Alfarizi | Blockchain & Web3 Engineer', 
  description = 'Blockchain & Web3 Engineer Portfolio' 
}) => {
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [currentLanguage, setCurrentLanguage] = useState('en');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const savedMode = localStorage.getItem('darkMode');
    if (savedMode) {
      setIsDarkMode(savedMode === 'true');
    }

    const savedLanguage = localStorage.getItem('language');
    if (savedLanguage) {
      setCurrentLanguage(savedLanguage);
    }

    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  const toggleDarkMode = () => {
    const newMode = !isDarkMode;
    setIsDarkMode(newMode);
    localStorage.setItem('darkMode', String(newMode));
    
    if (newMode) {
      document.body.classList.add('dark-mode');
      document.body.classList.remove('light-mode');
    } else {
      document.body.classList.add('light-mode');
      document.body.classList.remove('dark-mode');
    }
  };

  const toggleLanguage = () => {
    const newLanguage = currentLanguage === 'en' ? 'id' : 'en';
    setCurrentLanguage(newLanguage);
    localStorage.setItem('language', newLanguage);
  };

  const loadingVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { duration: 0.5 }
    },
    exit: { 
      opacity: 0,
      transition: { duration: 0.5 }
    }
  };

  const contentVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        duration: 0.5,
        delay: 0.2
      }
    }
  };

  return (
    <div className={`min-h-screen ${isDarkMode ? 'dark-theme' : 'light-theme'}`}>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <AnimatePresence mode="wait">
        {isLoading ? (
          <motion.div 
            key="loading"
            className="fixed inset-0 bg-neutral-900 flex items-center justify-center z-50"
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={loadingVariants}
          >
            <div className="loading-animation">
              <div className="ethereum-diamond">
                <svg width="80" height="80" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 1.75L5.75 12.25L12 16L18.25 12.25L12 1.75Z" className="animate-pulse-ethereum-1" fill="#14b8a6" />
                  <path d="M12 16L5.75 12.25L12 22.25L18.25 12.25L12 16Z" className="animate-pulse-ethereum-2" fill="#0d9488" />
                </svg>
              </div>
              <p className="mt-4 text-teal-400 font-medium">Loading...</p>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="content"
            initial="hidden"
            animate="visible"
            variants={contentVariants}
            className="flex flex-col min-h-screen"
          >
            <Navbar 
              isDarkMode={isDarkMode} 
              toggleDarkMode={toggleDarkMode} 
              currentLanguage={currentLanguage} 
              toggleLanguage={toggleLanguage} 
            /> 
            
            
            <main className="flex-grow pt-20">
              {children}
            </main>
            
            <footer className="py-8 text-center text-neutral-500 border-t border-neutral-800/50">
              <div className="container mx-auto px-6">
                <p className="cursor-default hover-text-gradient">© 2025 Faisal Alfarizi. All rights reserved.</p>
              </div>
            </footer>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Layout;