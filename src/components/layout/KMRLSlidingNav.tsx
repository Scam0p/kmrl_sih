import React, { useEffect, useState } from 'react';
import { 
  X, 
  Compass, 
  Layers, 
  Radio, 
  Cpu, 
  Train as TrainIcon, 
  Building2,
  AlertTriangle,
  Wrench,
  Activity, 
  BarChart2, 
  History,
  HelpCircle,
  Bot,
  Bell,
  User,
  LogOut, 
  Clock, 
  ChevronRight, 
  Shield, 
  KeyRound 
} from 'lucide-react';
import { CaseType } from '../../types/simulation';
import { useAuth } from '../../context/AuthContext';
import { UserRole } from '../../types/auth';
import { PortalModalView } from '../portal/PortalModal';

interface KMRLSlidingNavProps {
  isOpen: boolean;
  onClose: () => void;
  currentCase: CaseType;
  simTime: string;
  activeTrainsCount: number;
  totalTrainsCount: number;
  onOpenPortalModal: (view: PortalModalView) => void;
}

interface NavItem {
  id: string;
  label: string;
  subtitle: string;
  icon: React.ElementType;
  isModal?: boolean;
  modalView?: PortalModalView;
  targetSectionId?: string;
}

interface NavCategory {
  category: string;
  items: NavItem[];
}

const NAVIGATION_GROUPS: NavCategory[] = [
  {
    category: 'MAIN',
    items: [
      { id: 'dashboard', label: 'Dashboard', subtitle: 'Executive Control Centre Overview', icon: Compass, targetSectionId: 'hero-section' },
      { id: 'network', label: 'Live Network', subtitle: 'Track Circuit & Interlock Map', icon: Radio, targetSectionId: 'network-section' },
      { id: 'trains', label: 'Trains', subtitle: '3-Car Rolling Stock Telemetry', icon: TrainIcon, targetSectionId: 'network-section' },
      { id: 'stations', label: 'Stations', subtitle: 'Platform Headway & CCTV Hub', icon: Building2, targetSectionId: 'network-section' },
      { id: 'fleet', label: 'Fleet', subtitle: 'Alstom Metropolis Active Units', icon: Layers, targetSectionId: 'network-section' }
    ]
  },
  {
    category: 'OPERATIONS',
    items: [
      { id: 'ai-operations', label: 'AI Operations', subtitle: 'Pareto Solver & Dynamic Dispatch', icon: Cpu, targetSectionId: 'ai-engine-section' },
      { id: 'alerts', label: 'Alerts & Incidents', subtitle: 'Live Faults & Surge Indicators', icon: AlertTriangle, isModal: true, modalView: 'alerts' },
      { id: 'maintenance', label: 'Maintenance', subtitle: 'Muttom Depot Servicing Bay', icon: Wrench, isModal: true, modalView: 'maintenance' },
      { id: 'scenarios', label: 'Scenarios', subtitle: 'Stress-Test & Disruption Matrix', icon: Activity, targetSectionId: 'scenarios-section' }
    ]
  },
  {
    category: 'INTELLIGENCE',
    items: [
      { id: 'analytics', label: 'Analytics & Reports', subtitle: 'Energy, Wait Times & Punctuality', icon: BarChart2, isModal: true, modalView: 'analytics' },
      { id: 'decision-history', label: 'Decision History', subtitle: 'Audit Ledger of Inductions', icon: History, isModal: true, modalView: 'decision-history' },
      { id: 'faqs', label: 'FAQ / SOPs', subtitle: 'Operating Procedures & Rules', icon: HelpCircle, isModal: true, modalView: 'faqs' },
      { id: 'ai-assistant', label: 'AI Assistant', subtitle: 'OCC Copilot Natural Language Link', icon: Bot, isModal: true, modalView: 'ai-assistant' }
    ]
  },
  {
    category: 'ACCOUNT',
    items: [
      { id: 'notifications', label: 'Notifications', subtitle: 'Shift Broadcasts & Alarms', icon: Bell, isModal: true, modalView: 'notifications' },
      { id: 'profile', label: 'My Profile', subtitle: 'Officer ID & Security Clearances', icon: User, isModal: true, modalView: 'profile' }
    ]
  }
];

