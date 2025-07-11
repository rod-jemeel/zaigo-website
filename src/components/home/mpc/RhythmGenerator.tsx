'use client';

import { useState, useRef, useCallback, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Play, Square, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface Pattern {
  [key: string]: number[];
}

interface RhythmData {
  pattern: Pattern;
  bpm: number;
  name: string;
}

interface RhythmGeneratorProps {
  onPlaySound: (padId: string) => void;
  isAudioReady: boolean;
}

export default function RhythmGenerator({ onPlaySound, isAudioReady }: RhythmGeneratorProps) {
  const [prompt, setPrompt] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentStep, setCurrentStep] = useState(-1);
  const [currentPattern, setCurrentPattern] = useState<RhythmData | null>(null);
  const [error, setError] = useState('');
  
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const stepRef = useRef(0);

  const stopSequencer = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    setIsPlaying(false);
    setCurrentStep(-1);
    stepRef.current = 0;
  }, []);

  const playStep = useCallback(() => {
    if (!currentPattern) return;
    
    const step = stepRef.current;
    setCurrentStep(step);
    
    // Play all sounds for this step
    Object.entries(currentPattern.pattern).forEach(([padId, pattern]) => {
      if (pattern[step] === 1) {
        onPlaySound(padId);
      }
    });
    
    // Move to next step
    stepRef.current = (stepRef.current + 1) % 16;
  }, [currentPattern, onPlaySound]);

  const startSequencer = useCallback(() => {
    if (!currentPattern || !isAudioReady) return;
    
    stopSequencer();
    setIsPlaying(true);
    stepRef.current = 0;
    
    // Calculate interval from BPM (16th notes)
    const interval = (60 / currentPattern.bpm / 4) * 1000;
    
    // Play first step immediately
    playStep();
    
    // Start interval for subsequent steps
    intervalRef.current = setInterval(playStep, interval);
  }, [currentPattern, isAudioReady, stopSequencer, playStep]);

  // Cleanup on unmount
  useEffect(() => {
    return () => stopSequencer();
  }, [stopSequencer]);

  const generateRhythm = async (customPrompt?: string) => {
    const promptToUse = customPrompt || prompt;
    if (!promptToUse.trim()) return;
    
    setIsGenerating(true);
    setError('');
    stopSequencer();
    
    try {
      const response = await fetch('/api/generate-rhythm', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt: promptToUse }),
      });
      
      if (!response.ok) {
        throw new Error('Failed to generate rhythm');
      }
      
      const data = await response.json();
      setCurrentPattern(data);
      
      // Update the prompt input if using a preset
      if (customPrompt) {
        setPrompt(customPrompt);
      }
    } catch (err) {
      setError('Failed to generate rhythm. Please try again.');
      console.error(err);
    } finally {
      setIsGenerating(false);
    }
  };

  const padInfo = {
    p1: { name: 'Kick 1', color: 'bg-red-500' },
    p2: { name: 'Snare 1', color: 'bg-blue-500' },
    p3: { name: 'Hi-Hat 1', color: 'bg-yellow-500' },
    p4: { name: 'Hi-Hat 2', color: 'bg-green-500' },
    p5: { name: 'Tom 1', color: 'bg-purple-500' },
    p6: { name: 'Snare 2', color: 'bg-pink-500' },
    p7: { name: 'Kick 2', color: 'bg-orange-500' },
    p8: { name: 'Wood', color: 'bg-cyan-500' },
  };

  const presets = [
    { label: 'Rock', prompt: 'rock beat with tom fills and crashes' },
    { label: 'Hip Hop', prompt: 'boom bap hip hop beat with heavy kicks and snares' },
    { label: 'House', prompt: 'four on the floor house beat with open hats' },
    { label: 'Trap', prompt: 'trap beat with rattling hi-hats and 808 kicks' },
    { label: 'Jazz', prompt: 'jazz swing pattern with brush snares and ride cymbals' },
    { label: 'Latin', prompt: 'latin salsa rhythm with wood blocks and timbales' },
    { label: 'Drum & Bass', prompt: 'fast drum and bass breakbeat pattern' },
    { label: 'Funk', prompt: 'funky groove with ghost notes and syncopation' },
  ];

  return (
    <div className="w-full space-y-6">
      {/* Preset Buttons */}
      <div className="space-y-3">
        <label className="text-sm text-white/70 block">
          Quick Presets
        </label>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          {presets.map((preset) => (
            <button
              key={preset.label}
              onClick={() => generateRhythm(preset.prompt)}
              disabled={isGenerating}
              className="px-3 py-2 text-sm bg-white/5 hover:bg-white/10 border border-white/10 hover:border-emerald-500/50 rounded-lg text-white transition-all disabled:opacity-50"
            >
              {preset.label}
            </button>
          ))}
        </div>
      </div>

      {/* Prompt Input */}
      <div className="space-y-3">
        <label className="text-sm text-white/70 block">
          Or describe your own rhythm style
        </label>
        <div className="flex gap-2">
          <input
            type="text"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && generateRhythm()}
            placeholder="e.g., funky hip-hop beat, fast techno, smooth jazz..."
            className="flex-1 px-4 py-2 bg-black/50 border border-white/20 rounded-lg text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent backdrop-blur-sm"
            disabled={isGenerating}
          />
          <Button
            onClick={() => generateRhythm()}
            disabled={!prompt.trim() || isGenerating}
            className="bg-emerald-500 hover:bg-emerald-600 text-black font-medium px-6"
          >
            {isGenerating ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <Sparkles className="w-4 h-4" />
            )}
          </Button>
        </div>
        {error && (
          <p className="text-sm text-red-400">{error}</p>
        )}
      </div>

      {/* Pattern Display */}
      <AnimatePresence mode="wait">
        {currentPattern && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-4"
          >
            {/* Pattern Info */}
            <div className="flex items-center justify-between">
              <div>
                <h4 className="text-lg font-semibold text-white">{currentPattern.name}</h4>
                <p className="text-sm text-white/70">{currentPattern.bpm} BPM</p>
              </div>
              <Button
                onClick={isPlaying ? stopSequencer : startSequencer}
                disabled={!isAudioReady}
                className="bg-white/10 hover:bg-white/20 text-white border border-white/20"
              >
                {isPlaying ? (
                  <>
                    <Square className="w-4 h-4 mr-2" />
                    Stop
                  </>
                ) : (
                  <>
                    <Play className="w-4 h-4 mr-2" />
                    Play
                  </>
                )}
              </Button>
            </div>

            {/* Pattern Grid */}
            <div className="space-y-2 p-4 bg-black/30 rounded-lg backdrop-blur-sm border border-white/10">
              {Object.entries(currentPattern.pattern).map(([padId, pattern]) => (
                <div key={padId} className="flex items-center gap-2">
                  <div className="w-20 text-xs text-white/60">
                    {padInfo[padId as keyof typeof padInfo]?.name || padId}
                  </div>
                  <div className="flex gap-1">
                    {pattern.map((hit, index) => (
                      <motion.div
                        key={index}
                        animate={{
                          scale: currentStep === index ? 1.2 : 1,
                          opacity: hit === 1 ? 1 : 0.2,
                        }}
                        transition={{ duration: 0.1 }}
                        className={`w-6 h-6 rounded ${
                          hit === 1 
                            ? padInfo[padId as keyof typeof padInfo]?.color || 'bg-white' 
                            : 'bg-white/10'
                        } ${currentStep === index ? 'ring-2 ring-white' : ''}`}
                      />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}