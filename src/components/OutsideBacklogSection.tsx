import React, { useState } from 'react';
import PixelSankalpThor, { PixelSceneVariant } from './PixelSankalpThor';
import ThorCinemaModal from './ThorCinemaModal';
import TravelGalleryModal from './TravelGalleryModal';
import { playSoftBark } from '../utils/retroAudio';
import { Maximize2, ExternalLink, Heart } from 'lucide-react';

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

              {/* 8x8 board showing Scholar's Mate — 1.e4 e5 2.Bc4 Nc6 3.Qh5 Nf6?? 4.Qxf7# */}
              <div className="my-2 py-1 flex items-center justify-center">
                <div className="p-1.5 bg-[#0C0C10] rounded-lg border border-[#22222E] shadow-inner">
                  <svg
                    viewBox="0 0 160 160"
                    width="144"
                    height="144"
                    className="rounded overflow-hidden"
                  >
                    {/* Board squares */}
                    {Array.from({ length: 8 }).map((_, row) =>
                      Array.from({ length: 8 }).map((_, col) => {
                        const isDark = (row + col) % 2 === 1;
                        // f7 (col 5, row 1): the mating queen's square
                        const isMateSquare = col === 5 && row === 1;
                        return (
                          <rect
                            key={`sq-${row}-${col}`}
                            x={col * 20}
                            y={row * 20}
                            width={20}
                            height={20}
                            fill={isMateSquare ? '#6C47FF' : isDark ? '#1a1a24' : '#2e2e3e'}
                          />
                        );
                      })
                    )}

                    {/* Pieces — algebraic square -> (col, row): col = file a..h -> 0..7, row = 8-rank */}
                    {[
                      // White
                      { sq: 'e1', p: '♔', white: true }, { sq: 'f7', p: '♕', white: true },
                      { sq: 'c4', p: '♗', white: true }, { sq: 'c1', p: '♗', white: true },
                      { sq: 'b1', p: '♘', white: true }, { sq: 'g1', p: '♘', white: true },
                      { sq: 'a1', p: '♖', white: true }, { sq: 'h1', p: '♖', white: true },
                      { sq: 'a2', p: '♙', white: true }, { sq: 'b2', p: '♙', white: true },
                      { sq: 'c2', p: '♙', white: true }, { sq: 'd2', p: '♙', white: true },
                      { sq: 'e4', p: '♙', white: true }, { sq: 'g2', p: '♙', white: true },
                      { sq: 'h2', p: '♙', white: true },
                      // Black
                      { sq: 'e8', p: '♚', white: false }, { sq: 'd8', p: '♛', white: false },
                      { sq: 'c8', p: '♝', white: false }, { sq: 'f8', p: '♝', white: false },
                      { sq: 'c6', p: '♞', white: false }, { sq: 'f6', p: '♞', white: false },
                      { sq: 'a8', p: '♜', white: false }, { sq: 'h8', p: '♜', white: false },
                      { sq: 'a7', p: '♟', white: false }, { sq: 'b7', p: '♟', white: false },
                      { sq: 'c7', p: '♟', white: false }, { sq: 'd7', p: '♟', white: false },
                      { sq: 'e5', p: '♟', white: false }, { sq: 'g7', p: '♟', white: false },
                      { sq: 'h7', p: '♟', white: false },
                    ].map(({ sq, p, white }, i) => {
                      const col = sq.charCodeAt(0) - 'a'.charCodeAt(0);
                      const row = 8 - parseInt(sq[1], 10);
                      return (
                        <text
                          key={`pc-${i}`}
                          x={col * 20 + 10}
                          y={row * 20 + 15}
                          textAnchor="middle"
                          fontSize="16"
                          fill={white ? '#F6F3ED' : '#0A0A0A'}
                          stroke={white ? '#0A0A0A' : '#F6F3ED'}
                          strokeWidth="0.6"
                        >
                          {p}
                        </text>
                      );
                    })}

                    {/* Check glow on the black king's square (e8) */}
                    <circle cx={4 * 20 + 10} cy={0 * 20 + 10} r="9" fill="none" stroke="#EF4444" strokeWidth="1.5" opacity="0.8" />
                  </svg>
                </div>
              </div>
              <p className="text-[10px] font-mono text-[#6C47FF] text-center mb-1">
                SCHOLAR&apos;S MATE · 4 MOVES
              </p>

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
              CELL 4: MOVIES (favorites strip — no external poster assets)
             ========================================================= */}
          <div className="group relative bg-[#111111] border border-[#222222] hover:border-[#6C47FF]/50 rounded-xl p-5 flex flex-col justify-between transition-all duration-300 hover:bg-[#141414] overflow-hidden">
            {/* Sprocket-hole film-strip motif along the top edge */}
            <div className="absolute top-0 left-0 right-0 h-2.5 flex items-center justify-evenly bg-[#0A0A0E] opacity-70 pointer-events-none">
              {Array.from({ length: 14 }).map((_, i) => (
                <span key={i} className="w-1 h-1 rounded-[1px] bg-[#2E2E40]" />
              ))}
            </div>

            <div className="relative z-10">
              <div className="flex items-center justify-between mb-3">
                <span className="text-[10px] font-mono uppercase tracking-wider text-[#A896FF] bg-[#1A1A1A] px-2 py-0.5 rounded border border-[#2A2A2A]">
                  Narrative
                </span>
                <span className="text-[11px] font-mono text-[#555555]">04</span>
              </div>

              {/* Favorites strip: a wrapped chip list, not poster art */}
              <div className="my-2 py-1 flex items-center justify-center">
                <div className="flex flex-wrap justify-center gap-1.5 p-2 bg-[#0A0A0E]/90 border border-[#242430] rounded-lg shadow-inner max-w-[190px]">
                  {[
                    'LOTR Trilogy', 'Pulp Fiction', 'Se7en', 'The Lion King',
                    'Breaking Bad', 'Kill Bill', '3 Idiots', 'Tamasha',
                    'Stranger Things', 'The Boys', 'Fleabag', 'The Sopranos',
                  ].map((title) => (
                    <span
                      key={title}
                      className="text-[9px] font-mono text-[#B8ACEA] bg-[#161622] border border-[#2E2E40] rounded px-1.5 py-1 leading-none"
                    >
                      {title}
                    </span>
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
