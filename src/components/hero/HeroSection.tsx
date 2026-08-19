import React from 'react';
import { ArrowDown, Cpu, Activity, ShieldAlert } from 'lucide-react';
import { CaseType } from '../../types/simulation';
import { KMRLParallaxLayer } from '../parallax/KMRLParallaxLayer';

interface HeroSectionProps {
  onExploreClick: () => void;
  onRunOptimization: () => void;
  currentCase: CaseType;
  onCaseChange: (c: CaseType) => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onExploreClick,
  currentCase,
  onCaseChange
}) => {
  return (
    <section 
      id="hero-section" 
      className="relative min-h-[60vh] sm:min-h-[64vh] flex flex-col justify-center items-center px-3 sm:px-6 md:px-12 py-10 sm:py-14 overflow-hidden border-b border-[#8ACBD0]/40 bg-[#F6F1E6]"
    >
      {/* Lightweight 2D Parallax Visual Depth Layer (3 Depth Planes) */}
      <KMRLParallaxLayer />

      {/* Hero Content Container */}
      <div className="relative z-10 max-w-5xl mx-auto text-center flex flex-col items-center gap-4 sm:gap-6 w-full">
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

        {/* Main Headline (JetBrains Mono & #170C79 Deep Indigo) */}
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

        {/* 3-Way Quick Case Selector on Hero */}
        <div className="flex flex-col sm:flex-row items-center gap-2.5 sm:gap-3 w-full max-w-xl justify-center mt-1 sm:mt-2">
          <button
            onClick={() => onCaseChange('manual')}
            className={`flex-1 w-full py-2.5 px-3 sm:px-4 rounded-xl font-mono-tech text-xs font-bold tracking-wider uppercase transition-colors cursor-pointer flex items-center justify-center gap-2 ${
              currentCase === 'manual'
                ? 'bg-[#170C79] text-[#EFE3CA] shadow-sm border border-[#170C79]'
                : 'bg-[#EFE3CA] border border-[#8ACBD0] text-[#170C79] hover:bg-[#FFFFFF] hover:border-[#56B6C6]'
            }`}
          >
            <ShieldAlert className="w-3.5 h-3.5" />
            <span>01. MANUAL</span>
          </button>

          <button
            onClick={() => onCaseChange('conventional')}
            className={`flex-1 w-full py-2.5 px-3 sm:px-4 rounded-xl font-mono-tech text-xs font-bold tracking-wider uppercase transition-colors cursor-pointer flex items-center justify-center gap-2 ${
              currentCase === 'conventional'
                ? 'bg-[#170C79] text-[#EFE3CA] shadow-sm border border-[#170C79]'
                : 'bg-[#EFE3CA] border border-[#8ACBD0] text-[#170C79] hover:bg-[#FFFFFF] hover:border-[#56B6C6]'
            }`}
          >
            <Activity className="w-3.5 h-3.5" />
            <span>02. CONVENTIONAL</span>
          </button>

          <button
            onClick={() => onCaseChange('ai')}
            className={`flex-1 w-full py-2.5 px-3 sm:px-4 rounded-xl font-mono-tech text-xs font-bold tracking-wider uppercase transition-colors cursor-pointer flex items-center justify-center gap-2 ${
              currentCase === 'ai'
                ? 'bg-[#56B6C6] text-[#170C79] shadow-sm font-bold border border-[#56B6C6]'
                : 'bg-[#EFE3CA] border border-[#8ACBD0] text-[#170C79] hover:bg-[#FFFFFF] hover:border-[#56B6C6]'
            }`}
          >
            <Cpu className="w-3.5 h-3.5 text-[#170C79]" />
            <span>03. AI-POWERED</span>
          </button>
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
