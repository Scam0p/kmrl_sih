import React from 'react';
import { ArrowDown } from 'lucide-react';
import { KMRLParallaxLayer } from '../parallax/KMRLParallaxLayer';

interface HeroSectionProps {
  onExploreClick: () => void;
  onRunOptimization?: () => void;
  currentCase?: any;
  onCaseChange?: (c: any) => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onExploreClick
}) => {
  return (
    <section 
      id="hero-section" 
      className="relative min-h-[56vh] sm:min-h-[60vh] flex flex-col justify-center items-center px-3 sm:px-6 md:px-12 py-10 sm:py-14 overflow-hidden border-b border-[#8ACBD0]/40 bg-[#F6F1E6]"
    >
      {/* Lightweight 2D Parallax Visual Depth Layer */}
      <KMRLParallaxLayer />

      {/* Hero Content Container */}
      <div className="relative z-10 max-w-5xl mx-auto text-center flex flex-col items-center gap-5 sm:gap-6 w-full">
        {/* Authority Header Tag */}
        <div className="inline-flex flex-wrap items-center justify-center gap-1.5 sm:gap-3 px-3 sm:px-4 py-1 rounded-full bg-[#EFE3CA] border border-[#8ACBD0] text-[10px] sm:text-xs font-mono-tech shadow-xs max-w-full">
          <span className="tracking-wider sm:tracking-widest text-[#170C79] font-bold whitespace-nowrap">
            SIH 2026 • SMART INDIA HACKATHON
          </span>
          <span className="text-[#8ACBD0] hidden sm:inline">|</span>
          <span className="text-[#2C2B68] font-bold whitespace-nowrap">
            KOCHI METRO RAIL LIMITED
          </span>
        </div>

        {/* Main Headline (#170C79 Deep Indigo) */}
        <div className="space-y-2 sm:space-y-3">
          <h1 className="font-mono-tech font-bold text-2xl sm:text-4xl md:text-5xl lg:text-6xl text-[#170C79] tracking-tight uppercase leading-[1.2] sm:leading-[1.15]">
            AI-DRIVEN TRAIN INDUCTION <br />
            <span className="text-[#2C2B68] font-medium">
              PLANNING & SCHEDULING
            </span>
          </h1>
          <p className="font-mono-tech text-[10px] sm:text-sm tracking-wider sm:tracking-widest text-[#56B6C6] font-bold uppercase">
            OPERATIONAL CONTROL DEMONSTRATION • POWERHOUSE AI SYSTEMS
          </p>
        </div>

        {/* Executive Summary Narrative */}
        <p className="max-w-3xl font-inter text-xs sm:text-base md:text-lg text-[#2C2B68] font-medium leading-relaxed px-2">
          An adaptive scheduling platform for Kochi Metro Rail Limited (KMRL) that dynamically synchronizes 
          passenger demand surges, maintenance windows, depot turnover, and real-time headway control.
        </p>

        {/* Core Thesis Card */}
        <div className="w-full max-w-3xl rounded-xl bg-[#EFE3CA] border-2 border-[#8ACBD0] p-4 sm:p-6 shadow-sm my-1 text-center">
          <span className="text-[9.5px] sm:text-[10px] font-mono-tech uppercase tracking-widest text-[#56B6C6] font-bold block mb-1 sm:mb-2">
            CORE OPERATIONAL PRINCIPLE
          </span>
          <p className="font-mono-tech text-sm sm:text-lg md:text-xl font-bold text-[#170C79] tracking-tight uppercase leading-snug">
            &ldquo;Don&rsquo;t run more trains. Run the <span className="text-[#56B6C6] underline decoration-2 underline-offset-4">right trains</span> at the <span className="text-[#2C2B68]">right time</span> with the <span className="text-[#170C79]">right capacity</span>.&rdquo;
          </p>
        </div>

        {/* Hero CTA Button */}
        <div className="flex flex-wrap items-center justify-center gap-4 mt-2">
          <button
            onClick={onExploreClick}
            className="group px-6 sm:px-8 py-2.5 sm:py-3 rounded-xl bg-[#170C79] text-[#EFE3CA] hover:bg-[#56B6C6] hover:text-[#170C79] font-mono-tech font-bold text-xs tracking-widest uppercase transition-colors flex items-center gap-2 cursor-pointer shadow-md"
          >
            <span>ENTER OPERATIONS CONSOLE</span>
            <ArrowDown className="w-4 h-4" />
          </button>
        </div>
      </div>
    </section>
  );
};
