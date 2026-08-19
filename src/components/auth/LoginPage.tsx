import React, { useState } from 'react';
import { 
  ShieldCheck, 
  Lock, 
  User, 
  Eye, 
  EyeOff, 
  Train, 
  Cpu, 
  Wrench, 
  Building2, 
  ShieldAlert, 
  ArrowRight,
  Sparkles,
  KeyRound
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { DEMO_USERS, UserRole } from '../../types/auth';

interface LoginPageProps {
  onSuccess?: () => void;
}

export const LoginPage: React.FC<LoginPageProps> = ({ onSuccess }) => {
  const { login, loginWithRole } = useAuth();
  const [employeeId, setEmployeeId] = useState('KMRL-OP-4082');
  const [password, setPassword] = useState('••••••••••••');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberDevice, setRememberDevice] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!employeeId.trim()) {
      setError('Please enter your Employee ID.');
      return;
    }
    setError(null);
    setIsLoading(true);

    setTimeout(async () => {
      await login(employeeId, password);
      setIsLoading(false);
      if (onSuccess) onSuccess();
    }, 400);
  };

  const handleRoleQuickLogin = (role: UserRole) => {
    loginWithRole(role);
    if (onSuccess) onSuccess();
  };

  const getRoleIcon = (role: UserRole) => {
    switch (role) {
      case 'OPERATOR': return <Train className="w-4 h-4 text-[#56B6C6]" />;
      case 'OPERATIONS_MANAGER': return <Cpu className="w-4 h-4 text-[#56B6C6]" />;
      case 'MAINTENANCE': return <Wrench className="w-4 h-4 text-[#56B6C6]" />;
      case 'STATION_CONTROLLER': return <Building2 className="w-4 h-4 text-[#56B6C6]" />;
      case 'ADMINISTRATOR': return <ShieldCheck className="w-4 h-4 text-[#56B6C6]" />;
    }
  };

  return (
    <div className="relative min-h-screen bg-[#F6F1E6] text-[#170C79] flex flex-col justify-between items-center p-4 md:p-8 font-mono-tech select-none overflow-x-hidden">
      {/* Background Metro Schematic Tracks Overlay */}
      <div className="absolute inset-0 pointer-events-none opacity-25 flex items-center justify-center">
        <svg className="w-full h-full min-w-[1200px]" viewBox="0 0 1200 600" fill="none">
          <path
            d="M 50 300 C 250 300, 300 180, 500 180 C 700 180, 800 420, 1000 420 L 1150 420"
            stroke="#170C79"
            strokeWidth="3"
            strokeDasharray="8 6"
          />
          <path
            d="M 120 140 C 260 140, 320 300, 480 300 L 750 300 C 900 300, 950 180, 1100 180"
            stroke="#56B6C6"
            strokeWidth="2.5"
            strokeDasharray="6 4"
          />
          <circle cx="500" cy="180" r="8" fill="#170C79" />
          <circle cx="750" cy="300" r="8" fill="#56B6C6" />
          <circle cx="1000" cy="420" r="8" fill="#170C79" />
        </svg>
      </div>

      {/* Top Header Identity */}
      <div className="relative z-10 w-full max-w-4xl flex items-center justify-between py-2 border-b border-[#8ACBD0]">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg overflow-hidden border border-[#8ACBD0] bg-[#170C79] shadow-xs flex-shrink-0">
            <img
              src="/logo.png"
              alt="KMRL Logo"
              className="w-full h-full object-cover"
            />
          </div>
          <div>
            <span className="font-mono-tech font-bold text-sm text-[#170C79] tracking-wide block">
              KOCHI METRO RAIL LIMITED
            </span>
            <span className="font-inter text-[10px] text-[#2C2B68] font-medium">
              Operations Control Centre (OCC) • SIH 2026
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2 bg-[#FFFFFF] px-3 py-1 rounded-full border border-[#8ACBD0] text-xs text-[#170C79] shadow-2xs">
          <span className="w-2 h-2 rounded-full bg-[#56B6C6] animate-pulse"></span>
          <span className="font-bold text-[10px]">OCC GATEWAY 01 • SECURE SSL</span>
        </div>
      </div>

      {/* Main Centered Login Card with Train Window Bezel Framing */}
      <div className="relative z-10 w-full max-w-xl my-6">
        <div className="w-full rounded-2xl bg-[#8ACBD0] border-2 border-[#56B6C6]/60 p-2 shadow-2xl space-y-2">
          {/* Top Window Bezel with Micro-Rivets */}
          <div className="flex items-center justify-between px-3 pt-2 pb-1">
            <div className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#170C79]/40"></span>
              <span className="w-1.5 h-1.5 rounded-full bg-[#170C79]/40"></span>
            </div>

            <div className="flex items-center gap-2">
              <KeyRound className="w-4 h-4 text-[#56B6C6]" />
              <span className="font-mono-tech font-bold text-xs text-[#170C79] uppercase tracking-wider">
                KMRL EMPLOYEE AUTHENTICATION
              </span>
            </div>

            <div className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#170C79]/40"></span>
              <span className="w-1.5 h-1.5 rounded-full bg-[#170C79]/40"></span>
            </div>
          </div>

          {/* Inner Inset Viewport */}
          <div className="bg-[#EFE3CA] rounded-xl p-5 md:p-8 border border-[#8ACBD0] shadow-inner space-y-6">
            {/* Title & Security Authority Banner */}
            <div className="text-center space-y-1.5">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FFFFFF] border border-[#8ACBD0] text-[10.5px] text-[#170C79] font-bold shadow-2xs mb-1">
                <ShieldAlert className="w-3.5 h-3.5 text-[#56B6C6]" />
                <span>AUTHORIZED PERSONNEL ONLY</span>
              </div>
              <h1 className="font-mono-tech font-bold text-2xl md:text-3xl text-[#170C79] tracking-tight uppercase">
                KMRL OPERATIONS PORTAL
              </h1>
              <p className="font-inter text-xs text-[#2C2B68] font-medium max-w-md mx-auto">
                AI Train Induction Planning, Dispatch Scheduling & Headway Control Center
              </p>
            </div>

            {/* Login Form */}
            <form onSubmit={handleFormSubmit} className="space-y-4">
              {error && (
                <div className="p-2.5 rounded-lg bg-[#C53030]/15 border border-[#C53030]/40 text-[#C53030] text-xs font-mono-tech font-bold text-center">
                  {error}
                </div>
              )}

              {/* Employee ID Input */}
              <div className="space-y-1">
                <label className="text-xs font-mono-tech font-bold text-[#170C79] flex items-center justify-between">
                  <span>EMPLOYEE ID / BADGE NUMBER</span>
                  <span className="text-[10px] text-[#2C2B68] font-normal">e.g. KMRL-OP-4082</span>
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#2C2B68]">
                    <User className="w-4 h-4 text-[#56B6C6]" />
                  </div>
                  <input
                    type="text"
                    value={employeeId}
                    onChange={(e) => setEmployeeId(e.target.value)}
                    placeholder="Enter Employee ID"
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#FFFFFF] border-2 border-[#8ACBD0] focus:border-[#56B6C6] focus:outline-none text-sm font-mono-tech font-bold text-[#170C79] placeholder-[#2C2B68]/40 shadow-xs transition-colors"
                  />
                </div>
              </div>

              {/* Password Input */}
              <div className="space-y-1">
                <label className="text-xs font-mono-tech font-bold text-[#170C79] flex items-center justify-between">
                  <span>SECURITY PIN / PASSWORD</span>
                  <span className="text-[10px] text-[#2C2B68] font-normal">Encrypted OCC Token</span>
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#2C2B68]">
                    <Lock className="w-4 h-4 text-[#56B6C6]" />
                  </div>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter Password"
                    className="w-full pl-10 pr-11 py-2.5 rounded-xl bg-[#FFFFFF] border-2 border-[#8ACBD0] focus:border-[#56B6C6] focus:outline-none text-sm font-mono-tech font-bold text-[#170C79] placeholder-[#2C2B68]/40 shadow-xs transition-colors"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(prev => !prev)}
                    className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-[#2C2B68] hover:text-[#170C79] cursor-pointer"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {/* Remember Device & Security Help */}
              <div className="flex items-center justify-between text-xs pt-1">
                <label className="flex items-center gap-2 cursor-pointer text-[#2C2B68] font-medium select-none">
                  <input
                    type="checkbox"
                    checked={rememberDevice}
                    onChange={(e) => setRememberDevice(e.target.checked)}
                    className="rounded border-[#8ACBD0] text-[#170C79] focus:ring-[#56B6C6]"
                  />
                  <span>Remember this OCC workstation</span>
                </label>
                <span className="text-[10px] text-[#56B6C6] font-bold">OCC HELP DESK</span>
              </div>

              {/* Submit Sign In Button */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-3 px-4 rounded-xl bg-[#170C79] hover:bg-[#56B6C6] hover:text-[#170C79] text-[#EFE3CA] font-mono-tech font-bold text-xs uppercase tracking-widest transition-all duration-200 cursor-pointer flex items-center justify-center gap-2 shadow-md disabled:opacity-50"
              >
                {isLoading ? (
                  <span>AUTHENTICATING WITH OCC GATEWAY...</span>
                ) : (
                  <>
                    <span>SIGN IN TO OPERATIONS CONSOLE</span>
                    <ArrowRight className="w-4 h-4 text-[#56B6C6]" />
                  </>
                )}
              </button>
            </form>

            {/* Quick Demo Role Selector Strip (Prototype Fast Evaluation) */}
            <div className="pt-4 border-t border-[#8ACBD0]/60 space-y-2.5">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono-tech uppercase tracking-wider text-[#170C79] font-bold flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-[#56B6C6]" />
                  <span>DEMO ROLE ACCESS PRESETS (1-CLICK ENTRY)</span>
                </span>
                <span className="text-[9px] text-[#2C2B68] font-mono-tech">SIH Prototype</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 text-xs font-mono-tech">
                {DEMO_USERS.map((usr) => (
                  <button
                    key={usr.id}
                    onClick={() => handleRoleQuickLogin(usr.role)}
                    className="p-2 rounded-xl bg-[#FFFFFF] hover:bg-[#8ACBD0] border border-[#8ACBD0] hover:border-[#56B6C6] transition-all cursor-pointer text-left shadow-2xs group flex flex-col justify-between"
                  >
                    <div className="flex items-center justify-between mb-1">
                      <div className="flex items-center gap-1.5">
                        {getRoleIcon(usr.role)}
                        <span className="font-bold text-[10px] text-[#170C79] truncate">
                          {usr.role.replace('_', ' ')}
                        </span>
                      </div>
                      <span className="w-1.5 h-1.5 rounded-full bg-[#56B6C6]"></span>
                    </div>

                    <div className="text-[11px] font-bold text-[#170C79] truncate">
                      {usr.name}
                    </div>
                    <div className="text-[9.5px] text-[#2C2B68] truncate font-mono-tech">
                      {usr.employeeId}
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Technical Footnote */}
      <div className="relative z-10 w-full max-w-4xl text-center py-2 text-[10px] text-[#2C2B68] flex flex-wrap items-center justify-between gap-2 border-t border-[#8ACBD0]/40">
        <span>© 2026 KOCHI METRO RAIL LIMITED • POWERHOUSE AI PLATFORM</span>
        <span className="text-[#170C79] font-bold">SMART INDIA HACKATHON 2026 (SIH)</span>
      </div>
    </div>
  );
};
