import React, { useState, useEffect } from 'react';
import { Sparkles, Maximize2, Volume2, VolumeX } from 'lucide-react';
import { playThorPetSound, playCosmicChime } from '../utils/retroAudio';

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

// Flat, hand-drawn illustration (not pixel-blocks) of Sankalp & Thor (his Staffy).
// One shared "world" — grass, a soft European-town skyline nodding to Sankalp's
// travels (a spire + rooftops + a tram, echoing his UK/Amsterdam trip photos),
// and a sky that shifts from day to dusk to night per variant — with three
// character poses: throwing a ball (sticker), walking on a lead (walking), and
// sitting looking up at the stars (stargazing).
const SKIN = '#E8B58C';
const HAIR = '#2B2420';
const SHIRT = '#AEB4C2';
const SHIRT_SHADE = '#8F96A6';
const JEANS = '#2B3350';
const SHOE = '#6B3B30';
const BACKPACK = '#8A5A34';
const DOG_BODY = '#8D8F94';
const DOG_BODY_SHADE = '#75777C';
const DOG_LIGHT = '#F2F1EC';
const DOG_EAR = '#6E7075';
const COLLAR = '#6C47FF';
const BALL = '#E8483A';

function Skyline({ tone }: { tone: string }) {
  return (
    <g fill={tone} opacity={0.9}>
      <rect x="8" y="118" width="18" height="34" rx="1.5" />
      <rect x="28" y="108" width="16" height="44" rx="1.5" />
      <polygon points="36,108 40,92 44,108" />
      <rect x="42" y="74" width="4" height="20" />
      <rect x="46" y="122" width="20" height="30" rx="1.5" />
      <rect x="292" y="120" width="22" height="32" rx="1.5" />
      <rect x="316" y="106" width="14" height="46" rx="1.5" />
      {/* Tram, a small nod to the Amsterdam canal-street photo */}
      <rect x="252" y="140" width="34" height="12" rx="3" />
      <circle cx="259" cy="153" r="3" />
      <circle cx="279" cy="153" r="3" />
    </g>
  );
}

function Tree({ x, y, scale = 1 }: { x: number; y: number; scale?: number }) {
  return (
    <g transform={`translate(${x}, ${y}) scale(${scale})`}>
      <rect x="-4" y="0" width="8" height="26" rx="2" fill="#6B4A2E" />
      <circle cx="0" cy="-16" r="26" fill="#5C8A3A" />
      <circle cx="-14" cy="-6" r="16" fill="#5C8A3A" />
      <circle cx="14" cy="-4" r="17" fill="#5C8A3A" />
      <circle cx="0" cy="-24" r="18" fill="#6FA24A" />
    </g>
  );
}

