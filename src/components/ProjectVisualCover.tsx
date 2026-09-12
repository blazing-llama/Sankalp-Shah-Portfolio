import React from 'react';

interface ProjectVisualCoverProps {
  projectId: string;
  isFeatured?: boolean;
}

export default function ProjectVisualCover({
  projectId,
  isFeatured = false,
}: ProjectVisualCoverProps) {
  const containerHeight = isFeatured ? 'h-48 sm:h-56' : 'h-36 sm:h-44';

  const normalizedId =
    projectId === 'chatgpt-voice' ? 'chatgpt' :
    projectId === 'weekly-review-pulse' ? 'review-pulse' :
    projectId;

  return (
    <div
      className={`relative w-full ${containerHeight} overflow-hidden rounded-xl bg-[#0D0D11] border border-[#222228] transition-all duration-300 group-hover:border-[#6C47FF]/50 flex items-center justify-center`}
    >
      {/* Subtle Background Radial Pattern */}
      <div
        className="absolute inset-0 opacity-10 pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(#555566 1px, transparent 1px)`,
          backgroundSize: '16px 16px',
        }}
      />

      {/* Gentle Purple Radial Ambient Glow */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#6C47FF]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

      {/* Hand-Designed Vector Icon Container */}
      <div className="relative z-10 flex items-center justify-center w-full h-full p-4">
        {normalizedId === 'blinkit' && <BlinkitIconGraphic />}
        {normalizedId === 'myntra' && <MyntraIconGraphic />}
        {normalizedId === 'chatgpt' && <ChatGPTVoiceIconGraphic />}
        {normalizedId === 'review-pulse' && <ReviewPulseIconGraphic />}
        {normalizedId === 'mf-faq' && <MfFaqIconGraphic />}
        {normalizedId === 'groww' && <GrowwTeardownIconGraphic />}
        {normalizedId === 'zomato' && <ZomatoTeardownIconGraphic />}
      </div>
    </div>
  );
}

/**
 * 1. BLINKIT DISCOVERY CONCIERGE:
 * Shopping cart icon with a small sparkle badge and a floating "+1 category" chip popping off the cart
 */
function BlinkitIconGraphic() {
  return (
    <div className="relative flex items-center justify-center group-hover:scale-105 transition-transform duration-300">
      {/* Background Soft Glow Ring */}
      <div className="absolute w-28 h-28 rounded-full bg-[#6C47FF]/10 blur-xl pointer-events-none" />

      {/* Floating "+1 category" chip popping off the cart */}
      <div className="absolute -top-3.5 -right-6 z-20 flex items-center gap-1 px-2 py-0.5 rounded-full bg-[#181528] border border-[#8B6FFF] text-[#C4B8FF] text-[10px] font-mono font-bold shadow-[0_0_12px_rgba(108,71,255,0.4)] group-hover:-translate-y-1.5 transition-transform duration-300">
        <span className="text-[#22C55E]">+1</span>
        <span>category</span>
      </div>

      {/* Central SVG: Shopping Cart + Sparkle Badge */}
      <svg
        width="80"
        height="80"
        viewBox="0 0 80 80"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="overflow-visible"
      >
        {/* Shopping Cart Body */}
        <path
          d="M16 22H24L30 48H58L64 28H27"
          stroke="#8B6FFF"
          strokeWidth="3.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        {/* Cart Basket Grid Lines */}
        <path
          d="M33 34H61M36 41H57"
          stroke="#6C47FF"
          strokeWidth="2"
          strokeLinecap="round"
          strokeOpacity="0.6"
        />
        {/* Cart Wheels */}
        <circle cx="33" cy="56" r="4" fill="#E5E5E5" stroke="#6C47FF" strokeWidth="2" />
        <circle cx="55" cy="56" r="4" fill="#E5E5E5" stroke="#6C47FF" strokeWidth="2" />

        {/* Sparkle Badge on upper right */}
        <g className="group-hover:scale-110 origin-center transition-transform duration-300">
          <circle cx="58" cy="18" r="8" fill="#1C1833" stroke="#FACC15" strokeWidth="1.5" />
          {/* Sparkle 4-point star */}
          <path
            d="M58 13L59.2 16.8L63 18L59.2 19.2L58 23L56.8 19.2L53 18L56.8 16.8L58 13Z"
            fill="#FACC15"
          />
        </g>
      </svg>
    </div>
  );
}

