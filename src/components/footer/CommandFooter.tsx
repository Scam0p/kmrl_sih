import React from 'react';
import { ShieldCheck, Cpu, Train, Award, Layers } from 'lucide-react';

export const CommandFooter: React.FC = () => {
  return (
    <footer className="w-full bg-[#170C79] border-t-2 border-[#56B6C6]/50 py-10 px-4 md:px-8 font-mono-tech select-none text-xs text-[#EFE3CA] shadow-2xl">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Top Operational Disclaimer Banner */}
        <div className="p-4 rounded-xl bg-[#120963] border-2 border-[#56B6C6]/60 flex flex-wrap items-center justify-between gap-3 text-[#EFE3CA] shadow-md">
          <div className="flex items-center gap-2.5 text-[#56B6C6]">
            <ShieldCheck className="w-5 h-5 flex-shrink-0" />
            <span className="font-bold tracking-wider text-xs uppercase">
              HIGH-FIDELITY SIMULATION & DEMONSTRATION SUITE
            </span>
          </div>
          <span className="text-xs text-[#EFE3CA]/85 font-inter font-medium">
            Smart India Hackathon 2026 • Kochi Metro Rail Limited (KMRL) AI Operations Protocol
          </span>
        </div>

        {/* Middle 4-Column Structured Engineering Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 pt-2">
          {/* Col 1: System Identity */}
          <div className="space-y-2.5 bg-[#120963]/50 p-4 rounded-xl border border-[#56B6C6]/30">
            <div className="flex items-center gap-2">
              <Train className="w-4 h-4 text-[#56B6C6]" />
              <span className="font-mono-tech font-bold text-sm text-[#EFE3CA] tracking-wide uppercase">
                KMRL AI DISPATCH
              </span>
            </div>
            <p className="font-inter text-xs text-[#EFE3CA]/80 leading-relaxed">
              Adaptive train induction planning and real-time headway synchronization for the Aluva to Tripunithura metro corridor.
            </p>
          </div>

          {/* Col 2: Problem Statement */}
          <div className="space-y-2.5 bg-[#120963]/50 p-4 rounded-xl border border-[#56B6C6]/30">
            <div className="flex items-center gap-2">
              <Award className="w-4 h-4 text-[#56B6C6]" />
              <span className="font-mono-tech font-bold text-sm text-[#EFE3CA] tracking-wide uppercase">
                PROBLEM STATEMENT
              </span>
            </div>
            <p className="font-inter text-xs text-[#EFE3CA]/80 leading-relaxed">
              SIH 2026: Dynamic scheduling of rolling stock from stabling sidings during demand surges, maintenance, and disruptions.
            </p>
          </div>

          {/* Col 3: System Architecture */}
          <div className="space-y-2.5 bg-[#120963]/50 p-4 rounded-xl border border-[#56B6C6]/30">
            <div className="flex items-center gap-2">
              <Layers className="w-4 h-4 text-[#56B6C6]" />
              <span className="font-mono-tech font-bold text-sm text-[#EFE3CA] tracking-wide uppercase">
                ARCHITECTURE
              </span>
            </div>
            <p className="font-inter text-xs text-[#EFE3CA]/80 leading-relaxed">
              Multi-objective Pareto heuristics, real-time CBTC signal telemetry ingestion, and depot turnout turnout validation.
            </p>
          </div>

          {/* Col 4: Engine Performance */}
          <div className="space-y-2.5 bg-[#120963]/50 p-4 rounded-xl border border-[#56B6C6]/30">
            <div className="flex items-center gap-2">
              <Cpu className="w-4 h-4 text-[#56B6C6]" />
              <span className="font-mono-tech font-bold text-sm text-[#EFE3CA] tracking-wide uppercase">
                ENGINE STATS
              </span>
            </div>
            <p className="font-inter text-xs text-[#EFE3CA]/80 leading-relaxed">
              42ms optimization latency • GoA2 automation protocol • 750V DC traction power monitoring • 90-minute peak window.
            </p>
          </div>
        </div>

        {/* Bottom Credits & Copyright Bar */}
        <div className="pt-6 border-t border-[#56B6C6]/30 flex flex-wrap items-center justify-between gap-4 text-xs text-[#EFE3CA]/70">
          <div className="flex items-center gap-2">
            <span>© 2026 POWERHOUSE INNOVATION TEAM</span>
            <span className="text-[#56B6C6]">•</span>
            <span>DEPT. OF CSE-IOT & CSBT</span>
          </div>

          <div className="flex items-center gap-3">
            <span className="px-2.5 py-1 rounded bg-[#120963] border border-[#56B6C6]/40 text-[#56B6C6] font-bold text-[11px]">
              SIH 2026 PROTOTYPE
            </span>
            <span className="text-[#EFE3CA] font-bold">
              KOCHI METRO RAIL LIMITED
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};



