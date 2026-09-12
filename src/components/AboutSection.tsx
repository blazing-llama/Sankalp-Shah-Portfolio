import React from 'react';
import { ABOUT_DATA } from '../data/portfolioData';
import { MapPin, GraduationCap, Award, Briefcase } from 'lucide-react';
import PixelSankalpThor from './PixelSankalpThor';
import SkillsWeb from './SkillsWeb';

export default function AboutSection() {
  return (
    <section
      id="about"
      className="py-24 sm:py-32 relative z-10 bg-[#0E0E0E] border-y border-[#202020]"
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        {/* Section Header */}
        <div className="mb-12">
          <div className="flex items-center gap-4 mb-4">
            <span className="text-[10px] font-bold tracking-[0.15em] uppercase text-[#6C47FF]">
              Background &amp; Capabilities
            </span>
            <div className="flex-1 h-[1px] bg-[#252525]" />
          </div>

          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <h2 className="font-syne font-bold text-2xl sm:text-3xl md:text-4xl text-[#F2F2F2] tracking-tight">
                Why I build this way
              </h2>
              <p className="text-sm text-[#888888] mt-1.5">
                From 6 years in enterprise B2B SaaS sales to shipping AI systems with deterministic guardrails.
              </p>
            </div>
            <div className="hidden sm:flex items-center gap-3">
              {/* Subtle Pixel-Art Personality Badge (Cutout) */}
              <PixelSankalpThor size="sm" variant="sticker" interactive={true} />
            </div>
          </div>
        </div>

        {/* 2-Column Layout: Left Narrative & Credentials, Right Interactive Skills Web */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
          {/* Left Column: Tightened Bio Narrative & Foundation */}
          <div className="lg:col-span-5 space-y-5 text-sm sm:text-[14.5px] text-[#999999] leading-relaxed">
            {/* Mobile Pixel-art badge */}
            <div className="sm:hidden flex justify-center pb-2">
              <PixelSankalpThor size="sm" variant="sticker" interactive={true} showCaption={true} />
            </div>

            <p>
              Six years in enterprise B2B SaaS sales at{' '}
              <strong className="text-[#F2F2F2] font-semibold">
                BrowserStack
              </strong>{' '}
              and{' '}
              <strong className="text-[#F2F2F2] font-semibold">Freshworks</strong>{' '}
              taught me how technical buyers evaluate ROI, where PRDs fail to capture customer friction,
              and why the best product managers don&apos;t just manage roadmaps — they deeply understand the system.
            </p>

            <p>
              I made the shift from sales to product by studying data science at{' '}
              <strong className="text-[#F2F2F2] font-semibold">IIIT Bangalore</strong>{' '}
              and building production AI systems as a{' '}
              <strong className="text-[#F2F2F2] font-semibold">
                NextLeap AI PM Fellow
              </strong>
              . I target Series A–C Indian fintech and B2B SaaS startups where a PM must reason through vector retrieval, latency budgets, and deterministic guardrails.
            </p>

            <p>
              Every case study begins with a falsifiable hypothesis. If the review corpus says the problem isn&apos;t there, we conduct primary interviews (avg. 30–50 respondents across 7 projects). If the evidence refutes the thesis, we pivot the recommendation. Then we ship working software.
            </p>

            {/* Structured Credentials */}
            <div className="pt-5 border-t border-[#222222] space-y-2.5 text-xs text-[#777777]">
              <div className="flex items-center gap-2.5">
                <MapPin className="w-3.5 h-3.5 text-[#6C47FF] shrink-0" />
                <span>
                  Based in <strong className="text-[#DDD]">Pune, India</strong> (with Thor, my Staffy)
                </span>
              </div>
              <div className="flex items-center gap-2.5">
                <Briefcase className="w-3.5 h-3.5 text-[#6C47FF] shrink-0" />
                <span>
                  Enterprise SaaS: <strong className="text-[#DDD]">BrowserStack &amp; Freshworks</strong>
                </span>
              </div>
              <div className="flex items-center gap-2.5">
                <Award className="w-3.5 h-3.5 text-[#6C47FF] shrink-0" />
                <span>
                  Executive PG: <strong className="text-[#DDD]">Data Science &amp; Business Analysis, IIIT Bangalore</strong>
                </span>
              </div>
              <div className="flex items-center gap-2.5">
                <GraduationCap className="w-3.5 h-3.5 text-[#6C47FF] shrink-0" />
                <span>
                  MBA: <strong className="text-[#DDD]">Northumbria University UK</strong>
                </span>
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Skills & Tools Web */}
          <div className="lg:col-span-7">
            <SkillsWeb />
          </div>
        </div>
      </div>
    </section>
  );
}
