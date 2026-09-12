import { useEffect, useRef, useState } from 'react';

interface PawTrail {
  id: number;
  x: number;
  y: number;
}

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  // Keep visible by default so mobile users immediately see the paw on screen
  const [isVisible, setIsVisible] = useState(true);
  const [trail, setTrail] = useState<PawTrail[]>([]);

  const lastDropTimeRef = useRef(0);
  const lastPosRef = useRef({ x: -100, y: -100 });

  useEffect(() => {
    // Initial position: center-right quadrant on mobile, center on desktop
    const initX = typeof window !== 'undefined' ? (window.innerWidth <= 768 ? window.innerWidth * 0.78 : window.innerWidth / 2) : 200;
    const initY = typeof window !== 'undefined' ? (window.innerWidth <= 768 ? window.innerHeight * 0.35 : window.innerHeight / 2) : 200;

    let targetX = initX;
    let targetY = initY;
    let currentX = initX;
    let currentY = initY;
    let animFrameId: number;

    const isTouchDevice =
      'ontouchstart' in window ||
      navigator.maxTouchPoints > 0 ||
      (typeof window !== 'undefined' && window.matchMedia('(pointer: coarse)').matches);

    // If desktop, add class for custom cursor styling
    if (!isTouchDevice && window.innerWidth > 768) {
      document.body.classList.add('custom-cursor-active');
    }

    const dropTrail = (x: number, y: number) => {
      const now = performance.now();
      const dist = Math.hypot(x - lastPosRef.current.x, y - lastPosRef.current.y);

      // Drop a faded copy of paw every ~140ms while moving
      if (now - lastDropTimeRef.current >= 140 && dist > 12) {
        lastDropTimeRef.current = now;
        lastPosRef.current = { x, y };

        const newTrail: PawTrail = {
          id: Date.now() + Math.random(),
          x,
          y,
        };

        setTrail((prev) => [...prev.slice(-10), newTrail]);
      }
    };

    const checkInteractiveHover = (target: EventTarget | null) => {
      const el = target as HTMLElement | null;
      if (!el) {
        setIsHovered(false);
        return;
      }

      const interactive = el.closest(
        'a, button, input, textarea, select, [role="button"], .spotlight-card, .interactive-cursor, [onclick]'
      );
      setIsHovered(!!interactive);
    };

    // --- MOUSE LISTENERS ---
    const onMouseMove = (e: MouseEvent) => {
      targetX = e.clientX;
      targetY = e.clientY;
      setIsVisible(true);
      dropTrail(targetX, targetY);
      checkInteractiveHover(e.target);
    };

    const onMouseLeave = () => {
      if (!isTouchDevice) {
        setIsVisible(false);
      }
    };

    const onMouseEnter = () => {
      setIsVisible(true);
    };

    // --- TOUCH LISTENERS (Mobile / Tablet) ---
    // Cursor stays visible all the time, leaving it at the last touch position
    const onTouchStart = (e: TouchEvent) => {
      if (e.touches && e.touches.length > 0) {
        targetX = e.touches[0].clientX;
        targetY = e.touches[0].clientY;
        setIsVisible(true);
        dropTrail(targetX, targetY);
        checkInteractiveHover(e.target);
      }
    };

    const onTouchMove = (e: TouchEvent) => {
      if (e.touches && e.touches.length > 0) {
        targetX = e.touches[0].clientX;
        targetY = e.touches[0].clientY;
        setIsVisible(true);
        dropTrail(targetX, targetY);
      }
    };

    const onTouchEnd = (e: TouchEvent) => {
      // In touch end, leave targetX and targetY at the last touch point and keep isVisible true
      if (e.changedTouches && e.changedTouches.length > 0) {
        targetX = e.changedTouches[0].clientX;
        targetY = e.changedTouches[0].clientY;
      }
      setIsVisible(true);
      setTimeout(() => setIsHovered(false), 300);
    };

    // Smooth lag loop for cursor
    const render = () => {
      currentX += (targetX - currentX) * 0.25;
      currentY += (targetY - currentY) * 0.25;

      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate3d(${currentX}px, ${currentY}px, 0) translate(-50%, -50%)`;
      }
      animFrameId = requestAnimationFrame(render);
    };

    animFrameId = requestAnimationFrame(render);

    // Register Mouse Listeners
    window.addEventListener('mousemove', onMouseMove, { passive: true });
    document.addEventListener('mouseleave', onMouseLeave);
    document.addEventListener('mouseenter', onMouseEnter);

    // Register Touch Listeners (Mobile site support: cursor stays visible at last touch)
    window.addEventListener('touchstart', onTouchStart, { passive: true });
    window.addEventListener('touchmove', onTouchMove, { passive: true });
    window.addEventListener('touchend', onTouchEnd, { passive: true });
    window.addEventListener('touchcancel', onTouchEnd, { passive: true });

    return () => {
      document.body.classList.remove('custom-cursor-active');
      window.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseleave', onMouseLeave);
      document.removeEventListener('mouseenter', onMouseEnter);

      window.removeEventListener('touchstart', onTouchStart);
      window.removeEventListener('touchmove', onTouchMove);
      window.removeEventListener('touchend', onTouchEnd);
      window.removeEventListener('touchcancel', onTouchEnd);
      cancelAnimationFrame(animFrameId);
    };
  }, []);

  // Clean up trails after 600ms
  useEffect(() => {
    if (trail.length === 0) return;
    const timer = setTimeout(() => {
      setTrail((prev) => prev.slice(1));
    }, 600);
    return () => clearTimeout(timer);
  }, [trail]);

  return (
    <>
      {/* Trailing Faded Paw Copies (600ms fade to opacity 0 & scale down) */}
      {trail.map((paw) => (
        <div
          key={paw.id}
          className="fixed pointer-events-none z-[9990] select-none"
          style={{
            left: `${paw.x}px`,
            top: `${paw.y}px`,
            transform: 'translate(-50%, -50%)',
            animation: 'pawTrailFade 600ms cubic-bezier(0.2, 0.8, 0.2, 1) forwards',
          }}
        >
          <svg viewBox="0 0 64 64" width="22" height="22" fill="#6C47FF">
            <ellipse cx="32" cy="44" rx="18" ry="14" />
            <ellipse cx="14" cy="20" rx="8" ry="10" />
            <ellipse cx="28" cy="10" rx="7" ry="9" />
            <ellipse cx="42" cy="10" rx="7" ry="9" />
            <ellipse cx="50" cy="20" rx="8" ry="10" />
          </svg>
        </div>
      ))}

      {/* Main Purple Paw Cursor with smoothing & 1.3x hover scale */}
      <div
        ref={cursorRef}
        id="paw-cursor-main"
        className={`fixed top-0 left-0 pointer-events-none z-[9999] select-none transition-opacity duration-200 ${
          isVisible ? 'opacity-100' : 'opacity-0'
        }`}
        style={{ willChange: 'transform' }}
      >
        <div
          className={`transition-transform duration-200 ease-out origin-center ${
            isHovered ? 'scale-[1.3]' : 'scale-100'
          }`}
        >
          <svg
            viewBox="0 0 64 64"
            width="24"
            height="24"
            fill="#6C47FF"
            className="filter drop-shadow-[0_2px_8px_rgba(108,71,255,0.6)]"
          >
            <ellipse cx="32" cy="44" rx="18" ry="14" />
            <ellipse cx="14" cy="20" rx="8" ry="10" />
            <ellipse cx="28" cy="10" rx="7" ry="9" />
            <ellipse cx="42" cy="10" rx="7" ry="9" />
            <ellipse cx="50" cy="20" rx="8" ry="10" />
          </svg>
        </div>
      </div>
    </>
  );
}