/**
 * 2. MYNTRA WISHLIST INTELLIGENCE:
 * Heart/wishlist icon with a small downward price-arrow and a faint sparkline graph behind it
 */
function MyntraIconGraphic() {
  return (
    <div className="relative flex items-center justify-center group-hover:scale-105 transition-transform duration-300">
      {/* Background Soft Glow */}
      <div className="absolute w-28 h-28 rounded-full bg-[#EC4899]/10 blur-xl pointer-events-none" />

      {/* Faint Sparkline Graph Behind */}
      <svg
        width="140"
        height="50"
        viewBox="0 0 140 50"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="absolute inset-0 m-auto opacity-35 group-hover:opacity-60 transition-opacity duration-300"
      >
        <path
          d="M10 15 Q 35 10, 60 28 T 105 32 T 130 42"
          stroke="#8B6FFF"
          strokeWidth="2.5"
          strokeLinecap="round"
          fill="none"
        />
        {/* Fill area under curve */}
        <path
          d="M10 15 Q 35 10, 60 28 T 105 32 T 130 42 L 130 50 L 10 50 Z"
          fill="#6C47FF"
          fillOpacity="0.1"
        />
      </svg>

      {/* Central SVG: Heart Icon + Downward Price Arrow */}
      <div className="relative z-10 flex items-center justify-center">
        <svg
          width="74"
          height="74"
          viewBox="0 0 74 74"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Heart Outline */}
          <path
            d="M37 58C37 58 18 45 18 31C18 23 24 17 32 17C35.5 17 37 19.5 37 19.5C37 19.5 38.5 17 42 17C50 17 56 23 56 31C56 45 37 58 37 58Z"
            fill="#1A1526"
            stroke="#8B6FFF"
            strokeWidth="3"
            strokeLinejoin="round"
          />

          {/* Inner Heart Accent */}
          <path
            d="M37 51C37 51 24 40 24 31C24 26 27.5 22 32.5 22C35 22 37 24 37 24C37 24 39 22 41.5 22C46.5 22 50 26 50 31C50 40 37 51 37 51Z"
            fill="#6C47FF"
            fillOpacity="0.25"
          />

          {/* Downward Price Arrow with Green Accent */}
          <g className="group-hover:translate-y-1 transition-transform duration-300">
            {/* Arrow Stem */}
            <path
              d="M37 27V43"
              stroke="#22C55E"
              strokeWidth="3"
              strokeLinecap="round"
            />
            {/* Arrow Head */}
            <path
              d="M31 38L37 44L43 38"
              stroke="#22C55E"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </g>
        </svg>
      </div>
    </div>
  );
}

/**
 * 3. CHATGPT VOICE INDIA:
 * Animated audio waveform (vertical bars of varying height, gently pulsing) centered around a microphone icon
 */
