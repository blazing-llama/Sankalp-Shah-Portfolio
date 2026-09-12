import React, { useState } from 'react';
import { X, Heart, Sparkles, Volume2, VolumeX, Moon, Sun } from 'lucide-react';
import PixelSankalpThor, { PixelSceneVariant } from './PixelSankalpThor';
import { playThorPetSound, playCosmicChime } from '../utils/retroAudio';

interface ThorCinemaModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ThorCinemaModal({ isOpen, onClose }: ThorCinemaModalProps) {
  const [activeVariant, setActiveVariant] = useState<PixelSceneVariant>('stargazing');
  const [petCount, setPetCount] = useState(12);
  const [soundMuted, setSoundMuted] = useState(false);
  const [toastMsg, setToastMsg] = useState<string | null>(null);

  if (!isOpen) return null;

  const handlePetThor = () => {
    setPetCount((prev) => prev + 1);
    if (activeVariant === 'stargazing') {
      playCosmicChime(soundMuted);
      setToastMsg('✨ Cosmic starlight shimmered!');
    } else {
      playThorPetSound(soundMuted);
      setToastMsg('🐾 Thor did a joyful Staffy tail wag!');
    }
    setTimeout(() => setToastMsg(null), 1800);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-md animate-fade-in">
      <div
        className="relative w-full max-w-3xl bg-[#0D0D0D] border border-[#2A2A2A] rounded-2xl shadow-[0_0_50px_rgba(108,71,255,0.25)] overflow-hidden flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#202020] bg-[#121212]">
          <div className="flex items-center gap-3">
            <span className="w-2.5 h-2.5 rounded-full bg-[#6C47FF] animate-pulse" />
            <h3 className="font-syne font-bold text-base text-[#F2F2F2]">
              Sankalp &amp; Thor · Journey Chronicles
            </h3>
            <span className="text-[10px] font-mono uppercase tracking-wider text-[#A896FF] bg-[#6C47FF]/15 px-2 py-0.5 rounded border border-[#6C47FF]/30">
              16-Bit Retro Art
            </span>
          </div>

          <button
            onClick={onClose}
            aria-label="Close modal"
            className="p-1.5 rounded-lg bg-[#1A1A1A] hover:bg-[#252525] text-[#888888] hover:text-white transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Modal Body: Main Cinema Screen */}
        <div className="p-6 flex flex-col items-center justify-center bg-gradient-to-b from-[#0B0B0B] to-[#121212]">
          {/* Main Pixel Canvas Frame */}
          <div className="w-full flex justify-center py-2">
            <PixelSankalpThor
              variant={activeVariant}
              size="widescreen"
              interactive={true}
              showControls={false}
            />
          </div>

          {/* Floating Toast Notification */}
          {toastMsg && (
            <div className="mt-3 px-3 py-1 rounded-full bg-[#6C47FF]/20 border border-[#6C47FF]/40 text-xs font-mono text-[#D8C7FF] animate-fade-in flex items-center gap-1.5">
              <span>{toastMsg}</span>
            </div>
          )}

          {/* Interactive Action Bar */}
          <div className="mt-5 flex flex-wrap items-center justify-between gap-4 w-full max-w-xl px-2">
            {/* Scene Selector */}
            <div className="flex items-center bg-[#171717] border border-[#2B2B2B] rounded-xl p-1 shadow-inner">
              <button
                onClick={() => setActiveVariant('stargazing')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono transition-all ${
                  activeVariant === 'stargazing'
                    ? 'bg-[#6C47FF] text-white font-semibold shadow-md'
                    : 'text-[#888888] hover:text-white'
                }`}
              >
                <Moon className="w-3 h-3" />
                <span>Rooftop Galaxies</span>
              </button>

              <button
                onClick={() => setActiveVariant('walking')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono transition-all ${
                  activeVariant === 'walking'
                    ? 'bg-[#6C47FF] text-white font-semibold shadow-md'
                    : 'text-[#888888] hover:text-white'
                }`}
              >
                <Sun className="w-3 h-3" />
                <span>On The Road</span>
              </button>

              <button
                onClick={() => setActiveVariant('sticker')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono transition-all ${
                  activeVariant === 'sticker'
                    ? 'bg-[#6C47FF] text-white font-semibold shadow-md'
                    : 'text-[#888888] hover:text-white'
                }`}
              >
                <Sparkles className="w-3 h-3" />
                <span>Cutout (No BG)</span>
              </button>
            </div>

            {/* Petting & Sound Controls */}
            <div className="flex items-center gap-2">
              <button
                onClick={handlePetThor}
                className="btn-sheen flex items-center gap-2 px-4 py-1.5 rounded-xl bg-[#6C47FF] hover:bg-[#7D5BFF] text-white text-xs font-semibold shadow-[0_0_20px_rgba(108,71,255,0.4)] transition-all active:scale-95"
              >
                <Heart className="w-3.5 h-3.5 fill-current text-pink-200" />
                <span>Pet Thor ({petCount})</span>
              </button>

              <button
                onClick={() => {
                  setSoundMuted(!soundMuted);
                  if (soundMuted) playThorPetSound(false);
                }}
                className="p-2 rounded-xl bg-[#171717] border border-[#2B2B2B] text-[#888888] hover:text-white transition-colors"
                title={soundMuted ? 'Unmute 8-bit audio' : 'Mute audio'}
              >
                {soundMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4 text-[#6C47FF]" />}
              </button>
            </div>
          </div>
        </div>

        {/* Modal Footer: Narrative Context */}
        <div className="px-6 py-4 border-t border-[#1C1C1C] bg-[#0E0E0E] flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs text-[#777777]">
          <p className="max-w-lg leading-relaxed">
            <span className="text-[#F2F2F2] font-semibold">The Co-Pilot:</span> Thor is an athletic grey-and-white American Staffordshire Terrier. From cobblestone wanderings to quiet rooftop moments under the cosmos, he reminds me that the best systems are built with loyalty, calm focus, and joy.
          </p>
          <div className="font-mono text-[11px] text-[#555555] shrink-0">
            FRAME RATE: 60 FPS · 16-BIT RETRO
          </div>
        </div>
      </div>
    </div>
  );
}