function Person({ pose }: { pose: 'throw' | 'walk' | 'sit' }) {
  if (pose === 'sit') {
    return (
      <g>
        <ellipse cx="0" cy="46" rx="17" ry="7" fill={JEANS} />
        <rect x="-15" y="14" width="30" height="30" rx="10" fill={SHIRT} />
        <path d="M -15 20 Q -19 30 -13 40" stroke={BACKPACK} strokeWidth="6" fill="none" strokeLinecap="round" />
        <rect x="-14" y="18" width="9" height="20" rx="4" fill={SHIRT_SHADE} transform="rotate(18 -14 18)" />
        <rect x="6" y="18" width="9" height="20" rx="4" fill={SHIRT} transform="rotate(-40 6 18)" />
        <circle cx="0" cy="0" r="13" fill={SKIN} />
        <path d="M -13 -2 Q -14 -18 0 -18 Q 14 -18 13 -2 Q 13 -8 0 -9 Q -13 -8 -13 -2 Z" fill={HAIR} />
        <circle cx="-5" cy="-2" r="1.4" fill="#241A14" />
        <circle cx="5" cy="-2" r="1.4" fill="#241A14" />
        <path d="M -4 5 Q 0 8 4 5" stroke="#241A14" strokeWidth="1.4" fill="none" strokeLinecap="round" />
      </g>
    );
  }

  if (pose === 'walk') {
    return (
      <g>
        <rect x="-12" y="30" width="9" height="26" rx="4" fill={JEANS} transform="rotate(-10 -12 30)" />
        <rect x="4" y="30" width="9" height="26" rx="4" fill={JEANS} transform="rotate(14 4 30)" />
        <ellipse cx="-14" cy="58" rx="7" ry="4" fill={SHOE} />
        <ellipse cx="16" cy="58" rx="7" ry="4" fill={SHOE} />
        <rect x="-15" y="4" width="30" height="30" rx="11" fill={SHIRT} />
        <path d="M -15 8 Q -19 18 -13 30" stroke={BACKPACK} strokeWidth="7" fill="none" strokeLinecap="round" />
        <rect x="-16" y="8" width="9" height="22" rx="4" fill={SHIRT_SHADE} transform="rotate(-16 -16 8)" />
        <rect x="7" y="6" width="9" height="22" rx="4" fill={SHIRT} transform="rotate(24 7 6)" />
        <circle cx="0" cy="-10" r="13" fill={SKIN} />
        <path d="M -13 -12 Q -14 -28 0 -28 Q 14 -28 13 -12 Q 13 -18 0 -19 Q -13 -18 -13 -12 Z" fill={HAIR} />
        <circle cx="-5" cy="-12" r="1.4" fill="#241A14" />
        <circle cx="5" cy="-12" r="1.4" fill="#241A14" />
        <path d="M -3 -5 Q 0 -3 3 -5" stroke="#241A14" strokeWidth="1.3" fill="none" strokeLinecap="round" />
      </g>
    );
  }

  // throw
  return (
    <g>
      <rect x="-13" y="32" width="10" height="27" rx="4" fill={JEANS} />
      <rect x="4" y="32" width="10" height="27" rx="4" fill={JEANS} transform="rotate(8 4 32)" />
      <ellipse cx="-8" cy="60" rx="7.5" ry="4" fill={SHOE} />
      <ellipse cx="17" cy="60" rx="7.5" ry="4" fill={SHOE} />
      <rect x="-15" y="4" width="30" height="32" rx="11" fill={SHIRT} />
      <path d="M -15 8 Q -19 18 -13 30" stroke={BACKPACK} strokeWidth="7" fill="none" strokeLinecap="round" />
      <rect x="-16" y="10" width="9" height="20" rx="4" fill={SHIRT_SHADE} transform="rotate(-8 -16 10)" />
      <rect x="4" y="-6" width="10" height="24" rx="5" fill={SHIRT} transform="rotate(-58 4 -6)" />
      <circle cx="19" cy="-16" r="4.5" fill={SKIN} />
      <circle cx="0" cy="-10" r="13" fill={SKIN} />
      <path d="M -13 -12 Q -14 -28 0 -28 Q 14 -28 13 -12 Q 13 -18 0 -19 Q -13 -18 -13 -12 Z" fill={HAIR} />
      <circle cx="-5" cy="-12" r="1.4" fill="#241A14" />
      <circle cx="5" cy="-12" r="1.4" fill="#241A14" />
      <path d="M -3 -5 Q 0 -3 3 -5" stroke="#241A14" strokeWidth="1.3" fill="none" strokeLinecap="round" />
    </g>
  );
}

