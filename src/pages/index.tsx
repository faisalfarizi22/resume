import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { AnimatePresence, motion, useScroll, useTransform } from 'framer-motion';
import { FaGithub, FaInstagram, FaHardHat, FaEnvelope, FaCode, FaBookOpen, FaLaptopCode, FaUserShield, FaPlug,
  FaDatabase, FaServer, FaCloud, FaGasPump, FaShieldAlt, FaLock, FaChevronDown, 
  FaLinkedinIn,
  FaTelegram} from 'react-icons/fa';
import { SiEthereum, SiReact, SiNextdotjs, SiTypescript, SiMongodb, SiDocker, SiSolidity, SiGraphql, 
  SiEthers, SiWeb3Dotjs, SiThirdweb, SiHtml5, SiCss3, SiTailwindcss, SiNodedotjs } from 'react-icons/si';
import SkillCard from '../components/SkillCard';
import ExperienceCard from '../components/ExperienceCard';
import ProjectCard from '../components/ProjectCard';
import WhyMeCard from '../components/WhymeCard';
import TechStackVisualization from '../components/TechStackVisualization';
import CodeSnippetsButton from '../components/CodeSnippetsButton';

declare global {
  interface Window {
    particlesJS: any;
  }
}

const ProfilePhoto = [
  '/profile/Profile (1).jpeg',
  '/profile/Profile (2).jpeg',
  '/profile/Profile (3).jpeg',
  '/profile/Profile (4).jpeg',
  '/profile/Profile (5).jpeg',
  '/profile/Profile (6).jpeg',
]

const HardhatIcon: React.FC = () => {
  return (
    <div style={{ position: 'relative', display: 'inline-block', width: '1.5em', height: '1.5em' }}>
      <FaHardHat style={{ color: '#14b8a6', width: '1.5em', height: '1.5em' }} />
      <SiEthereum style={{ position: 'absolute', bottom: 6, right: "0.39em", width: '0.75em', height: '0.75em', color: '#fff' }} />
    </div>
  );
};

