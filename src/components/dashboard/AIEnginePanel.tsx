import React from 'react';
import { AIRecommendation } from '../../types/simulation';
import { Cpu, Sparkles, Check, ArrowRight, Layers } from 'lucide-react';

interface AIEnginePanelProps {
  recommendations: AIRecommendation[];
  onDeployRecommendation: (id: string) => void;
  onRunOptimization: () => void;
  isOptimizing: boolean;
  currentCase?: string;
}

export const AIEnginePanel: React.FC<AIEnginePanelProps> = ({
  recommendations,
  onDeployRecommendation,
  onRunOptimization,
  isOptimizing
}) => {
  const models = [
    { name: 'PASSENGER DEMAND PREDICTOR', confidence: 94, color: '#56B6C6' },
    { name: 'FLEET READINESS MATRIX', confidence: 98, color: '#170C79' },
    { name: 'MAINTENANCE & SAFETY CONSTRAINTS', confidence: 100, color: '#170C79' },
    { name: 'HEADWAY & TURNOUT SOLVER', confidence: 96, color: '#56B6C6' }
  ];

  return (
    <div className="w-full rounded-2xl bg-[#8ACBD0] border-2 border-[#56B6C6]/50 p-2 shadow-sm flex flex-col justify-between h-full space-y-2">
      {/* Top Bezel with Micro-Rivets & Panel Title */}
      <div className="flex items-center justify-between px-3 pt-2 pb-1">
        <div className="flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-[#170C79]/40"></span>
          <span className="w-1.5 h-1.5 rounded-full bg-[#170C79]/40"></span>
        </div>

        <div className="flex items-center gap-2">
          <Cpu className="w-4 h-4 text-[#56B6C6]" />
          <h3 className="font-mono-tech font-bold text-sm md:text-base text-[#170C79] uppercase tracking-wide">
            AI DECISION ENGINE
          </h3>
        </div>

        <div className="flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-[#170C79]/40"></span>
          <span className="w-1.5 h-1.5 rounded-full bg-[#170C79]/40"></span>
        </div>
      </div>

      {/* Inner Inset Viewport Pane */}
      <div className="bg-[#EFE3CA] rounded-xl p-4 md:p-5 border border-[#8ACBD0] flex flex-col justify-between flex-1 space-y-4 shadow-inner">
        <div>
          {/* Sub-header status */}
          <div className="flex items-center justify-between pb-3 mb-3 border-b border-[#8ACBD0]">
            <span className="text-[10px] font-mono-tech text-[#2C2B68] font-bold">
              KMRL-NEURAL-INDUCTION-SCHEDULER v2.6
            </span>
            <div className="flex items-center gap-1.5 px-2 py-0.5 rounded bg-[#FFFFFF] border border-[#8ACBD0] text-[9.5px] font-mono-tech shadow-xs">
              <span className="w-2 h-2 rounded-full bg-[#56B6C6] animate-pulse"></span>
              <span className="text-[#170C79] font-bold">MODEL ONLINE</span>
            </div>
          </div>

          {/* Neural Sub-Model Confidence Gauges */}
          <div className="space-y-2 mb-3 bg-[#FFFFFF] p-3 rounded-lg border border-[#8ACBD0] font-mono-tech shadow-xs">
            <span className="text-[9px] uppercase tracking-wider text-[#2C2B68] font-bold block mb-1">
              NEURAL SUB-MODEL CONFIDENCE
            </span>
            {models.map((m, idx) => (
              <div key={idx} className="space-y-1">
                <div className="flex justify-between text-[10px] text-[#170C79]">
                  <span className="font-bold">{m.name}</span>
                  <span className="font-bold text-[#170C79]">{m.confidence}%</span>
                </div>
                <div className="w-full h-1.5 bg-[#EFE3CA] rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all duration-300"
                    style={{
                      width: `${m.confidence}%`,
                      backgroundColor: m.color
                    }}
                  ></div>
                </div>
              </div>
            ))}
          </div>

          {/* Pareto Objective Formulation */}
          <div className="p-3 rounded-lg bg-[#FFFFFF] border border-[#8ACBD0] mb-3 font-mono-tech space-y-1 shadow-xs">
            <div className="flex items-center gap-1.5 text-[#170C79] font-bold text-[10px]">
              <Layers className="w-3.5 h-3.5 text-[#56B6C6]" />
              <span>PARETO OBJECTIVE FORMULATION</span>
            </div>
            <div className="text-[10.5px] text-[#2C2B68] leading-relaxed pt-1">
              <span className="text-[#170C79] font-bold">MINIMIZE: </span>
              <span className="font-medium">0.45·WaitTime + 0.35·Congestion + 0.20·IdleFleet</span>
              <br />
              <span className="text-[#56B6C6] font-bold">CONSTRAINTS: </span>
              <span className="font-medium">Depot Turnout ≤ 2 trains/5m, Safe Headway ≥ 180s</span>
            </div>
          </div>

          {/* Recommendations */}
          <div>
            <span className="text-[10px] font-mono-tech uppercase tracking-wider text-[#170C79] font-bold block mb-2">
              REAL-TIME INDUCTION RECOMMENDATIONS
            </span>

            <div className="space-y-2.5 max-h-[220px] overflow-y-auto pr-1">
              {recommendations.slice(0, 3).map((rec) => {
                const isDeployed = rec.status === 'DEPLOYED';

                return (
                  <div
                    key={rec.id}
                    className={`p-3 rounded-lg border transition-all font-mono-tech ${
                      isDeployed
                        ? 'bg-[#EFE3CA] border-[#8ACBD0] opacity-65'
                        : 'bg-[#FFFFFF] border border-[#8ACBD0] hover:border-[#56B6C6] shadow-xs'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <div className="flex items-center gap-2">
                        <span className="px-2 py-0.5 rounded bg-[#170C79] text-[#EFE3CA] font-bold text-[9px]">
                          {rec.trainId}
                        </span>
                        <span className="font-bold text-[#170C79] tracking-wide text-xs">
                          {rec.title}
                        </span>
                      </div>
                      <span className="text-[9px] text-[#2C2B68] font-bold">
                        {rec.confidenceScore}% CONF
                      </span>
                    </div>

                    <p className="font-inter text-xs text-[#2C2B68] font-medium my-1 leading-normal">
                      {rec.rationale}
                    </p>

                    <div className="flex items-center justify-between mt-2 pt-2 border-t border-[#8ACBD0]/40">
                      <span className="text-[10px] text-[#170C79] font-bold">
                        IMPACT: {rec.expectedWaitReduction}
                      </span>

                      {isDeployed ? (
                        <span className="inline-flex items-center gap-1 text-[#2C2B68] font-bold text-[10px]">
                          <Check className="w-3 h-3 text-[#56B6C6]" /> DEPLOYED
                        </span>
                      ) : (
                        <button
                          onClick={() => onDeployRecommendation(rec.id)}
                          className="px-3 py-1 rounded bg-[#56B6C6] hover:bg-[#48A1B0] text-[#170C79] text-[10px] font-bold uppercase transition-colors cursor-pointer flex items-center gap-1 shadow-xs active:scale-95"
                        >
                          <span>EXECUTE</span>
                          <ArrowRight className="w-3 h-3" />
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Trigger Button */}
        <div className="pt-2 border-t border-[#8ACBD0]/40">
          <button
            onClick={onRunOptimization}
            disabled={isOptimizing}
            className="w-full py-3 px-4 rounded-xl bg-[#170C79] hover:bg-[#56B6C6] hover:text-[#170C79] text-[#EFE3CA] font-mono-tech font-bold text-xs tracking-wider uppercase transition-colors cursor-pointer flex items-center justify-center gap-2 shadow-md disabled:opacity-50"
          >
            <Sparkles className={`w-4 h-4 ${isOptimizing ? 'animate-spin' : ''}`} />
            <span>{isOptimizing ? 'SOLVING OPTIMAL INDUCTION...' : 'RUN AI OPTIMIZATION SOLVER'}</span>
          </button>
        </div>
      </div>
    </div>
  );
};



