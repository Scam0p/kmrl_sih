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
    <div className="w-full space-y-4">
      {/* 6 Scenario Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {SCENARIOS.map((scenario) => {
          const isActive = activeScenario === scenario.id;
          const Icon = getIcon(scenario.iconName);

          return (
            <button
              key={scenario.id}
              onClick={() => onSelectScenario(scenario.id)}
              className={`rounded-xl p-5 text-left transition-colors cursor-pointer flex flex-col justify-between select-none ${
                isActive
                  ? 'bg-[#EFE3CA] border-2 border-[#170C79] shadow-md'
                  : 'bg-[#EFE3CA] border-2 border-[#8ACBD0] hover:border-[#56B6C6] shadow-xs'
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className={`p-2 rounded-lg border ${isActive ? 'bg-[#170C79] border-[#170C79] text-[#EFE3CA]' : 'bg-[#FFFFFF] border-[#8ACBD0] text-[#2C2B68]'}`}>
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

                <p className="font-inter text-xs text-[#2C2B68] font-medium leading-relaxed mb-3">
                  {scenario.description}
                </p>
              </div>

              <div className="space-y-3 pt-3 border-t border-[#8ACBD0]/50">
                {/* Expected AI Reaction Box */}
                <div className="bg-[#FFFFFF] p-2.5 rounded-lg border border-[#8ACBD0] space-y-1">
                  <span className="text-[#170C79] font-mono-tech font-bold block text-[9.5px]">
                    AI ADAPTIVE REACTION:
                  </span>
                  <span className="font-inter text-xs text-[#2C2B68] font-medium leading-relaxed block">
                    {scenario.expectedAIAction}
                  </span>
                </div>

                {/* Trigger Button Row */}
                <div className="flex items-center justify-between text-[10px] font-mono-tech pt-1">
                  <span className="text-[#2C2B68] font-bold">SIMULATION STATUS:</span>
                  <span className={`flex items-center gap-1 font-bold ${isActive ? 'text-[#170C79]' : 'text-[#2C2B68]'}`}>
                    {isActive ? (
                      <span className="flex items-center gap-1 text-[#170C79]">
                        <CheckCircle2 className="w-3 h-3 text-[#56B6C6]" /> ACTIVE
                      </span>
                    ) : (
                      <span className="flex items-center gap-1 hover:text-[#170C79]">
                        <span>SIMULATE</span> <Play className="w-3 h-3 text-[#56B6C6]" />
                      </span>
                    )}
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
