'use client';

import { Volume2, VolumeX } from 'lucide-react';

interface VolumeControlProps {
  volume: number;
  onVolumeChange: (volume: number) => void;
  isMuted: boolean;
  onMuteToggle: () => void;
}

export default function VolumeControl({
  volume,
  onVolumeChange,
  isMuted,
  onMuteToggle,
}: VolumeControlProps) {
  return (
    <div className="flex items-center gap-4 w-full max-w-xs">
      <button
        onClick={onMuteToggle}
        className="text-neutral-300 hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-emerald-500 rounded-md p-1"
        aria-label={isMuted ? 'Unmute' : 'Mute'}
      >
        {isMuted ? (
          <VolumeX className="w-6 h-6" />
        ) : (
          <Volume2 className="w-6 h-6" />
        )}
      </button>
      <div className="relative flex-1">
        <input
          type="range"
          min="0"
          max="1"
          step="0.01"
          value={isMuted ? 0 : volume}
          onChange={(e) => onVolumeChange(parseFloat(e.target.value))}
          className="w-full h-2 bg-neutral-800 rounded-lg appearance-none cursor-pointer slider"
          aria-label="Volume slider"
        />
        <style jsx>{`
          .slider::-webkit-slider-thumb {
            appearance: none;
            width: 16px;
            height: 16px;
            background: #10b981;
            cursor: pointer;
            border-radius: 50%;
            transition: all 0.2s ease;
          }
          
          .slider::-webkit-slider-thumb:hover {
            background: #34d399;
            transform: scale(1.2);
          }
          
          .slider::-moz-range-thumb {
            width: 16px;
            height: 16px;
            background: #10b981;
            cursor: pointer;
            border-radius: 50%;
            border: none;
            transition: all 0.2s ease;
          }
          
          .slider::-moz-range-thumb:hover {
            background: #34d399;
            transform: scale(1.2);
          }
        `}</style>
      </div>
    </div>
  );
}