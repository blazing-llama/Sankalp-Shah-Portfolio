import React, { useState } from 'react';
import { Linkedin, Github, Flame, ArrowUp, Mail, Copy, Check } from 'lucide-react';
import PixelSankalpThor from './PixelSankalpThor';

export default function Footer() {
  const [copied, setCopied] = useState(false);
  const workEmail = 'workspacezeus@gmail.com';

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(workEmail);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback
    }
  };

  return (
    <footer className="py-20 bg-[#0B0B0B] border-t border-[#202020] relative z-10">
      <div className="max-w-6xl mx-auto px-6 sm:px-8">
        {/* Main Footer Content */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-10 pb-12">
          {/* Left Column: Name, Bio & Work Email */}
          <div className="max-w-md">
            <div className="flex items-center gap-2 mb-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#6C47FF] shadow-[0_0_8px_#6C47FF]" />
              <h3 className="font-syne font-extrabold text-xl tracking-tight text-[#F2F2F2]">
                Sankalp Shah
              </h3>
            </div>
            <p className="text-xs sm:text-sm text-[#888888] leading-relaxed mb-5">
              Product Manager specializing in deterministic AI pipelines, RAG systems, and user behavior analytics. Based in Pune, India.
            </p>

            {/* Work Email with mailto and Copy to Clipboard */}
            <div className="inline-flex items-center gap-2 p-1.5 pl-3 rounded-lg bg-[#141418] border border-[#262630] hover:border-[#6C47FF]/50 transition-colors">
              <Mail className="w-3.5 h-3.5 text-[#8B6FFF]" />
              <a
                href={`mailto:${workEmail}`}
                className="text-xs font-mono text-[#E0E0E0] hover:text-white transition-colors"
              >
                {workEmail}
              </a>
              <button
                onClick={copyEmail}
                title="Copy work email"
                className="p-1.5 rounded-md bg-[#1F1F28] hover:bg-[#2B2B38] text-[#888899] hover:text-white transition-colors flex items-center gap-1 text-[11px]"
              >
                {copied ? (
                  <>
                    <Check className="w-3 h-3 text-[#22C55E]" />
                    <span className="text-[#22C55E] font-medium text-[10px]">Copied</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3 h-3" />
                    <span className="text-[10px]">Copy</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Center Column: Cosmos Stargazing Moment (Resized 3x larger so illustration details shine) */}
          <div className="flex flex-col items-center justify-center p-3 rounded-2xl bg-[#101015] border border-[#22222C] shadow-xl">
            <div className="scale-100 transition-transform">
              <PixelSankalpThor size="md" variant="stargazing" interactive={true} />
            </div>
            <span className="text-[10px] font-mono text-[#777788] mt-2 tracking-wide">
              ✦ Thor &amp; Sankalp stargazing under the cosmos (click to pet 🐾)
            </span>
          </div>

          {/* Right Column: Social Links & Back to top */}
          <div className="flex flex-col sm:items-end gap-4">
            <div className="flex flex-wrap items-center gap-3">
              <a
                href="https://www.linkedin.com/in/sankalp-shah-300596"
                target="_blank"
                rel="noopener noreferrer"
                className="px-3 py-1.5 rounded-lg bg-[#141418] border border-[#24242A] hover:border-[#0077B5]/60 text-xs font-medium text-[#A0A0A0] hover:text-white flex items-center gap-1.5 transition-colors"
              >
                <Linkedin className="w-3.5 h-3.5 text-[#0077B5]" />
                <span>LinkedIn</span>
              </a>

              <a
                href="https://github.com/sankalp305zeus"
                target="_blank"
                rel="noopener noreferrer"
                className="px-3 py-1.5 rounded-lg bg-[#141418] border border-[#24242A] hover:border-white/30 text-xs font-medium text-[#A0A0A0] hover:text-white flex items-center gap-1.5 transition-colors"
              >
                <Github className="w-3.5 h-3.5 text-[#DDD]" />
                <span>GitHub</span>
              </a>

              <a
                href="https://github.com/blazing-llama"
                target="_blank"
                rel="noopener noreferrer"
                className="px-3 py-1.5 rounded-lg bg-[#141418] border border-[#24242A] hover:border-[#FF5722]/60 text-xs font-medium text-[#A0A0A0] hover:text-white flex items-center gap-1.5 transition-colors"
              >
                <Flame className="w-3.5 h-3.5 text-[#FF5722]" />
                <span>blazing-llama</span>
              </a>

              <button
                onClick={scrollToTop}
                aria-label="Back to top"
                className="p-2 rounded-lg bg-[#141418] hover:bg-[#202028] border border-[#282830] text-[#888888] hover:text-white transition-colors"
              >
                <ArrowUp className="w-4 h-4" />
              </button>
            </div>

            <span className="text-[11px] font-mono text-[#555566]">
              Available for Product Management roles
            </span>
          </div>
        </div>

        <div className="pt-6 border-t border-[#1C1C1C] flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-[11px] text-[#555555]">
          <p>© {new Date().getFullYear()} Sankalp Shah. Shipped with evidence-first rigor.</p>
          <p className="font-mono text-[#444444]">Built with React, Vite &amp; Tailwind</p>
        </div>
      </div>
    </footer>
  );
}
