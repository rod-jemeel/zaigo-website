'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { motion } from 'framer-motion';
import DrumPad, { Pad } from './DrumPad';
import VolumeControl from './VolumeControl';
import RhythmGenerator from './RhythmGenerator';

const PADS_CONFIG: Pad[] = [
  { id: 'p1', keyLabel: 'Q', soundName: 'Kick 1', keyboardKey: 'q', soundFile: '/sounds/bd1.wav' },
  { id: 'p2', keyLabel: 'W', soundName: 'Snare 1', keyboardKey: 'w', soundFile: '/sounds/sd1.wav' },
  { id: 'p3', keyLabel: 'E', soundName: 'Hi-Hat 1', keyboardKey: 'e', soundFile: '/sounds/hihat1.wav' },
  { id: 'p4', keyLabel: 'R', soundName: 'Hi-Hat 2', keyboardKey: 'r', soundFile: '/sounds/hihat2.wav' },
  { id: 'p5', keyLabel: 'A', soundName: 'Tom 1', keyboardKey: 'a', soundFile: '/sounds/tom1.wav' },
  { id: 'p6', keyLabel: 'S', soundName: 'Snare 2', keyboardKey: 's', soundFile: '/sounds/sd2.wav' },
  { id: 'p7', keyLabel: 'D', soundName: 'Kick 2', keyboardKey: 'd', soundFile: '/sounds/bd2.wav' },
  { id: 'p8', keyLabel: 'F', soundName: 'Wood', keyboardKey: 'f', soundFile: '/sounds/wood1.wav' },
];

const KEY_TO_PAD_MAP = new Map(PADS_CONFIG.map((p) => [p.keyboardKey.toLowerCase(), p]));

// Rock drum patterns
const TEMPO_BPM = 120;
const BEAT_DURATION_SECONDS = 60 / TEMPO_BPM;
const BAR_DURATION_SECONDS = BEAT_DURATION_SECONDS * 4;

const drumPatterns: Record<string, Array<{time: number, pad: string}>> = {
  'basicRock': [
    // Bar 1
    { time: 0, pad: 'p1' },         // Kick on 1
    { time: 0.5, pad: 'p3' },       // Hi-Hat
    { time: 1, pad: 'p2' },         // Snare on 2
    { time: 1.5, pad: 'p3' },       // Hi-Hat
    { time: 2, pad: 'p1' },         // Kick on 3
    { time: 2.5, pad: 'p3' },       // Hi-Hat
    { time: 3, pad: 'p2' },         // Snare on 4
    { time: 3.5, pad: 'p3' },       // Hi-Hat
  ],
  'fill1': [
    { time: 0, pad: 'p1' },         // Kick
    { time: 0.25, pad: 'p5' },      // Tom 1
    { time: 0.5, pad: 'p5' },       // Tom 1
    { time: 0.75, pad: 'p5' },      // Tom 1
    { time: 1, pad: 'p2' },         // Snare
    { time: 1.25, pad: 'p2' },      // Snare
    { time: 1.5, pad: 'p6' },       // Snare 2
    { time: 1.75, pad: 'p6' },      // Snare 2
    { time: 2, pad: 'p1' },         // Kick
    { time: 2.25, pad: 'p7' },      // Kick 2
    { time: 2.5, pad: 'p1' },       // Kick
    { time: 2.75, pad: 'p7' },      // Kick 2
    { time: 3, pad: 'p2' },         // Snare (crash)
    { time: 3, pad: 'p8' },         // Wood (accent)
    { time: 3.5, pad: 'p4' },       // Hi-Hat 2 (open)
  ],
  'fill2': [
    { time: 0, pad: 'p2' },         // Snare
    { time: 0.25, pad: 'p6' },      // Snare 2
    { time: 0.5, pad: 'p2' },       // Snare
    { time: 0.75, pad: 'p6' },      // Snare 2
    { time: 1, pad: 'p5' },         // Tom
    { time: 1.5, pad: 'p5' },       // Tom
    { time: 2, pad: 'p1' },         // Kick
    { time: 2.25, pad: 'p1' },      // Kick
    { time: 2.5, pad: 'p2' },       // Snare
    { time: 3, pad: 'p1' },         // Kick
    { time: 3, pad: 'p4' },         // Hi-Hat 2 (crash)
    { time: 3.5, pad: 'p8' },       // Wood
  ]
};

const songStructure = [
  { pattern: 'basicRock', bars: 4 },
  { pattern: 'fill1', bars: 1 },
  { pattern: 'basicRock', bars: 3 },
  { pattern: 'fill2', bars: 1 },
];

