"use client";

import { useEffect, useMemo, useRef } from "react";

interface TextFlipProps {
  words: string[];
  className?: string;
  prefix?: string;
}

export default function TextFlip({ words, className = "", prefix = "" }: TextFlipProps) {
  const tallestRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (tallestRef.current) {
      let maxHeight = 0;

      words.forEach((word) => {
        const span = document.createElement("span");
        span.className = "absolute opacity-0";
        span.textContent = word;
        tallestRef.current?.appendChild(span);
        const height = span.offsetHeight;
        tallestRef.current?.removeChild(span);

        if (height > maxHeight) {
          maxHeight = height;
        }
      });

      tallestRef.current.style.height = `${maxHeight}px`;
    }
  }, [words]);

  return (
    <div className={`flex gap-4 font-bold ${className}`}>
      {prefix && <p className="text-white">{prefix}</p>}
      <div ref={tallestRef} className="relative flex flex-col overflow-hidden text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-400">
        {words.map((word, index) => (
          <span key={index} className={`animate-flip-words ${index === 0 ? '' : 'absolute'}`}>
            {word}
          </span>
        ))}
      </div>
    </div>
  );
}