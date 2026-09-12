import React from 'react';
import { HOW_I_WORK_STEPS } from '../data/portfolioData';
import { ArrowRight, ArrowDown } from 'lucide-react';

export default function HowIWorkSection() {
  return (
    <section id="how-i-work" className="py-20 sm:py-24 relative z-10 border-b border-[#202020]">
      <div className="max-w-6xl mx-auto px-6 sm:px-8">
        {/* Section Header */}
        <div className="mb-12">
          <div className="flex items-center gap-4 mb-4">
            <span className="text-[10px] font-bold tracking-[0.15em] uppercase text-[#6C47FF]">
              Operating Model
            </span>
            <div className="flex-1 h-[1px] bg-[#252525]" />
          </div>

          <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2">
            <h2 className="font-syne font-bold text-2xl sm:text-3xl text-[#F2F2F2] tracking-tight">
              How I work
            </h2>
            <p className="text-xs sm:text-sm text-[#777777] font-mono">
              Falsifiable hypotheses · High agency · Working software
            </p>
          </div>
        </div>

        {/* 5-Step Linear Flow */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 relative">
          {HOW_I_WORK_STEPS.map((step, idx) => {
            const isLast = idx === HOW_I_WORK_STEPS.length - 1;
            return (
              <div key={step.step} className="flex flex-col relative group">
                {/* Step Card */}
                <div className="bg-[#121212] border border-[#242424] hover:border-[#6C47FF]/50 rounded-lg p-5 flex flex-col justify-between h-full transition-all duration-300 hover:bg-[#151515] relative">
                  <div>
                    {/* Step Number & Arrow */}
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-xs font-mono font-bold text-[#6C47FF] tracking-wider">
                        {step.step}
                      </span>
                      {!isLast && (
                        <>
                          {/* Desktop forward indicator */}
                          <ArrowRight className="w-3.5 h-3.5 text-[#444444] group-hover:text-[#6C47FF] transition-colors hidden md:block" />
                          {/* Mobile downward indicator */}
                          <ArrowDown className="w-3.5 h-3.5 text-[#444444] group-hover:text-[#6C47FF] transition-colors md:hidden" />
                        </>
                      )}
                    </div>

                    <h3 className="font-syne font-bold text-lg text-[#F2F2F2] mb-2 group-hover:text-[#C4B8FF] transition-colors">
                      {step.title}
                    </h3>

                    <p className="text-xs text-[#888888] leading-relaxed">
                      {step.principle}
                    </p>
                  </div>

                  {/* Micro active line */}
                  <div className="w-6 h-[2px] bg-[#2E2E2E] group-hover:bg-[#6C47FF] transition-colors mt-4" />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
