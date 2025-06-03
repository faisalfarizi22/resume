import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  SiSolidity, SiEthereum, SiWeb3Dotjs, SiEthers, SiReact, 
  SiNextdotjs, SiTypescript, SiJavascript, SiNodedotjs, SiExpress, 
  SiMongodb, SiGraphql, SiTailwindcss, SiGit, SiDocker, SiIpfs
} from 'react-icons/si';
import { FaCode, FaLayerGroup, FaNetworkWired, FaShieldAlt, FaHardHat } from 'react-icons/fa';

interface TechStack {
  id: string;
  name: string;
  category: 'blockchain' | 'frontend' | 'backend' | 'infrastructure';
  icon: React.ReactNode;
  proficiency: number; // 1-5
  description: string;
  color: string;
}

const techStackData: TechStack[] = [
  {
    id: 'solidity',
    name: 'Solidity',
    category: 'blockchain',
    icon: <SiSolidity />,
    proficiency: 5,
    description: 'Smart contract development language for Ethereum and EVM-compatible chains',
    color: 'text-blue-400'
  },
  {
    id: 'ethers',
    name: 'Ethers.js',
    category: 'blockchain',
    icon: <SiEthers />,
    proficiency: 4,
    description: 'Library for interacting with the Ethereum blockchain and its ecosystem',
    color: 'text-purple-400'
  },
  {
    id: 'web3',
    name: 'Web3.js',
    category: 'blockchain',
    icon: <SiWeb3Dotjs />,
    proficiency: 4,
    description: 'Collection of libraries that allow interaction with Ethereum nodes',
    color: 'text-orange-400'
  },
  {
    id: 'hardhat',
    name: 'Hardhat',
    category: 'blockchain',
    icon: <FaHardHat />,
    proficiency: 5,
    description: 'Development environment for Ethereum software, including debugging, testing, and deployment',
    color: 'text-yellow-400'
  },
  {
    id: 'ethereum',
    name: 'Ethereum',
    category: 'blockchain',
    icon: <SiEthereum />,
    proficiency: 5,
    description: 'Blockchain platform with smart contract functionality',
    color: 'text-teal-400'
  },
  {
    id: 'ipfs',
    name: 'IPFS',
    category: 'blockchain',
    icon: <SiIpfs />,
    proficiency: 3,
    description: 'Distributed system for storing and accessing files, websites, applications, and data',
    color: 'text-cyan-400'
  },
  
  {
    id: 'react',
    name: 'React',
    category: 'frontend',
    icon: <SiReact />,
    proficiency: 5,
    description: 'JavaScript library for building user interfaces',
    color: 'text-blue-400'
  },
  {
    id: 'nextjs',
    name: 'Next.js',
    category: 'frontend',
    icon: <SiNextdotjs />,
    proficiency: 4,
    description: 'React framework for production that enables server-side rendering and static site generation',
    color: 'text-neutral-300'
  },
  {
    id: 'typescript',
    name: 'TypeScript',
    category: 'frontend',
    icon: <SiTypescript />,
    proficiency: 4,
    description: 'Strongly typed programming language that builds on JavaScript',
    color: 'text-blue-500'
  },
  {
    id: 'javascript',
    name: 'JavaScript',
    category: 'frontend',
    icon: <SiJavascript />,
    proficiency: 5,
    description: 'High-level programming language for web development',
    color: 'text-yellow-400'
  },
  {
    id: 'tailwind',
    name: 'TailwindCSS',
    category: 'frontend',
    icon: <SiTailwindcss />,
    proficiency: 4,
    description: 'Utility-first CSS framework for rapid UI development',
    color: 'text-teal-400'
  },
  
  {
    id: 'nodejs',
    name: 'Node.js',
    category: 'backend',
    icon: <SiNodedotjs />,
    proficiency: 4,
    description: 'JavaScript runtime built on Chrome\'s V8 JavaScript engine',
    color: 'text-green-500'
  },
  {
    id: 'express',
    name: 'Express',
    category: 'backend',
    icon: <SiExpress />,
    proficiency: 4,
    description: 'Web application framework for Node.js',
    color: 'text-neutral-400'
  },
  {
    id: 'mongodb',
    name: 'MongoDB',
    category: 'backend',
    icon: <SiMongodb />,
    proficiency: 3,
    description: 'NoSQL database program that uses JSON-like documents',
    color: 'text-green-500'
  },
  {
    id: 'graphql',
    name: 'GraphQL',
    category: 'backend',
    icon: <SiGraphql />,
    proficiency: 3,
    description: 'Query language for APIs and a runtime for executing those queries',
    color: 'text-pink-500'
  },
  
  {
    id: 'git',
    name: 'Git',
    category: 'infrastructure',
    icon: <SiGit />,
    proficiency: 4,
    description: 'Distributed version control system',
    color: 'text-orange-500'
  },
  {
    id: 'docker',
    name: 'Docker',
    category: 'infrastructure',
    icon: <SiDocker />,
    proficiency: 3,
    description: 'Platform for developing, shipping, and running applications in containers',
    color: 'text-blue-500'
  },
];

