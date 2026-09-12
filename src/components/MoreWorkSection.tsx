import { REPOS } from '../data/portfolioData';
import { Github, FolderGit2, ArrowUpRight, Cpu, BarChart3 } from 'lucide-react';

export default function MoreWorkSection() {
  const aiRepos = REPOS.filter((r) => r.group === 'ai');
  const dataRepos = REPOS.filter((r) => r.group === 'data');

  return (
    <section id="more" className="py-24 sm:py-32 relative z-10">
      <div className="max-w-6xl mx-auto px-6 sm:px-8">
        {/* Section Header */}
        <div className="mb-14">
          <div className="flex items-center gap-4 mb-4">
            <span className="text-[10px] font-bold tracking-[0.15em] uppercase text-[#6C47FF]">
              Also on GitHub
            </span>
            <div className="flex-1 h-[1px] bg-[#252525]" />
          </div>

          <h2 className="font-syne font-bold text-2xl sm:text-3xl md:text-4xl text-[#F2F2F2] tracking-tight mb-3">
            More projects
          </h2>
          <p className="text-sm sm:text-base text-[#888888] max-w-xl leading-relaxed">
            Side projects, experiments, and data science — all open source across
            two GitHub orgs.
          </p>
        </div>

        {/* Group 1: AI & Product Engineering */}
        <div className="mb-12">
          <div className="flex items-center gap-2 mb-5">
            <Cpu className="w-3.5 h-3.5 text-[#6C47FF]" />
            <h3 className="text-xs font-bold tracking-[0.12em] uppercase text-[#777777]">
              AI &amp; Product Engineering
            </h3>
          </div>

          <div
            id="more-ai-repos-grid"
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5"
          >
            {aiRepos.map((repo) => (
              <a
                key={repo.id}
                href={repo.url}
                target="_blank"
                rel="noopener noreferrer"
                id={`repo-card-${repo.id}`}
                className="gh-card group bg-[#111111] hover:bg-[#161616] border border-[#252525] hover:border-[#383838] rounded-lg p-5 flex flex-col justify-between transition-all duration-200 hover:-translate-y-1"
              >
                <div>
                  <div className="flex items-start justify-between gap-2 mb-2.5">
                    <h4 className="font-syne font-bold text-sm text-[#F2F2F2] group-hover:text-[#B0A0FF] transition-colors">
                      {repo.name}
                    </h4>
                    <ArrowUpRight className="w-3.5 h-3.5 text-[#555555] group-hover:text-white transition-colors" />
                  </div>
                  <p className="text-xs text-[#888888] leading-relaxed mb-4 line-clamp-3">
                    {repo.description}
                  </p>
                </div>

                <div className="flex items-center gap-1.5 pt-3 border-t border-[#202020] text-[11px] text-[#555555] group-hover:text-[#888888] transition-colors">
                  <Github className="w-3 h-3" />
                  <span className="font-mono truncate">{repo.org}</span>
                </div>
              </a>
            ))}
          </div>
        </div>

        {/* Group 2: Data Science */}
        <div>
          <div className="flex items-center gap-2 mb-5">
            <BarChart3 className="w-3.5 h-3.5 text-[#818CF8]" />
            <h3 className="text-xs font-bold tracking-[0.12em] uppercase text-[#777777]">
              Data Science
            </h3>
          </div>

          <div
            id="more-data-repos-grid"
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5"
          >
            {dataRepos.map((repo) => (
              <a
                key={repo.id}
                href={repo.url}
                target="_blank"
                rel="noopener noreferrer"
                id={`repo-card-${repo.id}`}
                className="gh-card group bg-[#111111] hover:bg-[#161616] border border-[#252525] hover:border-[#383838] rounded-lg p-5 flex flex-col justify-between transition-all duration-200 hover:-translate-y-1"
              >
                <div>
                  <div className="flex items-start justify-between gap-2 mb-2.5">
                    <h4 className="font-syne font-bold text-sm text-[#F2F2F2] group-hover:text-[#818CF8] transition-colors">
                      {repo.name}
                    </h4>
                    <ArrowUpRight className="w-3.5 h-3.5 text-[#555555] group-hover:text-white transition-colors" />
                  </div>
                  <p className="text-xs text-[#888888] leading-relaxed mb-4 line-clamp-3">
                    {repo.description}
                  </p>
                </div>

                <div className="flex items-center gap-1.5 pt-3 border-t border-[#202020] text-[11px] text-[#555555] group-hover:text-[#888888] transition-colors">
                  <FolderGit2 className="w-3 h-3" />
                  <span className="font-mono truncate">{repo.org}</span>
                </div>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
