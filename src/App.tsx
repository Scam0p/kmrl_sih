import React, { useState } from 'react';
import { useSimulation } from './hooks/useSimulation';
import { AuthProvider, useAuth } from './context/AuthContext';
import { LoginPage } from './components/auth/LoginPage';
import { AccessRestrictedModal } from './components/auth/AccessRestrictedModal';
import { TopStatusBar } from './components/layout/TopStatusBar';
import { KMRLSlidingNav } from './components/layout/KMRLSlidingNav';
import { FloatingOperationsDock } from './components/layout/FloatingOperationsDock';
import { PortalModal, PortalModalView } from './components/portal/PortalModal';
import { HeroSection } from './components/hero/HeroSection';
import { ControlCentre } from './components/dashboard/ControlCentre';
import { TrainDetailDrawer } from './components/modals/TrainDetailDrawer';
import { StationDetailDrawer } from './components/modals/StationDetailDrawer';
import { AIOptimizationModal } from './components/modals/AIOptimizationModal';
import { AIOperationsAssistant } from './components/assistant/AIOperationsAssistant';
import { CommandFooter } from './components/footer/CommandFooter';
import { CaseType, ScenarioType } from './types/simulation';

const MainDashboard: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [portalModalView, setPortalModalView] = useState<PortalModalView>(null);
  const [isAssistantOpen, setIsAssistantOpen] = useState(false);
  const { checkPermission } = useAuth();

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

  const handleOpenPortalModal = (view: PortalModalView) => {
    if (view === 'ai-assistant') {
      setIsAssistantOpen(true);
      return;
    }
    setPortalModalView(view);
  };

  // Permission-guarded handlers
  const handleGuardedCaseChange = (newCase: CaseType) => {
    if (checkPermission('canChangeParadigm', 'PARADIGM SWITCH', 'Changing system control architecture requires OCC Operator or Manager clearance.')) {
      handleCaseChange(newCase);
    }
  };

  const handleGuardedScenarioChange = (newScenario: ScenarioType) => {
    if (checkPermission('canChangeScenario', 'CONTINGENCY STRESS-TEST', 'Injecting operational disruption matrix requires OCC Operator or Administrator clearance.')) {
      handleScenarioChange(newScenario);
    }
  };

  const handleGuardedRunOptimization = () => {
    if (checkPermission('canTriggerAI', 'AI HEURISTIC SOLVER', 'Triggering global multi-objective Pareto optimization requires OCC Controller clearance.')) {
      runAIOptimization();
    }
  };

  const handleGuardedDeployRecommendation = (id: string) => {
    if (checkPermission('canDispatchTrains', 'ROLLING STOCK INDUCTION', 'Executing live siding turnout and mainline train induction requires Operator clearance.')) {
      handleDeployRecommendation(id);
    }
  };

  const activeTrainsCount = trains.filter(t => t.status === 'IN_SERVICE' || t.status === 'INDUCTING').length;

  return (
    <div className="relative min-h-screen bg-[#F6F1E6] text-[#170C79] overflow-x-hidden pb-16">
      {/* 1. Dark Top Operations Status Header (#170C79 Deep Indigo) with Menu Trigger & Auth Profile */}
      <TopStatusBar
        simTime={simTime}
        currentCase={currentCase}
        activeTrainsCount={activeTrainsCount}
        totalTrainsCount={trains.length}
        trains={trains}
        onSelectTrain={setSelectedTrain}
        onReset={resetSimulation}
        onRunOptimization={handleGuardedRunOptimization}
        isOptimizing={isOptimizing}
        onToggleMenu={() => setIsMenuOpen(prev => !prev)}
      />

      {/* 2. Left Sliding Operations Portal Menu Drawer */}
      <KMRLSlidingNav
        isOpen={isMenuOpen}
        onClose={() => setIsMenuOpen(false)}
        currentCase={currentCase}
        simTime={simTime}
        activeTrainsCount={activeTrainsCount}
        totalTrainsCount={trains.length}
        onOpenPortalModal={handleOpenPortalModal}
      />

      {/* 3. Floating Operations Quick-Access Dock with Floating Clock & Fleet Data */}
      <FloatingOperationsDock
        simTime={simTime}
        activeTrainsCount={activeTrainsCount}
        totalTrainsCount={trains.length}
        onOpenPortalModal={handleOpenPortalModal}
      />

      {/* 4. Main Viewport Container */}
      <div className="flex flex-col min-h-screen">
        {/* Main Content Sections */}
        <main className="flex-1 space-y-12 pb-16">
          {/* Hero Section */}
          <HeroSection
            onExploreClick={handleExploreClick}
            onRunOptimization={handleGuardedRunOptimization}
            currentCase={currentCase}
            onCaseChange={handleGuardedCaseChange}
          />

          {/* Main Control Centre Deck (All Sections + Train Demonstration + Team Roster) */}
          <div className="px-4 md:px-8 max-w-7xl mx-auto">
            <ControlCentre
              currentCase={currentCase}
              onSelectCase={handleGuardedCaseChange}
              activeScenario={activeScenario}
              onSelectScenario={handleGuardedScenarioChange}
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
              onRunOptimization={handleGuardedRunOptimization}
              isOptimizing={isOptimizing}
              onDeployRecommendation={handleGuardedDeployRecommendation}
              onReset={resetSimulation}
              isCaseTransitioning={isCaseTransitioning}
            />
          </div>
        </main>

        {/* Command Footer (Organized & Symmetric) */}
        <CommandFooter />
      </div>

      {/* Slide-out Detailed Train Profile Drawer */}
      <TrainDetailDrawer
        train={selectedTrain}
        onClose={() => setSelectedTrain(null)}
        onRunOptimization={handleGuardedRunOptimization}
        onDeployRecommendation={handleGuardedDeployRecommendation}
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

      {/* Dedicated KMRL AI Operations Assistant */}
      <AIOperationsAssistant
        isOpen={isAssistantOpen}
        onClose={() => setIsAssistantOpen(false)}
        trains={trains}
        stations={stations}
        kpis={kpis}
        recommendations={recommendations}
        eventLogs={eventLogs}
        currentCase={currentCase}
        activeScenario={activeScenario}
        simTime={simTime}
        onNavigateToRecommendation={() => {
          setIsAssistantOpen(false);
          const el = document.getElementById('ai-engine-section');
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }}
      />

      {/* Role-Based Access Restricted Dialog */}
      <AccessRestrictedModal />

      {/* Operations Portal Feature Views Modal */}
      <PortalModal
        view={portalModalView}
        onClose={() => setPortalModalView(null)}
      />
    </div>
  );
};

const AuthWrapper: React.FC = () => {
  const { isAuthenticated } = useAuth();
  if (!isAuthenticated) {
    return <LoginPage />;
  }
  return <MainDashboard />;
};

export const App: React.FC = () => {
  return (
    <AuthProvider>
      <AuthWrapper />
    </AuthProvider>
  );
};

export default App;



