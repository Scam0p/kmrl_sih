import React, { useState } from 'react';
import { useSimulation } from './hooks/useSimulation';
import { TopStatusBar } from './components/layout/TopStatusBar';
import { KMRLSlidingNav } from './components/layout/KMRLSlidingNav';
import { HeroSection } from './components/hero/HeroSection';
import { ControlCentre } from './components/dashboard/ControlCentre';
import { TrainDetailDrawer } from './components/modals/TrainDetailDrawer';
import { StationDetailDrawer } from './components/modals/StationDetailDrawer';
import { AIOptimizationModal } from './components/modals/AIOptimizationModal';
import { CommandFooter } from './components/footer/CommandFooter';

export const App: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const {
    currentCase,
    handleCaseChange,
    activeScenario,
    handleScenarioChange,
    trains,
    stations,
    kpis,
    recommendations,
    eventLogs,
    simTime,
    simSeconds,
    isPlaying,
    setIsPlaying,
    simSpeed,
    setSimSpeed,
    selectedTrain,
    setSelectedTrain,
    selectedStation,
    setSelectedStation,
    isOptimizing,
    optimizationStep,
    runAIOptimization,
    handleDeployRecommendation,
    resetSimulation,
    isCaseTransitioning
  } = useSimulation();

  const handleExploreClick = () => {
    const el = document.getElementById('control-deck');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const activeTrainsCount = trains.filter(t => t.status === 'IN_SERVICE' || t.status === 'INDUCTING').length;

  return (
    <div className="relative min-h-screen bg-[#F6F1E6] text-[#170C79] overflow-x-hidden">
      {/* 1. Dark Top Operations Status Header (#170C79 Deep Indigo) with Menu Trigger */}
      <TopStatusBar
        simTime={simTime}
        currentCase={currentCase}
        activeTrainsCount={activeTrainsCount}
        totalTrainsCount={trains.length}
        onReset={resetSimulation}
        onRunOptimization={runAIOptimization}
        isOptimizing={isOptimizing}
        onToggleMenu={() => setIsMenuOpen(prev => !prev)}
      />

      {/* 2. Left Sliding Operations Menu Drawer with Smooth Animation */}
      <KMRLSlidingNav
        isOpen={isMenuOpen}
        onClose={() => setIsMenuOpen(false)}
        currentCase={currentCase}
        simTime={simTime}
        activeTrainsCount={activeTrainsCount}
        totalTrainsCount={trains.length}
      />

      {/* 3. Main Viewport Container */}
      <div className="flex flex-col min-h-screen">
        {/* Main Content Sections */}
        <main className="flex-1 space-y-12 pb-16">
          {/* Hero Section */}
          <HeroSection
            onExploreClick={handleExploreClick}
            onRunOptimization={runAIOptimization}
            currentCase={currentCase}
            onCaseChange={handleCaseChange}
          />

          {/* Main Control Centre Deck (All Sections + Train Demonstration + Team Roster) */}
          <div className="px-4 md:px-8 max-w-7xl mx-auto">
            <ControlCentre
              currentCase={currentCase}
              onSelectCase={handleCaseChange}
              activeScenario={activeScenario}
              onSelectScenario={handleScenarioChange}
              trains={trains}
              stations={stations}
              kpis={kpis}
              recommendations={recommendations}
              eventLogs={eventLogs}
              simTime={simTime}
              simSeconds={simSeconds}
              isPlaying={isPlaying}
              onTogglePlay={() => setIsPlaying(prev => !prev)}
              simSpeed={simSpeed}
              onSetSpeed={setSimSpeed}
              onSelectTrain={setSelectedTrain}
              onSelectStation={setSelectedStation}
              selectedTrain={selectedTrain}
              selectedStation={selectedStation}
              onRunOptimization={runAIOptimization}
              isOptimizing={isOptimizing}
              onDeployRecommendation={handleDeployRecommendation}
              onReset={resetSimulation}
              isCaseTransitioning={isCaseTransitioning}
            />
          </div>
        </main>

        {/* Command Footer (Organized & Symmetric) */}
        <CommandFooter />
      </div>

      {/* Slide-out Telemetry Drawers */}
      <TrainDetailDrawer
        train={selectedTrain}
        onClose={() => setSelectedTrain(null)}
      />

      <StationDetailDrawer
        station={selectedStation}
        trains={trains}
        onClose={() => setSelectedStation(null)}
      />

      {/* Cinematic AI Optimization Scan Overlay */}
      <AIOptimizationModal
        isOpen={isOptimizing}
        step={optimizationStep}
      />
    </div>
  );
};

export default App;


