import React from 'react';
import { motion } from 'framer-motion';
import { FaCalendarAlt, FaCheckCircle } from 'react-icons/fa';

interface ExperienceCardProps {
  title: string;
  period: string;
  description: string;
  achievements: string[];
}

const ExperienceCard: React.FC<ExperienceCardProps> = ({ title, period, description, achievements }) => {
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
    hidden: { opacity: 0, x: -20 },
    show: { opacity: 1, x: 0 }
  };

  return (
    <motion.div 
      className="glass-panel rounded-xl overflow-hidden"
      whileHover={{ 
        boxShadow: "0 0 20px rgba(20, 184, 166, 0.15)",
        y: -5
      }}
      transition={{ duration: 0.3 }}
    >
      <div className="p-6 border-b border-neutral-700/30">
        <h4 className="text-xl font-bold text-white mb-2">{title}</h4>
        <div className="flex items-center text-neutral-400 mb-4">
          <FaCalendarAlt className="mr-2 text-teal-400" />
          <span>{period}</span>
        </div>
        <p className="text-neutral-300">{description}</p>
      </div>
      <motion.div 
        className="p-6"
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
      >
        <h5 className="text-md font-semibold text-white mb-4">Key Achievements:</h5>
        <motion.ul className="space-y-3">
          {achievements.map((achievement: string, index: number) => (
            <motion.li 
              key={index} 
              className="flex gap-3 text-neutral-300"
              variants={item}
            >
              <FaCheckCircle className="text-teal-400 mt-1 flex-shrink-0" />
              <span>{achievement}</span>
            </motion.li>
          ))}
        </motion.ul>
      </motion.div>
    </motion.div>
  );
};

export default ExperienceCard;