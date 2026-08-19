import React from 'react';

interface PowerhouseBrandProps {
  currentCase: string;
}

export const PowerhouseBrand: React.FC<PowerhouseBrandProps> = ({ currentCase }) => {
  return (
    <aside 
      className="fixed left-0 top-0 bottom-0 w-16 md:w-20 z-50 bg-[#170C79] border-r border-[#56B6C6]/30 flex flex-col items-center justify-between py-5 select-none shadow-xl"
      aria-label="Powerhouse Branding"
    >
      {/* Top Official Logo Image from File */}
      <div className="flex flex-col items-center gap-2">
        <div className="w-11 h-11 rounded-lg overflow-hidden border border-[#56B6C6]/40 bg-[#22158E] shadow-sm">
          <img
            src="/logo.png"
            alt="Powerhouse Logo"
            className="w-full h-full object-cover"
          />
        </div>
        <span className="text-[9px] font-mono-tech tracking-wider text-[#56B6C6] font-bold">
          SIH 2026
        </span>
      </div>

      {/* Main Persistent Vertical Wordmark with JetBrains Mono Character */}
      <div className="flex-1 flex items-center justify-center my-6">
        <div className="rotate-180 [writing-mode:vertical-rl] flex items-center gap-3">
          <span className="font-mono-tech font-bold text-xl md:text-2xl tracking-[0.25em] text-[#56B6C6] uppercase hover:text-[#8ACBD0] transition-colors">
            POWERHOUSE
          </span>
          <span className="h-6 w-[1.5px] bg-[#56B6C6]/40"></span>
          <span className="text-[9px] font-mono-tech uppercase tracking-[0.25em] text-[#EFE3CA]">
            KMRL • AI SYSTEMS
          </span>
        </div>
      </div>

      {/* Bottom Steady Clean System Indicator */}
      <div className="flex flex-col items-center gap-1.5 bg-[#22158E] border border-[#56B6C6]/40 px-2 py-2 rounded-lg w-12 text-center shadow-sm">
        <div className="w-2 h-2 rounded-full bg-[#56B6C6] animate-pulse"></div>
        <span className="text-[7px] font-mono-tech text-[#EFE3CA] tracking-wider uppercase font-bold">
          {currentCase.toUpperCase()}
        </span>
      </div>
    </aside>
  );
};