const Home: React.FC = () => {
  const { scrollYProgress } = useScroll();
  const opacity = useTransform(scrollYProgress, [0, 0.1], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.1], [1, 0.95]);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  
  const floatingAnimation = {
    y: [0, -15, 0],
    transition: {
      duration: 4,
      repeat: Infinity,
      ease: "easeInOut"
    }
  };
  
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };
  
  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === ProfilePhoto.length - 1 ? 0 : prevIndex + 1
      );
    }, 2000); 
    return () => clearInterval(intervalId);
  }, []); 

  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 300);
    };
    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  useEffect(() => {
    setIsLoaded(true);
    
    const initParticles = () => {
      const particles = document.createElement('script');
      particles.src = 'https://cdnjs.cloudflare.com/ajax/libs/particles.js/2.0.0/particles.min.js';
      particles.onload = () => {
        if (window.particlesJS) {
          window.particlesJS('particles-js', {
            "particles": {
              "number": {
                "value": 40,
                "density": { "enable": true, "value_area": 800 }
              },
              "color": { "value": "#14b8a6" },
              "opacity": {
                "value": 0.3,
                "random": true
              },
              "size": {
                "value": 3,
                "random": true
              },
              "line_linked": {
                "enable": true,
                "distance": 150,
                "color": "#14b8a6",
                "opacity": 0.1,
                "width": 1
              },
              "move": {
                "enable": true,
                "speed": 0.5,
                "direction": "none",
                "random": true,
                "straight": false,
                "out_mode": "out",
                "bounce": false
              }
            },
            "interactivity": {
              "detect_on": "canvas",
              "events": {
                "onhover": {
                  "enable": true,
                  "mode": "grab"
                },
                "onclick": {
                  "enable": true,
                  "mode": "push"
                },
                "resize": true
              },
              "modes": {
                "grab": {
                  "distance": 140,
                  "line_linked": { "opacity": 0.5 }
                },
                "push": { "particles_nb": 4 }
              }
            },
            "retina_detect": true
          });
        }
      };
      document.body.appendChild(particles);
    };
    
    initParticles();
  }, []);
  
  const scrollToSection = (id: string): void => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="overflow-x-hidden">
      <div id="particles-js" className="fixed inset-0 z-0 pointer-events-none"></div>
      <div className="grid-bg"></div>

      <motion.div 
        id="home"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="relative z-10"
      >
        <motion.header 
          style={{ opacity, scale }}
          className="sticky-header mb-20"
        >
          <div className="container mx-auto px-6 lg:px-12">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
              <motion.div
                initial={{ x: -50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.8 }}
              >
                <h1 className="text-4xl md:text-6xl font-bold text-gradient animate-gradient">
                  Faisal Alfarizi
                </h1>
                <h2 className="text-xl md:text-2xl mt-3 text-neutral-200 font-light">
                  Blockchain & Web3 Specialist | Full-Stack Developer
                </h2>
                <div className="flex items-center gap-3 mt-3 text-neutral-400">
                  <span className="flex items-center gap-1">
                    <span className="inline-block w-2 h-2 rounded-full bg-green-400 animate-pulse"></span>
                    Remote
                  </span>
                  <span className="inline-block w-1 h-1 rounded-full bg-neutral-600"></span>
                  <span>Open for Contract & Freelance</span>
                </div>
              </motion.div>
              <motion.div 
                className="flex gap-4"
                initial={{ x: 50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                <a href="mailto:faisal.alfariziak@gmail.com" className="social-icon-link hover-float">
                  <FaEnvelope className="w-5 h-5" />
                </a>
                <a href="https://github.com/faisalfarizi22" target="_blank" rel="noopener noreferrer" className="social-icon-link hover-float">
                  <FaGithub className="w-5 h-5" />
                </a>
                <a href="https://t.me/beurchef" target="_blank" rel="noopener noreferrer" className="social-icon-link hover-float">
                  <FaTelegram className="w-5 h-5" />
                </a>
              </motion.div>
            </div>
          </div>
        </motion.header>

        <motion.section 
          className="py-24 relative"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          <div className="container mx-auto px-6 lg:px-12">
            <div className="glass-panel p-8 md:p-12 rounded-2xl hover-glow">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2">
                  <h3 className="text-2xl font-bold mb-6 flex items-center gap-3">
                    <div className="section-icon rotate-on-hover">
                      <SiEthereum />
                    </div>
                    <span>Driving Innovation with Blockchain & Web3 Solutions</span>
                  </h3>
                  <motion.p 
                    className="text-neutral-300 leading-relaxed mb-4"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5, duration: 0.8 }}
                  >
                    As a dedicated <span className="text-highlight font-medium">Web3 Developer and Blockchain Enthusiast</span>, I specialize in crafting <span className="text-highlight font-medium">Smart Contracts, Tokens, NFTs,</span> and a variety of <span className="text-highlight font-medium">Decentralized Applications (dApps)</span>. My project experience includes <span className="text-highlight font-medium">DEX AMMs, Oracle Integrations, NFT Marketplaces, and Lending Protocols</span>.
                  </motion.p>
                  <motion.p 
                    className="text-neutral-300 leading-relaxed mb-6"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.7, duration: 0.8 }}
                  >
                    My journey into blockchain, beginning with active market participation and testnet involvement, has equipped me with deep conceptual understanding and practical insights. I am committed to leveraging this technology to build robust and innovative decentralized solutions.
                  </motion.p>

                  <motion.div 
                    className="flex flex-wrap gap-3 mt-8"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.9, duration: 0.8 }}
                  >
                    <button onClick={() => scrollToSection('contact')} className="btn-primary">
                      Get in Touch
                    </button>
                    <button onClick={() => scrollToSection('projects')} className="btn-secondary">
                      View Projects
                    </button>
                  </motion.div>
                </div>
                <div className="hidden lg:block">
                  <div className="relative p-6 rounded-xl bg-gradient-to-tr from-blue-500/20 to-teal-500/20 border border-neutral-700/50 h-full flex items-center justify-center backdrop-blur-sm overflow-hidden">
                    <AnimatePresence>
                      <motion.div
                        key={ProfilePhoto[currentIndex]} 
                        initial={{ opacity: 0, scale: 1.05 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        transition={{ duration: 0.8, ease: "easeInOut" }}
                        className="absolute inset-0" 
                      >
                        <Image
                          src={ProfilePhoto[currentIndex]}
                          alt="Foto profil Faisal Alfarizi"
                          layout="fill"
                          objectFit="cover" 
                          className="rounded-xl" 
                        />
                      </motion.div>
                    </AnimatePresence>
                  </div>
                </div>
              </div>
            </div>
            
            <motion.div 
              className="flex justify-center mt-12"
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <button onClick={() => scrollToSection('skills')} className="text-neutral-400 hover:text-teal-400 transition-colors">
                <FaChevronDown className="w-6 h-6" />
              </button>
            </motion.div>
          </div>
        </motion.section>

        <motion.section 
          id="skills" 
          className="section"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          variants={container}
        >
          <div className="container mx-auto px-6 lg:px-12">
            <motion.div className="section-header" variants={item}>
              <div className="section-icon rotate-on-hover">
                <FaLaptopCode />
              </div>
              <h3 className="section-title">Technical Skills</h3>
            </motion.div>
            <motion.div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" variants={container}>
              <motion.div variants={item}>
                <SkillCard
                  icon={<SiSolidity className="skill-icon" />}
                  title="Blockchain & Smart Contracts"
                  skills={[
                    <div key="solidity" className="flex items-center gap-1">
                      <SiSolidity className="skill-icon" />
                      <span>Solidity</span>
                    </div>,
                    <div key="ethers" className="flex items-center gap-1">
                      <SiEthers className="skill-icon" />
                      <span>Ethers.js</span>
                    </div>,
                    <div key="web3" className="flex items-center gap-1">
                      <SiWeb3Dotjs className="skill-icon" />
                      <span>web3.js</span>
                    </div>,
                    <div key="hardhat" className="flex items-center gap-1">
                      <HardhatIcon />
                      <span>Hardhat</span>
                    </div>,
                    <div key="thirdweb" className="flex items-center gap-1">
                      <SiThirdweb className="skill-icon" />
                      <span>Thirdweb</span>
                    </div>
                  ]}
                />
              </motion.div>
              <motion.div variants={item}>
                <SkillCard
                  icon={<SiReact className="skill-icon" />}
                  title="Frontend Development"
                  skills={[
                    <div key="react" className="flex items-center gap-1">
                      <SiReact className="skill-icon" />
                      <span>React</span>
                    </div>,
                    <div key="next" className="flex items-center gap-1">
                      <SiNextdotjs className="skill-icon" />
                      <span>Next.js</span>
                    </div>,
                    <div key="html" className="flex items-center gap-1">
                      <SiHtml5 className="skill-icon" />
                      <span>HTML</span>
                    </div>,
                    <div key="css" className="flex items-center gap-1">
                      <SiCss3 className="skill-icon" />
                      <span>CSS</span>
                    </div>,
                    <div key="tailwind" className="flex items-center gap-1">
                      <SiTailwindcss className="skill-icon" />
                      <span>Tailwindcss</span>
                    </div>,
                    <div key="typescript" className="flex items-center gap-1">
                      <SiTypescript className="skill-icon" />
                      <span>TypeScript</span>
                    </div>
                  ]}
                />
              </motion.div>
              <motion.div variants={item}>
                <SkillCard
                  icon={<SiNodedotjs className="skill-icon" />}
                  title="Backend & API"
                  skills={[
                    <div key="node" className="flex items-center gap-1">
                      <SiNodedotjs className="skill-icon" />
                      <span>Node.js</span>
                    </div>,
                    <div key="auth" className="flex items-center gap-1">
                      <FaUserShield className="skill-icon" />
                      <span>Authentication</span>
                    </div>,
                    <div key="api" className="flex items-center gap-1">
                      <FaPlug className="skill-icon" />
                      <span>API Integration</span>
                    </div>,
                    <div key="rest" className="flex items-center gap-1">
                      <FaServer className="skill-icon" />
                      <span>RESTful APIs</span>
                    </div>
                  ]}
                />
              </motion.div>
              <motion.div variants={item}>
                <SkillCard
                  icon={<SiGraphql className="skill-icon" />}
                  title="Graph Protocol & Subgraph"
                  skills={[
                    <div key="subgraph" className="flex items-center gap-1">
                      <SiGraphql className="skill-icon" />
                      <span>Subgraph</span>
                    </div>,
                    <div key="graphql" className="flex items-center gap-1">
                      <SiGraphql className="skill-icon" />
                      <span>GraphQL</span>
                    </div>,
                    <div key="data" className="flex items-center gap-1">
                      <FaDatabase className="skill-icon" />
                      <span>Data Indexing</span>
                    </div>
                  ]}
                />
              </motion.div>
              <motion.div variants={item}>
                <SkillCard
                  icon={<SiMongodb className="skill-icon" />}
                  title="NoSQL Databases"
                  skills={[
                    <div key="mongodb" className="flex items-center gap-1">
                      <SiMongodb className="skill-icon" />
                      <span>MongoDB</span>
                    </div>,
                    <div key="mongoose" className="flex items-center gap-1">
                      <FaDatabase className="skill-icon" />
                      <span>Mongoose</span>
                    </div>,
                    <div key="atlas" className="flex items-center gap-1">
                      <FaCloud className="skill-icon" />
                      <span>Atlas</span>
                    </div>
                  ]}
                />
              </motion.div>
              <motion.div variants={item}>
                <SkillCard
                  icon={<SiDocker className="skill-icon" />}
                  title="Infrastructure, DevOps"
                  skills={[
                    <div key="github" className="flex items-center gap-1">
                      <FaGithub className="skill-icon" />
                      <span>GitHub</span>
                    </div>,
                    <div key="docker" className="flex items-center gap-1">
                      <SiDocker className="skill-icon" />
                      <span>Docker</span>
                    </div>,
                    <div key="vps" className="flex items-center gap-1">
                      <FaServer className="skill-icon" />
                      <span>VPS</span>
                    </div>
                  ]}
                />
              </motion.div>
              <motion.div className="lg:col-start-2" variants={item}>
                <SkillCard
                  icon={<FaCode className="skill-icon" />}
                  title="Security & Best Practices"
                  skills={[
                    <div key="gas" className="flex items-center gap-1">
                      <FaGasPump className="skill-icon" />
                      <span>Gas Optimization</span>
                    </div>,
                    <div key="auditing" className="flex items-center gap-1">
                      <FaShieldAlt className="skill-icon" />
                      <span>Auditing Principles</span>
                    </div>,
                    <div key="smartSecurity" className="flex items-center gap-1">
                      <FaLock className="skill-icon" />
                      <span>Smart Contract Security</span>
                    </div>
                  ]}
                />
              </motion.div>
            </motion.div>
          </div>
        </motion.section>

        <TechStackVisualization />

        <motion.section 
          id="experience" 
          className="section"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          variants={container}
        >
          <div className="container mx-auto px-6 lg:px-12">
            <motion.div className="section-header" variants={item}>
              <div className="section-icon rotate-on-hover">
                <FaCode />
              </div>
              <h3 className="section-title">Related Experience</h3>
            </motion.div>
            <motion.div className="space-y-8" variants={container}>
              <motion.div variants={item}>
                <ExperienceCard
                  title="Independent Web3 Developer & Project Lead"
                  period="2024 – Present"
                  description="Focused on developing Web3 applications through personal projects and hands-on experiments."
                  achievements={[
                    "Successfully designed, developed, and deployed multiple smart contracts on EVM-compatible.",
                    "Engineered and integrated responsive frontend interfaces for dApps using Next.js, Ethers.js, and TypeScript, ensuring seamless user interaction with smart contracts.",
                    "Utilized Hardhat as a framework for smart contract development and testing."
                  ]}
                />
              </motion.div>
              <motion.div variants={item}>
                <ExperienceCard
                  title="Blockchain Exploration & Foundational Learning"
                  period="2017 – Present"
                  description="Deepened understanding of blockchain technology through active participation in the crypto ecosystem, including trading (DEX/CEX), testnet contributions, and node management. This period laid the groundwork for practical Web3 development."
                  achievements={[
                    "Gained practical experience with DeFi protocols and tokenomics through active trading and yield farming on various platforms.",
                    "Contributed to multiple testnet projects, providing feedback and identifying potential issues, which enhanced understanding of dApp lifecycles.",
                    "Successfully set up and maintained nodes for different blockchain networks, contributing to network decentralization and stability."
                  ]}
                />
              </motion.div>
            </motion.div>
          </div>
        </motion.section>

        <motion.section 
          id="projects" 
          className="section"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          variants={container}
        >
          <div className="container mx-auto px-6 lg:px-12">
            <motion.div className="section-header" variants={item}>
              <div className="section-icon rotate-on-hover">
                <FaCode />
              </div>
              <h3 className="section-title">Portfolio Highlights</h3>
            </motion.div>
            <motion.div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" variants={container}>
              <motion.div variants={item} whileHover={{ scale: 1.03 }} transition={{ type: "spring", stiffness: 300 }}>
                <ProjectCard
                  title="MultiChainGM"
                  description="MultiChainGM is an advanced MultiChain platform that transforms blockchain interactions through innovative daily engagement protocols ensuring secure and seamless user experiences."
                  repoLink="https://github.com/faisalfarizi22/MultiChainGM"
                  demoLink="https://app.multichaingm.com"
                />
              </motion.div>
              <motion.div variants={item} whileHover={{ scale: 1.03 }} transition={{ type: "spring", stiffness: 300 }}>
                <ProjectCard
                  title="GmTea"
                  description="GMTea is an advanced on-chain platform that transforms blockchain interactions through innovative daily engagement protocols ensuring secure and seamless user experiences."
                  repoLink="https://github.com/faisalfarizi22/gmTea.github.io"
                  demoLink="https://gmtea.multichaingm.com"
                />
              </motion.div>
              <motion.div variants={item} whileHover={{ scale: 1.03 }} transition={{ type: "spring", stiffness: 300 }}>
                <ProjectCard
                  title="NeoL"
                  description="Earn rewards for community engagement by completing daily tasks and climbing the leaderboard within the Neo community. Users must mint NFT NeoL to participate in daily check-ins and tasks, and they can share referral links to instantly earn rewards."
                  repoLink="https://github.com/faisalfarizi22/NeoL"
                  demoLink="https://neo-l.vercel.app"
                />
              </motion.div>
              <motion.div variants={item} whileHover={{ scale: 1.03 }} transition={{ type: "spring", stiffness: 300 }}>
                <ProjectCard
                  title="Oracle Integration"
                  description="A project integrating off-chain data into smart contracts, enabling real-world applications through reliable data feeds."
                  repoLink="https://github.com/faisalfarizi22/Oracle-Integration"
                  demoLink="https://oracle-integration.vercel.app"
                />
              </motion.div>
            </motion.div>
          </div>
        </motion.section>

        <CodeSnippetsButton />

        <motion.section 
          id="selfTaught" 
          className="section"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div className="container mx-auto px-6 lg:px-12">
            <motion.div className="section-header text-center">
              <div className="section-icon flex justify-center rotate-on-hover">
                <FaBookOpen />
              </div>
              <h3 className="section-title">My Learning Philosophy & Drive</h3>
            </motion.div>
            <motion.div 
              className="text-neutral-300 leading-relaxed text-center typewriter-container"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.8 }}
            >
              I am a <span className="text-highlight font-medium">proactive and self-motivated developer</span> with a passion for continuous learning, particularly in the dynamic fields of blockchain and Web3. My approach involves <span className="text-highlight font-medium">hands-on project development and in-depth independent research</span> to master new technologies and solve real-world challenges. This dedication to self-improvement has enabled me to build a robust technical foundation and deliver innovative solutions, as demonstrated in my portfolio. I thrive on exploring cutting-edge technologies and applying them to create impactful decentralized applications.
            </motion.div>
          </div>
        </motion.section>

        <motion.section 
          id="why-me" 
          className="section"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          variants={container}
        >
          <div className="container mx-auto px-6 lg:px-12">
            <motion.div className="section-header" variants={item}>
              <div className="section-icon rotate-on-hover">
                <FaCode />
              </div>
              <h3 className="section-title">What I Bring to Your Project</h3>
            </motion.div>
            <motion.div 
              className="glass-panel p-8 rounded-2xl hover-glow"
              variants={item}
            >
              <motion.div className="grid grid-cols-1 md:grid-cols-3 gap-6" variants={container}>
                <motion.div variants={item} whileHover={{ scale: 1.05 }} transition={{ type: "spring", stiffness: 300 }}>
                  <WhyMeCard
                    emoji="🔥"
                    title="Passionate & Driven Web3 Developer"
                    description=" Deeply enthusiastic about blockchain technology, I am constantly exploring new advancements and applying them to build innovative Web3 projects with a proactive, self-starter mindset."
                  />
                </motion.div>
                <motion.div variants={item} whileHover={{ scale: 1.05 }} transition={{ type: "spring", stiffness: 300 }}>
                  <WhyMeCard
                    emoji="💡"
                    title="Pragmatic Problem-Solver & Adaptable Learner"
                    description="My self-directed learning journey has honed my ability to quickly grasp complex technical concepts, adapt to new challenges, and find effective, practical solutions."
                  />
                </motion.div>
                <motion.div variants={item} whileHover={{ scale: 1.05 }} transition={{ type: "spring", stiffness: 300 }}>
                  <WhyMeCard
                    emoji="🔗"
                    title="Versatile Full-Stack & Blockchain Expertise"
                    description="portfolio showcases diverse Web3 projects, from DEXs to NFT platforms, reflecting my capability to handle both smart contract development and full-stack dApp creation with creativity and dedication."
                  />
                </motion.div>
              </motion.div>
            </motion.div>
          </div>
        </motion.section>

        <motion.section 
          id="contact" 
          className="section"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          variants={container}
        >
          <div className="container mx-auto px-6 lg:px-12">
            <motion.div className="section-header" variants={item}>
              <div className="section-icon rotate-on-hover">
                <FaEnvelope />
              </div>
              <h3 className="section-title">Let's Connect & Build Together!</h3>
            </motion.div>
            <motion.div 
              className="glass-panel p-8 rounded-2xl hover-glow"
              variants={item}
            >
              <motion.div 
                className="flex flex-wrap gap-4 justify-center"
                variants={container}
              >
                <motion.a 
                  href="mailto:faisal.alfariziak@gmail.com" 
                  className="contact-button"
                  variants={item}
                  whileHover={{ scale: 1.05, backgroundColor: "rgba(20, 184, 166, 0.2)" }}
                >
                  <FaEnvelope className="text-teal-400" />
                  <span>Email</span>
                </motion.a>
                <motion.a 
                  href="https://github.com/faisalfarizi22" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="contact-button"
                  variants={item}
                  whileHover={{ scale: 1.05, backgroundColor: "rgba(20, 184, 166, 0.2)" }}
                >
                  <FaGithub className="text-teal-400" />
                  <span>GitHub</span>
                </motion.a>
                <motion.a 
                  href="https://t.me/beurchef" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="contact-button"
                  variants={item}
                  whileHover={{ scale: 1.05, backgroundColor: "rgba(20, 184, 166, 0.2)" }}
                >
                  <FaTelegram className="text-teal-400" />
                  <span>Telegram</span>
                </motion.a>
              </motion.div>
            </motion.div>
          </div>
        </motion.section>
      </motion.div>

      {showBackToTop && (
        <motion.button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="back-to-top"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <FaChevronDown className="w-5 h-5 transform rotate-180" />
        </motion.button>
      )}
    </div>
  );
};

export default Home;