function ChatGPTVoiceIconGraphic() {
  return (
    <div className="relative flex items-center justify-center group-hover:scale-105 transition-transform duration-300">
      {/* Background Soft Glow */}
      <div className="absolute w-28 h-28 rounded-full bg-[#6C47FF]/15 blur-xl pointer-events-none" />

      {/* Waveform Bars Container flanking Microphone */}
      <div className="flex items-center gap-1.5 sm:gap-2">
        {/* Left Waveform Bars */}
        {[20, 35, 55, 30].map((h, i) => (
          <div
            key={`left-bar-${i}`}
            className="w-1.5 rounded-full bg-[#6C47FF]/70 group-hover:bg-[#8B6FFF] transition-all duration-300"
            style={{
              height: `${h}px`,
              animation: `waveformPulse 1.4s ease-in-out ${i * 0.2}s infinite alternate`,
            }}
          />
        ))}

        {/* Central Microphone Icon */}
        <div className="relative mx-1.5 flex items-center justify-center w-14 h-14 rounded-2xl bg-[#171526] border-2 border-[#8B6FFF] shadow-[0_0_20px_rgba(108,71,255,0.4)]">
          <svg
            width="28"
            height="28"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#E5E5E5"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z" fill="#6C47FF" fillOpacity="0.4" />
            <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
            <line x1="12" x2="12" y1="19" y2="22" />
          </svg>
        </div>

        {/* Right Waveform Bars */}
        {[30, 55, 35, 20].map((h, i) => (
          <div
            key={`right-bar-${i}`}
            className="w-1.5 rounded-full bg-[#6C47FF]/70 group-hover:bg-[#8B6FFF] transition-all duration-300"
            style={{
              height: `${h}px`,
              animation: `waveformPulse 1.4s ease-in-out ${(i + 4) * 0.2}s infinite alternate`,
            }}
          />
        ))}
      </div>
    </div>
  );
}

/**
 * 4. WEEKLY REVIEW PULSE:
 * Small dashboard icon with scattered dots grouping into clusters, connected to an envelope icon
 */
function ReviewPulseIconGraphic() {
  return (
    <div className="relative flex items-center justify-center group-hover:scale-105 transition-transform duration-300">
      {/* Background Soft Glow */}
      <div className="absolute w-28 h-28 rounded-full bg-[#6C47FF]/10 blur-xl pointer-events-none" />

      <svg
        width="140"
        height="70"
        viewBox="0 0 140 70"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="overflow-visible"
      >
        {/* Left: Small Dashboard Window */}
        <rect
          x="12"
          y="15"
          width="48"
          height="40"
          rx="6"
          fill="#161522"
          stroke="#8B6FFF"
          strokeWidth="2"
        />
        {/* Dashboard Title Bar */}
        <line x1="12" y1="25" x2="60" y2="25" stroke="#2D2B3D" strokeWidth="1.5" />
        <circle cx="18" cy="20" r="1.5" fill="#6C47FF" />
        <circle cx="23" cy="20" r="1.5" fill="#6C47FF" />

        {/* Scattered Dots Grouping into Clusters inside Dashboard */}
        {/* Cluster A (Top Left) */}
        <circle cx="24" cy="33" r="2.5" fill="#8B6FFF" />
        <circle cx="28" cy="35" r="2" fill="#C4B8FF" />
        <circle cx="23" cy="38" r="1.8" fill="#8B6FFF" />

        {/* Cluster B (Bottom Right) */}
        <circle cx="44" cy="42" r="2.8" fill="#22C55E" />
        <circle cx="50" cy="40" r="2" fill="#22C55E" opacity="0.8" />
        <circle cx="47" cy="47" r="1.8" fill="#22C55E" opacity="0.6" />

        {/* Connecting Connector Line from Dashboard to Envelope */}
        <path
          d="M60 35 H 85"
          stroke="#8B6FFF"
          strokeWidth="2"
          strokeDasharray="3 3"
          className="group-hover:stroke-[#C4B8FF] transition-colors"
        />

        {/* Moving data pulse packet along connector */}
        <circle cx="72" cy="35" r="2.5" fill="#FFFFFF" className="animate-pulse" />

        {/* Right: Envelope Icon (Gmail Dispatch) */}
        <g transform="translate(86, 17)">
          <rect
            x="0"
            y="0"
            width="42"
            height="32"
            rx="5"
            fill="#1C182F"
            stroke="#8B6FFF"
            strokeWidth="2"
          />
          {/* Envelope Flap Lines */}
          <path
            d="M0 4L21 18L42 4"
            stroke="#C4B8FF"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          {/* Dispatch indicator check badge */}
          <circle cx="34" cy="24" r="5" fill="#22C55E" />
          <path
            d="M32 24L33.5 25.5L36.5 22.5"
            stroke="#0A0A0A"
            strokeWidth="1.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </g>
      </svg>
    </div>
  );
}

