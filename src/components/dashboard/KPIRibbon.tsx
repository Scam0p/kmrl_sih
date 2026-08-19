import React from 'react';
import { KPISet, CaseType } from '../../types/simulation';
import { Clock, Gauge, AlertTriangle, Zap, TrendingUp, Users } from 'lucide-react';

interface KPIRibbonProps {
  kpis: KPISet;
  currentCase: CaseType;
}

export const KPIRibbon: React.FC<KPIRibbonProps> = ({ kpis, currentCase }) => {
  const cards = [
    {
      id: 'wait',
      label: 'AVG PASSENGER WAIT',
      value: `${kpis.avgWaitTimeMin.toFixed(1)} MIN`,
      delta: currentCase === 'ai' ? '↓ 54% vs Manual' : currentCase === 'conventional' ? '↓ 29% vs Manual' : 'BASELINE',
      deltaColor: currentCase === 'ai' ? 'text-[#170C79]' : 'text-[#2C2B68]',
      icon: Clock
    },
    {
      id: 'util',
      label: 'FLEET UTILIZATION',
      value: `${kpis.fleetUtilizationPct}%`,
      delta: currentCase === 'ai' ? '+28% Fleet Boost' : currentCase === 'conventional' ? '+11% Fleet Boost' : '63% Base',
      deltaColor: currentCase === 'ai' ? 'text-[#170C79]' : 'text-[#2C2B68]',
      icon: Gauge
    },
    {
      id: 'congestion',
      label: 'PEAK CONGESTION',
      value: kpis.peakCongestion,
      delta: kpis.peakCongestion === 'LOW' ? 'OPTIMAL (3% Delay)' : kpis.peakCongestion === 'MEDIUM' ? 'MODERATE (22% Delay)' : 'OVERCROWDED (48% Delay)',
      deltaColor: 'text-[#2C2B68]',
      icon: AlertTriangle
    },
    {
      id: 'response',
      label: 'INDUCTION RESPONSE',
      value: `${kpis.responseTimeMin < 1 ? '< 1 MIN' : `${kpis.responseTimeMin.toFixed(1)} MIN`}`,
      delta: currentCase === 'ai' ? '42ms ML Solve' : currentCase === 'conventional' ? '7 min lag' : '12 min lag',
      deltaColor: currentCase === 'ai' ? 'text-[#170C79]' : 'text-[#2C2B68]',
      icon: Zap
    },
    {
      id: 'headway',
      label: 'HEADWAY CONSISTENCY',
      value: `${kpis.headwayConsistencyPct}%`,
      delta: 'Target: 04:30 min',
      deltaColor: 'text-[#2C2B68]',
      icon: TrendingUp
    },
    {
      id: 'pax',
      label: 'HOURLY COMMUTERS',
      value: kpis.paxServedTotal.toLocaleString(),
      delta: '+4,200 pax throughput',
      deltaColor: 'text-[#170C79]',
      icon: Users
    }
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3.5 w-full">
      {cards.map((card) => {
        const Icon = card.icon;
        return (
          <div
            key={card.id}
            className="rounded-2xl p-1.5 bg-[#8ACBD0] border-2 border-[#8ACBD0] hover:border-[#56B6C6] transition-all duration-200 shadow-sm flex flex-col justify-between"
          >
            {/* Window Top Bezel with Micro-Rivets */}
            <div className="flex items-center justify-between px-2 pt-1 pb-1.5">
              <div className="flex items-center gap-1">
                <span className="w-1 h-1 rounded-full bg-[#170C79]/30"></span>
                <span className="w-1 h-1 rounded-full bg-[#170C79]/30"></span>
              </div>
              <span className="text-[8.5px] font-mono-tech uppercase tracking-wider text-[#170C79] font-bold truncate max-w-[100px]">
                {card.label}
              </span>
              <div className="flex items-center gap-1">
                <span className="w-1 h-1 rounded-full bg-[#170C79]/30"></span>
                <span className="w-1 h-1 rounded-full bg-[#170C79]/30"></span>
              </div>
            </div>

            {/* Inner Inset Viewport Pane */}
            <div className="bg-[#EFE3CA] rounded-xl p-3 border border-[#8ACBD0] flex flex-col justify-between flex-1 shadow-inner">
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-[8px] font-mono-tech text-[#2C2B68] font-bold">METRIC</span>
                <Icon className="w-3.5 h-3.5 text-[#2C2B68]" />
              </div>

              <div>
                <span className="font-mono-tech font-bold text-xl md:text-2xl text-[#170C79] tracking-tight block">
                  {card.value}
                </span>
                <span className={`text-[9.5px] font-mono-tech font-bold ${card.deltaColor} block mt-1`}>
                  {card.delta}
                </span>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};



