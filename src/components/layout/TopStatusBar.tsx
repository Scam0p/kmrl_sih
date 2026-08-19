import React from 'react';
import { Menu, Activity, RotateCcw, Cpu, ShieldAlert, Clock } from 'lucide-react';
import { CaseType } from '../../types/simulation';

interface TopStatusBarProps {
  simTime: string;
  currentCase: CaseType;
  activeTrainsCount: number;
  totalTrainsCount: number;
  onReset: () => void;
  onRunOptimization: () => void;
  isOptimizing: boolean;
  onToggleMenu: () => void;
}

export const TopStatusBar: React.FC<TopStatusBarProps> = ({
  simTime,
  currentCase,
  activeTrainsCount,
  totalTrainsCount,
  onReset,
  onToggleMenu
}) => {
  return (
    <header className="sticky top-0 z-40 w-full bg-[#170C79] border-b-2 border-[#56B6C6]/40 px-4 md:px-8 py-3 flex items-center justify-between text-xs font-mono-tech select-none shadow-lg text-[#EFE3CA]">
      {/* Left: Menu Trigger + KMRL Brand Identity */}
      <div className="flex items-center gap-3 sm:gap-4">
        {/* Sliding Menu Trigger Button */}
        <button
          onClick={onToggleMenu}
          className="px-3 py-1.5 rounded-lg bg-[#22158E] hover:bg-[#56B6C6] border border-[#56B6C6]/40 text-[#EFE3CA] hover:text-[#170C79] transition-all duration-200 cursor-pointer flex items-center gap-2 font-bold shadow-xs active:scale-95"
          title="Open KMRL Operations Navigation Menu"
          aria-label="Open Operations Menu"
        >
          <Menu className="w-4 h-4 text-[#56B6C6] group-hover:text-[#170C79]" />
          <span className="hidden sm:inline text-xs tracking-wider">MENU</span>
        </button>

        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg overflow-hidden border border-[#56B6C6]/50 bg-[#22158E] flex-shrink-0 shadow-xs">
            <img
              src="/logo.png"
              alt="KMRL Logo"
              className="w-full h-full object-cover"
            />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-mono-tech font-bold text-sm md:text-base text-[#EFE3CA] tracking-wide">
                KMRL <span className="text-[#56B6C6] font-normal">| OPERATIONS CONTROL CENTRE</span>
              </span>
              <span className="hidden sm:inline-block text-[9px] font-mono-tech px-2 py-0.5 rounded bg-[#56B6C6] text-[#170C79] font-bold">
                SIH 2026
              </span>
            </div>
            <span className="font-inter text-[10.5px] text-[#EFE3CA]/80 font-medium hidden md:block">
              AI-Driven Train Induction Planning & Dynamic Dispatch Platform
            </span>
          </div>
        </div>
      </div>

      {/* Center: Operational Mode Pill */}
      <div className="hidden lg:flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#22158E] border border-[#56B6C6]/40 text-xs font-mono-tech shadow-xs">
        <span className="text-[#EFE3CA]/70 font-bold text-[10px]">PARADIGM:</span>
        {currentCase === 'ai' ? (
          <span className="text-[#56B6C6] flex items-center gap-1.5 font-bold">
            <Cpu className="w-3.5 h-3.5 text-[#56B6C6]" /> 03. AI DYNAMIC INDUCTION
          </span>
        ) : currentCase === 'conventional' ? (
          <span className="text-[#8ACBD0] flex items-center gap-1.5 font-bold">
            <Activity className="w-3.5 h-3.5 text-[#8ACBD0]" /> 02. CONVENTIONAL CBTC
          </span>
        ) : (
          <span className="text-[#EFE3CA] flex items-center gap-1.5 font-bold">
            <ShieldAlert className="w-3.5 h-3.5 text-[#EFE3CA]" /> 01. MANUAL DISPATCH
          </span>
        )}
      </div>

      {/* Right: Clean Telemetry & Reset Action */}
      <div className="flex items-center gap-3 md:gap-4">
        {/* Active Fleet Indicator */}
        <div className="hidden sm:flex items-center gap-1.5 bg-[#22158E] border border-[#56B6C6]/40 px-3 py-1.5 rounded-lg text-xs font-mono-tech shadow-xs">
          <span className="text-[#EFE3CA]/70 font-bold text-[10px]">FLEET:</span>
          <span className="text-[#56B6C6] font-bold">{activeTrainsCount}/{totalTrainsCount} Units</span>
        </div>

        {/* Live Clock */}
        <div className="flex items-center gap-2 bg-[#22158E] border border-[#56B6C6]/40 px-3 py-1.5 rounded-lg shadow-xs">
          <span className="w-2 h-2 rounded-full bg-[#56B6C6] animate-pulse"></span>
          <span className="text-[#EFE3CA] font-bold text-xs md:text-sm tracking-wider font-mono-tech">
            {simTime}
          </span>
          <span className="text-[9px] text-[#8ACBD0] font-bold">IST</span>
        </div>

        {/* Reset Simulation Button */}
        <button
          onClick={onReset}
          className="p-1.5 rounded-lg bg-[#22158E] hover:bg-[#56B6C6] border border-[#56B6C6]/40 text-[#EFE3CA] hover:text-[#170C79] transition-colors cursor-pointer shadow-xs flex items-center gap-1"
          title="Reset Simulation to 08:00 Initial State"
          aria-label="Reset simulation"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span className="hidden xl:inline text-[10px] font-bold">RESET</span>
        </button>
      </div>
    </header>
  );
};




