import React, { useEffect, useState } from 'react';
import { 
  X, 
  Compass, 
  Layers, 
  Radio, 
  Cpu, 
  Train as TrainIcon, 
  Activity, 
  BarChart3, 
  Users,
  Clock,
  ChevronRight,
  Shield
} from 'lucide-react';
import { CaseType } from '../../types/simulation';

interface KMRLSlidingNavProps {
  isOpen: boolean;
  onClose: () => void;
  currentCase: CaseType;
  simTime: string;
  activeTrainsCount: number;
  totalTrainsCount: number;
}

interface NavSection {
  id: string;
  label: string;
  subtitle: string;
  icon: React.ElementType;
  index: string;
}

const SECTIONS: NavSection[] = [
  { id: 'hero-section', index: '01', label: 'SYSTEM OVERVIEW', subtitle: 'Architecture & Core Thesis', icon: Compass },
  { id: 'control-deck', index: '02', label: 'PARADIGM SELECTOR', subtitle: 'Manual / CBTC / AI Modes', icon: Layers },
  { id: 'network-section', index: '03', label: 'CORRIDOR SIMULATION', subtitle: 'Live Network & Train Demo', icon: Radio },
  { id: 'ai-engine-section', index: '04', label: 'AI DECISION ENGINE', subtitle: 'Pareto Solver & Event Stream', icon: Cpu },
  { id: 'fleet-section', index: '05', label: 'FLEET ROSTER', subtitle: 'Rolling Stock Readiness', icon: TrainIcon },
  { id: 'scenarios-section', index: '06', label: 'SCENARIO SIMULATOR', subtitle: 'Contingency Stress Tests', icon: Activity },
  { id: 'comparison-section', index: '07', label: 'BENCHMARK MATRIX', subtitle: 'Empirical Metrics Table', icon: BarChart3 },
  { id: 'team-section', index: '08', label: 'PROJECT TEAM', subtitle: 'SIH 2026 Innovators', icon: Users }
];