export const KMRLSlidingNav: React.FC<KMRLSlidingNavProps> = ({
  isOpen,
  onClose,
  currentCase,
  simTime,
  activeTrainsCount,
  totalTrainsCount,
  onOpenPortalModal
}) => {
  const { user, logout, loginWithRole } = useAuth();
  const [activeItem, setActiveItem] = useState<string>('dashboard');

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 200;
      const heroEl = document.getElementById('hero-section');
      const networkEl = document.getElementById('network-section');
      const aiEl = document.getElementById('ai-engine-section');
      const scenariosEl = document.getElementById('scenarios-section');
      const comparisonEl = document.getElementById('comparison-section');

      if (comparisonEl && scrollPosition >= comparisonEl.offsetTop) {
        setActiveItem('analytics');
      } else if (scenariosEl && scrollPosition >= scenariosEl.offsetTop) {
        setActiveItem('scenarios');
      } else if (aiEl && scrollPosition >= aiEl.offsetTop) {
        setActiveItem('ai-operations');
      } else if (networkEl && scrollPosition >= networkEl.offsetTop) {
        setActiveItem('network');
      } else if (heroEl) {
        setActiveItem('dashboard');
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (item: NavItem) => {
    if (item.isModal && item.modalView) {
      onOpenPortalModal(item.modalView);
      onClose();
      return;
    }

    if (item.targetSectionId) {
      const element = document.getElementById(item.targetSectionId);
      if (element) {
        const topOffset = 70;
        const elementPosition = element.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - topOffset;
        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
      setActiveItem(item.id);
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

      {/* Sliding Operations Portal Window on Left */}
      <aside
        className={`fixed left-0 top-0 bottom-0 z-50 w-76 sm:w-88 bg-[#170C79] border-r-2 border-[#56B6C6] text-[#EFE3CA] font-mono-tech shadow-2xl flex flex-col justify-between select-none transform transition-transform duration-300 ease-in-out overflow-hidden ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
        aria-label="KMRL Operations Navigation Drawer"
      >
        {/* Top Header with Portal Identity */}
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
                  EMPLOYEE PORTAL
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

          {/* Officer Details & Role Badge */}
          {user && (
            <div className="p-3 bg-[#120963]/80 border-b border-[#56B6C6]/20 flex items-center justify-between text-xs">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-[#56B6C6] text-[#170C79] font-bold text-xs flex items-center justify-center shadow-xs">
                  {user.avatarInitials}
                </div>
                <div>
                  <div className="font-bold text-[#EFE3CA] text-xs leading-tight">
                    {user.name}
                  </div>
                  <div className="text-[9.5px] text-[#56B6C6] font-medium">
                    {user.roleTitle}
                  </div>
                </div>
              </div>

              <span className="px-2 py-0.5 rounded text-[8.5px] font-bold bg-[#D9A24B]/20 text-[#D9A24B] border border-[#D9A24B]/40">
                {user.role}
              </span>
            </div>
          )}

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

        {/* Section Categorized Links List */}
        <div className="flex-1 overflow-y-auto p-3 space-y-4 scrollbar-thin">
          {NAVIGATION_GROUPS.map((group) => (
            <div key={group.category} className="space-y-1">
              <span className="text-[9.5px] uppercase tracking-widest text-[#D9A24B] px-3 font-bold block mb-1">
                {group.category}
              </span>

              {group.items.map((item) => {
                const Icon = item.icon;
                const isActive = activeItem === item.id;

                return (
                  <button
                    key={item.id}
                    onClick={() => handleNavClick(item)}
                    className={`w-full text-left p-2 rounded-xl transition-all duration-200 cursor-pointer flex items-center justify-between group ${
                      isActive
                        ? 'bg-[#D9A24B] text-[#170C79] font-bold shadow-md'
                        : 'bg-[#120963]/50 hover:bg-[#120963] text-[#EFE3CA] border border-[#56B6C6]/15 hover:border-[#D9A24B]/50'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <div className={`p-1.5 rounded-lg border ${
                        isActive
                          ? 'bg-[#170C79] text-[#D9A24B] border-[#170C79]'
                          : 'bg-[#170C79] text-[#8ACBD0] border-[#56B6C6]/30 group-hover:text-[#D9A24B]'
                      }`}>
                        <Icon className="w-3.5 h-3.5" />
                      </div>
                      <div>
                        <div className="text-xs font-mono-tech tracking-wide uppercase">
                          {item.label}
                        </div>
                        <span className={`text-[10px] font-inter block ${
                          isActive ? 'text-[#170C79]/80 font-medium' : 'text-[#EFE3CA]/70'
                        }`}>
                          {item.subtitle}
                        </span>
                      </div>
                    </div>

                    <ChevronRight className={`w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-0.5 ${
                      isActive ? 'text-[#170C79]' : 'text-[#56B6C6]/60 group-hover:text-[#D9A24B]'
                    }`} />
                  </button>
                );
              })}
            </div>
          ))}
        </div>

        {/* Footer info & Logout */}
        <div className="p-3 border-t border-[#56B6C6]/30 bg-[#120963] space-y-2">
          {/* Quick Role Switcher */}
          <div className="p-2 rounded-lg bg-[#170C79] border border-[#56B6C6]/30 space-y-1.5">
            <div className="flex items-center justify-between text-[9px] text-[#8ACBD0] font-bold uppercase">
              <span>DEMO ROLE SWITCH</span>
              <KeyRound className="w-3 h-3 text-[#56B6C6]" />
            </div>
            <div className="grid grid-cols-2 gap-1 text-[9.5px]">
              {(['OPERATOR', 'OPERATIONS_MANAGER', 'MAINTENANCE', 'STATION_CONTROLLER', 'ADMINISTRATOR'] as UserRole[]).map((r) => (
                <button
                  key={r}
                  onClick={() => loginWithRole(r)}
                  className={`px-1.5 py-1 rounded text-center truncate transition-colors cursor-pointer ${
                    user?.role === r 
                      ? 'bg-[#D9A24B] text-[#170C79] font-bold' 
                      : 'bg-[#120963] text-[#EFE3CA] hover:bg-[#22158E]'
                  }`}
                >
                  {r.replace('_', ' ')}
                </button>
              ))}
            </div>
          </div>

          <div className="flex items-center justify-between text-[9px] text-[#EFE3CA]/60 px-1 pt-1">
            <span className="flex items-center gap-1">
              <Shield className="w-3 h-3 text-[#56B6C6]" /> OCC PORTAL 2026
            </span>
            <button
              onClick={() => {
                logout();
                onClose();
              }}
              className="text-[#C53030] hover:underline cursor-pointer flex items-center gap-1 font-bold"
            >
              <LogOut className="w-3 h-3" />
              <span>LOGOUT</span>
            </button>
          </div>
        </div>
      </aside>
    </>
  );
};
