import React from 'react';
import { ShieldAlert, Cpu, Activity, AlertTriangle, X, CheckCircle2 } from 'lucide-react';
import { CaseType } from '../../types/simulation';

interface ModeChangeConfirmModalProps {
  pendingCase: CaseType | null;
  currentCase: CaseType;
  onConfirm: () => void;
  onCancel: () => void;
}

export const ModeChangeConfirmModal: React.FC<ModeChangeConfirmModalProps> = ({
  pendingCase,
  currentCase,
  onConfirm,
  onCancel
}) => {
  if (!pendingCase || pendingCase === currentCase) return null;

  const getModeInfo = (c: CaseType) => {
    switch (c) {
      case 'ai':
        return {
          title: '03. AI-POWERED INDUCTION',
          icon: Cpu,
          badgeColor: 'bg-[#C8DFDB] text-[#3368A0] border border-[#66A3BF]',
          summary: 'Dynamic Multi-Objective Pareto Scheduling',
          description: 'This will activate real-time CCTV platform density fusion, automated headway compression, and 42ms dynamic siding turnout dispatch at Muttom Depot.',
          headway: '04:30 MIN',
          utilization: '91.2%',
          response: '< 1 MIN'
        };
      case 'conventional':
        return {
          title: '02. CONVENTIONAL CONTROL',
          icon: Activity,
          badgeColor: 'bg-[#C8DFDB] text-[#3368A0] border border-[#66A3BF]',
          summary: 'Rule-Based Fixed-Interval CBTC Timetable',
          description: 'This will switch the corridor signaling to fixed 06:00-minute headway slots. Adaptive response to unexpected commuter surges will be disabled.',
          headway: '06:00 MIN',
          utilization: '74.0%',
          response: '7.0 MIN'
        };
      case 'manual':
        return {
          title: '01. MANUAL DISPATCH',
          icon: ShieldAlert,
          badgeColor: 'bg-[#F2EFE7] text-[#3368A0] border border-[#C8DFDB]',
          summary: 'Static Paper Timetable & Manual Dispatch',
          description: 'This will disable automated CBTC optimization. Dispatch decisions will require manual phone authorization from OCC Controllers.',
          headway: '08:00 MIN',
          utilization: '63.0%',
          response: '12.0 MIN'
        };
    }
  };

  const targetInfo = getModeInfo(pendingCase);
  const TargetIcon = targetInfo.icon;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-[#3368A0]/60 backdrop-blur-xs animate-in fade-in select-none font-mono-tech">
      <div className="relative w-full max-w-lg bg-[#F2EFE7] rounded-2xl p-5 sm:p-6 border-2 border-[#C8DFDB] shadow-2xl space-y-4">
        {/* Modal Header */}
        <div className="flex items-center justify-between pb-3 border-b border-[#C8DFDB]">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-[#3368A0] text-[#F2EFE7]">
              <AlertTriangle className="w-5 h-5 text-[#F2EFE7]" />
            </div>
            <div>
              <h3 className="font-mono-tech font-bold text-sm sm:text-base text-[#3368A0] uppercase tracking-wide">
                CONFIRM OPERATIONAL MODE SWITCH
              </h3>
              <span className="text-[10px] font-inter text-[#2C2B68] block">
                KMRL OCC Dispatch Precautionary Authorization
              </span>
            </div>
          </div>

          <button
            onClick={onCancel}
            className="p-1.5 rounded-lg bg-[#F2EFE7] hover:bg-[#FFFFFF] text-[#3368A0] border border-[#C8DFDB] transition-colors cursor-pointer"
            aria-label="Cancel mode change"
          >
            <X className="w-4 h-4 text-[#3368A0]" />
          </button>
        </div>

        {/* Precaution Box */}
        <div className="p-3.5 rounded-xl bg-[#FFFFFF] border border-[#C8DFDB] space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-[10px] uppercase font-bold text-[#3368A0]">
              TARGET OPERATIONAL PARADIGM:
            </span>
            <span className={`px-2 py-0.5 rounded text-[9.5px] font-bold ${targetInfo.badgeColor}`}>
              {targetInfo.title}
            </span>
          </div>

          <div className="flex items-start gap-2.5 pt-1">
            <div className="p-2 rounded-lg bg-[#F2EFE7] border border-[#C8DFDB] text-[#3368A0] flex-shrink-0">
              <TargetIcon className="w-4 h-4 text-[#3368A0]" />
            </div>
            <p className="font-inter text-xs text-[#2C2B68] font-medium leading-relaxed">
              {targetInfo.description}
            </p>
          </div>

          {/* Expected Performance Summary */}
          <div className="grid grid-cols-3 gap-2 pt-2 border-t border-[#C8DFDB] text-center text-xs">
            <div className="p-2 rounded-lg bg-[#F2EFE7] border border-[#C8DFDB]">
              <span className="text-[8.5px] text-[#3368A0] font-bold block">TARGET HEADWAY</span>
              <span className="font-bold text-[#3368A0] text-xs">{targetInfo.headway}</span>
            </div>
            <div className="p-2 rounded-lg bg-[#F2EFE7] border border-[#C8DFDB]">
              <span className="text-[8.5px] text-[#3368A0] font-bold block">FLEET UTIL</span>
              <span className="font-bold text-[#3368A0] text-xs">{targetInfo.utilization}</span>
            </div>
            <div className="p-2 rounded-lg bg-[#F2EFE7] border border-[#C8DFDB]">
              <span className="text-[8.5px] text-[#3368A0] font-bold block">DISPATCH LAG</span>
              <span className="font-bold text-[#3368A0] text-xs">{targetInfo.response}</span>
            </div>
          </div>
        </div>

        {/* Authorization Buttons */}
        <div className="flex items-center gap-3 pt-2">
          <button
            onClick={onCancel}
            className="flex-1 py-2.5 px-4 rounded-xl bg-[#F2EFE7] hover:bg-[#FFFFFF] text-[#3368A0] border border-[#C8DFDB] font-mono-tech font-bold text-xs uppercase tracking-wider transition-colors cursor-pointer"
          >
            DENY / CANCEL
          </button>

          <button
            onClick={onConfirm}
            className="flex-1 py-2.5 px-4 rounded-xl bg-[#3368A0] hover:bg-[#66A3BF] hover:text-[#FFFFFF] text-[#F2EFE7] font-mono-tech font-bold text-xs uppercase tracking-wider transition-colors cursor-pointer shadow-md flex items-center justify-center gap-1.5"
          >
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>CONFIRM & SWITCH</span>
          </button>
        </div>
      </div>
    </div>
  );
};
