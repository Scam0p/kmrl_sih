import React from 'react';
import { CaseType } from '../../types/simulation';
import { ShieldAlert, Activity, Cpu, CheckCircle2, ArrowRight } from 'lucide-react';

interface CaseSwitcherProps {
  currentCase: CaseType;
  onSelectCase: (c: CaseType) => void;
  isTransitioning?: boolean;
}

export const CaseSwitcher: React.FC<CaseSwitcherProps> = ({
  currentCase,
  onSelectCase,
  isTransitioning = false
}) => {
  const cases: {
    id: CaseType;
    index: string;
    title: string;
    subtitle: string;
    description: string;
    icon: typeof Cpu;
    wait: string;
    util: string;
    congestion: string;
    response: string;
  }[] = [
    {
      id: 'manual',
      index: '01',
      title: 'MANUAL DISPATCH',
      subtitle: 'STATIC TIMETABLE & OPERATOR LOGS',
      description: 'Train induction decisions rely on static pre-scheduled timetables. Reactive manual phone dispatch creates delayed response to unexpected commuter surges.',
      icon: ShieldAlert,
      wait: '11.4 MIN',
      util: '63%',
      congestion: 'HIGH',
      response: '12 MIN'
    },
    {
      id: 'conventional',
      index: '02',
      title: 'CONVENTIONAL CONTROL',
      subtitle: 'RULE-BASED FIXED INTERVAL CBTC',
      description: 'Automated headway control operates on rigid fixed intervals. Maintains consistency under normal conditions but lacks adaptive flexibility during disruptions.',
      icon: Activity,
      wait: '8.1 MIN',
      util: '74%',
      congestion: 'MEDIUM',
      response: '7 MIN'
    },
    {
      id: 'ai',
      index: '03',
      title: 'AI-POWERED INDUCTION',
      subtitle: 'DYNAMIC MULTI-OBJECTIVE PARETO SCHEDULING',
      description: 'Continuously fuses real-time platform CCTV density, fleet health, depot turnout capacity, and energy profiles to automatically induct and reallocate trainsets.',
      icon: Cpu,
      wait: '5.2 MIN',
      util: '91%',
      congestion: 'LOW',
      response: '< 1 MIN'
    }
  ];

  return (
    <div className="w-full space-y-4">
      {/* Section Header */}
      <div className="flex flex-wrap items-end justify-between gap-3 px-1">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#56B6C6]"></span>
            <span className="font-mono-tech text-xs tracking-widest text-[#56B6C6] font-bold uppercase">
              OPERATIONAL COMPARISON ARCHITECTURE
            </span>
          </div>
          <h2 className="font-mono-tech font-bold text-xl md:text-2xl text-[#170C79] uppercase tracking-tight mt-0.5">
            CHOOSE OPERATIONAL PARADIGM
          </h2>
        </div>
        <p className="font-inter text-xs text-[#2C2B68] max-w-md font-medium">
          Evaluate KMRL dispatching under identical passenger traffic and emergency scenarios
        </p>
      </div>

      {/* 3 Train Window Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {cases.map((c) => {
          const isSelected = currentCase === c.id;
          const Icon = c.icon;

          return (
            <button
              key={c.id}
              onClick={() => onSelectCase(c.id)}
              className={`group text-left rounded-2xl p-2 transition-all duration-200 relative cursor-pointer flex flex-col justify-between select-none ${
                isSelected
                  ? 'bg-[#8ACBD0] border-2 border-[#56B6C6] shadow-md scale-[1.01]'
                  : 'bg-[#8ACBD0] border-2 border-[#8ACBD0] hover:border-[#56B6C6] shadow-sm hover:scale-[1.005]'
              }`}
            >
              {/* Outer Window Top Bezel with Micro-Rivets & Status */}
              <div className="flex items-center justify-between px-2 pt-1 pb-2 w-full">
                {/* Carriage Rivet Accents */}
                <div className="flex items-center gap-1.5">
                  <span className={`w-1.5 h-1.5 rounded-full ${isSelected ? 'bg-[#170C79]' : 'bg-[#170C79]/30'}`}></span>
                  <span className={`w-1.5 h-1.5 rounded-full ${isSelected ? 'bg-[#170C79]' : 'bg-[#170C79]/30'}`}></span>
                </div>

                {/* Active Indicator or Paradigm Tag */}
                {isSelected ? (
                  <span className="bg-[#56B6C6] text-[#170C79] font-mono-tech font-bold text-[9px] uppercase tracking-wider px-2 py-0.5 rounded shadow-sm flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3" /> ACTIVE SYSTEM
                  </span>
                ) : (
                  <span className="text-[9px] font-mono-tech font-bold text-[#170C79] tracking-wider uppercase">
                    SLOT {c.index}
                  </span>
                )}

                {/* Right Carriage Rivet Accents */}
                <div className="flex items-center gap-1.5">
                  <span className={`w-1.5 h-1.5 rounded-full ${isSelected ? 'bg-[#170C79]' : 'bg-[#170C79]/30'}`}></span>
                  <span className={`w-1.5 h-1.5 rounded-full ${isSelected ? 'bg-[#170C79]' : 'bg-[#170C79]/30'}`}></span>
                </div>
              </div>

              {/* Inner Inset Train Window Pane (View Area) */}
              <div className={`rounded-xl p-4 md:p-5 border flex flex-col justify-between flex-1 space-y-4 shadow-inner w-full ${
                isSelected 
                  ? 'bg-[#EFE3CA] border-[#56B6C6]/40' 
                  : 'bg-[#EFE3CA] border-[#8ACBD0]'
              }`}>
                <div>
                  {/* Card Title & Icon Row */}
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <span className="font-mono-tech font-bold text-lg text-[#2C2B68]">
                        {c.index}
                      </span>
                      <h3 className="font-mono-tech font-bold text-sm md:text-base text-[#170C79] uppercase tracking-tight">
                        {c.title}
                      </h3>
                    </div>
                    <div className={`p-2 rounded-lg border ${
                      isSelected 
                        ? 'bg-[#56B6C6] border-[#56B6C6] text-[#170C79]' 
                        : 'bg-[#FFFFFF] border-[#8ACBD0] text-[#2C2B68]'
                    }`}>
                      <Icon className="w-4 h-4" />
                    </div>
                  </div>

                  {/* Subtitle */}
                  <p className="text-[10px] font-mono-tech text-[#2C2B68] font-bold tracking-wider uppercase mb-2.5">
                    {c.subtitle}
                  </p>

                  {/* Body Description (Inter font for maximum readability) */}
                  <p className="font-inter text-xs text-[#2C2B68] font-medium leading-relaxed">
                    {c.description}
                  </p>
                </div>

                {/* Metric Readout Grid */}
                <div className="pt-3 border-t border-[#8ACBD0]/40 grid grid-cols-2 gap-2 font-mono-tech text-xs">
                  <div className="bg-[#FFFFFF] p-2.5 rounded-lg border border-[#8ACBD0] shadow-xs">
                    <span className="text-[9px] text-[#2C2B68] uppercase font-bold block">AVG WAIT TIME</span>
                    <span className={`font-bold text-sm ${c.id === 'ai' ? 'text-[#56B6C6]' : 'text-[#170C79]'}`}>
                      {c.wait}
                    </span>
                  </div>
                  <div className="bg-[#FFFFFF] p-2.5 rounded-lg border border-[#8ACBD0] shadow-xs">
                    <span className="text-[9px] text-[#2C2B68] uppercase font-bold block">UTILIZATION</span>
                    <span className="font-bold text-sm text-[#170C79]">{c.util}</span>
                  </div>
                  <div className="bg-[#FFFFFF] p-2.5 rounded-lg border border-[#8ACBD0] shadow-xs">
                    <span className="text-[9px] text-[#2C2B68] uppercase font-bold block">CONGESTION</span>
                    <span className="font-bold text-sm text-[#170C79]">
                      {c.congestion}
                    </span>
                  </div>
                  <div className="bg-[#FFFFFF] p-2.5 rounded-lg border border-[#8ACBD0] shadow-xs">
                    <span className="text-[9px] text-[#2C2B68] uppercase font-bold block">RESPONSE</span>
                    <span className="font-bold text-sm text-[#170C79]">{c.response}</span>
                  </div>
                </div>

                {/* Action Trigger Row */}
                <div className="pt-2 border-t border-[#8ACBD0]/40 flex items-center justify-between text-[10px] font-mono-tech">
                  <span className="text-[#2C2B68] font-bold">PARADIGM STATE:</span>
                  <span className={`flex items-center gap-1 font-bold ${isSelected ? 'text-[#170C79]' : 'text-[#2C2B68] group-hover:text-[#170C79]'}`}>
                    <span>{isSelected ? 'CURRENTLY ACTIVE' : 'SWITCH TO PARADIGM'}</span>
                    <ArrowRight className={`w-3 h-3 ${isSelected ? 'text-[#56B6C6]' : 'text-[#2C2B68]'}`} />
                  </span>
                </div>
              </div>
            </button>
          );
        })}
      </div>

      {isTransitioning && (
        <div className="text-center py-1">
          <span className="font-mono-tech text-xs text-[#56B6C6] font-bold animate-pulse">
            CALIBRATING NETWORK TIMETABLE & CBTC BLOCKS...
          </span>
        </div>
      )}
    </div>
  );
};