function Dog({ pose }: { pose: 'run' | 'walk' | 'lie' }) {
  if (pose === 'lie') {
    return (
      <g>
        <ellipse cx="0" cy="14" rx="26" ry="11" fill={DOG_BODY} />
        <ellipse cx="-4" cy="17" rx="16" ry="6.5" fill={DOG_LIGHT} />
        <ellipse cx="22" cy="6" rx="10" ry="9" fill={DOG_BODY} />
        <ellipse cx="26" cy="9" rx="5.5" ry="4.5" fill={DOG_LIGHT} />
        <path d="M 16 -1 Q 12 -9 19 -8 Q 20 -3 16 -1 Z" fill={DOG_EAR} />
        <circle cx="30" cy="6" r="1.6" fill="#1C1C1C" />
        <rect x="-24" y="18" width="14" height="6" rx="3" fill={DOG_BODY_SHADE} />
        <path d="M -26 12 Q -34 10 -33 2" stroke={DOG_BODY} strokeWidth="6" fill="none" strokeLinecap="round" />
        <path d="M 18 3 Q 24 4 27 8" stroke={COLLAR} strokeWidth="2.5" fill="none" strokeLinecap="round" />
      </g>
    );
  }

  if (pose === 'walk') {
    return (
      <g>
        <ellipse cx="0" cy="14" rx="24" ry="10" fill={DOG_BODY} />
        <ellipse cx="-2" cy="17" rx="14" ry="6" fill={DOG_LIGHT} />
        <rect x="-18" y="20" width="6" height="14" rx="3" fill={DOG_BODY_SHADE} />
        <rect x="-6" y="22" width="6" height="14" rx="3" fill={DOG_BODY} />
        <rect x="10" y="22" width="6" height="14" rx="3" fill={DOG_BODY_SHADE} />
        <rect x="18" y="20" width="6" height="14" rx="3" fill={DOG_BODY} />
        <ellipse cx="24" cy="2" rx="11" ry="10" fill={DOG_BODY} />
        <ellipse cx="29" cy="5" rx="6" ry="5" fill={DOG_LIGHT} />
        <path d="M 18 -6 Q 13 -15 21 -13 Q 22 -7 18 -6 Z" fill={DOG_EAR} />
        <circle cx="33" cy="3" r="1.7" fill="#1C1C1C" />
        <path d="M -22 6 Q -30 -2 -25 -8" stroke={DOG_BODY} strokeWidth="6" fill="none" strokeLinecap="round" />
        <path d="M 20 -1 Q 26 1 29 6" stroke={COLLAR} strokeWidth="2.5" fill="none" strokeLinecap="round" />
      </g>
    );
  }

  // run (fetch)
  return (
    <g>
      <ellipse cx="0" cy="10" rx="25" ry="10" fill={DOG_BODY} />
      <ellipse cx="-2" cy="13" rx="15" ry="6" fill={DOG_LIGHT} />
      <rect x="-20" y="14" width="6" height="16" rx="3" fill={DOG_BODY_SHADE} transform="rotate(22 -20 14)" />
      <rect x="-6" y="16" width="6" height="16" rx="3" fill={DOG_BODY} transform="rotate(-14 -6 16)" />
      <rect x="10" y="16" width="6" height="16" rx="3" fill={DOG_BODY_SHADE} transform="rotate(18 10 16)" />
      <rect x="18" y="14" width="6" height="16" rx="3" fill={DOG_BODY} transform="rotate(-20 18 14)" />
      <ellipse cx="25" cy="-2" rx="11" ry="10" fill={DOG_BODY} />
      <ellipse cx="30" cy="1" rx="6" ry="5" fill={DOG_LIGHT} />
      <path d="M 19 -10 Q 14 -19 22 -17 Q 23 -11 19 -10 Z" fill={DOG_EAR} />
      <circle cx="34" cy="-1" r="1.7" fill="#1C1C1C" />
      <path d="M 27 4 Q 30 8 27 11" stroke="#F08CA4" strokeWidth="2.5" fill="none" strokeLinecap="round" />
      <path d="M -23 2 Q -32 -6 -27 -14" stroke={DOG_BODY} strokeWidth="6" fill="none" strokeLinecap="round" />
      <path d="M 21 -7 Q 27 -5 30 0" stroke={COLLAR} strokeWidth="2.5" fill="none" strokeLinecap="round" />
    </g>
  );
}

