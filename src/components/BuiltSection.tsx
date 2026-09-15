import React from 'react';
import { BUILT_PROJECTS, BuiltProject } from '../data/portfolioData';
import { ExternalLink, Github, Sparkles, ChevronRight, Layers } from 'lucide-react';
import ProjectVisualCover from './ProjectVisualCover';

interface BuiltSectionProps {
  onOpenProjectDetail?: (project: BuiltProject) => void;
}

export default function BuiltSection({ onOpenProjectDetail }: BuiltSectionProps) {
  const featured = BUILT_PROJECTS.find((p) => p.isFeatured);
  const myntra = BUILT_PROJECTS.find((p) => p.id === 'myntra');
  const chatgpt = BUILT_PROJECTS.find((p) => p.id === 'chatgpt-voice');
  const reviewPulse = BUILT_PROJECTS.find((p) => p.id === 'weekly-review-pulse');
  const mfFaq = BUILT_PROJECTS.find((p) => p.id === 'mf-faq');

  const handleCardMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    e.currentTarget.style.setProperty('--mouse-x', `${x}px`);
    e.currentTarget.style.setProperty('--mouse-y', `${y}px`);
  };

  return (
    <section id="built" className="py-24 sm:py-32 relative z-10">
      <div className="max-w-6xl mx-auto px-6 sm:px-8">
        {/* Section Header */}
        <div className="mb-14">
          <div className="flex items-center gap-4 mb-4">
            <span className="text-[10px] font-bold tracking-[0.15em] uppercase text-[#6C47FF]">
              Shipped work
            </span>
            <div className="flex-1 h-[1px] bg-[#252525]" />
          </div>

          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <h2 className="font-syne font-bold text-2xl sm:text-3xl md:text-4xl text-[#F2F2F2] tracking-tight mb-3">
                Products I built &amp; deployed
              </h2>
              <p className="text-sm sm:text-base text-[#888888] max-w-xl leading-relaxed">
                Visual artifacts from live demos, autonomous agent pipelines, and deployed systems.
                Grayscale by default; hover to inspect system schematics.
              </p>
            </div>
            <div className="text-xs font-mono text-[#666666] hidden md:block">
              5 SHIPPED ARTIFACTS · 0 SLIDE DECKS
            </div>
          </div>
        </div>

        {/* Asymmetric Project Grid */}
        <div className="space-y-6">
          {/* ══════════════════════════════════════════════════
              FLAGSHIP FEATURED: BLINKIT DISCOVERY CONCIERGE (12 cols)
             ══════════════════════════════════════════════════ */}
          {featured && (
            <div
              id={`project-card-${featured.id}`}
              onMouseMove={handleCardMouseMove}
              className="spotlight-card group relative bg-[#111111] border border-[#242424] hover:border-[#6C47FF]/50 rounded-xl p-6 sm:p-9 transition-all duration-300 shadow-2xl shadow-black/80"
            >
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                {/* Visual Cover Area (Large Editorial Cover) */}
                <div className="lg:col-span-7 flex flex-col justify-between">
                  <div className="mb-3 flex items-center justify-between">
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded text-[10px] font-bold tracking-wider uppercase bg-[#22C55E]/10 text-[#22C55E] border border-[#22C55E]/20">
                      <Sparkles className="w-3 h-3" />
                      <span>{featured.tag}</span>
                    </span>
                    <span className="text-[11px] font-mono text-[#666666]">
                      Quick Commerce · Multi-Agent
                    </span>
                  </div>

                  {/* High-res technical cover */}
                  <ProjectVisualCover projectId="blinkit" isFeatured={true} />
                </div>

                {/* Content & Metrics Area */}
                <div className="lg:col-span-5 flex flex-col justify-between h-full pt-1">
                  <div>
                    <h3 className="font-syne font-bold text-2xl sm:text-3xl text-[#F2F2F2] tracking-tight mb-3 group-hover:text-white transition-colors">
                      {featured.name}
                    </h3>

                    <p className="text-sm text-[#999999] leading-relaxed mb-6">
                      {featured.description}
                    </p>

                    {/* 2 Key Metrics */}
                    <div className="grid grid-cols-2 gap-3 mb-6 bg-[#151515] p-3.5 rounded-lg border border-[#242424]">
                      <div>
                        <div className="font-syne font-extrabold text-xl sm:text-2xl text-[#6C47FF] tracking-tight">
                          1,180
                        </div>
                        <div className="text-[11px] text-[#777777] leading-tight mt-0.5">
                          Play Store reviews mined
                        </div>
                      </div>
                      <div>
                        <div className="font-syne font-extrabold text-xl sm:text-2xl text-[#22C55E] tracking-tight">
                          0%
                        </div>
                        <div className="text-[11px] text-[#777777] leading-tight mt-0.5">
                          Hallucination rate (13/13)
                        </div>
                      </div>
                    </div>

                    {/* Chips */}
                    <div className="flex flex-wrap gap-1.5 mb-6">
                      {featured.chips.slice(0, 5).map((chip, cIdx) => (
                        <span
                          key={cIdx}
                          className="text-[10.5px] text-[#777777] bg-[#171717] border border-[#262626] px-2.5 py-0.5 rounded"
                        >
                          {chip}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Actions & CTAs */}
                  <div className="flex flex-wrap items-center gap-3 pt-4 border-t border-[#202020]">
                    {featured.links.map((link, lIdx) => (
                      <a
                        key={lIdx}
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-md bg-[#6C47FF] hover:bg-[#7D5BFF] text-white text-xs font-semibold shadow-[0_2px_12px_rgba(108,71,255,0.3)] transition-all hover:-translate-y-0.5"
                      >
                        <span>{link.label}</span>
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    ))}

                    {onOpenProjectDetail && (
                      <button
                        onClick={() => onOpenProjectDetail(featured)}
                        className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-md bg-[#181818] hover:bg-[#222222] text-[#A896FF] text-xs font-medium border border-[#2E2E2E] hover:border-[#6C47FF]/40 transition-colors"
                      >
                        <Layers className="w-3.5 h-3.5 text-[#6C47FF]" />
                        <span>System Breakdown</span>
                        <ChevronRight className="w-3.5 h-3.5 opacity-60" />
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ══════════════════════════════════════════════════
              ASYMMETRIC ROW 1: MYNTRA (7 cols) + CHATGPT VOICE (5 cols)
             ══════════════════════════════════════════════════ */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Myntra (7 cols) */}
            {myntra && (
              <div
                id={`project-card-${myntra.id}`}
                onMouseMove={handleCardMouseMove}
                className="lg:col-span-7 spotlight-card group bg-[#111111] border border-[#242424] hover:border-[#6C47FF]/50 rounded-xl p-6 sm:p-7 flex flex-col justify-between transition-all duration-300 shadow-xl shadow-black/60"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded text-[10px] font-bold tracking-wider uppercase bg-[#22C55E]/10 text-[#22C55E] border border-[#22C55E]/20">
                      {myntra.tag}
                    </span>
                    <span className="text-[11px] font-mono text-[#666666]">
                      E-Commerce · Price Intelligence
                    </span>
                  </div>

                  {/* Visual Cover */}
                  <div className="mb-5">
                    <ProjectVisualCover projectId="myntra" />
                  </div>

                  <h3 className="font-syne font-bold text-xl sm:text-2xl text-[#F2F2F2] tracking-tight mb-2 group-hover:text-white transition-colors">
                    {myntra.name}
                  </h3>

                  <p className="text-xs sm:text-sm text-[#888888] leading-relaxed mb-5">
                    {myntra.description}
                  </p>

                  {/* 2 Key Metrics */}
                  <div className="grid grid-cols-2 gap-3 mb-5 bg-[#151515] p-3 rounded-lg border border-[#222222]">
                    <div>
                      <div className="font-syne font-extrabold text-lg text-[#6C47FF] tracking-tight">
                        94%
                      </div>
                      <div className="text-[10.5px] text-[#777777] leading-tight">
                        Research before buying (n=32)
                      </div>
                    </div>
                    <div>
                      <div className="font-syne font-extrabold text-lg text-[#F2F2F2] tracking-tight">
                        0.875
                      </div>
                      <div className="text-[10.5px] text-[#777777] leading-tight">
                        Corpus sentiment accuracy
                      </div>
                    </div>
                  </div>
                </div>

                {/* Footer CTAs */}
                <div className="pt-4 border-t border-[#202020] flex flex-wrap items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    {myntra.links.map((link, lIdx) => (
                      <a
                        key={lIdx}
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#6C47FF] hover:text-[#8B6FFF] transition-colors"
                      >
                        {link.type === 'github' ? (
                          <Github className="w-3.5 h-3.5" />
                        ) : (
                          <ExternalLink className="w-3.5 h-3.5" />
                        )}
                        <span>{link.label}</span>
                      </a>
                    ))}
                  </div>

                  {onOpenProjectDetail && (
                    <button
                      onClick={() => onOpenProjectDetail(myntra)}
                      className="text-xs text-[#A896FF] hover:text-white flex items-center gap-1 font-medium transition-colors"
                    >
                      <span>Breakdown</span>
                      <ChevronRight className="w-3 h-3" />
                    </button>
                  )}
                </div>
              </div>
            )}

            {/* ChatGPT Voice India (5 cols) */}
            {chatgpt && (
              <div
                id={`project-card-${chatgpt.id}`}
                onMouseMove={handleCardMouseMove}
                className="lg:col-span-5 spotlight-card group bg-[#111111] border border-[#242424] hover:border-[#6C47FF]/50 rounded-xl p-6 sm:p-7 flex flex-col justify-between transition-all duration-300 shadow-xl shadow-black/60"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded text-[10px] font-bold tracking-wider uppercase bg-[#6C47FF]/15 text-[#B0A0FF] border border-[#6C47FF]/30">
                      {chatgpt.tag}
                    </span>
                    <span className="text-[11px] font-mono text-[#666666]">
                      Acoustic AI PRD
                    </span>
                  </div>

                  {/* Visual Cover */}
                  <div className="mb-5">
                    <ProjectVisualCover projectId="chatgpt" />
                  </div>

                  <h3 className="font-syne font-bold text-xl sm:text-2xl text-[#F2F2F2] tracking-tight mb-2 group-hover:text-white transition-colors">
                    {chatgpt.name}
                  </h3>

                  <p className="text-xs sm:text-sm text-[#888888] leading-relaxed mb-5">
                    {chatgpt.description}
                  </p>

                  {/* 2 Key Metrics */}
                  <div className="grid grid-cols-2 gap-3 mb-5 bg-[#151515] p-3 rounded-lg border border-[#222222]">
                    <div>
                      <div className="font-syne font-extrabold text-lg text-[#6C47FF] tracking-tight">
                        ICE 18
                      </div>
                      <div className="text-[10.5px] text-[#777777] leading-tight">
                        Ranked top feature priority
                      </div>
                    </div>
                    <div>
                      <div className="font-syne font-extrabold text-lg text-[#22C55E] tracking-tight">
                        n = 36
                      </div>
                      <div className="text-[10.5px] text-[#777777] leading-tight">
                        Primary student field interviews
                      </div>
                    </div>
                  </div>
                </div>

                {/* Footer CTA */}
                <div className="pt-4 border-t border-[#202020] flex items-center justify-between">
                  <span className="text-[11px] text-[#666666] font-mono">
                    Full PRD · Wireframes
                  </span>
                  {onOpenProjectDetail && (
                    <button
                      onClick={() => onOpenProjectDetail(chatgpt)}
                      className="text-xs text-[#A896FF] hover:text-white flex items-center gap-1 font-medium transition-colors"
                    >
                      <span>Read PRD</span>
                      <ChevronRight className="w-3 h-3" />
                    </button>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* ══════════════════════════════════════════════════
              ASYMMETRIC ROW 2: WEEKLY REVIEW PULSE (5 cols) + MF FAQ (7 cols)
             ══════════════════════════════════════════════════ */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Weekly Review Pulse (5 cols) */}
            {reviewPulse && (
              <div
                id={`project-card-${reviewPulse.id}`}
                onMouseMove={handleCardMouseMove}
                className="lg:col-span-5 spotlight-card group bg-[#111111] border border-[#242424] hover:border-[#6C47FF]/50 rounded-xl p-6 sm:p-7 flex flex-col justify-between transition-all duration-300 shadow-xl shadow-black/60"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded text-[10px] font-bold tracking-wider uppercase bg-[#22C55E]/10 text-[#22C55E] border border-[#22C55E]/20">
                      {reviewPulse.tag}
                    </span>
                    <span className="text-[11px] font-mono text-[#666666]">
                      Multi-Agent Pipeline
                    </span>
                  </div>

                  {/* Visual Cover */}
                  <div className="mb-5">
                    <ProjectVisualCover projectId="review-pulse" />
                  </div>

                  <h3 className="font-syne font-bold text-xl sm:text-2xl text-[#F2F2F2] tracking-tight mb-2 group-hover:text-white transition-colors">
                    {reviewPulse.name}
                  </h3>

                  <p className="text-xs sm:text-sm text-[#888888] leading-relaxed mb-5">
                    {reviewPulse.description}
                  </p>

                  {/* 2 Key Metrics */}
                  <div className="grid grid-cols-2 gap-3 mb-5 bg-[#151515] p-3 rounded-lg border border-[#222222]">
                    <div>
                      <div className="font-syne font-extrabold text-lg text-[#6C47FF] tracking-tight">
                        3 Agents
                      </div>
                      <div className="text-[10.5px] text-[#777777] leading-tight">
                        Maya, Atlas &amp; Sentinel
                      </div>
                    </div>
                    <div>
                      <div className="font-syne font-extrabold text-lg text-[#22C55E] tracking-tight">
                        0 Manual
                      </div>
                      <div className="text-[10.5px] text-[#777777] leading-tight">
                        Runs autonomously weekly
                      </div>
                    </div>
                  </div>
                </div>

                {/* Footer CTA */}
                <div className="pt-4 border-t border-[#202020] flex items-center justify-between">
                  {reviewPulse.links.map((link, lIdx) => (
                    <a
                      key={lIdx}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#6C47FF] hover:text-[#8B6FFF] transition-colors"
                    >
                      <Github className="w-3.5 h-3.5" />
                      <span>{link.label}</span>
                    </a>
                  ))}
                  {onOpenProjectDetail && (
                    <button
                      onClick={() => onOpenProjectDetail(reviewPulse)}
                      className="text-xs text-[#A896FF] hover:text-white flex items-center gap-1 font-medium transition-colors"
                    >
                      <span>Pipeline Specs</span>
                      <ChevronRight className="w-3 h-3" />
                    </button>
                  )}
                </div>
              </div>
            )}

            {/* MF FAQ Assistant (7 cols) */}
            {mfFaq && (
              <div
                id={`project-card-${mfFaq.id}`}
                onMouseMove={handleCardMouseMove}
                className="lg:col-span-7 spotlight-card group bg-[#111111] border border-[#242424] hover:border-[#6C47FF]/50 rounded-xl p-6 sm:p-7 flex flex-col justify-between transition-all duration-300 shadow-xl shadow-black/60"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded text-[10px] font-bold tracking-wider uppercase bg-[#6C47FF]/15 text-[#B0A0FF] border border-[#6C47FF]/30">
                      {mfFaq.tag}
                    </span>
                    <span className="text-[11px] font-mono text-[#666666]">
                      Fintech RAG Architecture
                    </span>
                  </div>

                  {/* Visual Cover */}
                  <div className="mb-5">
                    <ProjectVisualCover projectId="mf-faq" />
                  </div>

                  <h3 className="font-syne font-bold text-xl sm:text-2xl text-[#F2F2F2] tracking-tight mb-2 group-hover:text-white transition-colors">
                    {mfFaq.name}
                  </h3>

                  <p className="text-xs sm:text-sm text-[#888888] leading-relaxed mb-5">
                    {mfFaq.description}
                  </p>

                  {/* 2 Key Metrics */}
                  <div className="grid grid-cols-2 gap-3 mb-5 bg-[#151515] p-3 rounded-lg border border-[#222222]">
                    <div>
                      <div className="font-syne font-extrabold text-lg text-[#22C55E] tracking-tight">
                        0
                      </div>
                      <div className="text-[10.5px] text-[#777777] leading-tight">
                        Hallucinations allowed
                      </div>
                    </div>
                    <div>
                      <div className="font-syne font-extrabold text-lg text-[#6C47FF] tracking-tight">
                        100%
                      </div>
                      <div className="text-[10.5px] text-[#777777] leading-tight">
                        SEBI regulatory compliance
                      </div>
                    </div>
                  </div>
                </div>

                {/* Footer CTA */}
                <div className="pt-4 border-t border-[#202020] flex items-center justify-between">
                  <span className="text-[11px] text-[#666666] font-mono">
                    Deterministic RAG Gate
                  </span>
                  {onOpenProjectDetail && (
                    <button
                      onClick={() => onOpenProjectDetail(mfFaq)}
                      className="text-xs text-[#A896FF] hover:text-white flex items-center gap-1 font-medium transition-colors"
                    >
                      <span>Architecture Spec</span>
                      <ChevronRight className="w-3 h-3" />
                    </button>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
