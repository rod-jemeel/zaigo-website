"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import { useState, useEffect, useRef } from "react";
import { motion, useInView } from "motion/react";
import { ShineBorder } from "@/components/ui/shine-border";
import { RefreshCw } from "lucide-react";

export default function ValueProposition() {
  const [imageError, setImageError] = useState(false);
  const [terminalText, setTerminalText] = useState("");
  const [showContent, setShowContent] = useState(false);
  const [restartAnimation, setRestartAnimation] = useState(0);
  const [isToggled, setIsToggled] = useState(false);
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });
  
  const words = ["dreams", "ideas", "visions", "concepts", "ambitions"];

  // Word rotation effect
  useEffect(() => {
    if (!isInView) return;
    
    const interval = setInterval(() => {
      setCurrentWordIndex((prev) => (prev + 1) % words.length);
    }, 2000);

    return () => clearInterval(interval);
  }, [isInView, words.length]);

  useEffect(() => {
    if (!isInView) return;

    // Clear terminal text when restarting
    setTerminalText("");

    const commands = [
      { text: '$ zaigo analyze --problem="great ideas without support"', instant: true },
      { text: '\n> Scanning global startup ecosystem...', delay: 300 },
      { text: '\n> 🔍 92% of startups fail due to:', delay: 500 },
      { text: '\n    ❌ Lack of mentorship', delay: 100 },
      { text: '\n    ❌ No technical expertise', delay: 100 },
      { text: '\n    ❌ Limited resources', delay: 100 },
      { text: '\n\n$ zaigo deploy --solution', delay: 400 },
      { text: '\n> Initializing bridge protocol...', delay: 200 },
      { text: '\n> ✅ Global mentor network: ACTIVE', delay: 300 },
      { text: '\n> ✅ AI capabilities: LOADED', delay: 200 },
      { text: '\n> ✅ Revenue engines: READY', delay: 200 },
      { text: '\n\n$ echo "Gap = Bridged" | zaigo transform', delay: 400 },
      { text: '\n> 🚀 SUSTAINABLE BUSINESSES GENERATED', delay: 300 },
    ];

    let currentText = '';
    let commandIndex = 0;
    let charIndex = 0;
    let timeoutId: NodeJS.Timeout;

    const typeText = () => {
      if (commandIndex >= commands.length) {
        // Just hold the terminal, don't transition to content
        return;
      }

      const currentCommand = commands[commandIndex];
      
      if (currentCommand.instant || charIndex >= currentCommand.text.length) {
        currentText += currentCommand.instant ? currentCommand.text : currentCommand.text.slice(charIndex);
        setTerminalText(currentText);
        commandIndex++;
        charIndex = 0;
        
        timeoutId = setTimeout(typeText, currentCommand.delay || 50);
      } else {
        currentText += currentCommand.text[charIndex];
        setTerminalText(currentText);
        charIndex++;
        timeoutId = setTimeout(typeText, 30);
      }
    };

    timeoutId = setTimeout(typeText, 500);

    // Cleanup function to clear timeouts when component unmounts or restarts
    return () => {
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, [isInView, restartAnimation]);

  return (
    <section ref={sectionRef} className="relative overflow-hidden">
      {/* Space background image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/space-background.png"
          alt="Space background"
          fill
          className="object-cover"
          quality={100}
          priority
        />
        {/* Optional dark overlay to ensure text readability */}
        <div className="absolute inset-0 bg-black/30" />
      </div>
      
      <div className="relative z-10 py-32 sm:py-40 lg:py-48">
        <div className="mx-auto max-w-4xl px-6 sm:px-8 lg:px-12">
          {/* Section header with text flip */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="text-center mb-16"
          >
            <h2 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-white mb-6">
              We turn{" "}
              <motion.span
                key={currentWordIndex}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
                className="inline-block text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-400"
              >
                {words[currentWordIndex]}
              </motion.span>
              <br />
              into reality.
            </h2>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="text-xl sm:text-2xl text-gray-300 max-w-3xl mx-auto leading-relaxed"
            >
              Watch how we analyze, architect, and ship products that solve real problems. 
              No fluff. Just execution.
            </motion.p>
          </motion.div>
          
          {/* Space Video */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="w-full max-w-4xl mx-auto mb-12 rounded-2xl overflow-hidden"
          >
            <video
              src="/videos/space-higher.mp4"
              autoPlay
              loop
              muted
              playsInline
              className="w-full h-[300px] md:h-[400px] lg:h-[500px] object-cover"
            />
          </motion.div>
          
          <div className="flex flex-col justify-center items-center min-h-[500px]">
            {/* Terminal animation - centered and persistent */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="relative bg-gray-900 rounded-lg p-8 font-mono text-sm w-full max-w-3xl shadow-2xl overflow-hidden"
            >
              {/* Shine Border */}
              <ShineBorder
                borderWidth={2}
                duration={10}
                shineColor={["#22c55e", "#10b981", "#059669"]}
              />
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-500 shadow-sm" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500 shadow-sm" />
                  <div className="w-3 h-3 rounded-full bg-green-500 shadow-sm" />
                  <span className="ml-3 text-gray-400 text-xs">zaigo@bridge-builder ~ </span>
                </div>
                
                {/* Restart Toggle */}
                <button
                  onClick={() => {
                    setIsToggled(true);
                    setRestartAnimation(prev => prev + 1);
                    // Auto-reset toggle after animation
                    setTimeout(() => setIsToggled(false), 600);
                  }}
                  className="inline-flex items-center cursor-pointer group"
                >
                  <div className="relative">
                    <div className="block w-14 h-8 bg-gray-800 rounded-full shadow-inner transition-colors group-hover:bg-gray-700" 
                         style={{
                           boxShadow: 'inset 2px 2px 4px rgba(0,0,0,0.6), inset -2px -2px 4px rgba(255,255,255,0.1)'
                         }}
                    ></div>
                    <div className={`absolute left-1 top-1 w-6 h-6 rounded-full transition-all duration-300 transform ${
                      isToggled 
                        ? 'translate-x-6 bg-gradient-to-br from-green-400 to-green-600 shadow-green-500/50' 
                        : 'bg-gradient-to-br from-gray-600 to-gray-700'
                    } group-hover:from-green-400 group-hover:to-green-500`}
                         style={{
                           boxShadow: isToggled 
                             ? '0 2px 8px rgba(34, 197, 94, 0.3), 2px 2px 4px rgba(0,0,0,0.2)' 
                             : '2px 2px 4px rgba(0,0,0,0.3), -1px -1px 2px rgba(255,255,255,0.1)'
                         }}
                    ></div>
                  </div>
                  <RefreshCw className={`w-4 h-4 ml-3 text-gray-400 group-hover:text-green-400 transition-all duration-300 ${isToggled ? 'rotate-180' : ''}`} />
                  <span className="ml-2 text-xs text-gray-400 group-hover:text-green-400 transition-colors">Restart</span>
                </button>
              </div>
              <pre className="text-gray-100 whitespace-pre-wrap leading-relaxed">
                {terminalText}
                <span className="animate-pulse text-green-400">▊</span>
              </pre>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}