import React, { useEffect, useRef, useState } from 'react';

interface ScrollRevealProps {
  children: React.ReactNode;
  delay?: number;
  className?: string;
  threshold?: number;
}

export default function ScrollReveal({
  children,
  delay = 0,
  className = '',
  threshold = 0.1,
}: ScrollRevealProps) {
  const [isVisible, setIsVisible] = useState(false);
  const domRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            if (domRef.current) {
              observer.unobserve(domRef.current);
            }
          }
        });
      },
      { threshold }
    );

    const currentEl = domRef.current;
    if (currentEl) {
      observer.observe(currentEl);
    }

    return () => {
      if (currentEl) {
        observer.unobserve(currentEl);
      }
    };
  }, [threshold]);

  return (
    <div
      ref={domRef}
      className={`transition-all duration-700 ease-out ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-7'
      } ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}
