import { useEffect, useRef, useState } from 'react';

interface PawTrail {
  id: number;
  x: number;
  y: number;
}

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isTouch, setIsTouch] = useState(false);
  const [trail, setTrail] = useState<PawTrail[]>([]);

  const lastDropTimeRef = useRef(0);
  const lastMousePosRef = useRef({ x: -100, y: -100 });

  useEffect(() => {
    const isTouchDevice =
      'ontouchstart' in window ||
      navigator.maxTouchPoints > 0 ||
      window.matchMedia('(pointer: coarse)').matches;

    if (isTouchDevice || window.innerWidth <= 768) {
      setIsTouch(true);
      return;
    }

    document.body.classList.add('custom-cursor-active');

    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let currentX = mouseX;
    let currentY = mouseY;
    let animFrameId: number;

    const onMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      if (!isVisible) setIsVisible(true);

      const now = performance.now();
      const dist = Math.hypot(
        mouseX - lastMousePosRef.current.x,
        mouseY - lastMousePosRef.current.y
      );

      // Drop a faded copy of paw every ~150ms while moving
      if (now - lastDropTimeRef.current >= 150 && dist > 10) {
        lastDropTimeRef.current = now;
        lastMousePosRef.current = { x: mouseX, y: mouseY };

        const newTrail: PawTrail = {
          id: Date.now() + Math.random(),
          x: mouseX,
          y: mouseY,
        };

        setTrail((prev) => [...prev.slice(-12), newTrail]);
      }
    };

    const checkHover = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;

      const interactive = target.closest(
        'a, button, input, textarea, select, [role="button"], .spotlight-card, .interactive-cursor, [onclick]'
      );
      setIsHovered(!!interactive);
    };

    const onMouseLeave = () => setIsVisible(false);
    const onMouseEnter = () => setIsVisible(true);

    // Smooth lag loop for cursor
    const render = () => {
      currentX += (mouseX - currentX) * 0.22;
      currentY += (mouseY - currentY) * 0.22;

      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate3d(${currentX}px, ${currentY}px, 0) translate(-50%, -50%)`;
      }
      animFrameId = requestAnimationFrame(render);
    };

    animFrameId = requestAnimationFrame(render);

    window.addEventListener('mousemove', onMouseMove, { passive: true });
    window.addEventListener('mousemove', checkHover, { passive: true });
    document.addEventListener('mouseleave', onMouseLeave);
    document.addEventListener('mouseenter', onMouseEnter);

    return () => {
      document.body.classList.remove('custom-cursor-active');
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mousemove', checkHover);
      document.removeEventListener('mouseleave', onMouseLeave);
      document.removeEventListener('mouseenter', onMouseEnter);
      cancelAnimationFrame(animFrameId);
    };
  }, [isVisible]);

  // Clean up trails after 600ms
  useEffect(() => {
    if (trail.length === 0) return;
    const timer = setTimeout(() => {
      setTrail((prev) => prev.slice(1));
    }, 600);
    return () => clearTimeout(timer);
  }, [trail]);

  if (isTouch) return null;

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
        className={`fixed top-0 left-0 pointer-events-none z-[9999] select-none transition-opacity duration-150 ${
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
