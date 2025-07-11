'use client';
import { motion, useInView } from 'motion/react';
import * as React from 'react';

interface BlurInProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}
 
export const BlurIn = ({ children, className = '', delay = 0 }: BlurInProps) => {
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true });
  return (
    <motion.div
      ref={ref}
      initial={{ filter: 'blur(20px)', opacity: 0 }}
      animate={isInView ? { filter: 'blur(0px)', opacity: 1 } : {}}
      transition={{ duration: 0.6, delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
};