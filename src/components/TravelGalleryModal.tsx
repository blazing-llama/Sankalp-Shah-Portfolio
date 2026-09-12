import React, { useState, useEffect } from 'react';
import { X, ChevronLeft, ChevronRight, Camera, MapPin } from 'lucide-react';

interface TravelGalleryModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const TRAVEL_MOMENTS = [
  {
    id: 1,
    caption: 'Night train through Rajasthan',
    location: 'Rajasthan, India',
    date: 'Winter 2023',
    notes: 'Rattling sleeper berths, cutting chai in terracotta cups, and desert silhouettes at dawn.',
  },
  {
    id: 2,
    caption: 'Morning coffee in Kyoto',
    location: 'Kyoto, Japan',
    date: 'Autumn 2022',
    notes: 'Quiet kissaten tucked away in Gion; observing masters of ritualized slow-drip coffee extraction.',
  },
  {
    id: 3,
    caption: 'Mountain pass in Himachal',
    location: 'Himachal Pradesh, India',
    date: 'Monsoon 2023',
    notes: 'Switchbacks above the cloud ceiling; sparse cellular connectivity and high spatial solitude.',
  },
  {
    id: 4,
    caption: 'Street food lane, Bangkok',
    location: 'Bangkok, Thailand',
    date: 'Spring 2023',
    notes: 'Wok fire, fragrant basil, intense urban density operating with clockwork efficiency.',
  },
  {
    id: 5,
    caption: 'Old town alleys, Prague',
    location: 'Prague, Czech Republic',
    date: 'Autumn 2019',
    notes: 'Cobblestones, Gothic arches, and silent bridges over the Vltava before dawn.',
  },
  {
    id: 6,
    caption: 'Coastal trail, Southern Sri Lanka',
    location: 'Mirissa, Sri Lanka',
    date: 'Winter 2024',
    notes: 'Salt spray on volcanic rocks, fishermen balance posts, and warm Indian Ocean swells.',
  },
];

export default function TravelGalleryModal({ isOpen, onClose }: TravelGalleryModalProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Keyboard navigation
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') handlePrev();
      if (e.key === 'ArrowRight') handleNext();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, currentIndex]);

  if (!isOpen) return null;

  const currentMoment = TRAVEL_MOMENTS[currentIndex];

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? TRAVEL_MOMENTS.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === TRAVEL_MOMENTS.length - 1 ? 0 : prev + 1));
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200"
    >
      <div
        className="relative w-full max-w-2xl bg-[#0F0F14] border border-[#252530] rounded-2xl overflow-hidden shadow-2xl flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#20202A] bg-[#14141C]">
          <div className="flex items-center gap-3">
            <span className="text-xs font-mono uppercase tracking-wider text-[#A896FF] bg-[#6C47FF]/15 px-2.5 py-1 rounded border border-[#6C47FF]/30">
              Travel Moments
            </span>
            <span className="text-xs font-mono text-[#888899]">
              {currentIndex + 1} / {TRAVEL_MOMENTS.length}
            </span>
          </div>

          <button
            onClick={onClose}
            aria-label="Close modal"
            className="p-1.5 rounded-lg bg-[#1E1E28] hover:bg-[#2A2A38] text-[#999999] hover:text-white transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Modal Body: Slide Content */}
        <div className="p-6 flex flex-col items-center">
          {/* Main Photo Display Box / Upload Photo Placeholder */}
          <div className="relative w-full aspect-[16/10] bg-[#14141B] border-2 border-dashed border-[#2E2E3C] rounded-xl flex flex-col items-center justify-center text-center p-6 group hover:border-[#6C47FF]/60 transition-colors">
            {/* Background subtle watermark coordinate */}
            <div className="absolute inset-0 flex items-center justify-center opacity-5 pointer-events-none">
              <span className="font-mono text-5xl font-bold tracking-widest text-white">
                MOMENT {currentMoment.id}
              </span>
            </div>

            {/* Subtle camera icon */}
            <div className="w-14 h-14 rounded-2xl bg-[#1D1D28] border border-[#2B2B3C] flex items-center justify-center text-[#8B6FFF] mb-3 shadow-inner group-hover:scale-105 transition-transform">
              <Camera className="w-6 h-6" />
            </div>

            <span className="text-sm font-semibold text-[#E0E0E0] mb-1">
              Upload photo
            </span>
            <span className="text-xs font-mono text-[#777788] max-w-xs">
              Waiting for user travel asset · Slot {currentMoment.id}
            </span>

            {/* Location Tag */}
            <div className="mt-4 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#1A1828] border border-[#6C47FF]/30 text-xs font-medium text-[#C4B8FF]">
              <MapPin className="w-3 h-3 text-[#6C47FF]" />
              <span>{currentMoment.location}</span>
            </div>
          </div>

          {/* Slide Caption & Notes */}
          <div className="w-full mt-5">
            <div className="flex items-baseline justify-between mb-1">
              <h3 className="font-syne font-bold text-lg text-white">
                {currentMoment.caption}
              </h3>
              <span className="text-xs font-mono text-[#666677]">
                {currentMoment.date}
              </span>
            </div>
            <p className="text-xs sm:text-sm text-[#9999AA] leading-relaxed">
              {currentMoment.notes}
            </p>
          </div>

          {/* Navigation Controls */}
          <div className="w-full mt-6 pt-4 border-t border-[#1F1F2A] flex items-center justify-between">
            <button
              onClick={handlePrev}
              className="inline-flex items-center gap-2 px-3.5 py-2 rounded-lg bg-[#161620] hover:bg-[#20202E] border border-[#282836] text-xs font-medium text-[#D0D0E0] hover:text-white transition-all"
            >
              <ChevronLeft className="w-4 h-4" />
              <span>Previous</span>
            </button>

            {/* Bullet Pagination Indicators */}
            <div className="flex items-center gap-1.5">
              {TRAVEL_MOMENTS.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentIndex(idx)}
                  className={`w-2.5 h-2.5 rounded-full transition-all ${
                    idx === currentIndex
                      ? 'bg-[#6C47FF] w-6'
                      : 'bg-[#2A2A38] hover:bg-[#444455]'
                  }`}
                  aria-label={`Go to slide ${idx + 1}`}
                />
              ))}
            </div>

            <button
              onClick={handleNext}
              className="inline-flex items-center gap-2 px-3.5 py-2 rounded-lg bg-[#161620] hover:bg-[#20202E] border border-[#282836] text-xs font-medium text-[#D0D0E0] hover:text-white transition-all"
            >
              <span>Next</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
