import React from 'react';
import { ScenarioType } from '../../types/simulation';
import { SCENARIOS } from '../../data/mockData';
import { Activity, TrendingUp, AlertTriangle, Users, Wrench, Zap, Play, CheckCircle2 } from 'lucide-react';

interface ScenarioControlCenterProps {
  activeScenario: ScenarioType;
  onSelectScenario: (id: ScenarioType) => void;
}

export const ScenarioControlCenter: React.FC<ScenarioControlCenterProps> = ({
  activeScenario,
  onSelectScenario
}) => {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'TrendingUp': return TrendingUp;
      case 'AlertTriangle': return AlertTriangle;
      case 'Users': return Users;
      case 'Wrench': return Wrench;
      case 'Zap': return Zap;
      default: return Activity;
    }
  };

  return (
    <div className="w-full rounded-2xl bg-[#8ACBD0] border-2 border-[#56B6C6]/50 p-2 shadow-sm space-y-2">
      {/* Top Window Bezel with Micro-Rivets & Master Scenario Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 px-3 pt-2 pb-2">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#56B6C6]"></span>
            <span className="text-[10px] font-mono-tech uppercase tracking-widest text-[#56B6C6] font-bold">
              STRESS-TEST CONTINGENCY MATRIX
            </span>
          </div>
          <h2 className="font-mono-tech font-bold text-sm md:text-base text-[#170C79] uppercase tracking-wide">
            OPERATIONAL SCENARIOS SIMULATOR
          </h2>
        </div>
        <div className="text-xs font-mono-tech text-[#170C79] bg-[#EFE3CA] px-3 py-1 rounded border border-[#8ACBD0] font-bold">
          INJECT REAL-TIME ANOMALIES TO DEMONSTRATE AI ADAPTIVE SCHEDULING
        </div>
      </div>

      {/* 6 Scenario Train Window Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5 p-1">
        {SCENARIOS.map((scenario) => {
          const isActive = activeScenario === scenario.id;
          const Icon = getIcon(scenario.iconName);

          return (
            <button
              key={scenario.id}
              onClick={() => onSelectScenario(scenario.id)}
              className={`rounded-2xl p-1.5 text-left transition-all duration-200 cursor-pointer flex flex-col justify-between select-none ${
                isActive
                  ? 'bg-[#8ACBD0] border-2 border-[#56B6C6] shadow-md scale-[1.01]'
                  : 'bg-[#8ACBD0] border-2 border-[#8ACBD0] hover:border-[#56B6C6] shadow-sm'
              }`}
            >
              {/* Window Top Bezel with Micro-Rivets */}
              <div className="flex items-center justify-between px-2 pt-1 pb-1.5">
                <div className="flex items-center gap-1">
                  <span className={`w-1 h-1 rounded-full ${isActive ? 'bg-[#170C79]' : 'bg-[#170C79]/30'}`}></span>
                  <span className={`w-1 h-1 rounded-full ${isActive ? 'bg-[#170C79]' : 'bg-[#170C79]/30'}`}></span>
                </div>
                {isActive ? (
                  <span className="bg-[#56B6C6] text-[#170C79] font-mono-tech font-bold text-[8.5px] uppercase tracking-wider px-2 py-0.5 rounded shadow-sm flex items-center gap-1">
                    <CheckCircle2 className="w-2.5 h-2.5" /> ACTIVE SCENARIO
                  </span>
                ) : (
                  <span className="text-[8.5px] font-mono-tech uppercase tracking-wider text-[#170C79] font-bold">
                    CONTINGENCY SLOT
                  </span>
                )}
                <div className="flex items-center gap-1">
                  <span className={`w-1 h-1 rounded-full ${isActive ? 'bg-[#170C79]' : 'bg-[#170C79]/30'}`}></span>
                  <span className={`w-1 h-1 rounded-full ${isActive ? 'bg-[#170C79]' : 'bg-[#170C79]/30'}`}></span>
                </div>
              </div>

              {/* Inner Inset Viewport Pane */}
              <div className="bg-[#EFE3CA] rounded-xl p-3.5 border border-[#8ACBD0] flex flex-col justify-between flex-1 space-y-3 shadow-inner">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <div className={`p-2 rounded-lg border ${isActive ? 'bg-[#56B6C6] border-[#56B6C6] text-[#170C79]' : 'bg-[#FFFFFF] border-[#8ACBD0] text-[#2C2B68]'}`}>
                      <Icon className="w-4 h-4" />
                    </div>
                    <span className={`text-[8px] font-mono-tech font-bold px-2 py-0.5 rounded border uppercase ${
                      scenario.badge === 'CRITICAL EVENT' ? 'bg-[#C53030]/15 text-[#C53030] border-[#C53030]/30' :
                      scenario.badge === 'HIGH DEMAND' ? 'bg-[#56B6C6]/25 text-[#170C79] border-[#56B6C6]/40' :
                      'bg-[#FFFFFF] text-[#2C2B68] border-[#8ACBD0]'
                    }`}>
                      {scenario.badge}
                    </span>
                  </div>

                  <h3 className="font-mono-tech font-bold text-xs md:text-sm text-[#170C79] uppercase tracking-tight mb-1.5">
                    {scenario.title}
                  </h3>

                  <p className="font-inter text-xs text-[#2C2B68] font-medium leading-relaxed mb-2">
                    {scenario.description}
                  </p>
                </div>

                {/* Expected AI Reaction Box */}
                <div className="pt-2 border-t border-[#8ACBD0]/40 text-[10.5px] bg-[#FFFFFF] p-2.5 rounded-lg border border-[#8ACBD0] space-y-1 shadow-xs">
                  <span className="text-[#170C79] font-mono-tech font-bold block text-[9.5px]">
                    AI ADAPTIVE REACTION:
                  </span>
                  <span className="font-inter text-xs text-[#2C2B68] font-medium leading-relaxed block">
                    {scenario.expectedAIAction}
                  </span>
                </div>

                {/* Trigger Button Row */}
                <div className="pt-1.5 border-t border-[#8ACBD0]/40 flex items-center justify-end text-[9.5px] font-mono-tech">
                  <span className={`flex items-center gap-1 font-bold ${isActive ? 'text-[#170C79]' : 'text-[#2C2B68]'}`}>
                    {isActive ? 'CURRENTLY SIMULATING' : 'TRIGGER SCENARIO'} <Play className="w-3 h-3 text-[#56B6C6]" />
                  </span>
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};



