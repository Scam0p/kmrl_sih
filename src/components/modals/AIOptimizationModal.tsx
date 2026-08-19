import React from 'react';
import { Cpu, Sparkles, CheckCircle2, Loader2, Zap } from 'lucide-react';

interface AIOptimizationModalProps {
  isOpen: boolean;
  step: number;
}

export const AIOptimizationModal: React.FC<AIOptimizationModalProps> = ({ isOpen, step }) => {
  if (!isOpen) return null;

  const steps = [
    { num: 1, title: 'SCANNING RAILWAY NETWORK & TRACK SENSORS' },
    { num: 2, title: 'ANALYZING PASSENGER DEMAND & QUEUE GROWTH' },
    { num: 3, title: 'CHECKING FLEET READINESS & DEPOT TURNOUT CAPACITY' },
    { num: 4, title: 'EVALUATING MAINTENANCE MATRIX & TRACTION POWER' },
    { num: 5, title: 'GENERATING PARETO-OPTIMAL INDUCTION SCHEDULE' }
  ];

  const progressPct = Math.min(100, Math.round((step / 5) * 100));

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#170C79]/60 backdrop-blur-md animate-in fade-in duration-200 select-none">
      <div className="relative w-full max-w-xl bg-[#8ACBD0] rounded-2xl p-2 border-2 border-[#56B6C6] shadow-2xl font-mono-tech overflow-hidden">
        {/* Outer Top Bezel with Micro-Rivets */}
        <div className="flex items-center justify-between px-3 pt-2 pb-1.5">
          <div className="flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-[#170C79]/40"></span>
            <span className="w-1.5 h-1.5 rounded-full bg-[#170C79]/40"></span>
          </div>
          <span className="text-[9px] uppercase tracking-widest text-[#170C79] font-bold">
            KMRL HEURISTIC OPTIMIZATION ENGINE
          </span>
          <div className="flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-[#170C79]/40"></span>
            <span className="w-1.5 h-1.5 rounded-full bg-[#170C79]/40"></span>
          </div>
        </div>

        {/* Inner Inset Viewport */}
        <div className="bg-[#EFE3CA] rounded-xl p-5 md:p-6 border border-[#8ACBD0] shadow-inner">
          {/* Top Header */}
          <div className="flex items-center justify-between pb-4 border-b border-[#8ACBD0] mb-5">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-xl bg-[#170C79] border border-[#56B6C6]/40 flex items-center justify-center text-[#56B6C6] shadow-md">
                <Cpu className="w-5 h-5 animate-pulse" />
              </div>
              <div>
                <h3 className="font-mono-tech font-bold text-base text-[#170C79] uppercase tracking-wider">
                  KMRL AI SOLVER ENGAGED
                </h3>
                <span className="text-[10.5px] text-[#2C2B68] flex items-center gap-1 font-medium">
                  <Sparkles className="w-3 h-3 text-[#56B6C6] animate-spin" />
                  <span>DYNAMIC PARETO-OPTIMAL MULTI-OBJECTIVE ENGINE</span>
                </span>
              </div>
            </div>

            <span className="text-xl font-bold text-[#170C79] font-mono-tech">
              {progressPct}%
            </span>
          </div>

          {/* Progress Bar */}
          <div className="w-full h-2.5 bg-[#8ACBD0] rounded-full overflow-hidden mb-5 border border-[#8ACBD0]">
            <div
              className="h-full bg-[#56B6C6] rounded-full transition-all duration-300"
              style={{ width: `${progressPct}%` }}
            ></div>
          </div>

          {/* Step Items List */}
          <div className="space-y-2.5 mb-5">
            {steps.map((s) => {
              const isCompleted = step > s.num;
              const isCurrent = step === s.num;

              return (
                <div
                  key={s.num}
                  className={`p-3 rounded-lg border flex items-center justify-between transition-all duration-300 ${
                    isCompleted
                      ? 'bg-[#FFFFFF] border-[#8ACBD0] text-[#170C79]'
                      : isCurrent
                      ? 'bg-[#8ACBD0] border-2 border-[#56B6C6] text-[#170C79] font-bold shadow-sm'
                      : 'bg-[#EFE3CA] border-[#8ACBD0]/40 text-[#2C2B68]/60'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className="text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center border border-current text-[10px]">
                      {s.num}
                    </span>
                    <span className="text-xs font-bold tracking-wide">
                      {s.title}
                    </span>
                  </div>

                  {isCompleted ? (
                    <CheckCircle2 className="w-4 h-4 text-[#170C79]" />
                  ) : isCurrent ? (
                    <Loader2 className="w-4 h-4 text-[#170C79] animate-spin" />
                  ) : (
                    <span className="w-3.5 h-3.5 rounded-full border border-[#8ACBD0]"></span>
                  )}
                </div>
              );
            })}
          </div>

          {/* Telemetry Footnote */}
          <div className="p-3 bg-[#FFFFFF] rounded-lg border border-[#8ACBD0] text-[10px] text-[#2C2B68] flex items-center justify-between shadow-xs">
            <span className="flex items-center gap-1 text-[#170C79] font-bold">
              <Zap className="w-3.5 h-3.5 text-[#56B6C6]" /> 1,420 PERMUTATIONS TESTED
            </span>
            <span className="text-[#170C79] font-bold">SOLVE LATENCY: ~42ms</span>
          </div>
        </div>
      </div>
    </div>
  );
};



