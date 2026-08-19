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
  BookOpen,
  Bot,
  Bell,
  User,
  LogOut, 
  Clock, 
  ChevronRight
} from 'lucide-react';
import { CaseType } from '../../types/simulation';
import { useAuth } from '../../context/AuthContext';
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
      { id: 'faqs', label: 'Standard Operating Procedures', subtitle: 'OCC Protocols, Turnouts & Safety SOPs', icon: BookOpen, isModal: true, modalView: 'faqs' },
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
  simTime,
  activeTrainsCount,
  totalTrainsCount,
  onOpenPortalModal
}) => {
  const { user, logout } = useAuth();
  const [activeItem, setActiveItem] = useState<string>('dashboard');
  const [liveClock, setLiveClock] = useState<string>('');

  // Live real clock
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setLiveClock(now.toLocaleTimeString('en-GB', { hour12: false }));
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  // Handle escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  // Lock body scroll when drawer is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

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
        className={`fixed inset-0 z-50 bg-[#170C79]/60 backdrop-blur-xs transition-opacity duration-300 ease-in-out ${
          isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        aria-hidden="true"
      />

      {/* Sliding Operations Portal Window (#3368A0 Background, #C8DFDB Cards/Borders, #F2EFE7 Text) */}
      <aside
        className={`fixed left-0 top-0 bottom-0 z-50 w-76 sm:w-88 bg-[#3368A0] border-r-2 border-[#C8DFDB] text-[#F2EFE7] font-mono-tech shadow-2xl flex flex-col justify-between select-none transform transition-transform duration-300 ease-in-out overflow-hidden ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
        aria-label="KMRL Operations Navigation Drawer"
      >
        {/* Top Header with Portal Identity */}
        <div>
          <div className="p-4 border-b border-[#C8DFDB]/40 bg-[#3368A0] flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg overflow-hidden border border-[#C8DFDB] bg-[#F2EFE7] flex-shrink-0 shadow-xs">
                <img
                  src="/logo.png"
                  alt="KMRL Logo"
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <h3 className="font-mono-tech font-bold text-sm text-[#F2EFE7] uppercase tracking-wide">
                  KMRL OPERATIONS
                </h3>
                <span className="text-[9.5px] text-[#C8DFDB] font-mono-tech font-bold uppercase tracking-widest block">
                  EMPLOYEE PORTAL
                </span>
              </div>
            </div>

            {/* Close Button */}
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg bg-[#3368A0] hover:bg-[#2A5685] border border-[#C8DFDB] text-[#F2EFE7] transition-colors cursor-pointer shadow-xs"
              title="Close navigation panel"
              aria-label="Close navigation panel"
            >
              <X className="w-4 h-4 text-[#F2EFE7]" />
            </button>
          </div>

          {/* Officer Details & Role Badge */}
          {user && (
            <div className="p-3 bg-[#2A5685] border-b border-[#C8DFDB]/30 flex items-center justify-between text-xs">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-[#C8DFDB] text-[#3368A0] font-bold text-xs flex items-center justify-center shadow-xs">
                  {user.avatarInitials}
                </div>
                <div>
                  <div className="font-bold text-[#F2EFE7] text-xs leading-tight">
                    {user.name}
                  </div>
                  <div className="text-[9.5px] text-[#C8DFDB] font-bold">
                    {user.roleTitle}
                  </div>
                </div>
              </div>

              <span className="px-2 py-0.5 rounded bg-[#C8DFDB] text-[#3368A0] border border-[#C8DFDB] text-[9px] font-bold">
                {user.role}
              </span>
            </div>
          )}

          {/* Quick Operations Telemetry Ribbon (Real Live Clock) */}
          <div className="px-3.5 py-2 bg-[#3368A0] border-b border-[#C8DFDB]/30 flex items-center justify-between text-[10.5px]">
            <div className="flex items-center gap-1.5 text-[#F2EFE7] font-bold">
              <Clock className="w-3.5 h-3.5 text-[#C8DFDB]" />
              <span>{liveClock || simTime} IST</span>
            </div>
            <div className="text-[#F2EFE7] font-bold">
              <span className="text-[#C8DFDB]">ACTIVE: </span>
              {activeTrainsCount}/{totalTrainsCount} UNITS
            </div>
          </div>
        </div>

        {/* Scrollable Navigation Groups */}
        <div className="flex-1 overflow-y-auto p-3 space-y-4 scrollbar-thin">
          {NAVIGATION_GROUPS.map((group) => (
            <div key={group.category} className="space-y-1">
              {/* Category Header Label */}
              <div className="px-2 py-1 text-[10px] font-bold uppercase tracking-widest text-[#C8DFDB]">
                {group.category}
              </div>

              {/* Items in this category */}
              <div className="space-y-0.5">
                {group.items.map((item) => {
                  const Icon = item.icon;
                  const isActive = activeItem === item.id;

                  return (
                    <button
                      key={item.id}
                      onClick={() => handleNavClick(item)}
                      className={`w-full px-2.5 py-2 rounded-xl text-left transition-colors cursor-pointer flex items-center justify-between group ${
                        isActive
                          ? 'bg-[#C8DFDB] text-[#3368A0] font-bold shadow-xs border border-[#C8DFDB]'
                          : 'text-[#F2EFE7] hover:bg-[#2A5685]'
                      }`}
                    >
                      <div className="flex items-center gap-2.5 min-w-0">
                        <div className={`p-1.5 rounded-lg transition-colors flex-shrink-0 ${
                          isActive
                            ? 'bg-[#3368A0] text-[#F2EFE7]'
                            : 'bg-[#C8DFDB]/20 text-[#C8DFDB] group-hover:bg-[#C8DFDB] group-hover:text-[#3368A0]'
                        }`}>
                          <Icon className="w-3.5 h-3.5" />
                        </div>
                        <div className="min-w-0">
                          <div className="text-xs font-bold truncate leading-tight">
                            {item.label}
                          </div>
                          <div className={`text-[9px] truncate font-inter font-medium ${
                            isActive ? 'text-[#3368A0]/80' : 'text-[#C8DFDB]/80'
                          }`}>
                            {item.subtitle}
                          </div>
                        </div>
                      </div>

                      <ChevronRight className={`w-3.5 h-3.5 flex-shrink-0 transition-transform ${
                        isActive 
                          ? 'text-[#3368A0] translate-x-0.5' 
                          : 'text-[#C8DFDB] opacity-60 group-hover:opacity-100 group-hover:translate-x-0.5'
                      }`} />
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {/* Footer Area: Shift Status & Logout */}
        <div className="p-3 border-t border-[#C8DFDB]/40 bg-[#2A5685] space-y-2">
          <div className="flex items-center justify-between text-[10px] text-[#C8DFDB]">
            <span>STATION OCC SERVER</span>
            <span className="font-bold text-[#F2EFE7]">ONLINE (100%)</span>
          </div>

          <button
            onClick={() => {
              logout();
              onClose();
            }}
            className="w-full py-2 px-3 rounded-xl bg-[#3368A0] hover:bg-[#C53030] border border-[#C8DFDB] text-[#F2EFE7] font-mono-tech font-bold text-xs transition-colors cursor-pointer flex items-center justify-center gap-2 shadow-xs"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>LOG OUT OF OCC</span>
          </button>
        </div>
      </aside>
    </>
  );
};
