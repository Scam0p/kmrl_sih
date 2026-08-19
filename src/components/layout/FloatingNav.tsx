import React, { useState, useEffect } from 'react';
import { LayoutDashboard, Radio, Cpu, Layers, BarChart3, Compass } from 'lucide-react';

const NAV_ITEMS = [
  { id: 'hero-section', label: '01 OVERVIEW', icon: Compass },
  { id: 'control-deck', label: '02 CONTROL DECK', icon: LayoutDashboard },
  { id: 'network-section', label: '03 LIVE NETWORK', icon: Radio },
  { id: 'ai-engine-section', label: '04 AI ENGINE', icon: Cpu },
  { id: 'scenarios-section', label: '05 SCENARIOS', icon: Layers },
  { id: 'comparison-section', label: '06 COMPARISON', icon: BarChart3 }
];

export const FloatingNav: React.FC = () => {
  const [activeSection, setActiveSection] = useState<string>('hero-section');

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 200;
      for (const item of NAV_ITEMS) {
        const el = document.getElementById(item.id);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(item.id);
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
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav 
      aria-label="Section Navigation"
      className="fixed right-3 md:right-6 top-1/2 -translate-y-1/2 z-40 hidden xl:flex flex-col gap-2 bg-[#FFFFFF]/95 backdrop-blur-md border-2 border-[#8ACBD0] p-2 rounded-xl shadow-lg"
    >
      <div className="text-[8px] font-mono-tech text-[#170C79] text-center uppercase tracking-widest pb-1 border-b border-[#8ACBD0] font-bold">
        JUMP TO
      </div>
      {NAV_ITEMS.map((item) => {
        const Icon = item.icon;
        const isActive = activeSection === item.id;
        return (
          <button
            key={item.id}
            onClick={() => scrollToSection(item.id)}
            className={`group relative flex items-center justify-end p-2 rounded-lg transition-all duration-200 cursor-pointer ${
              isActive 
                ? 'bg-[#170C79] text-[#56B6C6] shadow-sm' 
                : 'text-[#2C2B68] hover:text-[#170C79] hover:bg-[#8ACBD0]/30 border border-transparent'
            }`}
            title={item.label}
          >
            <Icon className={`w-4 h-4 transition-colors ${isActive ? 'text-[#56B6C6]' : 'text-[#2C2B68] group-hover:text-[#170C79]'}`} />
            
            {/* Tooltip on hover */}
            <span className="absolute right-full mr-3 px-2.5 py-1 rounded bg-[#170C79] border border-[#56B6C6]/40 text-[10px] font-mono-tech text-[#EFE3CA] whitespace-nowrap opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity shadow-lg">
              {item.label}
            </span>
          </button>
        );
      })}
    </nav>
  );
};