/**
 * 5. MF FAQ ASSISTANT:
 * Chat bubble icon with a small attached document/citation icon and a checkmark badge
 */
function MfFaqIconGraphic() {
  return (
    <div className="relative flex items-center justify-center group-hover:scale-105 transition-transform duration-300">
      {/* Background Soft Glow */}
      <div className="absolute w-28 h-28 rounded-full bg-[#6C47FF]/15 blur-xl pointer-events-none" />

      <svg
        width="86"
        height="76"
        viewBox="0 0 86 76"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="overflow-visible"
      >
        {/* Chat Bubble Base */}
        <path
          d="M14 18C14 11.4 19.4 6 26 6H60C66.6 6 72 11.4 72 18V42C72 48.6 66.6 54 60 54H32L18 64V54H26"
          fill="#171526"
          stroke="#8B6FFF"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* Chat Text Wave Lines inside Bubble */}
        <line x1="26" y1="22" x2="52" y2="22" stroke="#6C47FF" strokeWidth="2.5" strokeLinecap="round" />
        <line x1="26" y1="30" x2="44" y2="30" stroke="#6C47FF" strokeWidth="2.5" strokeLinecap="round" />
        <line x1="26" y1="38" x2="36" y2="38" stroke="#6C47FF" strokeWidth="2.5" strokeLinecap="round" strokeOpacity="0.6" />

        {/* Attached Document / Citation Badge overlapping right */}
        <g transform="translate(48, 26)" className="group-hover:translate-x-0.5 transition-transform duration-300">
          <rect
            x="0"
            y="0"
            width="26"
            height="34"
            rx="3"
            fill="#1F1B35"
            stroke="#C4B8FF"
            strokeWidth="2"
          />
          {/* Folded corner */}
          <path d="M18 0V8H26" stroke="#C4B8FF" strokeWidth="1.5" fill="none" />
          {/* Document text lines */}
          <line x1="5" y1="12" x2="16" y2="12" stroke="#888899" strokeWidth="1.8" strokeLinecap="round" />
          <line x1="5" y1="18" x2="20" y2="18" stroke="#888899" strokeWidth="1.8" strokeLinecap="round" />
          <line x1="5" y1="24" x2="14" y2="24" stroke="#888899" strokeWidth="1.8" strokeLinecap="round" />
        </g>

        {/* Checkmark Badge (SEBI Compliant / 0% Hallucination) */}
        <g transform="translate(62, 50)" className="group-hover:scale-110 origin-center transition-transform duration-300">
          <circle cx="9" cy="9" r="9" fill="#22C55E" />
          <path
            d="M5 9L8 12L13 6"
            stroke="#0A0A0A"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </g>
      </svg>
    </div>
  );
}

/**
 * 6. GROWW TEARDOWN:
 * Magnifying glass over a stylized document/fund icon
 */
