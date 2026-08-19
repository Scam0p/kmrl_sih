import React, { useState, useRef, useEffect } from 'react';
import { 
  Menu, 
  Activity, 
  RotateCcw, 
  Cpu, 
  ShieldAlert, 
  User, 
  LogOut, 
  ChevronDown 
} from 'lucide-react';
import { CaseType, Train as TrainType } from '../../types/simulation';
import { useAuth } from '../../context/AuthContext';
import { UserRole } from '../../types/auth';
import { TrainSearchBar } from '../search/TrainSearchBar';

interface TopStatusBarProps {
  simTime: string;
  currentCase: CaseType;
  activeTrainsCount: number;
  totalTrainsCount: number;
  trains: TrainType[];
  onSelectTrain: (train: TrainType) => void;
  onReset: () => void;
  onRunOptimization: () => void;
  isOptimizing: boolean;
  onToggleMenu: () => void;
}

export const TopStatusBar: React.FC<TopStatusBarProps> = ({
  currentCase,
  trains,
  onSelectTrain,
  onReset,
  onToggleMenu
}) => {
  const { user, logout, loginWithRole } = useAuth();
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const profileRef = useRef<HTMLDivElement>(null);

  // Close dropdown on click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (profileRef.current && !profileRef.current.contains(event.target as Node)) {
        setIsProfileOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const getRoleBadgeStyle = (role?: UserRole) => {
    switch (role) {
      case 'ADMINISTRATOR':
        return 'bg-[#56B6C6] text-[#170C79] border-[#56B6C6]';
      case 'OPERATIONS_MANAGER':
        return 'bg-[#56B6C6]/30 text-[#56B6C6] border-[#56B6C6]/50';
      case 'MAINTENANCE':
        return 'bg-[#C53030]/20 text-[#C53030] border-[#C53030]/40';
      case 'STATION_CONTROLLER':
        return 'bg-[#8ACBD0]/30 text-[#8ACBD0] border-[#8ACBD0]/40';
      default: // OPERATOR
        return 'bg-[#2E8B57]/25 text-[#56B6C6] border-[#56B6C6]/40';
    }
  };

  return (
    <header className="sticky top-0 z-40 w-full bg-[#170C79] border-b-2 border-[#56B6C6]/40 px-2.5 sm:px-6 md:px-8 py-2.5 flex items-center justify-between gap-1.5 sm:gap-4 text-xs font-mono-tech select-none shadow-lg text-[#EFE3CA]">
      {/* Left: Menu Trigger + KMRL Brand Identity */}
      <div className="flex items-center gap-1.5 sm:gap-3 flex-shrink-0 min-w-0">
        {/* Sliding Menu Trigger Button */}
        <button
          onClick={onToggleMenu}
          className="px-2.5 sm:px-3 py-1.5 rounded-lg bg-[#22158E] hover:bg-[#56B6C6] border border-[#56B6C6]/40 text-[#EFE3CA] hover:text-[#170C79] transition-colors cursor-pointer flex items-center gap-1.5 font-bold shadow-xs active:scale-95"
          title="Open KMRL Operations Navigation Menu"
          aria-label="Open Operations Menu"
        >
          <Menu className="w-4 h-4 text-[#56B6C6]" />
          <span className="hidden sm:inline text-xs tracking-wider font-bold">MENU</span>
        </button>

        <div className="flex items-center gap-1.5 sm:gap-2.5">
          <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg overflow-hidden border border-[#56B6C6]/60 bg-[#22158E] flex-shrink-0 shadow-xs">
            <img
              src="/logo.png"
              alt="KMRL Logo"
              className="w-full h-full object-cover"
            />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-mono-tech font-bold text-xs sm:text-sm text-[#EFE3CA] tracking-wide whitespace-nowrap">
                KMRL <span className="text-[#56B6C6] font-normal hidden md:inline">| OPERATIONS OCC</span>
              </span>
              <span className="hidden lg:inline-block text-[8.5px] font-mono-tech px-1.5 py-0.2 rounded bg-[#56B6C6] text-[#170C79] font-bold">
                SIH 2026
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Center: Global Prominent Train Search Bar */}
      <div className="flex-1 min-w-0 max-w-full sm:max-w-xs md:max-w-md mx-1 sm:mx-2">
        <TrainSearchBar
          trains={trains}
          onSelectTrain={onSelectTrain}
        />
      </div>

      {/* Right: Employee Auth Profile & Reset Action */}
      <div className="flex items-center gap-1.5 sm:gap-3 flex-shrink-0">
        {/* Paradigm Mode Pill (Desktop) */}
        <div className="hidden 2xl:flex items-center gap-2 px-3 py-1 rounded-full bg-[#22158E] border border-[#56B6C6]/40 text-xs font-mono-tech shadow-xs">
          <span className="text-[#EFE3CA]/70 font-bold text-[10px]">MODE:</span>
          {currentCase === 'ai' ? (
            <span className="text-[#56B6C6] flex items-center gap-1 font-bold text-[11px]">
              <Cpu className="w-3 h-3 text-[#56B6C6]" /> AI DYNAMIC
            </span>
          ) : currentCase === 'conventional' ? (
            <span className="text-[#8ACBD0] flex items-center gap-1 font-bold text-[11px]">
              <Activity className="w-3 h-3 text-[#8ACBD0]" /> CBTC
            </span>
          ) : (
            <span className="text-[#EFE3CA] flex items-center gap-1 font-bold text-[11px]">
              <ShieldAlert className="w-3 h-3 text-[#EFE3CA]" /> MANUAL
            </span>
          )}
        </div>

        {/* Authenticated Employee Profile Pill */}
        {user && (
          <div className="relative" ref={profileRef}>
            <button
              onClick={() => setIsProfileOpen(prev => !prev)}
              className="flex items-center gap-1.5 sm:gap-2 px-2 sm:px-2.5 py-1 rounded-lg bg-[#22158E] hover:bg-[#120963] border border-[#56B6C6]/40 text-left transition-colors cursor-pointer shadow-xs"
              title="Click to view Officer Profile & Switch Roles"
            >
              <div className="w-6 h-6 rounded-full bg-[#56B6C6] text-[#170C79] font-bold text-[10px] flex items-center justify-center flex-shrink-0">
                {user.avatarInitials}
              </div>
              <div className="hidden lg:block text-left leading-tight">
                <div className="text-[11px] font-bold text-[#EFE3CA] truncate max-w-[110px]">
                  {user.name}
                </div>
                <div className="text-[9px] text-[#56B6C6] font-bold truncate font-mono-tech">
                  {user.employeeId}
                </div>
              </div>
              <span className={`hidden sm:inline-block px-1.5 py-0.2 rounded text-[8.5px] font-bold border ${getRoleBadgeStyle(user.role)}`}>
                {user.role}
              </span>
              <ChevronDown className="w-3 h-3 text-[#56B6C6]/80 hidden sm:inline" />
            </button>

            {/* Profile Dropdown Popover */}
            {isProfileOpen && (
              <div className="absolute right-0 top-full mt-2 w-64 sm:w-72 bg-[#120963] border-2 border-[#56B6C6] rounded-xl p-3.5 shadow-2xl z-50 text-xs font-mono-tech space-y-3 animate-in fade-in">
                {/* Officer Details */}
                <div className="pb-2.5 border-b border-[#56B6C6]/30">
                  <div className="flex items-center justify-between">
                    <span className="text-[9px] uppercase tracking-widest text-[#8ACBD0] font-bold">
                      OFFICER CREDENTIALS
                    </span>
                    <span className="flex items-center gap-1 text-[9px] text-[#56B6C6] font-bold">
                      ACTIVE OCC
                    </span>
                  </div>
                  <div className="font-bold text-sm text-[#EFE3CA] mt-1">
                    {user.name}
                  </div>
                  <div className="text-[10px] text-[#56B6C6] font-bold">
                    {user.roleTitle}
                  </div>
                  <div className="text-[9px] text-[#EFE3CA]/70 mt-0.5">
                    {user.department}
                  </div>
                </div>

                {/* Quick Role Switcher for Fast Evaluation */}
                <div className="space-y-1.5">
                  <span className="text-[9px] uppercase tracking-widest text-[#8ACBD0] font-bold block">
                    SWITCH OCC ROLE (DEMO)
                  </span>
                  <div className="grid grid-cols-1 gap-1">
                    {(['OPERATOR', 'OPERATIONS_MANAGER', 'MAINTENANCE', 'STATION_CONTROLLER', 'ADMINISTRATOR'] as UserRole[]).map((r) => (
                      <button
                        key={r}
                        onClick={() => {
                          loginWithRole(r);
                          setIsProfileOpen(false);
                        }}
                        className={`w-full px-2.5 py-1.5 rounded-lg text-left text-[10.5px] transition-colors cursor-pointer flex items-center justify-between ${
                          user.role === r
                            ? 'bg-[#56B6C6] text-[#170C79] font-bold'
                            : 'bg-[#170C79] text-[#EFE3CA] hover:bg-[#22158E]'
                        }`}
                      >
                        <span>{r.replace('_', ' ')}</span>
                        {user.role === r && <span className="w-1.5 h-1.5 rounded-full bg-[#170C79]"></span>}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Logout Button */}
                <div className="pt-2 border-t border-[#56B6C6]/30">
                  <button
                    onClick={() => {
                      logout();
                      setIsProfileOpen(false);
                    }}
                    className="w-full py-1.5 px-3 rounded-lg bg-[#C53030]/20 hover:bg-[#C53030] border border-[#C53030]/40 text-[#EFE3CA] hover:text-[#FFFFFF] transition-colors cursor-pointer flex items-center justify-center gap-2 font-bold text-xs"
                  >
                    <LogOut className="w-3.5 h-3.5" />
                    <span>LOG OUT OF OCC</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Reset Simulation Button */}
        <button
          onClick={onReset}
          className="p-1.5 sm:px-2.5 sm:py-1.5 rounded-lg bg-[#22158E] hover:bg-[#56B6C6] border border-[#56B6C6]/40 text-[#EFE3CA] hover:text-[#170C79] transition-colors cursor-pointer shadow-xs flex items-center gap-1.5 font-bold"
          title="Reset Simulation to Initial State"
          aria-label="Reset simulation"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span className="hidden sm:inline text-[10px] font-bold">RESET OCC</span>
        </button>
      </div>
    </header>
  );
};