export const KMRLSlidingNav: React.FC<KMRLSlidingNavProps> = ({
  isOpen,
  onClose,
  currentCase,
  simTime,
  activeTrainsCount,
  totalTrainsCount
}) => {
  const [activeSection, setActiveSection] = useState<string>('hero-section');

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 200;
      for (const section of SECTIONS) {
        const el = document.getElementById(section.id);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(section.id);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const topOffset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - topOffset;
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
      onClose();
    }
  };

  return (
    <>
      {/* Backdrop Blur Overlay with Smooth Fade */}
      <div
        onClick={onClose}
        className={`fixed inset-0 z-50 bg-[#170C79]/60 backdrop-blur-sm transition-opacity duration-300 ease-in-out ${
          isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        aria-hidden="true"
      />

      {/* Sliding Window on Left with Smooth Slide Animation */}
      <aside
        className={`fixed left-0 top-0 bottom-0 z-50 w-72 sm:w-84 bg-[#170C79] border-r-2 border-[#56B6C6] text-[#EFE3CA] font-mono-tech shadow-2xl flex flex-col justify-between select-none transform transition-transform duration-300 ease-in-out overflow-hidden ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
        aria-label="KMRL Operations Navigation Drawer"
      >
        {/* Top Header with Window Rivets */}
        <div>
          <div className="p-4 border-b border-[#56B6C6]/30 bg-[#120963] flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg overflow-hidden border border-[#56B6C6]/50 bg-[#170C79] flex-shrink-0 shadow-xs">
                <img
                  src="/logo.png"
                  alt="KMRL Logo"
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <h3 className="font-mono-tech font-bold text-sm text-[#EFE3CA] uppercase tracking-wide">
                  KMRL OPERATIONS
                </h3>
                <span className="text-[9.5px] text-[#56B6C6] font-mono-tech font-bold uppercase tracking-widest block">
                  CONTROL PANEL MENU
                </span>
              </div>
            </div>

            {/* Close Button */}
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg bg-[#170C79] hover:bg-[#56B6C6] border border-[#56B6C6]/40 text-[#EFE3CA] hover:text-[#170C79] transition-colors cursor-pointer shadow-xs"
              title="Close navigation panel"
              aria-label="Close navigation panel"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Quick Telemetry Banner */}
          <div className="px-4 py-2 bg-[#170C79] border-b border-[#56B6C6]/20 flex items-center justify-between text-[10px]">
            <div className="flex items-center gap-1.5 text-[#EFE3CA]">
              <Clock className="w-3 h-3 text-[#56B6C6]" />
              <span className="font-bold">{simTime} IST</span>
            </div>
            <div className="flex items-center gap-1.5 text-[#56B6C6] font-bold">
              <span className="w-1.5 h-1.5 rounded-full bg-[#56B6C6] animate-pulse"></span>
              <span>{activeTrainsCount}/{totalTrainsCount} UNITS ACTIVE</span>
            </div>
          </div>
        </div>

        {/* Section Links List */}
        <div className="flex-1 overflow-y-auto p-3 space-y-1.5 scrollbar-thin">
          <span className="text-[9px] uppercase tracking-widest text-[#8ACBD0] px-3 font-bold block mb-1">
            DASHBOARD SECTIONS
          </span>

          {SECTIONS.map((section) => {
            const Icon = section.icon;
            const isActive = activeSection === section.id;

            return (
              <button
                key={section.id}
                onClick={() => scrollToSection(section.id)}
                className={`w-full text-left p-2.5 rounded-xl transition-all duration-200 cursor-pointer flex items-center justify-between group ${
                  isActive
                    ? 'bg-[#56B6C6] text-[#170C79] font-bold shadow-md'
                    : 'bg-[#120963]/60 hover:bg-[#120963] text-[#EFE3CA] border border-[#56B6C6]/20 hover:border-[#56B6C6]/60'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className={`p-1.5 rounded-lg border ${
                    isActive
                      ? 'bg-[#170C79] text-[#56B6C6] border-[#170C79]'
                      : 'bg-[#170C79] text-[#8ACBD0] border-[#56B6C6]/30 group-hover:text-[#56B6C6]'
                  }`}>
                    <Icon className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="flex items-center gap-1.5 text-xs font-mono-tech">
                      <span className={isActive ? 'text-[#170C79]' : 'text-[#56B6C6]'}>
                        {section.index}.
                      </span>
                      <span className="tracking-wide uppercase">
                        {section.label}
                      </span>
                    </div>
                    <span className={`text-[10px] font-inter block ${
                      isActive ? 'text-[#170C79]/80 font-medium' : 'text-[#EFE3CA]/70'
                    }`}>
                      {section.subtitle}
                    </span>
                  </div>
                </div>

                <ChevronRight className={`w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-0.5 ${
                  isActive ? 'text-[#170C79]' : 'text-[#56B6C6]/60'
                }`} />
              </button>
            );
          })}
        </div>

        {/* Footer info in the sliding drawer */}
        <div className="p-3 border-t border-[#56B6C6]/30 bg-[#120963] space-y-2">
          <div className="p-2 rounded-lg bg-[#170C79] border border-[#56B6C6]/30 flex items-center justify-between text-[10px]">
            <span className="text-[#8ACBD0]">PARADIGM:</span>
            <span className="text-[#56B6C6] font-bold uppercase">
              {currentCase === 'ai' ? '03. AI Dynamic' : currentCase === 'conventional' ? '02. CBTC' : '01. Manual'}
            </span>
          </div>

          <div className="flex items-center justify-between text-[9px] text-[#EFE3CA]/60 px-1">
            <span className="flex items-center gap-1">
              <Shield className="w-3 h-3 text-[#56B6C6]" /> SIH 2026
            </span>
            <span>POWERHOUSE AI</span>
          </div>
        </div>
      </aside>
    </>
  );
};