export function GrowwTeardownIconGraphic() {
  return (
    <div className="relative flex items-center justify-center group-hover:scale-105 transition-transform duration-300">
      {/* Soft Glow */}
      <div className="absolute w-24 h-24 rounded-full bg-[#F59E0B]/10 blur-xl pointer-events-none" />

      <svg
        width="80"
        height="70"
        viewBox="0 0 80 70"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Stylized Fund / Sheet Document */}
        <rect
          x="16"
          y="10"
          width="36"
          height="48"
          rx="4"
          fill="#17161F"
          stroke="#444455"
          strokeWidth="2"
        />
        {/* Fund Document Bar Lines */}
        <line x1="22" y1="20" x2="42" y2="20" stroke="#6C47FF" strokeWidth="2.5" strokeLinecap="round" />
        <line x1="22" y1="28" x2="38" y2="28" stroke="#555566" strokeWidth="2" strokeLinecap="round" />
        <line x1="22" y1="36" x2="46" y2="36" stroke="#555566" strokeWidth="2" strokeLinecap="round" />
        <line x1="22" y1="44" x2="32" y2="44" stroke="#555566" strokeWidth="2" strokeLinecap="round" />

        {/* Magnifying Glass Over Fund Document */}
        <g className="group-hover:translate-x-1 group-hover:translate-y-1 transition-transform duration-300">
          <circle
            cx="46"
            cy="36"
            r="16"
            fill="#1F1B33"
            fillOpacity="0.85"
            stroke="#F59E0B"
            strokeWidth="3"
          />
          {/* Glass Glint */}
          <path
            d="M38 32 A 10 10 0 0 1 48 26"
            stroke="#FFE6A3"
            strokeWidth="2"
            strokeLinecap="round"
          />
          {/* Handle */}
          <line
            x1="57"
            y1="47"
            x2="70"
            y2="60"
            stroke="#F59E0B"
            strokeWidth="4"
            strokeLinecap="round"
          />
        </g>
      </svg>
    </div>
  );
}

/**
 * 7. ZOMATO TEARDOWN:
 * Magnifying glass over a plate icon with a small snowflake motif (representing "cold start")
 */
export function ZomatoTeardownIconGraphic() {
  return (
    <div className="relative flex items-center justify-center group-hover:scale-105 transition-transform duration-300">
      {/* Soft Glow */}
      <div className="absolute w-24 h-24 rounded-full bg-[#6C47FF]/10 blur-xl pointer-events-none" />

      <svg
        width="80"
        height="70"
        viewBox="0 0 80 70"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Dining Plate Base (Outer Rim) */}
        <circle cx="34" cy="35" r="24" fill="#141419" stroke="#3E3E4D" strokeWidth="2.5" />
        {/* Inner Plate Well */}
        <circle cx="34" cy="35" r="16" fill="#1A1924" stroke="#555566" strokeWidth="1.5" strokeDasharray="3 3" />

        {/* Snowflake Motif (representing Cold Start) in Center of Plate */}
        <g className="group-hover:rotate-45 origin-[34px_35px] transition-transform duration-500">
          {/* Vertical axis */}
          <line x1="34" y1="26" x2="34" y2="44" stroke="#8B6FFF" strokeWidth="2" strokeLinecap="round" />
          {/* Horizontal axis */}
          <line x1="25" y1="35" x2="43" y2="35" stroke="#8B6FFF" strokeWidth="2" strokeLinecap="round" />
          {/* Diagonals */}
          <line x1="28" y1="29" x2="40" y2="41" stroke="#8B6FFF" strokeWidth="1.5" strokeLinecap="round" />
          <line x1="28" y1="41" x2="40" y2="29" stroke="#8B6FFF" strokeWidth="1.5" strokeLinecap="round" />
          {/* Snowflake center dot */}
          <circle cx="34" cy="35" r="2.5" fill="#C4B8FF" />
        </g>

        {/* Magnifying Glass Over Plate */}
        <g className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300">
          <circle
            cx="48"
            cy="30"
            r="15"
            fill="#1A172E"
            fillOpacity="0.8"
            stroke="#6C47FF"
            strokeWidth="3"
          />
          {/* Lens reflection */}
          <path
            d="M40 26 A 9 9 0 0 1 49 20"
            stroke="#C4B8FF"
            strokeWidth="1.8"
            strokeLinecap="round"
          />
          {/* Handle */}
          <line
            x1="59"
            y1="41"
            x2="72"
            y2="54"
            stroke="#6C47FF"
            strokeWidth="3.5"
            strokeLinecap="round"
          />
        </g>
      </svg>
    </div>
  );
}
