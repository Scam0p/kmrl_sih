import React from 'react';
import { AIEventLog } from '../../types/simulation';
import { Terminal, AlertCircle, CheckCircle, Zap, Cpu, Bell } from 'lucide-react';

interface DecisionFeedProps {
  logs: AIEventLog[];
}

export const DecisionFeed: React.FC<DecisionFeedProps> = ({ logs }) => {
  const getBadgeStyle = (type: AIEventLog['type']) => {
    switch (type) {
      case 'ANOMALY':
      case 'WARNING':
        return 'bg-[#C53030]/15 text-[#C53030] border-[#C53030]/40 font-bold';
      case 'DEPLOYMENT':
      case 'OPTIMIZATION':
        return 'bg-[#56B6C6]/25 text-[#170C79] border-[#56B6C6]/50 font-bold';
      case 'CONSTRAINT':
        return 'bg-[#8ACBD0]/30 text-[#170C79] border-[#8ACBD0] font-bold';
      default:
        return 'bg-[#EFE3CA] text-[#2C2B68] border-[#8ACBD0] font-bold';
    }
  };

  const getIcon = (type: AIEventLog['type']) => {
    switch (type) {
      case 'ANOMALY':
      case 'WARNING':
        return AlertCircle;
      case 'DEPLOYMENT':
        return CheckCircle;
      case 'OPTIMIZATION':
        return Cpu;
      case 'CONSTRAINT':
        return Zap;
      default:
        return Bell;
    }
  };

  return (
    <div className="w-full rounded-xl bg-[#EFE3CA] border-2 border-[#8ACBD0] p-5 shadow-xs flex flex-col h-full space-y-4">
      {/* Stream Header */}
      <div className="flex items-center justify-between pb-3 border-b border-[#8ACBD0]">
        <div className="flex items-center gap-2">
          <Terminal className="w-4 h-4 text-[#56B6C6]" />
          <h3 className="font-mono-tech font-bold text-sm md:text-base text-[#170C79] uppercase tracking-wide">
            EVENT & TELEMETRY STREAM
          </h3>
        </div>

        <div className="flex items-center gap-1.5 text-[9.5px] font-mono-tech text-[#170C79] bg-[#FFFFFF] px-2.5 py-0.5 rounded border border-[#8ACBD0] font-bold shadow-xs">
          <span className="w-1.5 h-1.5 rounded-full bg-[#2E8B57]"></span>
          <span>LIVE STREAM</span>
        </div>
      </div>

      {/* Stream Audit Log List */}
      <div className="flex-1 overflow-y-auto space-y-2.5 max-h-[440px] pr-1 font-mono-tech text-xs scrollbar-thin">
        {logs.map((log) => {
          const Icon = getIcon(log.type);
          const badgeClass = getBadgeStyle(log.type);

          return (
            <div
              key={log.id}
              className="p-3 rounded-lg bg-[#FFFFFF] border border-[#8ACBD0] hover:border-[#56B6C6] transition-colors shadow-xs"
            >
              <div className="flex items-center justify-between gap-2 mb-1">
                <div className="flex items-center gap-1.5">
                  <Icon className="w-3.5 h-3.5 text-[#2C2B68]" />
                  <span className={`text-[8px] font-mono-tech font-bold px-1.5 py-0.5 rounded border ${badgeClass}`}>
                    {log.type}
                  </span>
                  <span className="font-mono-tech font-bold text-[#170C79] text-[11px] truncate">
                    {log.title}
                  </span>
                </div>
                <span className="text-[9px] font-mono-tech text-[#2C2B68] whitespace-nowrap">
                  {log.time}
                </span>
              </div>

              <p className="font-inter text-xs text-[#2C2B68] font-medium leading-relaxed pl-2 border-l border-[#8ACBD0] mt-1.5">
                {log.detail}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
};
