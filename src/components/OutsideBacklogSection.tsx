import React, { useState } from 'react';
import PixelSankalpThor, { PixelSceneVariant } from './PixelSankalpThor';
import ThorCinemaModal from './ThorCinemaModal';
import TravelGalleryModal from './TravelGalleryModal';
import { playSoftBark } from '../utils/retroAudio';
import { Maximize2, ExternalLink, Image as ImageIcon, Heart } from 'lucide-react';

interface FloatingHeart {
  id: number;
  x: number;
  y: number;
}

export default function OutsideBacklogSection() {
  const [isCinemaOpen, setIsCinemaOpen] = useState(false);
  const [isTravelOpen, setIsTravelOpen] = useState(false);
  const [thorVariant, setThorVariant] = useState<PixelSceneVariant>('sticker');
  const [thorHearts, setThorHearts] = useState<FloatingHeart[]>([]);

  const handleThorClick = (e: React.MouseEvent) => {
    // Play soft bark sound using Web Audio
    playSoftBark(false);

    // Spawn floating heart
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const newHeart: FloatingHeart = {
      id: Date.now() + Math.random(),
      x,
      y,
    };

    setThorHearts((prev) => [...prev, newHeart]);
    setTimeout(() => {
      setThorHearts((prev) => prev.filter((h) => h.id !== newHeart.id));
    }, 1000);
  };

  return (
    <section id="outside-backlog" className="py-24 sm:py-28 relative z-10 border-t border-[#202020]">
      <div className="max-w-6xl mx-auto px-6 sm:px-8">
        {/* Section Header */}
        <div className="mb-14">
          <div className="flex items-center gap-4 mb-4">
            <span className="text-[10px] font-bold tracking-[0.15em] uppercase text-[#6C47FF]">
              Interests
            </span>
            <div className="flex-1 h-[1px] bg-[#252525]" />
          </div>

          <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2">
            <h2 className="font-syne font-bold text-2xl sm:text-3xl md:text-4xl text-[#F2F2F2] tracking-tight">
              Outside the backlog and sprints
            </h2>
            <p className="text-xs sm:text-sm text-[#777777] font-mono">
              Obsessions that inform how I think, observe, and build
            </p>
          </div>
        </div>

        {/* 4-Cell Editorial Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* =========================================================
              CELL 1: THOR (Staffy / Pitbull Mix)
             ========================================================= */}
          <div
            onClick={handleThorClick}
            className="group relative bg-[#111111] border border-[#222222] hover:border-[#6C47FF]/50 rounded-xl p-4 flex flex-col justify-between transition-all duration-300 hover:bg-[#141414] cursor-pointer overflow-hidden select-none"
          >
            {/* Floating hearts container */}
            <div className="absolute inset-0 pointer-events-none z-30 overflow-hidden">
              {thorHearts.map((h) => (
                <span
                  key={h.id}
                  className="absolute text-base transition-all duration-1000 transform -translate-x-1/2 -translate-y-1/2"
                  style={{
                    left: `${h.x}px`,
                    top: `${h.y}px`,
                    animation: 'floatUp 0.9s cubic-bezier(0.16, 1, 0.3, 1) forwards',
                  }}
                >
                  ❤️
                </span>
              ))}
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] font-mono uppercase tracking-wider text-[#6C47FF] bg-[#6C47FF]/10 px-2 py-0.5 rounded border border-[#6C47FF]/20">
                  Daily Co-Pilot · Thor
                </span>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setIsCinemaOpen(true);
                  }}
                  className="flex items-center gap-1 text-[11px] font-mono text-[#777777] hover:text-[#A896FF] transition-colors p-1"
                  title="Expand cinema view"
                >
                  <span>EXPAND</span>
                  <Maximize2 className="w-3 h-3" />
                </button>
              </div>

              {/* Quick Scene Mode Selector */}
              <div
                onClick={(e) => e.stopPropagation()}
                className="flex items-center justify-center gap-1 mb-2 bg-[#16161B] p-1 rounded-lg border border-[#25252D]"
              >
                <button
                  onClick={() => setThorVariant('sticker')}
                  className={`px-2 py-0.5 rounded text-[10px] font-mono transition-all ${
                    thorVariant === 'sticker'
                      ? 'bg-[#6C47FF] text-white font-bold'
                      : 'text-[#888888] hover:text-white'
                  }`}
                >
                  Sticker
                </button>
                <button
                  onClick={() => setThorVariant('stargazing')}
                  className={`px-2 py-0.5 rounded text-[10px] font-mono transition-all ${
                    thorVariant === 'stargazing'
                      ? 'bg-[#6C47FF] text-white font-bold'
                      : 'text-[#888888] hover:text-white'
                  }`}
                >
                  Galaxies
                </button>
                <button
                  onClick={() => setThorVariant('walking')}
                  className={`px-2 py-0.5 rounded text-[10px] font-mono transition-all ${
                    thorVariant === 'walking'
                      ? 'bg-[#6C47FF] text-white font-bold'
                      : 'text-[#888888] hover:text-white'
                  }`}
                >
                  Road
                </button>
              </div>

              {/* Interactive illustration showcase */}
              <div className="my-2 flex flex-col items-center">
                <PixelSankalpThor
                  size="sm"
                  variant={thorVariant}
                  interactive={true}
                  showControls={false}
                  onExpand={() => setIsCinemaOpen(true)}
                />
              </div>

              <div className="mt-2 text-left">
                <div className="flex items-center justify-between mb-1">
                  <h3 className="font-syne font-bold text-base text-[#F2F2F2] group-hover:text-white transition-colors flex items-center gap-1.5">
                    <span>Thor</span>
                    <span className="text-[11px] font-mono text-[#777788] font-normal">(Staffy Mix)</span>
                  </h3>
                  <span className="text-[10px] font-mono text-[#22C55E] flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#22C55E] animate-ping" />
                    Barks
                  </span>
                </div>

                <p className="text-[11.5px] text-[#888888] leading-relaxed">
                  Grey &amp; white Indian Bully × Staffy/Pitbull mix. Came home on 7th May, adopted with a local rescue team after being found from backyard breeding. Has a heart-shaped white patch on his chest — his signature mark. High energy, deeply attached — doesn&apos;t like anyone leaving, guests included, and follows visitors to the door every time. Destroys every toy within a day except one: an empty plastic bottle, his only consistent favorite.
                </p>
              </div>
            </div>

            {/* Footer with Instagram link */}
            <div className="mt-4 pt-3 border-t border-[#1F1F1F] flex items-center justify-between text-[11px] font-mono">
              <span className="text-[#666666]">CLICK TO BARK 🐾</span>
              <a
                href="https://www.instagram.com/sleeping_thor/"
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="inline-flex items-center gap-1 text-[#8B6FFF] hover:text-[#C4B8FF] font-semibold transition-colors"
              >
                <span>More of Thor →</span>
              </a>
            </div>
          </div>

          {/* =========================================================
              CELL 2: CHESS (8x8 Chessboard SVG with e4 knight highlight)
             ========================================================= */}
          <div className="group relative bg-[#111111] border border-[#222222] hover:border-[#6C47FF]/50 rounded-xl p-5 flex flex-col justify-between transition-all duration-300 hover:bg-[#141414]">
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-[10px] font-mono uppercase tracking-wider text-[#A896FF] bg-[#1A1A1A] px-2 py-0.5 rounded border border-[#2A2A2A]">
                  Strategy
                </span>
                <span className="text-[11px] font-mono text-[#555555]">02</span>
              </div>

              {/* Exact 8x8 Chessboard SVG according to specs */}
              <div className="my-2 py-1 flex items-center justify-center">
                <div className="p-1.5 bg-[#0C0C10] rounded-lg border border-[#22222E] shadow-inner">
                  <svg
                    viewBox="0 0 160 160"
                    width="144"
                    height="144"
                    className="rounded overflow-hidden"
                  >
                    {/* Render 8x8 squares */}
                    {Array.from({ length: 8 }).map((_, row) =>
                      Array.from({ length: 8 }).map((_, col) => {
                        const isDark = (row + col) % 2 === 1;
                        // e4: col = 4 (file e), row = 4 (rank 4 from 8..1)
                        const isE4 = col === 4 && row === 4;

                        return (
                          <g key={`sq-${row}-${col}`}>
                            <rect
                              x={col * 20}
                              y={row * 20}
                              width={20}
                              height={20}
                              fill={isE4 ? '#6C47FF' : isDark ? '#1a1a24' : '#2e2e3e'}
                              className={isE4 ? 'shadow-sm' : ''}
                            />
                            {isE4 && (
                              <>
                                {/* Glowing dot on e4 */}
                                <circle
                                  cx={col * 20 + 10}
                                  cy={row * 20 + 10}
                                  r="2.5"
                                  fill="#FFFFFF"
                                  opacity="0.9"
                                />
                                {/* Minimalist Knight Icon */}
                                <path
                                  d="M86,85 C86,82 89,81 92,81 C95,81 97,83 97,86 C97,87 96,89 95,90 C96,91 97,93 96,95 L84,95 C84,93 85,90 86,89 C84.5,88 84.5,86 86,85 Z"
                                  fill="#F2F2F2"
                                  opacity="0.95"
                                />
                              </>
                            )}
                          </g>
                        );
                      })
                    )}
                  </svg>
                </div>
              </div>

              <h3 className="font-syne font-bold text-lg text-[#F2F2F2] group-hover:text-white transition-colors mb-1 text-center">
                Chess
              </h3>
              <p className="text-xs text-[#888888] leading-relaxed text-center">
                Tactical foresight, tempo management, and positional play under strict clock pressure.
              </p>
            </div>

            <div className="mt-4 pt-3 border-t border-[#1F1F1F] flex items-center justify-between text-[10px] font-mono text-[#666666]">
              <span>STYLE: SICILIAN / KID</span>
              <span>RAPID &amp; BLITZ</span>
            </div>
          </div>

          {/* =========================================================
              CELL 3: TRAVEL (No gear stat, updated bio & slideshow modal)
             ========================================================= */}
          <div className="group relative bg-[#111111] border border-[#222222] hover:border-[#6C47FF]/50 rounded-xl p-5 flex flex-col justify-between transition-all duration-300 hover:bg-[#141414]">
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-[10px] font-mono uppercase tracking-wider text-[#A896FF] bg-[#1A1A1A] px-2 py-0.5 rounded border border-[#2A2A2A]">
                  Exploration
                </span>
                <span className="text-[11px] font-mono text-[#555555]">03</span>
              </div>

              {/* Minimalist Compass & Coordinates Motif */}
              <div className="my-2 py-2 flex items-center justify-center">
                <div className="text-center font-mono text-[11px] text-[#A896FF] border border-[#262626] bg-[#0C0C0C] px-3.5 py-2.5 rounded-lg w-full max-w-[160px]">
                  <div className="text-[#6C47FF] font-bold tracking-widest text-xs">
                    14+ COUNTRIES
                  </div>
                  <div className="text-[#555555] text-[9.5px] mt-0.5">
                    Slow-paced · Solo
                  </div>
                </div>
              </div>

              <h3 className="font-syne font-bold text-lg text-[#F2F2F2] group-hover:text-white transition-colors mb-1 text-center">
                Travel
              </h3>
              <p className="text-xs text-[#888888] leading-relaxed text-center">
                14+ countries traveled so far — mostly solo, slow-paced, and off the typical tourist trail. Interested in how different cultures solve daily friction, how cities move, and the small design details embedded in everyday spaces.
              </p>
            </div>

            {/* Travel Moments Modal Link */}
            <div className="mt-4 pt-3 border-t border-[#1F1F1F] flex items-center justify-between text-[11px] font-mono">
              <span className="text-[#666666]">14+ VISITED</span>
              <button
                onClick={() => setIsTravelOpen(true)}
                className="inline-flex items-center gap-1 text-[#8B6FFF] hover:text-[#C4B8FF] font-semibold transition-colors"
              >
                <span>Travel moments →</span>
              </button>
            </div>
          </div>

          {/* =========================================================
              CELL 4: MOVIES (Blurred 2x2 poster collage background)
             ========================================================= */}
          <div className="group relative bg-[#111111] border border-[#222222] hover:border-[#6C47FF]/50 rounded-xl p-5 flex flex-col justify-between transition-all duration-300 hover:bg-[#141414] overflow-hidden">
            {/* Subtle Blurred Movie Poster Collage Background (4 poster placeholders in 2x2 grid with dark overlay and 8px blur) */}
            <div className="absolute inset-0 pointer-events-none opacity-20 group-hover:opacity-30 transition-opacity duration-300">
              <div className="grid grid-cols-2 grid-rows-2 h-full w-full gap-1 p-1 filter blur-[8px] scale-105">
                {[1, 2, 3, 4].map((p) => (
                  <div
                    key={p}
                    className="bg-[#201C30] border border-[#3C3655] rounded flex items-center justify-center p-2 text-center"
                  >
                    <span className="text-[9px] font-mono text-[#8B6FFF] tracking-tighter">
                      Upload poster
                    </span>
                  </div>
                ))}
              </div>
              {/* Dark overlay */}
              <div className="absolute inset-0 bg-[#111111]/80 backdrop-blur-[2px]" />
            </div>

            <div className="relative z-10">
              <div className="flex items-center justify-between mb-3">
                <span className="text-[10px] font-mono uppercase tracking-wider text-[#A896FF] bg-[#1A1A1A] px-2 py-0.5 rounded border border-[#2A2A2A]">
                  Narrative
                </span>
                <span className="text-[11px] font-mono text-[#555555]">04</span>
              </div>

              {/* 2x2 Visual Poster Placeholders Frame */}
              <div className="my-2 py-1 flex items-center justify-center">
                <div className="grid grid-cols-2 gap-1.5 p-1.5 bg-[#0A0A0E]/90 border border-[#242430] rounded-lg shadow-inner">
                  {['Oppenheimer', 'Dune', 'Zodiac', 'Parasite'].map((title, pIdx) => (
                    <div
                      key={pIdx}
                      className="w-16 h-12 rounded bg-[#161622] border border-dashed border-[#2E2E40] flex flex-col items-center justify-center text-center p-1"
                    >
                      <ImageIcon className="w-3 h-3 text-[#6C47FF] mb-0.5 opacity-60" />
                      <span className="text-[7.5px] font-mono text-[#777788] leading-tight truncate w-full">
                        Upload poster
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <h3 className="font-syne font-bold text-lg text-[#F2F2F2] group-hover:text-white transition-colors mb-1 text-center">
                Movies
              </h3>
              <p className="text-xs text-[#888888] leading-relaxed text-center">
                Visual tension, character motivation, and rhythmic storytelling (Nolan, Villeneuve, Fincher, Bong Joon-ho, Denis, PTA).
              </p>
            </div>

            <div className="relative z-10 mt-4 pt-3 border-t border-[#1F1F1F] flex items-center justify-between text-[10px] font-mono text-[#666666]">
              <span>FORMAT: 35MM / IMAX</span>
              <span>AUTEUR CINEMA</span>
            </div>
          </div>
        </div>
      </div>

      {/* Expanded cinematic illustration viewer modal */}
      <ThorCinemaModal
        isOpen={isCinemaOpen}
        onClose={() => setIsCinemaOpen(false)}
      />

      {/* Travel Moments Slideshow / Gallery Modal */}
      <TravelGalleryModal
        isOpen={isTravelOpen}
        onClose={() => setIsTravelOpen(false)}
      />
    </section>
  );
}
