import React, { useState, useEffect } from 'react';
import { 
  Compass, 
  Layers, 
  Radio, 
  Cpu, 
  Train as TrainIcon, 
  Activity, 
  BarChart3, 
  Users 
} from 'lucide-react';

interface NavSection {
  id: string;
  label: string;
  icon: React.ElementType;
  index: string;
}

const SECTIONS: NavSection[] = [
  { id: 'hero-section', index: '01', label: 'OVERVIEW', icon: Compass },
  { id: 'control-deck', index: '02', label: 'PARADIGMS', icon: Layers },
  { id: 'network-section', index: '03', label: 'SIMULATION', icon: Radio },
  { id: 'ai-engine-section', index: '04', label: 'AI ENGINE', icon: Cpu },
  { id: 'fleet-section', index: '05', label: 'FLEET', icon: TrainIcon },
  { id: 'scenarios-section', index: '06', label: 'SCENARIOS', icon: Activity },
  { id: 'comparison-section', index: '07', label: 'BENCHMARK', icon: BarChart3 },
  { id: 'team-section', index: '08', label: 'TEAM', icon: Users }
];

export const KMRLOperationsNav: React.FC = () => {
  const [activeSection, setActiveSection] = useState<string>('hero-section');

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 180;
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
      const topOffset = 110;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - topOffset;
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div className="sticky top-0 z-30 bg-[#FFFFFF]/95 backdrop-blur-md border-b-2 border-[#8ACBD0] px-4 md:px-8 py-2 shadow-xs select-none">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
        {/* Menu Title / Console Label */}
        <div className="flex items-center gap-2 flex-shrink-0">
          <span className="w-2 h-2 rounded-full bg-[#56B6C6] animate-pulse"></span>
          <div className="flex flex-col">
            <span className="font-mono-tech font-bold text-xs text-[#170C79] tracking-wider leading-none">
              KMRL OPERATIONS
            </span>
            <span className="text-[9px] font-mono-tech text-[#2C2B68] tracking-widest uppercase">
              CONTROL PANEL
            </span>
          </div>
        </div>

        {/* Horizontal Section Jump Action Menu */}
        <nav 
          aria-label="KMRL Operations Navigation"
          className="flex items-center gap-1.5 overflow-x-auto py-0.5 scrollbar-none font-mono-tech text-xs"
        >
          {SECTIONS.map((section) => {
            const Icon = section.icon;
            const isActive = activeSection === section.id;

            return (
              <button
                key={section.id}
                onClick={() => scrollToSection(section.id)}
                className={`group px-3 py-1.5 rounded-lg transition-all duration-150 cursor-pointer flex items-center gap-1.5 whitespace-nowrap flex-shrink-0 text-xs font-bold ${
                  isActive
                    ? 'bg-[#170C79] text-[#EFE3CA] shadow-xs'
                    : 'bg-[#F6F1E6] text-[#170C79] hover:bg-[#8ACBD0]/30 border border-[#8ACBD0]/40'
                }`}
                title={`Jump to ${section.label}`}
              >
                <Icon className={`w-3.5 h-3.5 transition-colors ${isActive ? 'text-[#56B6C6]' : 'text-[#2C2B68] group-hover:text-[#170C79]'}`} />
                <span className={isActive ? 'text-[#56B6C6]' : 'text-[#2C2B68]'}>
                  {section.index}.
                </span>
                <span>{section.label}</span>
                {isActive && (
                  <span className="w-1.5 h-1.5 rounded-full bg-[#56B6C6] ml-0.5"></span>
                )}
              </button>
            );
          })}
        </nav>
      </div>
    </div>
  );
};
