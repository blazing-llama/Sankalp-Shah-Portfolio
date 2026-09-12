import { TEARDOWNS } from '../data/portfolioData';
import { Compass, Quote } from 'lucide-react';
import ProjectVisualCover from './ProjectVisualCover';

export default function AnalyzedSection() {
  return (
    <section id="analyzed" className="py-24 sm:py-32 relative z-10 bg-[#0E0E0E]">
      <div className="max-w-6xl mx-auto px-6 sm:px-8">
        {/* Section Header */}
        <div className="mb-14">
          <div className="flex items-center gap-4 mb-4">
            <span className="text-[10px] font-bold tracking-[0.15em] uppercase text-[#6C47FF]">
              Product analysis
            </span>
            <div className="flex-1 h-[1px] bg-[#252525]" />
          </div>

          <h2 className="font-syne font-bold text-2xl sm:text-3xl md:text-4xl text-[#F2F2F2] tracking-tight mb-3">
            Teardowns &amp; opportunity analyses
          </h2>
          <p className="text-sm sm:text-base text-[#888888] max-w-xl leading-relaxed">
            Rigorous PM exercises — not built products. Each identifies a real gap,
            proposes a scoped solution, and defines success metrics including
            guardrails.
          </p>
        </div>

        {/* 2-col Teardown Grid */}
        <div
          id="teardowns-grid"
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          {TEARDOWNS.map((item) => (
            <div
              key={item.id}
              id={`teardown-card-${item.id}`}
              className="group teardown-card bg-[#121212] border border-[#252525] hover:border-[#6C47FF]/40 rounded-xl p-6 sm:p-8 flex flex-col justify-between transition-colors duration-300"
            >
              <div>
                {/* Visual Header Vector Graphic */}
                <div className="mb-6">
                  <ProjectVisualCover projectId={item.id} />
                </div>

                {/* Tag */}
                <div className="flex items-center justify-between gap-2 mb-5">
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded text-[10px] font-bold tracking-wider uppercase bg-[#F59E0B]/10 text-[#F59E0B] border border-[#F59E0B]/20">
                    <Compass className="w-3 h-3" />
                    <span>{item.tag}</span>
                  </span>
                  <span className="text-[11px] font-mono text-[#555555]">
                    {item.opportunityArea}
                  </span>
                </div>

                <h3 className="font-syne font-bold text-xl sm:text-2xl text-[#F2F2F2] tracking-tight mb-4">
                  {item.name}
                </h3>

                {/* Italic Insight Quote */}
                <div className="relative mb-5 bg-[#171717]/80 rounded-md p-4 border-l-2 border-[#6C47FF]">
                  <Quote className="w-4 h-4 text-[#6C47FF] opacity-40 mb-1" />
                  <p className="text-xs sm:text-[13px] text-[#A0A0A0] italic leading-relaxed">
                    {item.insight}
                  </p>
                </div>

                <p className="text-xs sm:text-[13px] text-[#888888] leading-relaxed mb-6">
                  {item.description}
                </p>
              </div>

              {/* Chips */}
              <div className="flex flex-wrap gap-1.5 pt-4 border-t border-[#202020]">
                {item.chips.map((chip, cIdx) => (
                  <span
                    key={cIdx}
                    className="text-[10.5px] text-[#666666] bg-[#181818] border border-[#262626] px-2.5 py-0.5 rounded"
                  >
                    {chip}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
