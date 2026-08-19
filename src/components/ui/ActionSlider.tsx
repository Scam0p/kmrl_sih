import React, { useState, useRef, useEffect, useCallback } from 'react';
import { ArrowRight, CheckCircle2, Lock } from 'lucide-react';

interface ActionSliderProps {
  label?: string;
  activeLabel?: string;
  isActive?: boolean;
  onActivate: () => void;
  disabled?: boolean;
  className?: string;
}

export const ActionSlider: React.FC<ActionSliderProps> = ({
  label = 'SLIDE TO ACTIVATE',
  activeLabel = 'CURRENTLY ACTIVE',
  isActive = false,
  onActivate,
  disabled = false,
  className = ''
}) => {
  const [dragProgress, setDragProgress] = useState(0); // 0 to 1
  const [isDragging, setIsDragging] = useState(false);
  const trackRef = useRef<HTMLDivElement>(null);
  const startXRef = useRef<number>(0);
  const maxDragWidthRef = useRef<number>(1);
  const activatedRef = useRef<boolean>(false);

  // If already active, lock slider at 100%
  useEffect(() => {
    if (isActive) {
      setDragProgress(1);
    } else {
      setDragProgress(0);
      activatedRef.current = false;
    }
  }, [isActive]);

  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    if (isActive || disabled) return;
    
    const track = trackRef.current;
    if (!track) return;

    const handleWidth = 40;
    const maxDrag = Math.max(1, track.clientWidth - handleWidth);
    maxDragWidthRef.current = maxDrag;
    startXRef.current = e.clientX;
    setIsDragging(true);
    activatedRef.current = false;

    // Capture pointer
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
  };

  const handlePointerMove = useCallback((e: React.PointerEvent<HTMLDivElement>) => {
    if (!isDragging || isActive || disabled) return;

    const deltaX = e.clientX - startXRef.current;
    const progress = Math.min(1, Math.max(0, deltaX / maxDragWidthRef.current));
    setDragProgress(progress);

    // If dragged past 88% threshold, trigger activation
    if (progress >= 0.88 && !activatedRef.current) {
      activatedRef.current = true;
      setIsDragging(false);
      setDragProgress(1);
      onActivate();
    }
  }, [isDragging, isActive, disabled, onActivate]);

  const handlePointerUp = useCallback((e: React.PointerEvent<HTMLDivElement>) => {
    if (!isDragging || isActive) return;

    setIsDragging(false);

    try {
      (e.target as HTMLElement).releasePointerCapture(e.pointerId);
    } catch {
      // ignore
    }

    if (dragProgress < 0.88) {
      // Snap back smoothly
      setDragProgress(0);
      activatedRef.current = false;
    }
  }, [isDragging, isActive, dragProgress]);

  const handlePointerCancel = useCallback(() => {
    if (!isActive) {
      setIsDragging(false);
      setDragProgress(0);
      activatedRef.current = false;
    }
  }, [isActive]);

  if (isActive) {
    return (
      <div 
        className={`relative w-full h-11 rounded-xl bg-[#170C79] border-2 border-[#170C79] flex items-center justify-between px-3.5 select-none font-mono-tech text-xs shadow-xs text-[#EFE3CA] ${className}`}
      >
        <div className="flex items-center gap-2 font-bold tracking-wider">
          <CheckCircle2 className="w-4 h-4 text-[#56B6C6]" />
          <span>{activeLabel}</span>
        </div>
        <div className="flex items-center gap-1 text-[10px] text-[#170C79] font-bold bg-[#EFE3CA] px-2 py-0.5 rounded border border-[#8ACBD0]">
          <Lock className="w-3 h-3 text-[#170C79]" />
          <span>ENGAGED</span>
        </div>
      </div>
    );
  }

  const handleTranslateX = dragProgress * (maxDragWidthRef.current || 1);

  return (
    <div
      ref={trackRef}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerCancel={handlePointerCancel}
      className={`relative w-full h-11 rounded-xl bg-[#F6F1E6] border-2 border-[#8ACBD0] hover:border-[#56B6C6] overflow-hidden select-none font-mono-tech text-xs transition-colors cursor-grab active:cursor-grabbing touch-none shadow-xs ${
        disabled ? 'opacity-50 pointer-events-none' : ''
      } ${className}`}
      role="slider"
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={Math.round(dragProgress * 100)}
      aria-label={label}
    >
      {/* Progress Fill Behind */}
      <div
        className="absolute left-0 top-0 bottom-0 bg-[#8ACBD0]/40 transition-all pointer-events-none"
        style={{
          width: `${Math.max(10, dragProgress * 100)}%`,
          transition: isDragging ? 'none' : 'width 0.25s ease-out'
        }}
      />

      {/* Center Label (Fades out slightly as dragged) */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none px-12">
        <span 
          className="text-[#170C79] font-bold text-[11px] sm:text-xs tracking-wider uppercase truncate transition-opacity"
          style={{ opacity: Math.max(0.2, 1 - dragProgress * 1.2) }}
        >
          {dragProgress > 0.6 ? 'RELEASE TO CONFIRM' : label}
        </span>
      </div>

      {/* Draggable Slider Thumb Handle */}
      <div
        className="absolute top-1 bottom-1 w-9 rounded-lg bg-[#170C79] text-[#EFE3CA] flex items-center justify-center shadow-md transition-transform pointer-events-none"
        style={{
          transform: `translateX(${handleTranslateX}px)`,
          transition: isDragging ? 'none' : 'transform 0.25s ease-out'
        }}
      >
        <ArrowRight className="w-4 h-4 text-[#EFE3CA]" />
      </div>
    </div>
  );
};
