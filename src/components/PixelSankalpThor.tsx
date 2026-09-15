import React, { useState, useEffect } from 'react';
import { Sparkles, Maximize2, Volume2, VolumeX } from 'lucide-react';
import { playThorPetSound, playCosmicChime } from '../utils/retroAudio';
import stickerImg from '../assets/thor/sticker.webp';
import walkingImg from '../assets/thor/walking.webp';
import stargazingImg from '../assets/thor/stargazing.webp';

export type PixelSceneVariant = 'stargazing' | 'walking' | 'sticker';

export interface PixelSankalpThorProps {
  variant?: PixelSceneVariant;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'hero' | 'widescreen';
  className?: string;
  showCaption?: boolean;
  interactive?: boolean;
  showControls?: boolean;
  noBackground?: boolean;
  onExpand?: () => void;
}

interface FloatingHeart {
  id: number;
  x: number;
  y: number;
  icon: string;
}

// Illustrated stills of Sankalp & Thor (his Staffy), sourced from a generated
// "pixel-art game key art" reference: a village street with Thor on a lead
// (sticker), a canal-town scene with a tram (walking), and a rooftop under
// twin spiral galaxies (stargazing). Rendered as real images rather than
// hand-coded SVG shapes — a hand-drawn approximation can't reach this level
// of painterly/pixel-shaded detail.
const SCENE_IMG: Record<PixelSceneVariant, string> = {
  sticker: stickerImg,
  walking: walkingImg,
  stargazing: stargazingImg,
};

export default function PixelSankalpThor({
  variant: initialVariant = 'stargazing',
  size = 'md',
  className = '',
  showCaption = false,
  interactive = false,
  showControls = false,
  noBackground = false,
  onExpand,
}: PixelSankalpThorProps) {
  const [activeVariant, setActiveVariant] = useState<PixelSceneVariant>(initialVariant);
  const [isHovered, setIsHovered] = useState(false);
  const [hearts, setHearts] = useState<FloatingHeart[]>([]);
  const [petCount, setPetCount] = useState(0);
  const [soundMuted, setSoundMuted] = useState(true);
  const [justPetted, setJustPetted] = useState(false);

  useEffect(() => {
    setActiveVariant(initialVariant);
  }, [initialVariant]);

  useEffect(() => {
    if (hearts.length === 0) return;
    const timer = setTimeout(() => setHearts((prev) => prev.slice(1)), 1200);
    return () => clearTimeout(timer);
  }, [hearts]);

  const handlePetThor = (e: React.MouseEvent) => {
    e.stopPropagation();
    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const clickY = e.clientY - rect.top;
    const icons = ['❤️', '✨', '🐾', '💖'];
    const randomIcon = icons[Math.floor(Math.random() * icons.length)];

    setHearts((prev) => [
      ...prev,
      { id: Date.now() + Math.random(), x: clickX, y: clickY, icon: randomIcon },
    ]);
    setPetCount((prev) => prev + 1);
    setJustPetted(true);
    setTimeout(() => setJustPetted(false), 800);

    if (activeVariant === 'stargazing') {
      playCosmicChime(soundMuted);
    } else {
      playThorPetSound(soundMuted);
    }
  };

  let width = 160;
  let height = 100;
  if (activeVariant === 'sticker' || noBackground) {
    if (size === 'xs') { width = 90; height = 65; }
    else if (size === 'sm') { width = 120; height = 85; }
    else if (size === 'md') { width = 160; height = 115; }
    else if (size === 'lg') { width = 220; height = 158; }
    else if (size === 'hero') { width = 280; height = 200; }
  } else if (activeVariant === 'stargazing') {
    if (size === 'xs') { width = 120; height = 70; }
    else if (size === 'sm') { width = 180; height = 105; }
    else if (size === 'md') { width = 260; height = 152; }
    else if (size === 'lg') { width = 340; height = 198; }
    else if (size === 'hero') { width = 420; height = 245; }
    else if (size === 'widescreen') { width = 560; height = 315; }
  } else {
    if (size === 'xs') { width = 120; height = 75; }
    else if (size === 'sm') { width = 180; height = 110; }
    else if (size === 'md') { width = 260; height = 160; }
    else if (size === 'lg') { width = 340; height = 210; }
    else if (size === 'hero') { width = 420; height = 260; }
    else if (size === 'widescreen') { width = 560; height = 340; }
  }

  const isEffectiveTransparent = activeVariant === 'sticker' || noBackground;

  return (
    <div
      className={`inline-flex flex-col items-center select-none relative ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div
        onClick={interactive ? handlePetThor : undefined}
        className={`relative overflow-hidden transition-all duration-300 ${
          isEffectiveTransparent
            ? 'p-1 hover:scale-[1.03] cursor-pointer'
            : 'rounded-xl bg-[#0A0A0A] border border-[#242424] p-1.5 sm:p-2 hover:border-[#6C47FF]/60 shadow-[0_4px_24px_rgba(0,0,0,0.6)] cursor-pointer group'
        }`}
        title={interactive ? 'Click to pet Thor & interact! 🐾' : 'Sankalp & Thor'}
      >
        {!isEffectiveTransparent && (
          <div className="absolute inset-0 bg-radial-gradient from-[#6C47FF]/15 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
        )}

        {hearts.map((h) => (
          <div
            key={h.id}
            className="absolute pointer-events-none text-base z-30 animate-heart-float"
            style={{ left: h.x - 10, top: h.y - 12 }}
          >
            {h.icon}
          </div>
        ))}

        <img
          src={SCENE_IMG[activeVariant]}
          alt={
            activeVariant === 'stargazing'
              ? 'Sankalp and Thor sitting on a rooftop under the stars'
              : activeVariant === 'walking'
              ? 'Sankalp walking Thor along a canal-town street'
              : 'Sankalp walking Thor through a village street'
          }
          width={width}
          height={height}
          className={`block object-cover transition-transform duration-500 group-hover:scale-[1.02] ${
            isEffectiveTransparent ? 'rounded-lg' : ''
          }`}
          style={{ width, height }}
          draggable={false}
        />

        {showControls && !isEffectiveTransparent && (
          <div className="absolute top-2 right-2 flex items-center gap-1.5 z-20">
            <button
              onClick={(e) => {
                e.stopPropagation();
                setSoundMuted((prev) => !prev);
              }}
              className="w-6 h-6 rounded-md bg-black/50 backdrop-blur-sm border border-white/10 flex items-center justify-center text-white/80 hover:text-white transition-colors"
              title={soundMuted ? 'Unmute' : 'Mute'}
            >
              {soundMuted ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5" />}
            </button>
            {onExpand && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onExpand();
                }}
                className="w-6 h-6 rounded-md bg-black/50 backdrop-blur-sm border border-white/10 flex items-center justify-center text-white/80 hover:text-white transition-colors"
                title="Expand"
              >
                <Maximize2 className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        )}

        {justPetted && (
          <div className="absolute top-2 left-2 z-20">
            <Sparkles className="w-4 h-4 text-[#FFD98E] animate-pulse" />
          </div>
        )}
      </div>

      {showCaption && (
        <div className="mt-2 text-center">
          <p className="text-[11px] font-mono text-[#888888]">
            Sankalp &amp; Thor {petCount > 0 && <span className="text-[#A896FF]">· petted {petCount}×</span>}
          </p>
        </div>
      )}
    </div>
  );
}
