// frontend/src/components/AnimatedPageWrapper.js
import React from 'react';
import { motion } from 'framer-motion';

const AnimatedPageWrapper = ({ children }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5 }}
      style={{ padding: '20px' }}  // additional styling if needed
    >
      {children}
    </motion.div>
  );
};

export default AnimatedPageWrapper;
