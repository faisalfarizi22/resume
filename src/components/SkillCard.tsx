import React, { ReactNode } from 'react';
import { motion } from 'framer-motion';

interface SkillCardProps {
  icon: ReactNode;
  title: string;
  skills: ReactNode[];
}

const SkillCard: React.FC<SkillCardProps> = ({ icon, title, skills }) => {
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
      className="bg-gradient-to-br from-neutral-800/60 to-neutral-900/60 border border-neutral-700/30 rounded-xl overflow-hidden h-full"
      whileHover={{ 
        boxShadow: "0 0 20px rgba(20, 184, 166, 0.15)",
        borderColor: "rgba(20, 184, 166, 0.3)"
      }}
      transition={{ duration: 0.3 }}
    >
      <div className="p-6 border-b border-neutral-700/30">
        <div className="flex items-center gap-3">
          <div className="text-teal-400 text-xl">{icon}</div>
          <h4 className="text-lg font-semibold text-white">{title}</h4>
        </div>
      </div>
      <motion.div 
        className="p-6"
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
      >
        <motion.ul className="space-y-3">
          {skills.map((skill, index) => (
            <motion.li 
              key={index} 
              className="flex items-center gap-2 text-neutral-300"
              variants={item}
            >
              {skill}
            </motion.li>
          ))}
        </motion.ul>
      </motion.div>
    </motion.div>
  );
};

export default SkillCard;