import React from 'react';
import { CaseType } from '../../types/simulation';
import { ShieldAlert, Activity, Cpu } from 'lucide-react';
import { ActionSlider } from '../ui/ActionSlider';

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
          <span className="font-mono-tech text-xs tracking-widest text-[#56B6C6] font-bold uppercase block mb-1">
            OPERATIONAL PARADIGM ARCHITECTURE
          </span>
          <h2 className="font-mono-tech font-bold text-xl md:text-2xl text-[#170C79] uppercase tracking-tight">
            CHOOSE OPERATIONAL PARADIGM
          </h2>
        </div>
        <p className="font-inter text-xs text-[#2C2B68] max-w-md font-medium">
          Slide the safety action control to transition dispatch architecture across the 25.6 km corridor
        </p>
      </div>

      {/* 3 Refined Cards Grid with Action Sliders */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {cases.map((c) => {
          const isSelected = currentCase === c.id;
          const Icon = c.icon;

          return (
            <div
              key={c.id}
              className={`rounded-2xl p-5 transition-colors relative flex flex-col justify-between select-none ${
                isSelected
                  ? 'bg-[#EFE3CA] border-2 border-[#170C79] shadow-md'
                  : 'bg-[#EFE3CA] border-2 border-[#8ACBD0] shadow-xs'
              }`}
            >
              <div>
                {/* Header row: Index, Title, Icon, Status */}
                <div className="flex items-start justify-between gap-2 mb-3">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-mono-tech font-bold text-lg text-[#170C79]">
                        {c.index}
                      </span>
                      <h3 className="font-mono-tech font-bold text-sm md:text-base text-[#170C79] uppercase tracking-tight">
                        {c.title}
                      </h3>
                    </div>
                    <span className="text-[9.5px] font-mono-tech text-[#56B6C6] font-bold tracking-wider uppercase block mt-0.5">
                      {c.subtitle}
                    </span>
                  </div>

                  <div className={`p-2 rounded-lg border flex-shrink-0 ${
                    isSelected 
                      ? 'bg-[#170C79] border-[#170C79] text-[#EFE3CA]' 
                      : 'bg-[#FFFFFF] border-[#8ACBD0] text-[#170C79]'
                  }`}>
                    <Icon className="w-4 h-4 text-[#56B6C6]" />
                  </div>
                </div>

                {/* Body Description */}
                <p className="font-inter text-xs text-[#2C2B68] font-medium leading-relaxed mb-4">
                  {c.description}
                </p>
              </div>

              <div className="space-y-3 pt-3 border-t border-[#8ACBD0]">
                {/* Metrics Readout Grid */}
                <div className="grid grid-cols-2 gap-2 font-mono-tech text-xs">
                  <div className="bg-[#FFFFFF] p-2 rounded-lg border border-[#8ACBD0]">
                    <span className="text-[8.5px] text-[#2C2B68] uppercase font-bold block">AVG WAIT TIME</span>
                    <span className={`font-bold text-sm ${c.id === 'ai' ? 'text-[#56B6C6]' : 'text-[#170C79]'}`}>
                      {c.wait}
                    </span>
                  </div>
                  <div className="bg-[#FFFFFF] p-2 rounded-lg border border-[#8ACBD0]">
                    <span className="text-[8.5px] text-[#2C2B68] uppercase font-bold block">UTILIZATION</span>
                    <span className="font-bold text-sm text-[#170C79]">{c.util}</span>
                  </div>
                  <div className="bg-[#FFFFFF] p-2 rounded-lg border border-[#8ACBD0]">
                    <span className="text-[8.5px] text-[#2C2B68] uppercase font-bold block">CONGESTION</span>
                    <span className="font-bold text-sm text-[#170C79]">
                      {c.congestion}
                    </span>
                  </div>
                  <div className="bg-[#FFFFFF] p-2 rounded-lg border border-[#8ACBD0]">
                    <span className="text-[8.5px] text-[#2C2B68] uppercase font-bold block">RESPONSE</span>
                    <span className="font-bold text-sm text-[#170C79]">{c.response}</span>
                  </div>
                </div>

                {/* Smooth Action Slider */}
                <div className="pt-1">
                  <ActionSlider
                    isActive={isSelected}
                    label={`SLIDE TO ENABLE ${c.index}`}
                    activeLabel="ACTIVE PARADIGM"
                    onActivate={() => onSelectCase(c.id)}
                  />
                </div>
              </div>
            </div>
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