const TechStackVisualization: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [selectedTech, setSelectedTech] = useState<TechStack | null>(null);

  const filteredTechStack = activeCategory === 'all' 
    ? techStackData 
    : techStackData.filter(tech => tech.category === activeCategory);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.4, type: "spring" }
    }
  };

  const categoryColors = {
    blockchain: 'from-teal-500/10 to-blue-500/10 border-teal-500/30',
    frontend: 'from-blue-500/10 to-indigo-500/10 border-blue-500/30',
    backend: 'from-green-500/10 to-emerald-500/10 border-green-500/30',
    infrastructure: 'from-orange-500/10 to-amber-500/10 border-orange-500/30'
  };

  const categoryIcons = {
    blockchain: <SiEthereum className="mr-2" />,
    frontend: <FaLayerGroup className="mr-2" />,
    backend: <FaNetworkWired className="mr-2" />,
    infrastructure: <FaShieldAlt className="mr-2" />
  };

  const getProficiencyText = (level: number) => {
    switch(level) {
      case 1: return 'Basic';
      case 2: return 'Intermediate';
      case 3: return 'Advanced';
      case 4: return 'Expert';
      case 5: return 'Master';
      default: return 'Unknown';
    }
  };

  useEffect(() => {
    if (selectedTech && !filteredTechStack.find(tech => tech.id === selectedTech.id)) {
      setSelectedTech(null);
    }
  }, [activeCategory, filteredTechStack, selectedTech]);

  return (
    <motion.section 
      id="tech-stack" 
      className="section py-16"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      variants={containerVariants}
    >
      <div className="container mx-auto px-6 lg:px-12">
        <motion.div className="section-header text-center mb-12" variants={itemVariants}>
          <div className="section-icon flex justify-center rotate-on-hover">
            <FaCode />
          </div>
          <h3 className="section-title">Tech Stack</h3>
          <p className="text-neutral-400 max-w-2xl mx-auto mt-4">
            Explore the technologies I work with to build decentralized applications and Web3 solutions.
          </p>
        </motion.div>

        <motion.div className="flex flex-wrap justify-center gap-4 mb-12" variants={itemVariants}>
          <button
            onClick={() => setActiveCategory('all')}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all flex items-center ${
              activeCategory === 'all' 
                ? 'bg-teal-400/20 text-teal-400 border border-teal-400/30' 
                : 'bg-neutral-800/50 text-neutral-400 hover:bg-neutral-700/50'
            }`}
          >
            All Technologies
          </button>
          <button
            onClick={() => setActiveCategory('blockchain')}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all flex items-center ${
              activeCategory === 'blockchain' 
                ? 'bg-teal-400/20 text-teal-400 border border-teal-400/30' 
                : 'bg-neutral-800/50 text-neutral-400 hover:bg-neutral-700/50'
            }`}
          >
            {categoryIcons.blockchain} Blockchain
          </button>
          <button
            onClick={() => setActiveCategory('frontend')}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all flex items-center ${
              activeCategory === 'frontend' 
                ? 'bg-blue-400/20 text-blue-400 border border-blue-400/30' 
                : 'bg-neutral-800/50 text-neutral-400 hover:bg-neutral-700/50'
            }`}
          >
            {categoryIcons.frontend} Frontend
          </button>
          <button
            onClick={() => setActiveCategory('backend')}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all flex items-center ${
              activeCategory === 'backend' 
                ? 'bg-green-400/20 text-green-400 border border-green-400/30' 
                : 'bg-neutral-800/50 text-neutral-400 hover:bg-neutral-700/50'
            }`}
          >
            {categoryIcons.backend} Backend
          </button>
          <button
            onClick={() => setActiveCategory('infrastructure')}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all flex items-center ${
              activeCategory === 'infrastructure' 
                ? 'bg-orange-400/20 text-orange-400 border border-orange-400/30' 
                : 'bg-neutral-800/50 text-neutral-400 hover:bg-neutral-700/50'
            }`}
          >
            {categoryIcons.infrastructure} Infrastructure
          </button>
        </motion.div>

        <motion.div 
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6"
          variants={containerVariants}
        >
          {filteredTechStack.map((tech) => (
            <motion.div
              key={tech.id}
              className={`glass-panel p-4 rounded-xl flex flex-col items-center text-center cursor-pointer hover-glow bg-gradient-to-br ${categoryColors[tech.category]}`}
              variants={itemVariants}
              initial="hidden" 
              animate="visible"
              whileHover={{ y: -5, scale: 1.02 }}
              onClick={() => setSelectedTech(tech)}
              layout 
            >
              <div className={`text-4xl mb-3 ${tech.color}`}>
                {tech.icon}
              </div>
              <h4 className="font-bold text-white">{tech.name}</h4>
              <div className="mt-2 flex">
                {[...Array(5)].map((_, i) => (
                  <div 
                    key={i} 
                    className={`w-2 h-2 rounded-full mx-0.5 ${
                      i < tech.proficiency ? tech.color : 'bg-neutral-700'
                    }`}
                  />
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>

        {selectedTech && (
          <motion.div 
            className="fixed inset-0 bg-black/70 flex items-center justify-center p-4 z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedTech(null)}
          >
            <motion.div 
              className="glass-panel p-6 md:p-8 rounded-xl max-w-md w-full bg-gradient-to-br from-neutral-900/90 to-neutral-800/90"
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-start mb-6">
                <div className={`text-5xl mr-4 ${selectedTech.color}`}>
                  {selectedTech.icon}
                </div>
                <div>
                  <h4 className="text-2xl font-bold text-white mb-1">{selectedTech.name}</h4>
                  <div className="text-sm text-teal-400 bg-teal-400/10 inline-block px-2 py-1 rounded-full">
                    {selectedTech.category.charAt(0).toUpperCase() + selectedTech.category.slice(1)}
                  </div>
                </div>
              </div>
              
              <div className="mb-6">
                <h5 className="text-sm text-neutral-400 mb-2">PROFICIENCY</h5>
                <div className="flex items-center mb-1">
                  {[...Array(5)].map((_, i) => (
                    <div 
                      key={i} 
                      className={`w-8 h-2 rounded-full mr-1 ${
                        i < selectedTech.proficiency 
                          ? i === 4 ? 'bg-gradient-to-r from-teal-400 to-blue-400' : 'bg-teal-400' 
                          : 'bg-neutral-700'
                      }`}
                    />
                  ))}
                </div>
                <div className="text-white font-medium">
                  {getProficiencyText(selectedTech.proficiency)}
                </div>
              </div>
              
              <div className="mb-6">
                <h5 className="text-sm text-neutral-400 mb-2">DESCRIPTION</h5>
                <p className="text-neutral-300">{selectedTech.description}</p>
              </div>
              
              <button 
                className="w-full py-2 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-white transition-colors"
                onClick={() => setSelectedTech(null)}
              >
                Close
              </button>
            </motion.div>
          </motion.div>
        )}
      </div>
    </motion.section>
  );
};

export default TechStackVisualization;