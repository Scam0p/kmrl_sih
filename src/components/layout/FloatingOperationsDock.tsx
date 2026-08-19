import React, { useState, useEffect } from 'react';
import { 
  Compass, 
  Radio, 
  Cpu, 
  AlertTriangle, 
  BarChart2, 
  Clock, 
  Train as TrainIcon 
} from 'lucide-react';
import { PortalModalView } from '../portal/PortalModal';

interface FloatingOperationsDockProps {
  simTime: string;
  activeTrainsCount: number;
  totalTrainsCount: number;
  onOpenPortalModal: (view: PortalModalView) => void;
}

export const FloatingOperationsDock: React.FC<FloatingOperationsDockProps> = ({
  simTime,
  activeTrainsCount,
  totalTrainsCount,
  onOpenPortalModal
}) => {
  const [activeSection, setActiveSection] = useState<string>('dashboard');

  useEffect(() => {
    const handleScroll = () => {
      const scrollPos = window.scrollY + 300;
      const networkEl = document.getElementById('network-section');
      const aiEl = document.getElementById('ai-engine-section');
      const comparisonEl = document.getElementById('comparison-section');

      if (comparisonEl && scrollPos >= comparisonEl.offsetTop) {
        setActiveSection('analytics');
      } else if (aiEl && scrollPos >= aiEl.offsetTop) {
        setActiveSection('ai-operations');
      } else if (networkEl && scrollPos >= networkEl.offsetTop) {
        setActiveSection('network');
      } else {
        setActiveSection('dashboard');
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToElement = (id: string, sectionKey: string) => {
    const el = document.getElementById(id);
    if (el) {
      const topOffset = 70;
      const elementPosition = el.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - topOffset;
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
      setActiveSection(sectionKey);
    }
  };

  return (
    <nav
      aria-label="Operations Quick-Access Floating Dock"
      className="fixed bottom-4 left-1/2 -translate-x-1/2 z-40 max-w-[95vw] sm:max-w-fit bg-[#170C79]/95 backdrop-blur-md border-2 border-[#56B6C6]/50 rounded-2xl p-1.5 shadow-2xl flex items-center gap-1 sm:gap-2 font-mono-tech select-none"
    >
      {/* Floating Live Clock & Fleet Data Segment */}
      <div className="flex items-center gap-2 pl-2 pr-3 py-1 border-r border-[#56B6C6]/40 text-xs">
        <div className="flex items-center gap-1.5 text-[#EFE3CA]">
          <span className="font-bold text-xs tracking-wider text-[#EFE3CA] whitespace-nowrap">
            {simTime}
          </span>
          <span className="text-[9px] text-[#8ACBD0] font-bold">IST</span>
        </div>

        <div className="hidden md:flex items-center gap-1 pl-2 border-l border-[#56B6C6]/30 text-[10px] text-[#56B6C6] font-bold whitespace-nowrap">
          <TrainIcon className="w-3 h-3 text-[#56B6C6]" />
          <span>{activeTrainsCount}/{totalTrainsCount} UNITS</span>
        </div>
      </div>

      {/* Quick-Access Navigation Links (Network, AI Operations, Alerts, Analytics) */}
      <div className="flex items-center gap-1 text-xs">
        {/* 1. Dashboard */}
        <button
          onClick={() => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
            setActiveSection('dashboard');
          }}
          className={`px-3 py-1.5 rounded-xl transition-colors cursor-pointer flex items-center gap-1.5 text-xs font-bold ${
            activeSection === 'dashboard'
              ? 'bg-[#D9A24B] text-[#170C79] shadow-xs'
              : 'text-[#EFE3CA] hover:text-[#D9A24B] hover:bg-[#22158E]'
          }`}
          title="Overview Dashboard"
        >
          <Compass className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">Dashboard</span>
        </button>

        {/* 2. Live Network (Unified single entry for Network, Trains, and Fleet) */}
        <button
          onClick={() => scrollToElement('network-section', 'network')}
          className={`px-3 py-1.5 rounded-xl transition-colors cursor-pointer flex items-center gap-1.5 text-xs font-bold ${
            activeSection === 'network'
              ? 'bg-[#D9A24B] text-[#170C79] shadow-xs'
              : 'text-[#EFE3CA] hover:text-[#D9A24B] hover:bg-[#22158E]'
          }`}
          title="Live Network Corridor & Fleet Simulation"
        >
          <Radio className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">Live Network</span>
        </button>

        {/* 3. AI Operations */}
        <button
          onClick={() => scrollToElement('ai-engine-section', 'ai-operations')}
          className={`px-3 py-1.5 rounded-xl transition-colors cursor-pointer flex items-center gap-1.5 text-xs font-bold ${
            activeSection === 'ai-operations'
              ? 'bg-[#D9A24B] text-[#170C79] shadow-xs'
              : 'text-[#EFE3CA] hover:text-[#D9A24B] hover:bg-[#22158E]'
          }`}
          title="AI Dynamic Induction Engine"
        >
          <Cpu className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">AI Operations</span>
        </button>

        {/* 4. Alerts */}
        <button
          onClick={() => onOpenPortalModal('alerts')}
          className="px-3 py-1.5 rounded-xl text-[#EFE3CA] hover:text-[#D9A24B] hover:bg-[#22158E] transition-colors cursor-pointer flex items-center gap-1.5 text-xs font-bold"
          title="Alerts & Incident Management"
        >
          <AlertTriangle className="w-3.5 h-3.5 text-[#D9A24B]" />
          <span className="hidden sm:inline">Alerts</span>
        </button>

        {/* 5. Analytics */}
        <button
          onClick={() => onOpenPortalModal('analytics')}
          className="px-3 py-1.5 rounded-xl text-[#EFE3CA] hover:text-[#D9A24B] hover:bg-[#22158E] transition-colors cursor-pointer flex items-center gap-1.5 text-xs font-bold"
          title="Performance Analytics & Reports"
        >
          <BarChart2 className="w-3.5 h-3.5 text-[#56B6C6]" />
          <span className="hidden sm:inline">Analytics</span>
        </button>
      </div>
    </nav>
  );
};
