import { useEffect, useRef, useState } from 'react';
import { HERO_DATA } from '../data/portfolioData';
import { ArrowDown, Linkedin, Github, Flame, ExternalLink } from 'lucide-react';
import PixelSankalpThor from './PixelSankalpThor';

interface CounterProps {
  target: number;
  suffix?: string;
  display?: string;
  isStatic?: boolean;
}

function StatCounter({ target, suffix = '', display, isStatic = false }: CounterProps) {
  const [count, setCount] = useState(isStatic ? target : 0);
  const elRef = useRef<HTMLDivElement>(null);
  const hasAnimatedRef = useRef(false);

  useEffect(() => {
    if (isStatic || display) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !hasAnimatedRef.current) {
          hasAnimatedRef.current = true;
          const duration = 1600;
          const startTime = performance.now();

          const step = (now: number) => {
            const elapsed = now - startTime;
            const progress = Math.min(elapsed / duration, 1);
            // Ease out cubic
            const eased = 1 - Math.pow(1 - progress, 3);
            const currentVal = Math.floor(eased * target);
            setCount(currentVal);

            if (progress < 1) {
              requestAnimationFrame(step);
            } else {
              setCount(target);
            }
          };

          requestAnimationFrame(step);
        }
      },
      { threshold: 0.3 }
    );

    if (elRef.current) {
      observer.observe(elRef.current);
    }

    return () => observer.disconnect();
  }, [target, isStatic, display]);

  return (
    <div
      ref={elRef}
      className="font-syne font-extrabold text-3xl sm:text-4xl text-[#F2F2F2] tracking-tight tabular-nums"
    >
      {display ? display : `${count.toLocaleString()}${suffix}`}
    </div>
  );
}

export default function Hero() {
  return (
    <section
      id="hero"
      className="relative pt-36 sm:pt-44 pb-20 md:pb-28 overflow-hidden"
    >
      {/* Animated Dot/Grid background */}
      <div className="hero-grid-pattern" aria-hidden="true" />

      {/* Breathing Purple Radial Glow */}
      <div className="hero-glow-pulse" aria-hidden="true" />

      <div className="relative z-10 max-w-6xl mx-auto px-6 sm:px-8">
        {/* Badge & Sankalp + Thor illustration */}
        <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
          <div
            id="hero-availability-badge"
            className="inline-flex items-center gap-2.5 bg-[#6C47FF]/10 border border-[#6C47FF]/30 rounded-full py-1.5 px-4 text-xs font-medium text-[#B0A0FF] shadow-[0_0_20px_rgba(108,71,255,0.15)]"
          >
            <span className="badge-pulse-dot" />
            <span>{HERO_DATA.badge}</span>
          </div>

          <div className="hidden sm:block">
            <PixelSankalpThor size="xs" variant="sticker" interactive={true} />
          </div>
        </div>

        {/* Display Headline */}
        <h1
          id="hero-headline"
          className="font-syne font-extrabold text-4xl sm:text-6xl md:text-7xl lg:text-[5.1rem] leading-[1.03] tracking-tight text-[#F2F2F2] mb-7 max-w-4xl"
        >
          {HERO_DATA.headline.line1}
          <br />
          {HERO_DATA.headline.line2}
          <br />
          <span className="hero-underline-grow text-[#8B6FFF]">
            {HERO_DATA.headline.line3}
          </span>
        </h1>

        {/* Subtext */}
        <p
          id="hero-subtext"
          className="text-base sm:text-lg text-[#888888] leading-relaxed max-w-2xl mb-11"
        >
          I build{' '}
          <strong className="text-[#F2F2F2] font-semibold">
            evidence-first AI products
          </strong>{' '}
          with live demos, real user research, and deployed code. Every case study
          here started with a falsifiable hypothesis and ended with an artifact you
          can click.
        </p>

        {/* Action CTAs */}
        <div
          id="hero-actions-container"
          className="flex flex-wrap items-center gap-3.5 mb-16 sm:mb-20"
        >
          <a
            href="#built"
            id="hero-cta-case-studies"
            className="btn-sheen inline-flex items-center gap-2 px-6 py-3 rounded-md text-sm font-semibold bg-[#6C47FF] text-white shadow-[0_4px_24px_rgba(108,71,255,0.35)] hover:bg-[#7D5BFF]"
          >
            <span>View case studies</span>
            <ArrowDown className="w-4 h-4" />
          </a>

          <a
            href="https://www.linkedin.com/in/sankalp-shah-300596"
            target="_blank"
            rel="noopener noreferrer"
            id="hero-cta-linkedin"
            className="inline-flex items-center gap-2 px-5 py-3 rounded-md text-sm font-medium bg-[#111111] hover:bg-[#1A1A1A] text-[#888888] hover:text-[#F2F2F2] border border-[#2E2E2E] hover:border-[#444444] transition-all hover:-translate-y-0.5"
          >
            <Linkedin className="w-4 h-4 text-[#0077B5]" />
            <span>LinkedIn</span>
            <ExternalLink className="w-3 h-3 opacity-50" />
          </a>

          <a
            href="https://github.com/sankalp305zeus"
            target="_blank"
            rel="noopener noreferrer"
            id="hero-cta-github"
            className="inline-flex items-center gap-2 px-5 py-3 rounded-md text-sm font-medium bg-[#111111] hover:bg-[#1A1A1A] text-[#888888] hover:text-[#F2F2F2] border border-[#2E2E2E] hover:border-[#444444] transition-all hover:-translate-y-0.5"
          >
            <Github className="w-4 h-4 text-white" />
            <span>GitHub</span>
            <ExternalLink className="w-3 h-3 opacity-50" />
          </a>

          <a
            href="https://github.com/blazing-llama"
            target="_blank"
            rel="noopener noreferrer"
            id="hero-cta-blazing-llama"
            className="inline-flex items-center gap-2 px-5 py-3 rounded-md text-sm font-medium bg-[#111111] hover:bg-[#1A1A1A] text-[#888888] hover:text-[#F2F2F2] border border-[#2E2E2E] hover:border-[#6C47FF]/40 transition-all hover:-translate-y-0.5"
          >
            <Flame className="w-4 h-4 text-[#FF5722]" />
            <span>blazing-llama</span>
            <ExternalLink className="w-3 h-3 opacity-50" />
          </a>
        </div>

        {/* Stats Row */}
        <div
          id="hero-stats-row"
          className="pt-10 border-t border-[#252525] grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-10"
        >
          {HERO_DATA.stats.map((stat, idx) => (
            <div key={idx} id={`hero-stat-card-${idx}`} className="flex flex-col">
              <StatCounter
                target={stat.target}
                suffix={stat.suffix}
                display={stat.display}
                isStatic={stat.isStatic}
              />
              <p className="text-xs sm:text-[13px] text-[#888888] leading-snug mt-2 whitespace-pre-line">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
