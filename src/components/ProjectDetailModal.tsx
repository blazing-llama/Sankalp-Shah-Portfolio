import { BuiltProject } from '../data/portfolioData';
import { X, ExternalLink, ShieldCheck, Cpu, Lightbulb, CheckCircle2, Layers } from 'lucide-react';

interface ProjectDetailModalProps {
  project: BuiltProject | null;
  onClose: () => void;
}

export default function ProjectDetailModal({ project, onClose }: ProjectDetailModalProps) {
  if (!project) return null;

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div
        className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-[#131313] border border-[#2E2E2E] rounded-xl shadow-2xl p-6 sm:p-8"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          aria-label="Close modal"
          className="absolute top-5 right-5 p-2 rounded-lg bg-[#1D1D1D] hover:bg-[#2A2A2A] text-[#888888] hover:text-white border border-[#2C2C2C] transition-colors"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Tag & Title */}
        <div className="mb-4">
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded text-[10px] font-bold tracking-wider uppercase bg-[#6C47FF]/15 text-[#B0A0FF] border border-[#6C47FF]/30">
            {project.tag}
          </span>
        </div>

        <h3 className="font-syne font-bold text-2xl sm:text-3xl text-[#F2F2F2] tracking-tight mb-4">
          {project.name}
        </h3>

        <p className="text-sm text-[#999999] leading-relaxed mb-6">
          {project.description}
        </p>

        {/* Metrics Grid */}
        <div className="grid grid-cols-2 gap-3 mb-6 bg-[#181818] p-4 rounded-lg border border-[#262626]">
          {project.metrics.map((m, idx) => (
            <div key={idx} className="flex flex-col">
              <span className="font-syne font-extrabold text-lg text-[#6C47FF] tracking-tight">
                {m.value}
              </span>
              <span className="text-xs text-[#888888] leading-tight mt-0.5">
                {m.label}
              </span>
            </div>
          ))}
        </div>

        {/* Deep dive breakdown if available */}
        {project.deepDive && (
          <div className="space-y-4 mb-6 border-t border-[#242424] pt-5">
            <div>
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#A896FF] mb-1.5">
                <Lightbulb className="w-3.5 h-3.5" />
                <span>Falsifiable Hypothesis</span>
              </div>
              <p className="text-xs text-[#888888] bg-[#161616] p-3 rounded border border-[#222222] leading-relaxed">
                {project.deepDive.hypothesis}
              </p>
            </div>

            <div>
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#22C55E] mb-1.5">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>Guardrails &amp; Hallucination Defense</span>
              </div>
              <ul className="space-y-1.5 bg-[#161616] p-3 rounded border border-[#222222]">
                {project.deepDive.guardrails.map((g, gIdx) => (
                  <li key={gIdx} className="flex items-start gap-2 text-xs text-[#888888]">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#22C55E] shrink-0 mt-0.5" />
                    <span>{g}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#818CF8] mb-1.5">
                <Cpu className="w-3.5 h-3.5" />
                <span>System Architecture</span>
              </div>
              <ul className="space-y-1.5 bg-[#161616] p-3 rounded border border-[#222222]">
                {project.deepDive.architecture.map((a, aIdx) => (
                  <li key={aIdx} className="flex items-start gap-2 text-xs text-[#888888]">
                    <Layers className="w-3.5 h-3.5 text-[#818CF8] shrink-0 mt-0.5" />
                    <span>{a}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}

        {/* Tech Stack Chips */}
        <div className="flex flex-wrap gap-1.5 mb-6">
          {project.chips.map((chip, cIdx) => (
            <span
              key={cIdx}
              className="text-[11px] text-[#777777] bg-[#1B1B1B] border border-[#292929] px-2.5 py-1 rounded"
            >
              {chip}
            </span>
          ))}
        </div>

        {/* Action Links */}
        <div className="flex items-center justify-end gap-3 pt-4 border-t border-[#242424]">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded text-xs font-medium text-[#888888] hover:text-white bg-[#1A1A1A] hover:bg-[#242424] transition-colors"
          >
            Close
          </button>
          {project.links.map((link, lIdx) => (
            <a
              key={lIdx}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded text-xs font-semibold bg-[#6C47FF] hover:bg-[#7D5BFF] text-white shadow-md transition-all"
            >
              <span>{link.label}</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
