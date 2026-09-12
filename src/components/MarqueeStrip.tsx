import { MARQUEE_ITEMS } from '../data/portfolioData';

export default function MarqueeStrip() {
  // Duplicate list twice for seamless continuous scroll
  const items = [...MARQUEE_ITEMS, ...MARQUEE_ITEMS];

  return (
    <div
      id="tools-marquee-strip"
      className="relative overflow-hidden border-y border-[#252525] bg-[#0F0F0F] py-3.5 select-none"
    >
      <div className="marquee-track flex items-center">
        {items.map((tool, idx) => (
          <div
            key={`${tool}-${idx}`}
            className="flex items-center gap-3 text-xs font-medium text-[#666666] hover:text-[#B0A0FF] transition-colors whitespace-nowrap"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[#6C47FF] opacity-60 shadow-[0_0_6px_rgba(108,71,255,0.6)]" />
            <span className="tracking-wide">{tool}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
