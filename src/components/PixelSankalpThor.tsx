import React, { useState, useEffect } from 'react';
import { playThorPetSound, playCosmicChime } from '../utils/retroAudio';
import { Sparkles, Heart, Maximize2, Volume2, VolumeX } from 'lucide-react';

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
  const [soundMuted, setSoundMuted] = useState(true); // default respectful mute
  const [justPetted, setJustPetted] = useState(false);

  // Sync if prop changes
  useEffect(() => {
    setActiveVariant(initialVariant);
  }, [initialVariant]);

  // Clean up floating hearts
  useEffect(() => {
    if (hearts.length === 0) return;
    const timer = setTimeout(() => {
      setHearts((prev) => prev.slice(1));
    }, 1200);
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
      {
        id: Date.now() + Math.random(),
        x: clickX,
        y: clickY,
        icon: randomIcon,
      },
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

  // Dimensions based on size and variant
  let width = 160;
  let height = 90;

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
    // walking with background
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
      {/* Container frame */}
      <div
        onClick={interactive ? handlePetThor : undefined}
        className={`relative overflow-hidden transition-all duration-300 ${
          isEffectiveTransparent
            ? 'p-1 hover:scale-[1.03] cursor-pointer'
            : 'rounded-xl bg-[#0A0A0A] border border-[#242424] p-1.5 sm:p-2 hover:border-[#6C47FF]/60 shadow-[0_4px_24px_rgba(0,0,0,0.6)] cursor-pointer group'
        }`}
        title={interactive ? 'Click to pet Thor & interact! 🐾' : 'Sankalp & Thor'}
      >
        {/* Ambient background glow in framed mode */}
        {!isEffectiveTransparent && (
          <div className="absolute inset-0 bg-radial-gradient from-[#6C47FF]/15 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
        )}

        {/* Floating Heart Particles when Thor is petted */}
        {hearts.map((h) => (
          <div
            key={h.id}
            className="absolute pointer-events-none text-base z-30 animate-heart-float"
            style={{ left: h.x - 10, top: h.y - 12 }}
          >
            {h.icon}
          </div>
        ))}

        {/* 1. SCENE: STARGAZING ROOFTOP UNDER GALAXIES (Modeled after Screenshot 000959) */}
        {activeVariant === 'stargazing' && !noBackground && (
          <svg
            width={width}
            height={height}
            viewBox="0 0 320 180"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            style={{ imageRendering: 'pixelated', shapeRendering: 'crispEdges' }}
            className="transition-transform duration-500 group-hover:scale-[1.01]"
          >
            {/* Deep Cosmic Gradient Sky */}
            <defs>
              <linearGradient id="cosmicSky" x1="0" y1="0" x2="0" y2="180" gradientUnits="userSpaceOnUse">
                <stop offset="0%" stopColor="#050713" />
                <stop offset="45%" stopColor="#0B1124" />
                <stop offset="75%" stopColor="#151A33" />
                <stop offset="90%" stopColor="#222342" />
                <stop offset="100%" stopColor="#2E2B4B" />
              </linearGradient>

              {/* Galaxy Core Glow */}
              <radialGradient id="galaxyCoreGlow" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(235, 68) scale(62)">
                <stop offset="0%" stopColor="#FFF9E6" stopOpacity="1" />
                <stop offset="18%" stopColor="#FED7AA" stopOpacity="0.9" />
                <stop offset="45%" stopColor="#F472B6" stopOpacity="0.6" />
                <stop offset="75%" stopColor="#8B5CF6" stopOpacity="0.3" />
                <stop offset="100%" stopColor="#6C47FF" stopOpacity="0" />
              </radialGradient>

              <radialGradient id="galaxy2Glow" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(48, 42) scale(38)">
                <stop offset="0%" stopColor="#FFF1F2" stopOpacity="0.95" />
                <stop offset="25%" stopColor="#FDA4AF" stopOpacity="0.7" />
                <stop offset="65%" stopColor="#A855F7" stopOpacity="0.3" />
                <stop offset="100%" stopColor="#4F46E5" stopOpacity="0" />
              </radialGradient>
            </defs>

            {/* Sky Background */}
            <rect width="320" height="180" fill="url(#cosmicSky)" />

            {/* Distant Milky Way Cosmic Dust Band */}
            <path
              d="M0 110 Q90 85 170 65 T320 20"
              stroke="#6C47FF"
              strokeWidth="22"
              strokeOpacity="0.12"
              strokeLinecap="round"
              filter="blur(8px)"
            />
            <path
              d="M0 110 Q90 85 170 65 T320 20"
              stroke="#E879F9"
              strokeWidth="8"
              strokeOpacity="0.15"
              strokeLinecap="round"
              filter="blur(4px)"
            />

            {/* ═════ GIANT SPIRAL GALAXY (Right) ═════ */}
            <g id="giant-galaxy">
              <circle cx="235" cy="68" r="50" fill="url(#galaxyCoreGlow)" />

              {/* Outer Cosmic Spiral Arms (Pixel-Art Clustered Blocks) */}
              {/* Outer arm 1 (Violet & Magenta) */}
              <rect x="230" y="32" width="16" height="4" fill="#6C47FF" opacity="0.8" />
              <rect x="246" y="34" width="18" height="4" fill="#8B5CF6" opacity="0.85" />
              <rect x="264" y="38" width="16" height="5" fill="#A855F7" opacity="0.9" />
              <rect x="280" y="44" width="14" height="6" fill="#C084FC" opacity="0.85" />
              <rect x="290" y="52" width="12" height="7" fill="#E879F9" opacity="0.8" />
              <rect x="296" y="62" width="8" height="9" fill="#F472B6" opacity="0.85" />
              <rect x="292" y="74" width="9" height="7" fill="#F43F5E" opacity="0.75" />
              <rect x="282" y="83" width="12" height="6" fill="#C084FC" opacity="0.7" />
              <rect x="268" y="90" width="14" height="5" fill="#8B5CF6" opacity="0.7" />
              <rect x="252" y="94" width="16" height="4" fill="#6C47FF" opacity="0.65" />

              {/* Inner arm 1 (Pink / Peach) */}
              <rect x="226" y="46" width="14" height="4" fill="#A855F7" />
              <rect x="240" y="48" width="16" height="5" fill="#C084FC" />
              <rect x="256" y="54" width="14" height="6" fill="#F472B6" />
              <rect x="266" y="62" width="10" height="7" fill="#FB7185" />
              <rect x="262" y="71" width="11" height="6" fill="#F43F5E" />
              <rect x="250" y="78" width="13" height="5" fill="#E879F9" />
              <rect x="236" y="82" width="14" height="4" fill="#A855F7" />

              {/* Core Spiral Wrap (Clockwise) */}
              <rect x="218" y="56" width="12" height="4" fill="#C084FC" />
              <rect x="210" y="62" width="9" height="6" fill="#E879F9" />
              <rect x="212" y="70" width="10" height="6" fill="#F472B6" />
              <rect x="222" y="75" width="14" height="5" fill="#FB923C" />

              {/* Brilliant Galactic Nucleus */}
              <rect x="228" y="63" width="14" height="10" rx="2" fill="#FDE68A" />
              <rect x="231" y="65" width="8" height="6" fill="#FFFFFF" />
              <rect x="233" y="66" width="4" height="4" fill="#FFFBEB" className="animate-star-a" />
            </g>

            {/* ═════ SECOND SPIRAL GALAXY (Top-Left) ═════ */}
            <g id="secondary-galaxy">
              <circle cx="48" cy="42" r="30" fill="url(#galaxy2Glow)" />
              {/* Elliptical tilted spiral arms */}
              <rect x="28" y="34" width="12" height="3" fill="#6C47FF" opacity="0.8" />
              <rect x="38" y="32" width="14" height="3" fill="#8B5CF6" opacity="0.85" />
              <rect x="52" y="34" width="14" height="4" fill="#A855F7" />
              <rect x="64" y="39" width="11" height="4" fill="#F472B6" />
              <rect x="68" y="45" width="8" height="5" fill="#FB7185" />
              <rect x="60" y="51" width="12" height="4" fill="#F43F5E" />
              <rect x="46" y="53" width="14" height="3" fill="#C084FC" />
              <rect x="32" y="50" width="12" height="3" fill="#8B5CF6" />
              {/* Nucleus */}
              <rect x="44" y="40" width="8" height="5" rx="1" fill="#FDE68A" />
              <rect x="46" y="41" width="4" height="3" fill="#FFFFFF" />
            </g>

            {/* ═════ THIRD MINI GALAXY (Mid-Left) ═════ */}
            <g id="tertiary-galaxy" opacity="0.85">
              <rect x="36" y="98" width="10" height="3" fill="#8B5CF6" />
              <rect x="45" y="99" width="12" height="3" fill="#C084FC" />
              <rect x="55" y="103" width="9" height="3" fill="#F472B6" />
              <rect x="58" y="108" width="6" height="4" fill="#FB7185" />
              <rect x="50" y="112" width="10" height="3" fill="#C084FC" />
              <rect x="38" y="110" width="11" height="3" fill="#6C47FF" />
              {/* Core */}
              <rect x="46" y="105" width="6" height="4" fill="#FED7AA" />
              <rect x="48" y="106" width="2" height="2" fill="#FFFFFF" />
            </g>

            {/* ═════ TWINKLING 4-POINT PIXEL STARS ═════ */}
            {/* Major Star 1 */}
            <g className="animate-star-a" style={{ transformOrigin: '80px 24px' }}>
              <rect x="79" y="20" width="2" height="10" fill="#FFFFFF" />
              <rect x="75" y="24" width="10" height="2" fill="#FFFFFF" />
              <rect x="79" y="24" width="2" height="2" fill="#FDE68A" />
            </g>

            {/* Major Star 2 */}
            <g className="animate-star-b" style={{ transformOrigin: '148px 36px' }}>
              <rect x="147" y="32" width="2" height="9" fill="#FFFFFF" />
              <rect x="143.5" y="35.5" width="9" height="2" fill="#FFFFFF" />
              <rect x="147" y="35.5" width="2" height="2" fill="#C084FC" />
            </g>

            {/* Major Star 3 */}
            <g className="animate-star-a" style={{ transformOrigin: '210px 50px' }}>
              <rect x="209" y="46" width="2" height="8" fill="#FFFFFF" />
              <rect x="206" y="49" width="8" height="2" fill="#FFFFFF" />
              <rect x="209" y="49" width="2" height="2" fill="#FFF" />
            </g>

            {/* Major Star 4 */}
            <g className="animate-star-b" style={{ transformOrigin: '175px 68px' }}>
              <rect x="174" y="64" width="2" height="8" fill="#FFFFFF" />
              <rect x="171" y="67" width="8" height="2" fill="#FFFFFF" />
              <rect x="174" y="67" width="2" height="2" fill="#88E5FF" />
            </g>

            {/* Field of smaller twinkling stars */}
            <rect x="18" y="15" width="2" height="2" fill="#FFFFFF" opacity="0.9" />
            <rect x="32" y="22" width="1.5" height="1.5" fill="#E879F9" opacity="0.8" />
            <rect x="95" y="12" width="1.5" height="1.5" fill="#FFFFFF" opacity="0.9" />
            <rect x="115" y="28" width="2" height="2" fill="#C084FC" opacity="0.8" />
            <rect x="128" y="16" width="1.5" height="1.5" fill="#FFFFFF" opacity="0.85" />
            <rect x="162" y="18" width="2" height="2" fill="#FED7AA" opacity="0.9" />
            <rect x="185" y="32" width="1.5" height="1.5" fill="#FFFFFF" opacity="0.75" />
            <rect x="202" y="20" width="2" height="2" fill="#C084FC" opacity="0.85" />
            <rect x="245" y="15" width="1.5" height="1.5" fill="#FFFFFF" opacity="0.8" />
            <rect x="270" y="24" width="2" height="2" fill="#F472B6" opacity="0.85" />
            <rect x="295" y="18" width="1.5" height="1.5" fill="#FFFFFF" opacity="0.75" />
            <rect x="308" y="35" width="2" height="2" fill="#FDE68A" opacity="0.9" />
            <rect x="28" y="70" width="1.5" height="1.5" fill="#FFFFFF" opacity="0.7" />
            <rect x="105" y="60" width="2" height="2" fill="#C084FC" opacity="0.8" />
            <rect x="122" y="74" width="1.5" height="1.5" fill="#FFFFFF" opacity="0.85" />
            <rect x="140" y="88" width="1.5" height="1.5" fill="#E879F9" opacity="0.7" />
            <rect x="188" y="85" width="2" height="2" fill="#FFFFFF" opacity="0.9" />
            <rect x="305" y="88" width="2" height="2" fill="#C084FC" opacity="0.8" />

            {/* ═════ DUSK HORIZON CLOUDS (Billowy Pixel Steps) ═════ */}
            <g id="horizon-clouds">
              {/* Left Clouds */}
              <rect x="0" y="112" width="35" height="24" rx="3" fill="#1C243B" opacity="0.9" />
              <rect x="18" y="104" width="28" height="20" rx="3" fill="#25304C" opacity="0.9" />
              <rect x="36" y="115" width="30" height="18" rx="2" fill="#1E273F" opacity="0.85" />
              <rect x="58" y="122" width="25" height="14" rx="2" fill="#171E33" opacity="0.8" />

              {/* Right Clouds */}
              <rect x="240" y="114" width="35" height="22" rx="3" fill="#1A2136" opacity="0.85" />
              <rect x="260" y="106" width="36" height="24" rx="3" fill="#25304C" opacity="0.9" />
              <rect x="285" y="98" width="35" height="34" rx="3" fill="#2B3654" opacity="0.95" />
              {/* Cloud highlight edges */}
              <rect x="20" y="103" width="22" height="2" fill="#4B5E88" opacity="0.6" />
              <rect x="265" y="105" width="26" height="2" fill="#4B5E88" opacity="0.6" />
              <rect x="290" y="97" width="25" height="2" fill="#586E9E" opacity="0.7" />
            </g>

            {/* ═════ ROOFTOP SHINGLES & RIDGE ═════ */}
            <g id="rooftop-ridge">
              {/* Top ridge beam */}
              <rect x="0" y="138" width="320" height="5" fill="#3B2A22" />
              <rect x="0" y="137" width="320" height="1.5" fill="#5A4337" />

              {/* Overlapping terracotta / slate roof tile steps */}
              <rect x="0" y="143" width="320" height="37" fill="#241914" />

              {/* Tile vertical seam lines with depth shading */}
              {Array.from({ length: 18 }).map((_, idx) => {
                const x = idx * 18 + 2;
                return (
                  <g key={`tile-${idx}`}>
                    <rect x={x} y="143" width="16" height="11" fill="#32231C" />
                    <rect x={x} y="143" width="16" height="1.5" fill="#483328" />
                    <rect x={x + 15} y="143" width="1.5" height="11" fill="#1B120E" />

                    <rect x={x - 6} y="154" width="16" height="12" fill="#2C1E18" />
                    <rect x={x - 6} y="154" width="16" height="1.5" fill="#3E2B21" />
                    <rect x={x + 9} y="154" width="1.5" height="12" fill="#170F0C" />

                    <rect x={x} y="166" width="16" height="14" fill="#251A15" />
                    <rect x={x} y="166" width="16" height="1.5" fill="#36251D" />
                    <rect x={x + 15} y="166" width="1.5" height="14" fill="#140D0A" />
                  </g>
                );
              })}
            </g>

            {/* ═════ SANKALP & THOR SITTING TOGETHER (VIEW FROM BEHIND) ═════ */}
            <g id="sankalp-and-thor" className="transition-transform duration-300">
              {/* ─── SANKALP SHAH (BACK VIEW, LEFT) ─── */}
              {/* Position: X: 108 to 154, Y: 72 to 146 */}
              <g id="sankalp-rooftop">
                {/* Sitting Jeans / Legs dangling slightly */}
                <rect x="110" y="128" width="42" height="14" rx="2" fill="#1E293B" />
                <rect x="112" y="139" width="16" height="5" fill="#161F2E" /> {/* Left thigh */}
                <rect x="134" y="139" width="16" height="5" fill="#161F2E" /> {/* Right thigh */}
                <rect x="122" y="130" width="16" height="12" fill="#27354A" /> {/* Center seat crease */}

                {/* Heather Grey Crewneck Sweatshirt (Back) */}
                <rect x="113" y="93" width="37" height="37" rx="3" fill="#64748B" />
                <rect x="116" y="95" width="31" height="33" rx="2" fill="#94A3B8" />

                {/* Textured knit shading & back crease highlights */}
                <rect x="120" y="97" width="23" height="27" fill="#CBD5E1" />
                <rect x="124" y="100" width="15" height="22" fill="#E2E8F0" />
                <rect x="130" y="103" width="3" height="16" fill="#CBD5E1" />

                {/* Ribbed bottom waistband */}
                <rect x="115" y="126" width="33" height="4" fill="#64748B" />
                <rect x="116" y="127" width="31" height="2" fill="#475569" />

                {/* Left Arm (resting relaxed beside torso) */}
                <rect x="107" y="98" width="8" height="24" rx="2" fill="#64748B" />
                <rect x="108" y="100" width="6" height="20" fill="#94A3B8" />
                <rect x="107" y="121" width="7" height="3" fill="#475569" /> {/* cuff */}
                <rect x="108" y="124" width="6" height="5" rx="1" fill="#E5B290" /> {/* hand */}

                {/* Ribbed crewneck collar */}
                <rect x="126" y="91" width="12" height="3.5" rx="1" fill="#475569" />
                <rect x="128" y="92" width="8" height="1.5" fill="#64748B" />

                {/* Neck */}
                <rect x="128" y="87" width="8" height="5" fill="#E5B290" />
                <rect x="129" y="88" width="6" height="4" fill="#F5D0B5" />

                {/* Head & Dark Messy/Wavy Hair */}
                <rect x="122" y="73" width="20" height="17" rx="4" fill="#18181B" />
                <rect x="124" y="74" width="16" height="14" rx="3" fill="#27272A" />
                {/* Hair volume & texture spikes */}
                <rect x="120" y="75" width="4" height="6" fill="#18181B" />
                <rect x="138" y="75" width="4" height="7" fill="#18181B" />
                <rect x="127" y="70" width="11" height="5" fill="#18181B" />
                <rect x="129" y="72" width="7" height="4" fill="#3F3F46" /> {/* hair light highlight */}

                {/* ─── RIGHT ARM WRAPPED AFFECTIONATELY AROUND THOR ─── */}
                {/* Shoulder and sleeve stretching across */}
                <rect x="144" y="97" width="20" height="9" rx="2" fill="#64748B" />
                <rect x="145" y="98" width="18" height="7" fill="#94A3B8" />
                <rect x="156" y="99" width="14" height="8" rx="2" fill="#CBD5E1" />
                <rect x="168" y="101" width="5" height="6" fill="#64748B" /> {/* cuff */}
                {/* Hand resting gently on Thor's side/shoulder */}
                <rect x="173" y="101" width="7" height="6" rx="1" fill="#E5B290" />
                <rect x="174" y="102" width="5" height="4" fill="#F5D0B5" />
              </g>

              {/* ─── THOR (GREY & WHITE STAFFY, SITTING BY SANKALP) ─── */}
              {/* Position: X: 162 to 198, Y: 84 to 144 */}
              <g id="thor-rooftop">
                {/* Thor's tail resting on roof tiles with white tip (animated wag!) */}
                <g className={isHovered || justPetted ? 'animate-tail-wag' : ''} style={{ transformOrigin: '194px 132px' }}>
                  <rect x="193" y="130" width="7" height="4" rx="1" fill="#475569" />
                  <rect x="198" y="132" width="8" height="3" rx="1" fill="#64748B" />
                  <rect x="204" y="131" width="6" height="3" rx="1" fill="#94A3B8" />
                  <rect x="208" y="129" width="5" height="3" fill="#FFFFFF" /> {/* signature white tip! */}
                </g>

                {/* Thor's hindquarters / sitting base */}
                <rect x="165" y="122" width="28" height="17" rx="3" fill="#334155" />
                <rect x="168" y="124" width="22" height="13" rx="2" fill="#475569" />
                {/* White hind paw patch */}
                <rect x="164" y="136" width="6" height="3" fill="#FFFFFF" />

                {/* Thor's muscular back & torso */}
                <rect x="165" y="102" width="23" height="24" rx="3" fill="#475569" />
                <rect x="167" y="104" width="19" height="20" rx="2" fill="#64748B" />
                {/* Muscular spine highlight */}
                <rect x="175" y="106" width="5" height="15" fill="#94A3B8" />

                {/* Thor's distinctive White Collar / Neck Patch */}
                <rect x="168" y="96" width="17" height="8" rx="2" fill="#F8FAFC" />
                <rect x="170" y="97" width="13" height="6" fill="#FFFFFF" />
                <rect x="166" y="99" width="4" height="4" fill="#E2E8F0" />

                {/* Collar accent (Purple) with tiny brass tag */}
                <rect x="168" y="102" width="16" height="2" fill="#6C47FF" />
                <rect x="175" y="104" width="2.5" height="2" fill="#F59E0B" />

                {/* Thor's Broad Staffy Head (facing the cosmos) */}
                <rect x="166" y="83" width="19" height="15" rx="3" fill="#475569" />
                <rect x="168" y="84" width="15" height="13" rx="2" fill="#64748B" />
                {/* Top of head highlight */}
                <rect x="172" y="84" width="7" height="4" fill="#94A3B8" />

                {/* Staffy folded rose ears (alert and listening) */}
                <rect x="163" y="85" width="4" height="6" rx="1" fill="#334155" />
                <rect x="184" y="85" width="4" height="6" rx="1" fill="#334155" />

                {/* White stripe on back of neck/head */}
                <rect x="173" y="89" width="5" height="7" fill="#FFFFFF" />
              </g>
            </g>
          </svg>
        )}

        {/* 2. SCENE: ON THE ROAD (WALKING JOURNEY) (Modeled after Screenshot 000905 & 000915) */}
        {activeVariant === 'walking' && !noBackground && (
          <svg
            width={width}
            height={height}
            viewBox="0 0 320 195"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            style={{ imageRendering: 'pixelated', shapeRendering: 'crispEdges' }}
            className="transition-transform duration-500 group-hover:scale-[1.01]"
          >
            {/* Soft Ambient Village Sky */}
            <defs>
              <linearGradient id="villageSky" x1="0" y1="0" x2="0" y2="195" gradientUnits="userSpaceOnUse">
                <stop offset="0%" stopColor="#121629" />
                <stop offset="50%" stopColor="#1E2238" />
                <stop offset="85%" stopColor="#2A243D" />
                <stop offset="100%" stopColor="#151722" />
              </linearGradient>
            </defs>

            <rect width="320" height="195" fill="url(#villageSky)" />

            {/* Distant European Village Skyline (Silhouette & warm windows) */}
            <g id="village-skyline" opacity="0.85">
              {/* Church Tower & Spire */}
              <rect x="145" y="48" width="18" height="45" fill="#1A1C2C" />
              <polygon points="154,20 145,48 163,48" fill="#151724" />
              <rect x="153" y="16" width="2" height="6" fill="#F59E0B" /> {/* spire cross/finial */}
              <rect x="150" y="58" width="8" height="12" rx="3" fill="#28223D" /> {/* belfry */}

              {/* Timber-framed Houses (Left) */}
              <polygon points="40,42 0,68 80,68" fill="#1C182B" />
              <rect x="8" y="68" width="68" height="45" fill="#181724" />
              <rect x="22" y="74" width="10" height="12" fill="#F59E0B" opacity="0.6" /> {/* illuminated window */}
              <rect x="48" y="74" width="10" height="12" fill="#F59E0B" opacity="0.5" />

              {/* Timber-framed Houses (Right) */}
              <polygon points="250,38 200,68 300,68" fill="#1F1A30" />
              <rect x="210" y="68" width="80" height="45" fill="#181726" />
              <rect x="226" y="75" width="12" height="14" fill="#F59E0B" opacity="0.65" />
              <rect x="256" y="75" width="12" height="14" fill="#F59E0B" opacity="0.4" />
            </g>

            {/* Vintage Street Lamp (Left) */}
            <g id="street-lamp">
              <rect x="26" y="75" width="3" height="75" fill="#2D3748" />
              <rect x="24" y="68" width="7" height="8" rx="1" fill="#F59E0B" opacity="0.9" />
              <circle cx="27.5" cy="72" r="14" fill="#F59E0B" opacity="0.15" />
            </g>

            {/* Cobblestone Ground */}
            <g id="cobblestones">
              <rect x="0" y="146" width="320" height="49" fill="#171922" />
              <rect x="0" y="145" width="320" height="2" fill="#2A2E3D" />
              {/* Individual stone textures */}
              {Array.from({ length: 24 }).map((_, i) => (
                <rect key={`cobble-${i}`} x={i * 14 + (i % 2) * 5} y={152 + (i % 4) * 8} width="11" height="4" rx="1" fill="#252A38" opacity="0.75" />
              ))}
              {/* Walking Cast Shadow */}
              <ellipse cx="120" cy="164" rx="35" ry="6" fill="#0A0B10" opacity="0.8" />
              <ellipse cx="198" cy="166" rx="26" ry="5" fill="#0A0B10" opacity="0.8" />
            </g>

            {/* ═════ CHARACTERS ON THE ROAD ═════ */}
            {/* SANKALP WALKING */}
            <g id="sankalp-walking" className="animate-walk-bob" style={{ transformOrigin: '190px 100px' }}>
              {/* Travel Backpack (Brown leather) */}
              <rect x="162" y="66" width="18" height="34" rx="4" fill="#78350F" />
              <rect x="160" y="72" width="6" height="22" rx="2" fill="#5E270A" />
              <rect x="165" y="68" width="13" height="10" rx="2" fill="#92400E" />
              <rect x="170" y="62" width="4" height="5" rx="1" fill="#451A03" /> {/* top loop handle */}

              {/* Far Leg (left, back stride) */}
              <rect x="188" y="112" width="10" height="28" rx="2" fill="#1E293B" />
              <rect x="186" y="134" width="10" height="20" rx="2" fill="#172033" />
              {/* Shoe */}
              <rect x="180" y="152" width="15" height="7" rx="1" fill="#78350F" />
              <rect x="179" y="157" width="17" height="3" rx="1" fill="#FFFFFF" /> {/* crisp white sole */}

              {/* Near Leg (right, forward stride) */}
              <rect x="198" y="112" width="11" height="27" rx="2" fill="#334155" />
              <rect x="203" y="132" width="11" height="23" rx="2" fill="#293548" />
              {/* Shoe */}
              <rect x="204" y="153" width="16" height="7" rx="1" fill="#92400E" />
              <rect x="203" y="158" width="18" height="3" rx="1" fill="#FFFFFF" /> {/* white sole */}

              {/* Torso: Heather Grey Sweatshirt */}
              <rect x="175" y="62" width="32" height="52" rx="4" fill="#64748B" />
              <rect x="177" y="64" width="28" height="46" rx="3" fill="#94A3B8" />
              <rect x="181" y="68" width="21" height="38" fill="#CBD5E1" />
              {/* Ribbed crewneck & bottom hem */}
              <rect x="186" y="60" width="15" height="4" rx="1" fill="#475569" />
              <rect x="177" y="108" width="30" height="5" rx="1" fill="#475569" />

              {/* Backpack front shoulder straps with buckles */}
              <rect x="182" y="66" width="5" height="32" fill="#78350F" />
              <rect x="196" y="66" width="5" height="32" fill="#78350F" />
              <rect x="182" y="82" width="5" height="3" fill="#F59E0B" /> {/* brass buckle */}
              <rect x="196" y="82" width="5" height="3" fill="#F59E0B" />

              {/* Near Arm (relaxed swing) */}
              <rect x="203" y="66" width="9" height="32" rx="3" fill="#94A3B8" />
              <rect x="203" y="96" width="9" height="4" fill="#64748B" /> {/* cuff */}
              <rect x="204" y="100" width="8" height="7" rx="2" fill="#F5D0B5" /> {/* hand */}

              {/* Neck */}
              <rect x="190" y="54" width="9" height="8" fill="#F5D0B5" />

              {/* Head & Face (3/4 Profile) */}
              <rect x="186" y="38" width="20" height="20" rx="3" fill="#F5D0B5" />
              <rect x="204" y="44" width="4" height="6" rx="1" fill="#E5B290" /> {/* nose */}
              <rect x="197" y="44" width="3" height="3" fill="#18181B" /> {/* dark eye */}
              <rect x="198" y="44" width="1" height="1" fill="#FFFFFF" /> {/* eye shine */}
              <rect x="196" y="52" width="6" height="2" rx="1" fill="#881337" /> {/* friendly smile */}
              {/* Jawline stubble */}
              <rect x="187" y="52" width="16" height="4" fill="#E5B290" opacity="0.6" />

              {/* Messy Dark Spiky Hair */}
              <rect x="184" y="30" width="22" height="12" rx="4" fill="#18181B" />
              <rect x="181" y="34" width="6" height="10" rx="2" fill="#18181B" />
              <rect x="190" y="28" width="14" height="8" rx="2" fill="#27272A" />
              <rect x="196" y="30" width="8" height="4" fill="#3F3F46" /> {/* hair highlight */}
            </g>

            {/* THOR TROTTING BESIDE SANKALP */}
            <g id="thor-walking" className="animate-thor-trot" style={{ transformOrigin: '120px 130px' }}>
              {/* Tail up in a happy curve (animated wag!) */}
              <g className={isHovered || justPetted ? 'animate-tail-wag' : ''} style={{ transformOrigin: '78px 126px' }}>
                <rect x="74" y="122" width="8" height="5" rx="2" fill="#475569" />
                <rect x="69" y="117" width="8" height="6" rx="2" fill="#64748B" />
                <rect x="66" y="110" width="6" height="9" rx="2" fill="#94A3B8" />
                <rect x="66" y="106" width="5" height="5" rx="1" fill="#FFFFFF" /> {/* white tail tip */}
              </g>

              {/* Hind Leg (far) */}
              <rect x="84" y="132" width="7" height="18" rx="2" fill="#334155" />
              <rect x="83" y="148" width="8" height="6" fill="#CBD5E1" />

              {/* Hind Leg (near, muscular thigh) */}
              <rect x="94" y="128" width="11" height="20" rx="3" fill="#475569" />
              <rect x="96" y="146" width="9" height="9" rx="2" fill="#FFFFFF" /> {/* white hind sock */}

              {/* Muscular Torso */}
              <rect x="86" y="114" width="34" height="24" rx="4" fill="#475569" />
              <rect x="89" y="112" width="28" height="18" rx="3" fill="#64748B" />
              {/* Shoulder & flank highlight */}
              <rect x="96" y="115" width="14" height="9" fill="#94A3B8" />

              {/* Front Leg (far) */}
              <rect x="110" y="132" width="7" height="18" rx="2" fill="#334155" />
              <rect x="109" y="148" width="8" height="6" fill="#CBD5E1" />

              {/* Front Leg (near, stepping forward) */}
              <rect x="124" y="130" width="9" height="19" rx="2" fill="#64748B" />
              <rect x="124" y="146" width="10" height="8" rx="2" fill="#FFFFFF" /> {/* white front paw */}

              {/* Broad Muscular Chest & White Bib */}
              <rect x="116" y="112" width="15" height="24" rx="4" fill="#475569" />
              {/* Distinctive White Chest Blaze (Bib) */}
              <rect x="120" y="114" width="11" height="19" rx="2" fill="#FFFFFF" />
              <rect x="118" y="120" width="7" height="11" fill="#F8FAFC" />

              {/* Purple collar & Brass tag */}
              <rect x="123" y="108" width="12" height="3" fill="#6C47FF" />
              <rect x="128" y="111" width="3" height="3" rx="1" fill="#F59E0B" />

              {/* Broad Staffy Neck & Head */}
              <rect x="122" y="98" width="15" height="14" rx="3" fill="#475569" />
              <rect x="128" y="88" width="22" height="22" rx="5" fill="#475569" />
              <rect x="131" y="89" width="17" height="18" rx="4" fill="#64748B" />

              {/* Floppy folded rose ears */}
              <rect x="127" y="86" width="6" height="8" rx="2" fill="#334155" />
              <rect x="138" y="85" width="7" height="6" rx="2" fill="#334155" />

              {/* Thor's Signature White Blaze (between eyes) */}
              <rect x="138" y="90" width="5" height="14" fill="#FFFFFF" />

              {/* Broad Muzzle with White Nose Band */}
              <rect x="142" y="98" width="14" height="12" rx="3" fill="#FFFFFF" />
              <rect x="151" y="98" width="6" height="5" rx="1" fill="#18181B" /> {/* black nose leather */}

              {/* Open Mouth with Cute Pink Panting Tongue */}
              <rect x="147" y="105" width="8" height="5" rx="1" fill="#881337" />
              <rect x="148" y="107" width="8" height="6" rx="2" fill="#F472B6" /> {/* pink tongue! */}

              {/* Dark Expressive Soulful Eye with White Catchlight */}
              <rect x="135" y="92" width="4" height="4" rx="1" fill="#18181B" />
              <rect x="136" y="92" width="1.5" height="1.5" fill="#FFFFFF" />
            </g>
          </svg>
        )}

        {/* 3. SCENE: TRANSPARENT STICKER CUTOUT (WITHOUT BACKGROUND) */}
        {(activeVariant === 'sticker' || noBackground) && (
          <svg
            width={width}
            height={height}
            viewBox="0 0 240 170"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            style={{ imageRendering: 'pixelated', shapeRendering: 'crispEdges' }}
            className="transition-transform duration-300 hover:scale-105 filter drop-shadow-[0_8px_16px_rgba(0,0,0,0.8)]"
          >
            {/* Subtle Ground Shadows */}
            <ellipse cx="64" cy="158" rx="34" ry="5" fill="#000000" opacity="0.6" />
            <ellipse cx="158" cy="160" rx="42" ry="6" fill="#000000" opacity="0.6" />

            {/* THOR (LEFT / WALKING BESIDE) */}
            <g id="thor-sticker" className="animate-thor-trot" style={{ transformOrigin: '65px 120px' }}>
              {/* Tail with white tip */}
              <g className={isHovered || justPetted ? 'animate-tail-wag' : ''} style={{ transformOrigin: '24px 116px' }}>
                <rect x="20" y="112" width="7" height="4" fill="#475569" />
                <rect x="15" y="107" width="7" height="5" fill="#64748B" />
                <rect x="12" y="101" width="5" height="7" fill="#94A3B8" />
                <rect x="11" y="97" width="5" height="5" fill="#FFFFFF" />
              </g>

              {/* Hind Leg (far) */}
              <rect x="28" y="122" width="6" height="18" fill="#334155" />
              <rect x="27" y="138" width="7" height="6" fill="#E2E8F0" />

              {/* Hind Leg (near) */}
              <rect x="38" y="118" width="10" height="20" rx="2" fill="#475569" />
              <rect x="39" y="136" width="9" height="9" fill="#FFFFFF" />

              {/* Muscular Torso */}
              <rect x="30" y="104" width="34" height="24" rx="3" fill="#475569" />
              <rect x="33" y="102" width="28" height="18" fill="#64748B" />
              <rect x="40" y="105" width="14" height="9" fill="#94A3B8" />

              {/* Front Leg (far) */}
              <rect x="54" y="122" width="6" height="18" fill="#334155" />
              <rect x="53" y="138" width="7" height="6" fill="#E2E8F0" />

              {/* Front Leg (near) */}
              <rect x="68" y="120" width="8" height="20" rx="2" fill="#64748B" />
              <rect x="68" y="136" width="9" height="9" fill="#FFFFFF" />

              {/* Chest & White Blaze */}
              <rect x="60" y="102" width="14" height="24" rx="3" fill="#475569" />
              <rect x="64" y="104" width="10" height="20" rx="2" fill="#FFFFFF" />

              {/* Purple Collar */}
              <rect x="68" y="99" width="11" height="3" fill="#6C47FF" />
              <rect x="73" y="102" width="3" height="3" fill="#F59E0B" />

              {/* Head & Muzzle */}
              <rect x="67" y="89" width="14" height="13" fill="#475569" />
              <rect x="72" y="80" width="21" height="20" rx="4" fill="#475569" />
              <rect x="75" y="81" width="16" height="16" rx="3" fill="#64748B" />

              {/* Ears */}
              <rect x="71" y="77" width="6" height="7" fill="#334155" />
              <rect x="82" y="76" width="6" height="6" fill="#334155" />

              {/* White Blaze between eyes */}
              <rect x="82" y="82" width="5" height="12" fill="#FFFFFF" />

              {/* Muzzle & Tongue */}
              <rect x="86" y="88" width="13" height="12" rx="2" fill="#FFFFFF" />
              <rect x="94" y="88" width="6" height="5" fill="#18181B" />
              <rect x="90" y="96" width="8" height="6" rx="2" fill="#F472B6" />

              {/* Soulful Eye */}
              <rect x="79" y="83" width="4" height="4" fill="#18181B" />
              <rect x="80" y="83" width="1.5" height="1.5" fill="#FFFFFF" />
            </g>

            {/* SANKALP (RIGHT / WALKING) */}
            <g id="sankalp-sticker" className="animate-walk-bob" style={{ transformOrigin: '150px 80px' }}>
              {/* Brown Backpack */}
              <rect x="122" y="48" width="16" height="34" rx="4" fill="#78350F" />
              <rect x="120" y="54" width="5" height="22" fill="#5E270A" />
              <rect x="124" y="50" width="12" height="10" fill="#92400E" />

              {/* Far Leg (back stride) */}
              <rect x="146" y="96" width="10" height="28" fill="#1E293B" />
              <rect x="144" y="118" width="9" height="22" fill="#172033" />
              <rect x="139" y="137" width="14" height="7" fill="#78350F" />
              <rect x="138" y="142" width="16" height="3" fill="#FFFFFF" />

              {/* Near Leg (forward stride) */}
              <rect x="156" y="96" width="10" height="26" fill="#334155" />
              <rect x="160" y="116" width="11" height="24" fill="#293548" />
              <rect x="162" y="138" width="16" height="7" fill="#92400E" />
              <rect x="161" y="143" width="18" height="3" fill="#FFFFFF" />

              {/* Grey Sweatshirt */}
              <rect x="134" y="44" width="32" height="54" rx="4" fill="#64748B" />
              <rect x="136" y="46" width="28" height="48" rx="3" fill="#94A3B8" />
              <rect x="140" y="50" width="20" height="40" fill="#CBD5E1" />
              <rect x="146" y="42" width="14" height="4" fill="#475569" />
              <rect x="136" y="93" width="30" height="5" fill="#475569" />

              {/* Straps */}
              <rect x="141" y="48" width="5" height="32" fill="#78350F" />
              <rect x="155" y="48" width="5" height="32" fill="#78350F" />
              <rect x="141" y="64" width="5" height="3" fill="#F59E0B" />
              <rect x="155" y="64" width="5" height="3" fill="#F59E0B" />

              {/* Arm */}
              <rect x="162" y="48" width="9" height="32" rx="2" fill="#94A3B8" />
              <rect x="162" y="78" width="9" height="4" fill="#64748B" />
              <rect x="163" y="82" width="8" height="7" fill="#F5D0B5" />

              {/* Neck & Face */}
              <rect x="149" y="36" width="9" height="9" fill="#F5D0B5" />
              <rect x="145" y="20" width="20" height="20" rx="3" fill="#F5D0B5" />
              <rect x="163" y="26" width="4" height="6" fill="#E5B290" />
              <rect x="156" y="26" width="3" height="3" fill="#18181B" />
              <rect x="157" y="26" width="1" height="1" fill="#FFFFFF" />
              <rect x="155" y="34" width="6" height="2" fill="#881337" />

              {/* Hair */}
              <rect x="143" y="12" width="22" height="12" rx="4" fill="#18181B" />
              <rect x="140" y="16" width="6" height="10" fill="#18181B" />
              <rect x="149" y="10" width="14" height="8" fill="#27272A" />
              <rect x="155" y="12" width="8" height="4" fill="#3F3F46" />
            </g>
          </svg>
        )}

        {/* Hover / Active Interaction Pill */}
        {interactive && (
          <div
            className={`absolute bottom-2 right-2 flex items-center gap-1 text-[10px] font-mono px-2 py-0.5 rounded-full backdrop-blur-md transition-all duration-200 z-20 ${
              isHovered
                ? 'bg-[#6C47FF]/90 text-white shadow-[0_0_12px_rgba(108,71,255,0.6)]'
                : 'bg-black/60 text-[#AAAAAA] opacity-0 group-hover:opacity-100'
            }`}
          >
            <Heart className={`w-3 h-3 text-pink-400 ${justPetted ? 'scale-125 text-red-400' : ''}`} />
            <span>{justPetted ? 'Thor loved that!' : petCount > 0 ? `${petCount} pets` : 'Pet Thor'}</span>
          </div>
        )}
      </div>

      {/* Control Bar (Toggle Scenes, Audio & Expand) */}
      {showControls && (
        <div className="mt-2.5 flex items-center justify-between gap-2 w-full max-w-[340px] px-1 text-xs">
          {/* Scene selector tabs */}
          <div className="flex items-center bg-[#171717] border border-[#2B2B2B] rounded-lg p-0.5">
            <button
              onClick={(e) => { e.stopPropagation(); setActiveVariant('stargazing'); }}
              className={`px-2.5 py-1 rounded text-[11px] font-mono transition-colors ${
                activeVariant === 'stargazing'
                  ? 'bg-[#6C47FF] text-white font-semibold shadow-sm'
                  : 'text-[#888888] hover:text-white'
              }`}
              title="Rooftop under spiral galaxies"
            >
              🌌 Rooftop
            </button>
            <button
              onClick={(e) => { e.stopPropagation(); setActiveVariant('walking'); }}
              className={`px-2.5 py-1 rounded text-[11px] font-mono transition-colors ${
                activeVariant === 'walking'
                  ? 'bg-[#6C47FF] text-white font-semibold shadow-sm'
                  : 'text-[#888888] hover:text-white'
              }`}
              title="Walking through European village"
            >
              🐾 On Road
            </button>
            <button
              onClick={(e) => { e.stopPropagation(); setActiveVariant('sticker'); }}
              className={`px-2.5 py-1 rounded text-[11px] font-mono transition-colors ${
                activeVariant === 'sticker'
                  ? 'bg-[#6C47FF] text-white font-semibold shadow-sm'
                  : 'text-[#888888] hover:text-white'
              }`}
              title="Transparent cutout sticker without background"
            >
              ✨ Cutout
            </button>
          </div>

          {/* Audio toggle & Expand */}
          <div className="flex items-center gap-1">
            <button
              onClick={(e) => {
                e.stopPropagation();
                setSoundMuted(!soundMuted);
                if (soundMuted) playThorPetSound(false);
              }}
              className="p-1.5 rounded-md bg-[#171717] border border-[#2B2B2B] text-[#888888] hover:text-white transition-colors"
              title={soundMuted ? 'Turn on 8-bit sound' : 'Mute 8-bit sound'}
              aria-label="Toggle retro audio"
            >
              {soundMuted ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5 text-[#6C47FF]" />}
            </button>

            {onExpand && (
              <button
                onClick={(e) => { e.stopPropagation(); onExpand(); }}
                className="p-1.5 rounded-md bg-[#171717] border border-[#2B2B2B] text-[#888888] hover:text-white transition-colors"
                title="Expand full cinema view"
                aria-label="Expand scene"
              >
                <Maximize2 className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>
      )}

      {/* Optional Caption */}
      {showCaption && (
        <div className="mt-2 text-center">
          <p className="text-xs font-mono text-[#888888]">
            {activeVariant === 'stargazing'
              ? 'Sankalp & Thor · Stargazing on the roof'
              : 'Sankalp & Thor · On the trail'}
          </p>
        </div>
      )}
    </div>
  );
}
