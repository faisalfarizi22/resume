import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { motion, AnimatePresence } from 'framer-motion';
import { FaSun, FaMoon, FaBars, FaTimes, FaGlobe } from 'react-icons/fa';
import { SiEthereum } from 'react-icons/si';

interface NavbarProps {
  isDarkMode: boolean;
  toggleDarkMode: () => void;
  currentLanguage: string;
  toggleLanguage: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ 
  isDarkMode, 
  toggleDarkMode, 
  currentLanguage, 
  toggleLanguage 
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string>('home');
  const router = useRouter();

  useEffect(() => {
    if (router.pathname !== '/') return;
    
    const sectionIds = navItems.map(item => item.id);
    
    const observerOptions = {
      root: null,
      rootMargin: '-20% 0px -80% 0px',
      threshold: 0
    };
    
    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };
    
    const observer = new IntersectionObserver(observerCallback, observerOptions);
    
    sectionIds.forEach(id => {
      const element = document.getElementById(id);
      if (element) observer.observe(element);
    });
    
    return () => {
      sectionIds.forEach(id => {
        const element = document.getElementById(id);
        if (element) observer.unobserve(element);
      });
    };
  }, [router.pathname]);

  const navItems = [
    { name: currentLanguage === 'en' ? 'Home' : 'Beranda', id: 'home' },
    { name: currentLanguage === 'en' ? 'Skills' : 'Keahlian', id: 'skills' },
    { name: currentLanguage === 'en' ? 'Experience' : 'Pengalaman', id: 'experience' },
    { name: currentLanguage === 'en' ? 'Projects' : 'Proyek', id: 'projects' },
    { name: currentLanguage === 'en' ? 'About' : 'Tentang', id: 'selfTaught' },
    { name: currentLanguage === 'en' ? 'Contact' : 'Kontak', id: 'why-me' },
  ];
  
  
  const scrollToSection = (id: string): void => {
    const element = document.getElementById(id);
    if (element) {
      
      const navbar = document.querySelector('nav');
      const navbarHeight = navbar ? navbar.offsetHeight : 0;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - navbarHeight - 20;
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

    useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navbarVariants = {
    transparent: { 
      backgroundColor: 'rgba(10, 15, 24, 0)', 
      boxShadow: '0 0 0 rgba(0, 0, 0, 0)' 
    },
    solid: { 
      backgroundColor: 'rgba(10, 15, 24, 0.8)', 
      backdropFilter: 'blur(12px)',
      boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)' 
    }
  };

  const mobileMenuVariants = {
    closed: { 
      opacity: 0, 
      y: -20,
      transition: { 
        duration: 0.2 
      } 
    },
    open: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.2 
      } 
    }
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <motion.nav 
      className={`fixed w-full top-0 left-0 z-50 py-4 px-6 lg:px-12 transition-all duration-300`}
      initial="transparent"
      animate={isScrolled ? "solid" : "transparent"}
      variants={navbarVariants}
    >
      <div className="container mx-auto flex justify-center items-center">
        <div className="hidden md:flex items-center gap-8">
        {navItems.map((item) => (
          <button
              key={item.id}
              onClick={() => scrollToSection(item.id)}
              className={`text-sm hover:text-teal-400 transition-colors ${
              router.pathname === '/' && activeSection === item.id
                  ? 'text-teal-400 font-medium' 
                  : 'text-neutral-300'
              }`}
          >
              {item.name}
          </button>
        ))}
        </div>
      </div>

        <div className="flex justify-end items-end">
          <motion.button
            onClick={toggleMobileMenu}
            className="md:hidden p-2 rounded-full bg-neutral-800/50 text-neutral-300 hover:text-teal-400 transition-colors"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
          >
            {isMobileMenuOpen ? <FaTimes /> : <FaBars />}
          </motion.button>
        </div>
        
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            className="md:hidden absolute top-full left-0 w-full bg-neutral-900/95 backdrop-blur-lg py-4 px-6 border-t border-neutral-800"
            initial="closed"
            animate="open"
            exit="closed"
            variants={mobileMenuVariants}
          >
            <ul className="flex flex-col gap-4">
            {navItems.map((item) => (
            <li key={item.id}>
                <button
                className={`block py-2 px-4 rounded-lg ${
                    router.pathname === '/' && activeSection === item.id
                    ? 'bg-teal-400/10 text-teal-400 font-medium' 
                    : 'text-neutral-300 hover:bg-neutral-800/50'
                } transition-colors`}
                onClick={() => {
                    scrollToSection(item.id);
                    setIsMobileMenuOpen(false);
                }}
                >
                {item.name}
                </button>
            </li>
            ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;