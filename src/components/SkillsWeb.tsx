import React, { useState } from 'react';
import { SKILL_CATEGORIES } from '../data/portfolioData';
import { Sparkles, Layers, Database, Terminal, Briefcase, CheckCircle2 } from 'lucide-react';

interface SkillsWebProps {
  onSkillSelect?: (skill: string) => void;
}

export default function SkillsWeb({ onSkillSelect }: SkillsWebProps) {
  // Currently expanded branch: 'Product' | 'AI' | 'Data' | 'Build' | 'Business' | null
  const [expandedBranch, setExpandedBranch] = useState<string | null>(null);
  const [selectedSkill, setSelectedSkill] = useState<string | null>(null);

  const categories = SKILL_CATEGORIES.map((c) => ({
    name: c.category,
    skills: c.skills,
    icon:
      c.category === 'Product'
        ? Layers
        : c.category === 'AI'
        ? Sparkles
        : c.category === 'Data'
        ? Database
        : c.category === 'Build'
        ? Terminal
        : Briefcase,
    color:
      c.category === 'Product'
        ? '#6C47FF'
        : c.category === 'AI'
        ? '#8B6FFF'
        : c.category === 'Data'
        ? '#10B981'
        : c.category === 'Build'
        ? '#F59E0B'
        : '#EC4899',
  }));

  // Coordinate geometry for 780x680 viewBox
  const center = { x: 390, y: 335 };
  const branchRadius = 165;

  // 5 branch angles (in radians):
  // 0: Product (top, -90°)
  // 1: AI (top-right, -18°)
  // 2: Data (bottom-right, +54°)
  // 3: Build (bottom-left, +126°)
  // 4: Business (top-left, +198°)
  const branchAngles = [-90, -18, 54, 126, 198].map((deg) => (deg * Math.PI) / 180);

  const branchesWithCoords = categories.map((cat, idx) => {
    const angle = branchAngles[idx];
    const x = center.x + branchRadius * Math.cos(angle);
    const y = center.y + branchRadius * Math.sin(angle);
    return {
      ...cat,
      angle,
      x,
      y,
      idx,
    };
  });

  const activeBranchData = branchesWithCoords.find((b) => b.name === expandedBranch);

  // Compute fan-out positions for active branch's skills.
  // Pills are placed by allocating each one an angular slice proportional to
  // its rendered width (plus a fixed gap), so pills never overlap regardless
  // of how many skills or how long their labels are. Skills alternate between
  // a near and far ring to keep the arc from spreading too wide.
  const pillWidthOf = (skill: string) => Math.max(skill.length * 6.5 + 20, 68);
  const MIN_ARC_GAP = 16; // px gap enforced between adjacent pills along the arc
  const MAX_RING_SPREAD = (150 * Math.PI) / 180;

  const layoutRing = (
    items: { skill: string; origIdx: number }[],
    radius: number,
    baseAngle: number,
    angleOffset = 0
  ) => {
    const angles = items.map(
      ({ skill }) => (pillWidthOf(skill) + MIN_ARC_GAP) / radius
    );
    const totalAngle = angles.reduce((a, b) => a + b, 0);
    const spread = Math.min(totalAngle, MAX_RING_SPREAD);
    const scale = totalAngle > 0 ? spread / totalAngle : 1;
    let cursor = baseAngle + angleOffset - spread / 2;
    return items.map(({ skill, origIdx }, i) => {
      const a = angles[i] * scale;
      const angle = cursor + a / 2;
      cursor += a;
      return { skill, origIdx, angle, radius };
    });
  };

  const fanSkills = activeBranchData
    ? (() => {
        const arr = activeBranchData.skills;
        const baseAngle = activeBranchData.angle;
        const indexed = arr.map((skill, origIdx) => ({ skill, origIdx }));

        // Near/far rings are spaced far enough apart (64px) that pills can't
        // collide radially, and the far ring is rotated a few degrees off
        // the near ring so pills don't line up along the same radial line
        // (which would otherwise put two wide pills right next to each
        // other even with a radius gap).
        const useDualRing = arr.length > 5;
        const placed = useDualRing
          ? [
              ...layoutRing(
                indexed.filter((_, i) => i % 2 === 0),
                86,
                baseAngle
              ),
              ...layoutRing(
                indexed.filter((_, i) => i % 2 === 1),
                150,
                baseAngle,
                (10 * Math.PI) / 180
              ),
            ]
          : layoutRing(indexed, 104, baseAngle);

        return placed
          .sort((a, b) => a.origIdx - b.origIdx)
          .map(({ skill, angle, radius }) => ({
            skill,
            sx: activeBranchData.x + radius * Math.cos(angle),
            sy: activeBranchData.y + radius * Math.sin(angle),
            branchX: activeBranchData.x,
            branchY: activeBranchData.y,
          }));
      })()
    : [];

  const handleBranchClick = (branchName: string) => {
    if (expandedBranch === branchName) {
      setExpandedBranch(null);
      setSelectedSkill(null);
    } else {
      setExpandedBranch(branchName);
      setSelectedSkill(null);
    }
  };

  const handleSkillClick = (skill: string) => {
    setSelectedSkill(skill);
    if (onSkillSelect) onSkillSelect(skill);
  };

  return (
    <div
      id="skills-node-web-wrapper"
      className="relative w-full rounded-2xl bg-[#0D0D11] border border-[#222227] overflow-hidden p-4 sm:p-6 select-none shadow-2xl transition-all"
    >
      {/* Background Ambient Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-[#6C47FF]/10 rounded-full blur-3xl pointer-events-none" />

      {/* Header Info Bar */}
      <div className="relative z-20 flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-[#1E1E26]">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#6C47FF] animate-pulse" />
          <span className="text-xs font-mono text-[#A896FF] font-semibold uppercase tracking-wider">
            Interactive Node Web
          </span>
          <span className="text-xs text-[#666677]">
            {expandedBranch
              ? `· Expanded: ${expandedBranch} (${activeBranchData?.skills.length} skills)`
              : '· Click any domain node to unfold skills'}
          </span>
        </div>

        {expandedBranch && (
          <button
            onClick={() => {
              setExpandedBranch(null);
              setSelectedSkill(null);
            }}
            className="text-xs font-medium text-[#C4B8FF] hover:text-white px-2.5 py-1 rounded bg-[#1C182F] border border-[#6C47FF]/40 transition-colors"
          >
            Collapse Web
          </button>
        )}
      </div>

      {/* Main Interactive SVG Canvas */}
      <div className="relative w-full aspect-[780/680] max-h-[680px] flex items-center justify-center my-2">
        <svg
          viewBox="0 0 780 680"
          className="w-full h-full overflow-visible"
          style={{ touchAction: 'manipulation' }}
        >
          <defs>
            {/* Radial Glow Filter */}
            <filter id="hubShadow" x="-20%" y="-20%" width="140%" height="140%">
              <feDropShadow dx="0" dy="0" stdDeviation="8" floodColor="#6C47FF" floodOpacity="0.5" />
            </filter>
            <filter id="nodeShadow" x="-20%" y="-20%" width="140%" height="140%">
              <feDropShadow dx="0" dy="2" stdDeviation="4" floodColor="#000000" floodOpacity="0.8" />
            </filter>
          </defs>

          {/* Orbit circles for visual depth */}
          <circle
            cx={center.x}
            cy={center.y}
            r={branchRadius}
            fill="none"
            stroke="#1D1D26"
            strokeWidth="1.2"
            strokeDasharray="4 6"
          />
          <circle
            cx={center.x}
            cy={center.y}
            r={branchRadius * 0.55}
            fill="none"
            stroke="#181820"
            strokeWidth="1"
            strokeDasharray="3 5"
          />

          {/* Web Lines between Adjacent Branches */}
          {branchesWithCoords.map((b, i) => {
            const nextB = branchesWithCoords[(i + 1) % branchesWithCoords.length];
            const isDimmed =
              expandedBranch !== null &&
              expandedBranch !== b.name &&
              expandedBranch !== nextB.name;
            return (
              <line
                key={`outer-poly-${i}`}
                x1={b.x}
                y1={b.y}
                x2={nextB.x}
                y2={nextB.y}
                stroke="#252533"
                strokeWidth="1.2"
                strokeDasharray="3 4"
                opacity={isDimmed ? 0.2 : 0.6}
                className="transition-opacity duration-300"
              />
            );
          })}

          {/* 1. Hub to Branch Connecting Lines (with animated stroke-draw effect on load) */}
          {branchesWithCoords.map((b) => {
            const isDimmed = expandedBranch !== null && expandedBranch !== b.name;
            const isTarget = expandedBranch === b.name;
            return (
              <g key={`hub-line-${b.name}`}>
                <line
                  x1={center.x}
                  y1={center.y}
                  x2={b.x}
                  y2={b.y}
                  stroke={isTarget ? '#8B6FFF' : '#6C47FF'}
                  strokeWidth={isTarget ? '2.5' : '1.8'}
                  strokeOpacity={isDimmed ? 0.25 : isTarget ? 0.9 : 0.6}
                  style={{
                    animation: 'strokeDraw 1.2s cubic-bezier(0.16, 1, 0.3, 1) forwards',
                    strokeDasharray: 350,
                    strokeDashoffset: 350,
                  }}
                  className="transition-all duration-300"
                />
                {/* Micro pulse point traversing the active line */}
                {isTarget && (
                  <circle r="3" fill="#FFFFFF">
                    <animateMotion
                      path={`M ${center.x} ${center.y} L ${b.x} ${b.y}`}
                      dur="1.8s"
                      repeatCount="indefinite"
                    />
                  </circle>
                )}
              </g>
            );
          })}

          {/* 2. Secondary Fan-Out Connecting Lines (from expanded branch to skill pills) */}
          {fanSkills.map((fs, fIdx) => (
            <g key={`fan-line-${fIdx}`}>
              <line
                x1={fs.branchX}
                y1={fs.branchY}
                x2={fs.sx}
                y2={fs.sy}
                stroke="#8B6FFF"
                strokeWidth="1.4"
                strokeDasharray="3 3"
                strokeOpacity="0.8"
                style={{
                  animation: 'strokeDraw 0.6s ease-out forwards',
                  strokeDasharray: 200,
                  strokeDashoffset: 200,
                }}
              />
              <circle cx={fs.sx} cy={fs.sy} r="2" fill="#C4B8FF" />
            </g>
          ))}

          {/* 3. Central Hub Node ("Skills & Tools") */}
          <g
            transform={`translate(${center.x}, ${center.y})`}
            className="cursor-pointer"
            onClick={() => {
              setExpandedBranch(null);
              setSelectedSkill(null);
            }}
          >
            {/* Outer Hub Ring */}
            <circle
              r="52"
              fill="#12101E"
              stroke="#8B6FFF"
              strokeWidth="2.5"
              filter="url(#hubShadow)"
            />
            {/* Inner Ring Accent */}
            <circle r="46" fill="none" stroke="#6C47FF" strokeWidth="1" strokeDasharray="3 3" />
            {/* Central Text */}
            <text
              y="-7"
              textAnchor="middle"
              fill="#FFFFFF"
              fontSize="14"
              fontWeight="800"
              fontFamily="Fraunces, serif"
              letterSpacing="-0.02em"
            >
              Skills &amp;
            </text>
            <text
              y="11"
              textAnchor="middle"
              fill="#FFFFFF"
              fontSize="14"
              fontWeight="800"
              fontFamily="Fraunces, serif"
              letterSpacing="-0.02em"
            >
              Tools
            </text>
            <text
              y="26"
              textAnchor="middle"
              fill="#A896FF"
              fontSize="9"
              fontFamily="monospace"
              letterSpacing="0.05em"
            >
              5 DOMAINS
            </text>
          </g>

          {/* 4. Five Branch Nodes (Product, AI, Data, Build, Business) */}
          {branchesWithCoords.map((b) => {
            const isExpanded = expandedBranch === b.name;
            const isDimmed = expandedBranch !== null && !isExpanded;
            const Icon = b.icon;

            return (
              <g
                key={b.name}
                transform={`translate(${b.x}, ${b.y})`}
                onClick={() => handleBranchClick(b.name)}
                className="cursor-pointer transition-all duration-300"
                style={{
                  opacity: isDimmed ? 0.4 : 1,
                  transformOrigin: `${b.x}px ${b.y}px`,
                }}
              >
                {/* Branch Node Background Circle */}
                <circle
                  r={isExpanded ? 38 : 34}
                  fill={isExpanded ? '#1C1832' : '#14141C'}
                  stroke={isExpanded ? '#C4B8FF' : '#6C47FF'}
                  strokeWidth={isExpanded ? 3 : 2}
                  filter="url(#nodeShadow)"
                  className="transition-all duration-300 hover:stroke-[#8B6FFF]"
                />

                {/* Pulsing ring if expanded */}
                {isExpanded && (
                  <circle
                    r="44"
                    fill="none"
                    stroke="#8B6FFF"
                    strokeWidth="1.5"
                    strokeDasharray="4 4"
                    opacity="0.8"
                    className="animate-spin"
                    style={{ animationDuration: '8s' }}
                  />
                )}

                {/* Branch Label */}
                <text
                  y="-4"
                  textAnchor="middle"
                  fill={isExpanded ? '#FFFFFF' : '#F2F2F2'}
                  fontSize="12"
                  fontWeight="700"
                  fontFamily="Fraunces, serif"
                >
                  {b.name}
                </text>
                <text
                  y="12"
                  textAnchor="middle"
                  fill="#888899"
                  fontSize="9.5"
                  fontFamily="monospace"
                >
                  {b.skills.length} skills
                </text>

                {/* Click indicator badge */}
                <circle
                  cx="0"
                  cy="24"
                  r="3.5"
                  fill={isExpanded ? '#22C55E' : '#6C47FF'}
                />
              </g>
            );
          })}

          {/* 5. Fan-Out Secondary Skill Pill Nodes */}
          {fanSkills.map((fs, idx) => {
            const isSelected = selectedSkill === fs.skill;
            // Pill dimensions based on text length
            const pillWidth = Math.max(fs.skill.length * 6.5 + 20, 68);
            const pillHeight = 22;

            return (
              <g
                key={`fan-node-${idx}`}
                transform={`translate(${fs.sx}, ${fs.sy})`}
                onClick={() => handleSkillClick(fs.skill)}
                className="cursor-pointer group"
                style={{
                  animation: `pawFade 0.4s ease-out ${idx * 0.04}s backwards`,
                }}
              >
                {/* Pill Background Rectangle */}
                <rect
                  x={-pillWidth / 2}
                  y={-pillHeight / 2}
                  width={pillWidth}
                  height={pillHeight}
                  rx="11"
                  fill={isSelected ? '#2A2247' : '#14141E'}
                  stroke={isSelected ? '#C4B8FF' : '#6C47FF'}
                  strokeWidth={isSelected ? '1.8' : '1.2'}
                  strokeOpacity={isSelected ? 1 : 0.8}
                  className="transition-colors group-hover:fill-[#1E1B2E] group-hover:stroke-[#8B6FFF]"
                />

                {/* Pill Text */}
                <text
                  y="3.5"
                  textAnchor="middle"
                  fill={isSelected ? '#FFFFFF' : '#D4D4E0'}
                  fontSize="9.5"
                  fontWeight="600"
                  fontFamily="'Plus Jakarta Sans', sans-serif"
                  className="transition-colors group-hover:fill-white select-none"
                >
                  {fs.skill}
                </text>
              </g>
            );
          })}
        </svg>
      </div>

      {/* Interactive Detail Toast (When a skill pill is selected) */}
      {selectedSkill && (
        <div className="relative z-20 mt-2 p-3 rounded-xl bg-gradient-to-r from-[#171526] to-[#111116] border border-[#6C47FF]/40 flex items-center justify-between gap-3 animate-in fade-in slide-in-from-bottom-2 duration-200">
          <div className="flex items-center gap-2.5 min-w-0">
            <div className="w-6 h-6 rounded-md bg-[#6C47FF]/20 border border-[#8B6FFF]/40 flex items-center justify-center shrink-0">
              <CheckCircle2 className="w-3.5 h-3.5 text-[#22C55E]" />
            </div>
            <div className="truncate">
              <span className="text-xs font-bold text-white mr-2">{selectedSkill}</span>
              <span className="text-[10px] text-[#A896FF] font-mono">
                Verified PM &amp; Engineering Artifact
              </span>
            </div>
          </div>
          <button
            onClick={() => setSelectedSkill(null)}
            className="text-[11px] text-[#777788] hover:text-white px-2 py-0.5"
          >
            ✕
          </button>
        </div>
      )}

      {/* Footer Navigation Tip */}
      <div className="relative z-10 flex items-center justify-between text-[11px] text-[#666677] pt-2.5 border-t border-[#1C1C22]">
        <span className="font-mono">
          {expandedBranch
            ? `💡 Showing ${expandedBranch} branch. Click the same node again to collapse, or click another branch to swap.`
            : '💡 Click any domain node (Product, AI, Data, Build, Business) to fan out its skills web.'}
        </span>
        <span className="text-[#8B6FFF] font-medium hidden sm:inline">
          31 Core Skills
        </span>
      </div>
    </div>
  );
}
