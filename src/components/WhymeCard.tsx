import React from 'react';
import { motion } from 'framer-motion';

interface WhyMeCardProps {
  emoji: string;
  title: string;
  description: string;
}

const WhyMeCard: React.FC<WhyMeCardProps> = ({ emoji, title, description }) => {
  return (
    <motion.div 
      className="bg-gradient-to-br from-neutral-800/60 to-neutral-900/60 border border-neutral-700/30 rounded-xl overflow-hidden h-full flex flex-col p-6"
      whileHover={{ 
        boxShadow: "0 0 20px rgba(20, 184, 166, 0.15)",
        borderColor: "rgba(20, 184, 166, 0.3)"
      }}
      transition={{ duration: 0.3 }}
    >
      <div className="emoji-container mb-4">
        <span className="text-4xl">{emoji}</span>
      </div>
      <h4 className="text-xl font-bold mb-3 text-gradient">{title}</h4>
      <p className="text-neutral-300">{description}</p>
    </motion.div>
  );
};

export default WhyMeCard;