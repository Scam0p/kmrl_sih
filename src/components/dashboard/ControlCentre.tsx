import React from 'react';
import { 
  CaseType, 
  ScenarioType, 
  Train, 
  Station, 
  KPISet, 
  AIRecommendation, 
  AIEventLog 
} from '../../types/simulation';
import { CaseSwitcher } from './CaseSwitcher';
import { KPIRibbon } from './KPIRibbon';
import { RailwayNetwork } from '../railway/RailwayNetwork';
import { TrainDemonstration } from '../railway/TrainDemonstration';
import { AIEnginePanel } from './AIEnginePanel';
import { DecisionFeed } from './DecisionFeed';
import { ScenarioControlCenter } from '../scenarios/ScenarioControlCenter';
import { PerformanceComparison } from '../comparison/PerformanceComparison';
import { TeamSection } from '../team/TeamSection';

interface ControlCentreProps {
  currentCase: CaseType;
  onSelectCase: (c: CaseType) => void;
  activeScenario: ScenarioType;
  onSelectScenario: (s: ScenarioType) => void;
  trains: Train[];
  stations: Station[];
  kpis: KPISet;
  recommendations: AIRecommendation[];
  eventLogs: AIEventLog[];
  simTime: string;
  simSeconds: number;
  isPlaying: boolean;
  onTogglePlay: () => void;
  simSpeed: number;
  onSetSpeed: (speed: number) => void;
  onSelectTrain: (train: Train) => void;
  onSelectStation: (station: Station) => void;
  selectedTrain: Train | null;
  selectedStation: Station | null;
  onRunOptimization: () => void;
  isOptimizing: boolean;
  onDeployRecommendation: (id: string) => void;
  onReset: () => void;
  isCaseTransitioning: boolean;
}

export const ControlCentre: React.FC<ControlCentreProps> = ({
  currentCase,
  onSelectCase,
  activeScenario,
  onSelectScenario,
  trains,
  stations,
  kpis,
  recommendations,
  eventLogs,
  simTime,
  simSeconds,
  isPlaying,
  onTogglePlay,
  simSpeed,
  onSetSpeed,
  onSelectTrain,
  onSelectStation,
  selectedTrain,
  selectedStation,
  onRunOptimization,
  isOptimizing,
  onDeployRecommendation,
  onReset,
  isCaseTransitioning
}) => {
  return (
    <div id="control-deck" className="space-y-14 md:space-y-20 font-mono-tech select-none">
      {/* 1. Operational Paradigm Switcher (3-Way Dispatch Selector) */}
      <section id="paradigm-switcher-section" className="space-y-4">
        <CaseSwitcher
          currentCase={currentCase}
          onSelectCase={onSelectCase}
          isTransitioning={isCaseTransitioning}
        />
      </section>

      {/* 2. Core Executive KPIs Ribbon */}
      <section className="space-y-3">
        <KPIRibbon
          kpis={kpis}
          currentCase={currentCase}
        />
      </section>

      {/* 3. Master Expansive Railway Simulation Deck & Corridor Map */}
      <section id="network-section" className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="w-2 h-2 rounded-full bg-[#56B6C6]"></span>
              <span className="text-[10px] font-mono-tech uppercase tracking-widest text-[#56B6C6] font-bold">
                CORRIDOR SIMULATION
              </span>
            </div>
            <h2 className="font-mono-tech font-bold text-xl sm:text-2xl text-[#170C79] uppercase tracking-wide">
              LIVE NETWORK & HEADWAY SIMULATION
            </h2>
            <p className="font-inter text-xs sm:text-sm text-[#2C2B68] font-medium mt-0.5">
              Aluva to Tripunithura mainline track circuit with real-time stabling at Muttom Maintenance Depot
            </p>
          </div>
        </div>

        <RailwayNetwork
          trains={trains}
          stations={stations}
          currentCase={currentCase}
          onSelectTrain={onSelectTrain}
          onSelectStation={onSelectStation}
          selectedTrain={selectedTrain}
          selectedStation={selectedStation}
          isOptimizing={isOptimizing}
          simTime={simTime}
          simSeconds={simSeconds}
          isPlaying={isPlaying}
          onTogglePlay={onTogglePlay}
          simSpeed={simSpeed}
          onSetSpeed={onSetSpeed}
          onReset={onReset}
          onRunOptimization={onRunOptimization}
        />

        {/* Spacious Rolling Stock Demonstration & Carriage Inspection */}
        <TrainDemonstration
          trains={trains}
          selectedTrain={selectedTrain}
          onSelectTrain={onSelectTrain}
        />
      </section>

      {/* 4. AI Decision Engine & Event Stream */}
      <section id="ai-engine-section" className="space-y-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="w-2 h-2 rounded-full bg-[#56B6C6]"></span>
            <span className="text-[10px] font-mono-tech uppercase tracking-widest text-[#56B6C6] font-bold">
              HEURISTIC ENGINE & EVENT LOG
            </span>
          </div>
          <h2 className="font-mono-tech font-bold text-xl sm:text-2xl text-[#170C79] uppercase tracking-wide">
            AI DECISION ENGINE & TELEMETRY STREAM
          </h2>
          <p className="font-inter text-xs sm:text-sm text-[#2C2B68] font-medium mt-0.5">
            Multi-objective Pareto solver generating real-time induction recommendations and audit trail
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-7">
            <AIEnginePanel
              recommendations={recommendations}
              onDeployRecommendation={onDeployRecommendation}
              onRunOptimization={onRunOptimization}
              isOptimizing={isOptimizing}
              currentCase={currentCase}
            />
          </div>
          <div className="lg:col-span-5">
            <DecisionFeed logs={eventLogs} />
          </div>
        </div>
      </section>

      {/* 5. Contingency Scenarios Simulator */}
      <section id="scenarios-section" className="space-y-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="w-2 h-2 rounded-full bg-[#56B6C6]"></span>
            <span className="text-[10px] font-mono-tech uppercase tracking-widest text-[#56B6C6] font-bold">
              STRESS-TEST SIMULATOR
            </span>
          </div>
          <h2 className="font-mono-tech font-bold text-xl sm:text-2xl text-[#170C79] uppercase tracking-wide">
            OPERATIONAL CONTINGENCY MATRIX
          </h2>
          <p className="font-inter text-xs sm:text-sm text-[#2C2B68] font-medium mt-0.5">
            Inject real-world operational disruptions and verify automated AI mitigation resilience
          </p>
        </div>

        <ScenarioControlCenter
          activeScenario={activeScenario}
          onSelectScenario={onSelectScenario}
        />
      </section>

      {/* 7. Empirical Performance Benchmark & Comparison */}
      <section id="comparison-section" className="space-y-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="w-2 h-2 rounded-full bg-[#56B6C6]"></span>
            <span className="text-[10px] font-mono-tech uppercase tracking-widest text-[#56B6C6] font-bold">
              QUANTITATIVE VALIDATION
            </span>
          </div>
          <h2 className="font-mono-tech font-bold text-xl sm:text-2xl text-[#170C79] uppercase tracking-wide">
            EMPIRICAL PERFORMANCE BENCHMARK
          </h2>
          <p className="font-inter text-xs sm:text-sm text-[#2C2B68] font-medium mt-0.5">
            Comparative analysis across Manual Dispatch, Conventional CBTC, and AI-Powered Induction paradigms
          </p>
        </div>

        <PerformanceComparison currentCase={currentCase} />
      </section>

      {/* 8. Team Section */}
      <TeamSection />
    </div>
  );
};