function Stars() {
  const pts = [
    [30, 24], [70, 14], [110, 30], [150, 12], [190, 26], [230, 16],
    [260, 34], [40, 46], [180, 44], [300, 24], [330, 40], [90, 18],
  ];
  return (
    <g fill="#FFF7DD">
      {pts.map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r={i % 3 === 0 ? 1.6 : 1} opacity={i % 2 === 0 ? 0.95 : 0.6} />
      ))}
    </g>
  );
}

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

        {/* STARGAZING: dusk hill, Sankalp & Thor sitting looking up at the stars */}
        {activeVariant === 'stargazing' && !noBackground && (
          <svg
            width={width}
            height={height}
            viewBox="0 0 340 200"
            xmlns="http://www.w3.org/2000/svg"
            className="transition-transform duration-500 group-hover:scale-[1.01]"
          >
            <defs>
              <linearGradient id="duskSky" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#141A3D" />
                <stop offset="55%" stopColor="#232759" />
                <stop offset="85%" stopColor="#4A3C6E" />
                <stop offset="100%" stopColor="#7A5A7A" />
              </linearGradient>
            </defs>
            <rect width="340" height="200" fill="url(#duskSky)" />
            <Stars />
            <circle cx="286" cy="40" r="16" fill="#F4F1E3" opacity="0.95" />
            <circle cx="280" cy="35" r="14" fill="#232759" opacity="0.35" />
            <Skyline tone="#100E28" />
            <ellipse cx="170" cy="176" rx="220" ry="46" fill="#2E2A46" />
            <ellipse cx="170" cy="172" rx="200" ry="38" fill="#3A3456" />
            <g transform="translate(150, 150)">
              <Dog pose="lie" />
            </g>
            <g transform="translate(112, 138)">
              <Person pose="sit" />
            </g>
          </svg>
        )}

        {/* WALKING: dusk path along a canal-town row, Sankalp walking Thor on a lead */}
        {activeVariant === 'walking' && !noBackground && (
          <svg
            width={width}
            height={height}
            viewBox="0 0 340 210"
            xmlns="http://www.w3.org/2000/svg"
            className="transition-transform duration-500 group-hover:scale-[1.01]"
          >
            <defs>
              <linearGradient id="eveSky" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#4A6FA5" />
                <stop offset="55%" stopColor="#E7A96B" />
                <stop offset="100%" stopColor="#F6D9A8" />
              </linearGradient>
            </defs>
            <rect width="340" height="210" fill="url(#eveSky)" />
            <Skyline tone="#5B4A63" />
            <rect y="150" width="340" height="60" fill="#6B6E76" />
            <rect y="150" width="340" height="6" fill="#EDEDED" opacity="0.6" />
            <Tree x={40} y={148} scale={0.85} />
            <Tree x={300} y={150} scale={0.7} />
            <g transform="translate(190, 118)">
              <Dog pose="walk" />
            </g>
            <path d="M 148 148 Q 168 150 197 122" stroke={COLLAR} strokeWidth="2" fill="none" strokeLinecap="round" opacity="0.85" />
            <g transform="translate(140, 108)">
              <Person pose="walk" />
            </g>
          </svg>
        )}

        {/* STICKER: bright park fetch scene, transparent-ish framed crop */}
        {(activeVariant === 'sticker' || noBackground) && (
          <svg
            width={width}
            height={height}
            viewBox="0 0 300 200"
            xmlns="http://www.w3.org/2000/svg"
            className="transition-transform duration-500 group-hover:scale-[1.02]"
          >
            <defs>
              <linearGradient id="daySky" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#8FC7EA" />
                <stop offset="60%" stopColor="#CDE8DE" />
                <stop offset="100%" stopColor="#EFF3D8" />
              </linearGradient>
            </defs>
            <rect width="300" height="200" fill="url(#daySky)" />
            <circle cx="252" cy="34" r="18" fill="#FFE9A8" opacity="0.9" />
            <Skyline tone="#B9C6D6" />
            <rect y="140" width="300" height="60" fill="#7CAA4C" />
            <rect y="140" width="300" height="8" fill="#9BC46B" />
            <Tree x={252} y={132} scale={0.9} />
            <circle cx="196" cy="58" r="5" fill={BALL} />
            <path d="M 196 58 Q 170 40 150 46" stroke="#FFFFFF" strokeWidth="1.6" strokeDasharray="3 4" fill="none" opacity="0.7" />
            <g transform="translate(190, 124)">
              <Dog pose="run" />
            </g>
            <g transform="translate(96, 96)">
              <Person pose="throw" />
            </g>
          </svg>
        )}

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
