'use client';

import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

export interface Pad {
  id: string;
  keyLabel: string;
  soundName: string;
  keyboardKey: string;
  soundFile?: string;
}

interface DrumPadProps {
  pad: Pad;
  onTrigger: (pad: Pad) => void;
  isActive: boolean;
}

export default function DrumPad({ pad, onTrigger, isActive }: DrumPadProps) {
  const glowVariants = {
    active: {
      boxShadow: '0 0 25px 5px rgba(16, 185, 129, 0.6)',
      scale: 1.02,
      backgroundColor: 'rgba(16, 185, 129, 0.15)',
    },
    inactive: {
      boxShadow: '0 0 0px 0px rgba(16, 185, 129, 0)',
      scale: 1,
      backgroundColor: 'rgba(0, 0, 0, 0.3)',
    },
  };

  return (
    <motion.button
      layout
      onClick={() => onTrigger(pad)}
      whileTap={{ scale: 0.95 }}
      animate={isActive ? 'active' : 'inactive'}
      variants={glowVariants}
      transition={{ duration: 0.05 }}
      className={cn(
        'relative aspect-square rounded-xl flex items-end justify-start p-3 sm:p-4',
        'backdrop-blur-md border border-white/20',
        'text-white font-mono transition-all duration-100',
        'focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-neutral-900 focus:ring-emerald-500',
        'hover:border-emerald-500/50'
      )}
    >
      <div className="flex flex-col text-left">
        <span className="text-xl sm:text-2xl font-bold">{pad.keyLabel}</span>
        <span className="text-xs sm:text-sm text-white/60 mt-1">{pad.soundName}</span>
      </div>
    </motion.button>
  );
}