// Pre-defined visual pattern sequence (16 steps, which pads light up when)
const VISUAL_PATTERN: Array<string[]> = [
  ['p1', 'p3'],    // Step 0: Kick + Hi-hat
  [],              // Step 1
  ['p3'],          // Step 2: Hi-hat
  [],              // Step 3
  ['p2', 'p3'],    // Step 4: Snare + Hi-hat
  [],              // Step 5
  ['p3'],          // Step 6: Hi-hat
  [],              // Step 7
  ['p1', 'p3'],    // Step 8: Kick + Hi-hat
  [],              // Step 9
  ['p3'],          // Step 10: Hi-hat
  [],              // Step 11
  ['p2', 'p3'],    // Step 12: Snare + Hi-hat
  [],              // Step 13
  ['p3'],          // Step 14: Hi-hat
  [],              // Step 15
];

export default function MPCDrumMachine() {
  const [volume, setVolume] = useState(0.7);
  const [isMuted, setIsMuted] = useState(false);
  const [activePads, setActivePads] = useState<Set<string>>(new Set());
  const [isLoading, setIsLoading] = useState(true);
  const [loadingStatus, setLoadingStatus] = useState('Initializing...');
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentBeat, setCurrentBeat] = useState(0);
  const [showPattern, setShowPattern] = useState(true);
  const [currentStep, setCurrentStep] = useState(0);
  
  const audioContextRef = useRef<AudioContext | null>(null);
  const audioBuffersRef = useRef<Record<string, AudioBuffer>>({});
  const gainNodeRef = useRef<GainNode | null>(null);
  const nextNoteTimeRef = useRef(0);
  const currentBeatInSongRef = useRef(0);
  const currentSegmentIndexRef = useRef(0);
  const schedulerIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const patternIntervalRef = useRef<NodeJS.Timeout | null>(null);

  // Initialize Web Audio API
  useEffect(() => {
    const initAudio = async () => {
      try {
        setLoadingStatus('Creating audio context...');
        audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
        const audioContext = audioContextRef.current;
        
        // Create master gain node
        gainNodeRef.current = audioContext.createGain();
        gainNodeRef.current.connect(audioContext.destination);
        gainNodeRef.current.gain.value = volume;
        
        setLoadingStatus('Loading sounds...');
        
        // Load all samples
        const loadPromises = PADS_CONFIG.map(async (pad) => {
          if (!pad.soundFile) return;
          
          try {
            const response = await fetch(pad.soundFile);
            const arrayBuffer = await response.arrayBuffer();
            const audioBuffer = await audioContext.decodeAudioData(arrayBuffer);
            audioBuffersRef.current[pad.id] = audioBuffer;
          } catch (error) {
            console.warn(`Failed to load sound for ${pad.soundName}:`, error);
          }
        });
        
        await Promise.all(loadPromises);
        setLoadingStatus('Ready!');
        setTimeout(() => setIsLoading(false), 500);
        
      } catch (error) {
        console.error('Failed to initialize audio:', error);
        setLoadingStatus('Audio initialization failed');
        setIsLoading(false);
      }
    };
    
    initAudio();
    
    return () => {
      audioContextRef.current?.close();
    };
  }, []);

  // Update volume
  useEffect(() => {
    if (gainNodeRef.current) {
      gainNodeRef.current.gain.value = isMuted ? 0 : volume;
    }
  }, [volume, isMuted]);

  const playSound = useCallback((pad: Pad, time?: number) => {
    const audioContext = audioContextRef.current;
    const buffer = audioBuffersRef.current[pad.id];
    const gainNode = gainNodeRef.current;
    
    if (!audioContext || !buffer || !gainNode) {
      console.log(`Playing ${pad.soundName} (no audio loaded)`);
      return;
    }
    
    // Resume context if suspended (browser autoplay policy)
    if (audioContext.state === 'suspended') {
      audioContext.resume();
    }
    
    const source = audioContext.createBufferSource();
    source.buffer = buffer;
    source.connect(gainNode);
    
    // If time is provided, use it for precise scheduling
    if (time !== undefined) {
      source.start(time);
      
      // Schedule visual feedback
      const visualDelayMs = (time - audioContext.currentTime) * 1000;
      setTimeout(() => {
        setActivePads((prev) => new Set(prev).add(pad.id));
        setTimeout(() => {
          setActivePads((prev) => {
            const newPads = new Set(prev);
            newPads.delete(pad.id);
            return newPads;
          });
        }, 100);
      }, Math.max(0, visualDelayMs));
    } else {
      source.start(0);
    }
  }, []);

  const playSoundById = useCallback((padId: string) => {
    const pad = PADS_CONFIG.find(p => p.id === padId);
    if (pad) {
      playSound(pad);
    }
  }, [playSound]);

  const triggerPad = useCallback((pad: Pad, isKeyEvent: boolean) => {
    playSound(pad);
    setActivePads((prev) => new Set(prev).add(pad.id));
    
    if (!isKeyEvent) {
      setTimeout(() => {
        setActivePads((prev) => {
          const newPads = new Set(prev);
          newPads.delete(pad.id);
          return newPads;
        });
      }, 150);
    }
  }, [playSound]);

  // Keyboard event handlers
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const pad = KEY_TO_PAD_MAP.get(e.key.toLowerCase());
      if (pad && !activePads.has(pad.id) && !e.repeat) {
        triggerPad(pad, true);
      }
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      const pad = KEY_TO_PAD_MAP.get(e.key.toLowerCase());
      if (pad) {
        setActivePads((prev) => {
          const newPads = new Set(prev);
          newPads.delete(pad.id);
          return newPads;
        });
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, [activePads, triggerPad]);

  const handleVolumeChange = (newVolume: number) => {
    setVolume(newVolume);
    if (newVolume > 0 && isMuted) {
      setIsMuted(false);
    }
  };

  const handleMuteToggle = () => {
    setIsMuted(!isMuted);
  };

  // Drum pattern scheduler
  const scheduler = useCallback(() => {
    const audioContext = audioContextRef.current;
    if (!audioContext) return;
    
    const LOOK_AHEAD_SECONDS = 0.1;
    
    while (nextNoteTimeRef.current < audioContext.currentTime + LOOK_AHEAD_SECONDS) {
      const currentSegmentIndex = currentSegmentIndexRef.current;
      const currentSegment = songStructure[currentSegmentIndex % songStructure.length];
      const currentPattern = drumPatterns[currentSegment.pattern];
      const beatsInCurrentSegment = currentSegment.bars * 4;
      
      // Calculate position within current segment
      const beatInSegment = currentBeatInSongRef.current % beatsInCurrentSegment;
      const beatInPattern = beatInSegment % 4; // Patterns are 1 bar (4 beats)
      
      // Schedule all notes for this beat
      currentPattern.forEach(note => {
        if (Math.floor(note.time) === Math.floor(beatInPattern)) {
          const scheduledTime = nextNoteTimeRef.current + (note.time - Math.floor(note.time)) * BEAT_DURATION_SECONDS;
          const pad = PADS_CONFIG.find(p => p.id === note.pad);
          if (pad) {
            playSound(pad, scheduledTime);
          }
        }
      });
      
      // Update beat display
      setCurrentBeat(Math.floor(beatInPattern) + 1);
      
      // Advance to next beat
      nextNoteTimeRef.current += BEAT_DURATION_SECONDS;
      currentBeatInSongRef.current++;
      
      // Check if we've completed the current segment
      if ((currentBeatInSongRef.current / 4) >= currentSegment.bars) {
        currentBeatInSongRef.current = 0;
        currentSegmentIndexRef.current = (currentSegmentIndexRef.current + 1) % songStructure.length;
      }
    }
  }, [playSound]);

  const startPattern = useCallback(() => {
    const audioContext = audioContextRef.current;
    if (!audioContext || isPlaying) return;
    
    if (audioContext.state === 'suspended') {
      audioContext.resume();
    }
    
    nextNoteTimeRef.current = audioContext.currentTime;
    currentBeatInSongRef.current = 0;
    currentSegmentIndexRef.current = 0;
    
    setIsPlaying(true);
    schedulerIntervalRef.current = setInterval(scheduler, 25);
  }, [isPlaying, scheduler]);

  const stopPattern = useCallback(() => {
    if (schedulerIntervalRef.current) {
      clearInterval(schedulerIntervalRef.current);
      schedulerIntervalRef.current = null;
    }
    setIsPlaying(false);
    setCurrentBeat(0);
    setActivePads(new Set());
  }, []);

  // Visual pattern display
  const displayPattern = useCallback(() => {
    if (patternIntervalRef.current) return;
    
    console.log('Starting pattern display');
    let step = 0;
    
    patternIntervalRef.current = setInterval(() => {
      const currentStepIndex = step % 16;
      const activePadsForStep = new Set(VISUAL_PATTERN[currentStepIndex]);
      
      setActivePads(activePadsForStep);
      setCurrentStep(currentStepIndex);
      setCurrentBeat(Math.floor(currentStepIndex / 4) + 1);
      
      step = (step + 1) % 16;
    }, 125); // 125ms per 16th note at 120 BPM
  }, []);

  const stopPatternDisplay = useCallback(() => {
    if (patternIntervalRef.current) {
      clearInterval(patternIntervalRef.current);
      patternIntervalRef.current = null;
    }
    setActivePads(new Set());
    setCurrentStep(0);
    setCurrentBeat(0);
  }, []);

  // Start pattern display when component is ready
  useEffect(() => {
    if (!isLoading) {
      console.log('Starting pattern display');
      displayPattern();
    }
    
    return () => {
      stopPatternDisplay();
    };
  }, [isLoading, displayPattern, stopPatternDisplay]);

  if (isLoading) {
    return (
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="flex flex-col items-center justify-center p-8 rounded-2xl bg-black/50 backdrop-blur-xl border border-white/10 w-full max-w-md md:max-w-2xl h-[400px]"
      >
        <div className="flex flex-col items-center gap-4">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            className="w-8 h-8 border-2 border-emerald-500 border-t-transparent rounded-full"
          />
          <p className="text-neutral-400 font-mono text-sm">{loadingStatus}</p>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div 
      ref={containerRef}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="flex flex-col items-center gap-6 p-6 md:p-8 rounded-2xl bg-gray-900/95 backdrop-blur-xl border border-gray-800 shadow-2xl shadow-gray-900/20 w-full max-w-md md:max-w-2xl relative"
    >
      {/* Beat indicator */}
      <div className="absolute top-4 right-4 flex items-center gap-2">
        {(showPattern || isPlaying) && (
          <>
            <div className="flex gap-1">
              {[1, 2, 3, 4].map((beat) => (
                <div
                  key={beat}
                  className={`w-2 h-2 rounded-full transition-all duration-75 ${
                    currentBeat === beat 
                      ? 'bg-emerald-500 scale-150 shadow-lg shadow-emerald-500/50' 
                      : 'bg-gray-600'
                  }`}
                />
              ))}
            </div>
            <span className="text-xs text-emerald-500 font-medium">
              {isPlaying ? 'PLAYING' : 'PATTERN DEMO'}
            </span>
          </>
        )}
      </div>
      
      <div className="text-center mb-2">
        <h3 className="text-2xl font-bold text-white mb-2">Find Your Tempo</h3>
        <p className="text-sm text-white/70">
          Watch the rock pattern • Click pads or use keyboard to play along
        </p>
      </div>
      
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 w-full">
        {PADS_CONFIG.map((pad) => (
          <DrumPad 
            key={pad.id} 
            pad={pad} 
            onTrigger={(p) => triggerPad(p, false)} 
            isActive={activePads.has(pad.id)} 
          />
        ))}
      </div>
      
      <div className="w-full border-t border-white/10 pt-6 space-y-6">
        <VolumeControl
          volume={volume}
          onVolumeChange={handleVolumeChange}
          isMuted={isMuted}
          onMuteToggle={handleMuteToggle}
        />
        
        {/* Pattern Visualization */}
        {showPattern && (
          <div className="border-t border-white/10 pt-6 w-full">
            <h4 className="text-sm font-semibold text-white mb-3">Rock Pattern Visualization</h4>
            <div className="grid grid-cols-16 gap-0.5 mb-2">
              {Array.from({ length: 16 }).map((_, i) => (
                <div
                  key={i}
                  className={`h-1 rounded-full transition-all duration-150 ${
                    currentStep === i 
                      ? 'bg-emerald-500 shadow-lg shadow-emerald-500/50' 
                      : 'bg-gray-700'
                  }`}
                />
              ))}
            </div>
            <p className="text-xs text-white/50">
              Watch the pattern light up the pads • Classic rock beat with fills
            </p>
          </div>
        )}
        
        {/* Pattern Controls */}
        <div className="border-t border-white/10 pt-6 w-full">
          <div className="flex items-center justify-between mb-4">
            <h4 className="text-lg font-semibold text-white">Play With Sound</h4>
            <button
              onClick={isPlaying ? stopPattern : startPattern}
              className={`px-4 py-2 rounded-lg font-medium transition-all ${
                isPlaying 
                  ? 'bg-red-500/20 text-red-400 hover:bg-red-500/30 border border-red-500/50' 
                  : 'bg-emerald-500/20 text-emerald-400 hover:bg-emerald-500/30 border border-emerald-500/50'
              }`}
            >
              {isPlaying ? 'Stop' : 'Play'} Pattern
            </button>
          </div>
          <p className="text-xs text-white/50 mb-4">
            Click play to hear the rock pattern with audio
          </p>
        </div>
        
        {/* AI Rhythm Generator */}
        <div className="border-t border-white/10 pt-6">
          <h4 className="text-lg font-semibold text-white mb-4">AI Rhythm Generator</h4>
          <RhythmGenerator 
            onPlaySound={playSoundById} 
            isAudioReady={!isLoading}
          />
        </div>
      </div>
    </motion.div>
  );
}