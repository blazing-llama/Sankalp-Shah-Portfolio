// Web Audio synthesizer for gentle retro 8-bit sound effects (Thor petting & cosmic chime)
let audioCtx: AudioContext | null = null;

function getAudioContext(): AudioContext | null {
  if (typeof window === 'undefined') return null;
  if (!audioCtx) {
    const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (AudioContextClass) {
      audioCtx = new AudioContextClass();
    }
  }
  if (audioCtx && audioCtx.state === 'suspended') {
    audioCtx.resume().catch(() => {});
  }
  return audioCtx;
}

/**
 * Play a sweet, soft 8-bit retro chime when Thor is petted or clicked
 */
export function playThorPetSound(muted = false) {
  if (muted) return;
  try {
    const ctx = getAudioContext();
    if (!ctx) return;

    const now = ctx.currentTime;

    // First note
    const osc1 = ctx.createOscillator();
    const gain1 = ctx.createGain();
    osc1.type = 'triangle';
    osc1.frequency.setValueAtTime(523.25, now); // C5
    osc1.frequency.exponentialRampToValueAtTime(659.25, now + 0.08); // E5
    gain1.gain.setValueAtTime(0.08, now);
    gain1.gain.exponentialRampToValueAtTime(0.001, now + 0.18);
    osc1.connect(gain1);
    gain1.connect(ctx.destination);
    osc1.start(now);
    osc1.stop(now + 0.18);

    // Second cheerful note
    const osc2 = ctx.createOscillator();
    const gain2 = ctx.createGain();
    osc2.type = 'triangle';
    osc2.frequency.setValueAtTime(783.99, now + 0.09); // G5
    osc2.frequency.exponentialRampToValueAtTime(1046.50, now + 0.2); // C6
    gain2.gain.setValueAtTime(0.09, now + 0.09);
    gain2.gain.exponentialRampToValueAtTime(0.001, now + 0.28);
    osc2.connect(gain2);
    gain2.connect(ctx.destination);
    osc2.start(now + 0.09);
    osc2.stop(now + 0.28);
  } catch {
    // Gracefully ignore any audio context errors
  }
}

/**
 * Play subtle cosmic star twinkle chime
 */
export function playCosmicChime(muted = false) {
  if (muted) return;
  try {
    const ctx = getAudioContext();
    if (!ctx) return;

    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(880, now); // A5
    osc.frequency.exponentialRampToValueAtTime(1318.51, now + 0.15); // E6
    gain.gain.setValueAtTime(0.05, now);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.35);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start(now);
    osc.stop(now + 0.35);
  } catch {
    // Ignore audio context errors
  }
}

/**
 * Play a soft gentle bark sound using synthesized Web Audio
 */
export function playSoftBark(muted = false) {
  if (muted) return;
  try {
    const ctx = getAudioContext();
    if (!ctx) return;

    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    const filter = ctx.createBiquadFilter();

    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(800, now);
    filter.frequency.exponentialRampToValueAtTime(320, now + 0.16);

    osc.type = 'triangle';
    osc.frequency.setValueAtTime(280, now);
    osc.frequency.exponentialRampToValueAtTime(130, now + 0.14);

    gain.gain.setValueAtTime(0.18, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.16);

    osc.connect(filter);
    filter.connect(gain);
    gain.connect(ctx.destination);

    osc.start(now);
    osc.stop(now + 0.16);
  } catch {
    // Gracefully handle audio errors
  }
}

