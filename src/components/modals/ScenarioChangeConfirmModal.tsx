import React from 'react';
import { AlertTriangle, X, CheckCircle2, Play } from 'lucide-react';
import { ScenarioType } from '../../types/simulation';
import { SCENARIOS } from '../../data/mockData';

interface ScenarioChangeConfirmModalProps {
  pendingScenario: ScenarioType | null;
  activeScenario: ScenarioType;
  onConfirm: () => void;
  onCancel: () => void;
}

export const ScenarioChangeConfirmModal: React.FC<ScenarioChangeConfirmModalProps> = ({
  pendingScenario,
  activeScenario,
  onConfirm,
  onCancel
}) => {
  if (!pendingScenario || pendingScenario === activeScenario) return null;

  const targetScenario = SCENARIOS.find((s) => s.id === pendingScenario);
  if (!targetScenario) return null;

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
                CONFIRM CONTINGENCY INJECTION
              </h3>
              <span className="text-[10px] font-inter text-[#2C2B68] block">
                KMRL OCC Disruption Stress-Test Precaution
              </span>
            </div>
          </div>

          <button
            onClick={onCancel}
            className="p-1.5 rounded-lg bg-[#F2EFE7] hover:bg-[#FFFFFF] text-[#3368A0] border border-[#C8DFDB] transition-colors cursor-pointer"
            aria-label="Cancel scenario change"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Precaution Details Box */}
        <div className="p-3.5 rounded-xl bg-[#FFFFFF] border border-[#C8DFDB] space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-[10px] uppercase font-bold text-[#3368A0]">
              TARGET CONTINGENCY SCENARIO:
            </span>
            <span className="px-2 py-0.5 rounded text-[9.5px] font-bold bg-[#C8DFDB] text-[#3368A0] border border-[#66A3BF]">
              {targetScenario.title}
            </span>
          </div>

          <p className="font-inter text-xs text-[#2C2B68] font-medium leading-relaxed pt-1">
            {targetScenario.description}
          </p>

          <div className="p-2.5 rounded-lg bg-[#F2EFE7] border border-[#C8DFDB] space-y-1 mt-2">
            <span className="text-[#3368A0] font-bold text-[9.5px] block">
              EXPECTED AI ADAPTIVE REACTION:
            </span>
            <span className="font-inter text-xs text-[#2C2B68] font-medium leading-relaxed block">
              {targetScenario.expectedAIAction}
            </span>
          </div>
        </div>

        {/* Action Buttons */}
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
            <span>CONFIRM INJECTION</span>
          </button>
        </div>
      </div>
    </div>
  );
};
