'use client'

import React from 'react'
import { motion } from 'motion/react'
import { cn } from '@/lib/utils'

export const GridBeam: React.FC<{ children: React.ReactNode; className?: string }> = ({
  children,
  className
}) => (
  <div className={cn('relative w-full h-full', className)}>
    <Beam />
    <Beam className="rotate-180 opacity-60" delay={1} />
    <Beam className="absolute bottom-0 right-0 rotate-90" delay={0.5} />
    {children}
  </div>
)

export const Beam = ({ className, delay = 0 }: { className?: string; delay?: number }) => {
  return (
    <svg
      width="156"
      height="63"
      viewBox="0 0 156 63"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn("absolute top-0 left-0 ml-24 mt-8", className)}
    >
      <path
        d="M31 .5h32M0 .5h32m30 31h32m-1 0h32m-1 31h32M62.5 32V0m62 63V31"
        stroke="url(#grad1)"
        strokeWidth={1.5}
      />
      <defs>
        <motion.linearGradient
          variants={{
            initial: {
              x1: '40%',
              x2: '50%',
              y1: '160%',
              y2: '180%'
            },
            animate: {
              x1: '0%',
              x2: '10%',
              y1: '-40%',
              y2: '-20%'
            }
          }}
          animate="animate"
          initial="initial"
          transition={{
            duration: 1.8,
            repeat: Infinity,
            repeatType: 'loop',
            ease: 'linear',
            repeatDelay: 2,
            delay: delay
          }}
          id="grad1"
        >
          <stop stopColor="#22c55e" stopOpacity="0" />
          <stop stopColor="#22c55e" />
          <stop offset="0.325" stopColor="#10b981" />
          <stop offset="1" stopColor="#059669" stopOpacity="0" />
        </motion.linearGradient>
      </defs>
    </svg>
  )
}