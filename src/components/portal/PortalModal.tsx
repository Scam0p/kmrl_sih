import React from 'react';
import { 
  X, 
  AlertTriangle, 
  Wrench, 
  BarChart2, 
  History, 
  HelpCircle, 
  Bot, 
  Bell, 
  User, 
  ShieldCheck, 
  CheckCircle2, 
  Clock, 
  FileText, 
  Sparkles,
  ArrowRight
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export type PortalModalView = 
  | 'alerts' 
  | 'maintenance' 
  | 'analytics' 
  | 'decision-history' 
  | 'faqs' 
  | 'ai-assistant' 
  | 'notifications' 
  | 'profile' 
  | null;

interface PortalModalProps {
  view: PortalModalView;
  onClose: () => void;
}

export const PortalModal: React.FC<PortalModalProps> = ({ view, onClose }) => {
  const { user } = useAuth();
  if (!view) return null;

  const renderContent = () => {
    switch (view) {
      case 'alerts':
        return (
          <div className="space-y-4">
            <div className="flex items-center gap-3 pb-3 border-b border-[#8ACBD0]">
              <div className="p-2.5 rounded-xl bg-[#C53030]/15 border border-[#C53030]/40 text-[#C53030]">
                <AlertTriangle className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-mono-tech font-bold text-base text-[#170C79]">
                  ALERTS & INCIDENT MANAGEMENT CONSOLE
                </h3>
                <span className="text-xs font-inter text-[#2C2B68]">
                  Active signal anomalies, platform crowd surges, and track circuit alarms
                </span>
              </div>
            </div>

            <div className="space-y-2 font-mono-tech text-xs">
              <div className="p-3 rounded-lg bg-[#FFFFFF] border-l-4 border-l-[#C53030] border border-[#8ACBD0] flex items-center justify-between">
                <div>
                  <div className="font-bold text-[#170C79] flex items-center gap-2">
                    <span className="px-1.5 py-0.5 rounded bg-[#C53030]/20 text-[#C53030] text-[9px]">CRITICAL</span>
                    <span>T04 Traction Inverter Thermal Warning</span>
                  </div>
                  <p className="font-inter text-xs text-[#2C2B68] mt-1">
                    Bogie inverter operating at 74°C. Dynamic hot-reserve substitution recommended.
                  </p>
                </div>
                <span className="text-[10px] text-[#2C2B68] font-mono-tech">08:34 IST</span>
              </div>

              <div className="p-3 rounded-lg bg-[#FFFFFF] border-l-4 border-l-[#D9A24B] border border-[#8ACBD0] flex items-center justify-between">
                <div>
                  <div className="font-bold text-[#170C79] flex items-center gap-2">
                    <span className="px-1.5 py-0.5 rounded bg-[#D9A24B]/20 text-[#170C79] text-[9px]">HIGH LOAD</span>
                    <span>Edappally Inflow Surge (+45%)</span>
                  </div>
                  <p className="font-inter text-xs text-[#2C2B68] mt-1">
                    Platform waiting count exceeded 280 PAX. Automated headway compression active.
                  </p>
                </div>
                <span className="text-[10px] text-[#2C2B68] font-mono-tech">08:38 IST</span>
              </div>

              <div className="p-3 rounded-lg bg-[#FFFFFF] border-l-4 border-l-[#2E8B57] border border-[#8ACBD0] flex items-center justify-between">
                <div>
                  <div className="font-bold text-[#170C79] flex items-center gap-2">
                    <span className="px-1.5 py-0.5 rounded bg-[#2E8B57]/20 text-[#2E8B57] text-[9px]">RESOLVED</span>
                    <span>Aluva Interlocking Signal Calibration</span>
                  </div>
                  <p className="font-inter text-xs text-[#2C2B68] mt-1">
                    Turnout sensor GoA2 link synced with Muttom Depot SCADA dispatch.
                  </p>
                </div>
                <span className="text-[10px] text-[#2C2B68] font-mono-tech">08:12 IST</span>
              </div>
            </div>
          </div>
        );

      case 'maintenance':
        return (
          <div className="space-y-4">
            <div className="flex items-center gap-3 pb-3 border-b border-[#8ACBD0]">
              <div className="p-2.5 rounded-xl bg-[#56B6C6]/20 border border-[#56B6C6]/50 text-[#170C79]">
                <Wrench className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-mono-tech font-bold text-base text-[#170C79]">
                  MUTTOM ROLLING STOCK DEPOT MAINTENANCE
                </h3>
                <span className="text-xs font-inter text-[#2C2B68]">
                  Preventative servicing schedules, bogie overhauls, and wheelset ultrasonic testing
                </span>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 font-mono-tech text-xs">
              <div className="p-3 rounded-lg bg-[#FFFFFF] border border-[#8ACBD0]">
                <div className="flex justify-between text-[#2C2B68] text-[10px] font-bold">
                  <span>TRAINSET T04</span>
                  <span className="text-[#C53030]">MAINTENANCE DUE</span>
                </div>
                <div className="font-bold text-sm text-[#170C79] mt-1">Inverter Module B Inspection</div>
                <p className="font-inter text-[11px] text-[#2C2B68] mt-1">
                  Scheduled for Stabling Bay 4 • Estimated Downtime: 2.5 hrs
                </p>
              </div>

              <div className="p-3 rounded-lg bg-[#FFFFFF] border border-[#8ACBD0]">
                <div className="flex justify-between text-[#2C2B68] text-[10px] font-bold">
                  <span>TRAINSET T06</span>
                  <span className="text-[#2E8B57]">READY FOR SERVICE</span>
                </div>
                <div className="font-bold text-sm text-[#170C79] mt-1">30,000 km Bogie Lubrication Passed</div>
                <p className="font-inter text-[11px] text-[#2C2B68] mt-1">
                  Muttom Hot-Reserve Siding • Ready for Induction in 42ms
                </p>
              </div>
            </div>
          </div>
        );

      case 'analytics':
        return (
          <div className="space-y-4">
            <div className="flex items-center gap-3 pb-3 border-b border-[#8ACBD0]">
              <div className="p-2.5 rounded-xl bg-[#56B6C6]/20 border border-[#56B6C6]/50 text-[#170C79]">
                <BarChart2 className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-mono-tech font-bold text-base text-[#170C79]">
                  HEADWAY & PASSENGER ANALYTICS REPORT
                </h3>
                <span className="text-xs font-inter text-[#2C2B68]">
                  Automated corridor performance benchmarking and Pareto optimality scorecards
                </span>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-3 font-mono-tech text-center">
              <div className="p-3 rounded-lg bg-[#FFFFFF] border border-[#8ACBD0]">
                <div className="text-[10px] text-[#2C2B68] font-bold">AVG WAIT TIME</div>
                <div className="text-xl font-bold text-[#170C79] mt-1">5.2 min</div>
                <div className="text-[9.5px] text-[#2E8B57] font-bold mt-0.5">-62% vs Manual</div>
              </div>

              <div className="p-3 rounded-lg bg-[#FFFFFF] border border-[#8ACBD0]">
                <div className="text-[10px] text-[#2C2B68] font-bold">FLEET EFFICIENCY</div>
                <div className="text-xl font-bold text-[#170C79] mt-1">92.4%</div>
                <div className="text-[9.5px] text-[#56B6C6] font-bold mt-0.5">+24% vs CBTC</div>
              </div>

              <div className="p-3 rounded-lg bg-[#FFFFFF] border border-[#8ACBD0]">
                <div className="text-[10px] text-[#2C2B68] font-bold">ENERGY RECOVERY</div>
                <div className="text-xl font-bold text-[#170C79] mt-1">28.6%</div>
                <div className="text-[9.5px] text-[#2E8B57] font-bold mt-0.5">Regen Traction</div>
              </div>
            </div>
          </div>
        );

      case 'decision-history':
        return (
          <div className="space-y-4">
            <div className="flex items-center gap-3 pb-3 border-b border-[#8ACBD0]">
              <div className="p-2.5 rounded-xl bg-[#56B6C6]/20 border border-[#56B6C6]/50 text-[#170C79]">
                <History className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-mono-tech font-bold text-base text-[#170C79]">
                  OCC AUDIT TRAIL & DECISION HISTORY
                </h3>
                <span className="text-xs font-inter text-[#2C2B68]">
                  Immutable ledger of AI recommendations deployed by OCC Duty Controllers
                </span>
              </div>
            </div>

            <div className="space-y-2 font-mono-tech text-xs">
              <div className="p-3 rounded-lg bg-[#FFFFFF] border border-[#8ACBD0] flex justify-between items-center">
                <div>
                  <div className="font-bold text-[#170C79]">HOT-RESERVE INDUCTION: T06 → EDAPPALLY</div>
                  <div className="text-[11px] font-inter text-[#2C2B68]">Approved by Rajesh Kumar (KMRL-OP-4082)</div>
                </div>
                <div className="text-right">
                  <span className="px-2 py-0.5 rounded bg-[#2E8B57]/20 text-[#2E8B57] font-bold text-[9.5px]">EXECUTED</span>
                  <div className="text-[10px] text-[#2C2B68] mt-1">08:24 IST</div>
                </div>
              </div>

              <div className="p-3 rounded-lg bg-[#FFFFFF] border border-[#8ACBD0] flex justify-between items-center">
                <div>
                  <div className="font-bold text-[#170C79]">HEADWAY COMPRESSION: 06:00 → 04:30 MIN</div>
                  <div className="text-[11px] font-inter text-[#2C2B68]">AI Pareto Solver Auto-Applied</div>
                </div>
                <div className="text-right">
                  <span className="px-2 py-0.5 rounded bg-[#56B6C6]/20 text-[#170C79] font-bold text-[9.5px]">OPTIMIZED</span>
                  <div className="text-[10px] text-[#2C2B68] mt-1">08:15 IST</div>
                </div>
              </div>
            </div>
          </div>
        );

      case 'faqs':
        return (
          <div className="space-y-4">
            <div className="flex items-center gap-3 pb-3 border-b border-[#8ACBD0]">
              <div className="p-2.5 rounded-xl bg-[#56B6C6]/20 border border-[#56B6C6]/50 text-[#170C79]">
                <HelpCircle className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-mono-tech font-bold text-base text-[#170C79]">
                  STANDARD OPERATING PROCEDURES (SOP) & FAQS
                </h3>
                <span className="text-xs font-inter text-[#2C2B68]">
                  Operational guidelines for KMRL Train Dispatch, GoA2 CBTC, and Siding Turnouts
                </span>
              </div>
            </div>

            <div className="space-y-3 font-mono-tech text-xs">
              <div className="p-3 rounded-lg bg-[#FFFFFF] border border-[#8ACBD0]">
                <div className="font-bold text-[#170C79]">SOP-04: SIDING HOT-RESERVE INJECTION</div>
                <p className="font-inter text-xs text-[#2C2B68] mt-1 leading-relaxed">
                  Upon detecting station congestion &gt;75% or a sudden trainset fault, the AI multi-objective solver computes optimal merge gap. Operator validates the clearance and executes GoA2 turnout command.
                </p>
              </div>

              <div className="p-3 rounded-lg bg-[#FFFFFF] border border-[#8ACBD0]">
                <div className="font-bold text-[#170C79]">SOP-12: CONFLICT RESOLUTION & REVERSING AT TRIPUNITHURA</div>
                <p className="font-inter text-xs text-[#2C2B68] mt-1 leading-relaxed">
                  Automatic interlocking at Terminal Track 1 ensures train reverse transitions from Downbound to Upbound within 90-second dwell window without disrupting following trainsets.
                </p>
              </div>
            </div>
          </div>
        );

      case 'ai-assistant':
        return (
          <div className="space-y-4">
            <div className="flex items-center gap-3 pb-3 border-b border-[#8ACBD0]">
              <div className="p-2.5 rounded-xl bg-[#56B6C6]/20 border border-[#56B6C6]/50 text-[#170C79]">
                <Bot className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-mono-tech font-bold text-base text-[#170C79]">
                  KMRL AI OPERATIONS COPILOT
                </h3>
                <span className="text-xs font-inter text-[#2C2B68]">
                  Intelligent natural language query engine for live telemetry and timetable adjustments
                </span>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-[#FFFFFF] border border-[#8ACBD0] space-y-3 font-mono-tech text-xs">
              <div className="flex items-start gap-2.5">
                <div className="w-7 h-7 rounded-lg bg-[#170C79] text-[#56B6C6] flex items-center justify-center flex-shrink-0 font-bold">
                  AI
                </div>
                <div className="p-3 rounded-lg bg-[#F6F1E6] border border-[#8ACBD0] text-[#170C79] leading-relaxed">
                  <span className="font-bold block mb-1">OCC Intelligence Online:</span>
                  All 8 Alstom Metropolis units are tracked in GoA2 mode. Current corridor bottleneck is Edappally station with 280 waiting passengers. Recommending injection of trainset T06 within 3 minutes to stabilize 04:30 headway.
                </div>
              </div>

              <div className="pt-2 flex items-center gap-2">
                <input
                  type="text"
                  placeholder="Ask AI Copilot: 'What is the optimal induction time for T08?'..."
                  className="flex-1 px-3 py-2 rounded-lg bg-[#F6F1E6] border border-[#8ACBD0] text-xs font-mono-tech text-[#170C79] focus:outline-none focus:border-[#56B6C6]"
                  readOnly
                  value="Query: Optimal induction time for T06 to clear Edappally surge?"
                />
                <button
                  onClick={onClose}
                  className="px-3 py-2 rounded-lg bg-[#170C79] text-[#EFE3CA] font-bold text-xs hover:bg-[#56B6C6] hover:text-[#170C79] transition-colors cursor-pointer"
                >
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        );

      case 'notifications':
        return (
          <div className="space-y-4">
            <div className="flex items-center gap-3 pb-3 border-b border-[#8ACBD0]">
              <div className="p-2.5 rounded-xl bg-[#56B6C6]/20 border border-[#56B6C6]/50 text-[#170C79]">
                <Bell className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-mono-tech font-bold text-base text-[#170C79]">
                  OPERATIONAL NOTIFICATIONS & BROADCASTS
                </h3>
                <span className="text-xs font-inter text-[#2C2B68]">
                  System alerts, timetable synchronization events, and OCC shift handovers
                </span>
              </div>
            </div>

            <div className="space-y-2 font-mono-tech text-xs">
              <div className="p-3 rounded-lg bg-[#FFFFFF] border border-[#8ACBD0]">
                <div className="flex justify-between font-bold text-[#170C79]">
                  <span>AI Solver Timetable Synchronization Complete</span>
                  <span className="text-[#2C2B68] text-[10px]">Just now</span>
                </div>
                <p className="font-inter text-xs text-[#2C2B68] mt-0.5">
                  Real-time dwell times synced with Aluva and Edappally station platform displays.
                </p>
              </div>

              <div className="p-3 rounded-lg bg-[#FFFFFF] border border-[#8ACBD0]">
                <div className="flex justify-between font-bold text-[#170C79]">
                  <span>Morning Shift Roster Confirmed</span>
                  <span className="text-[#2C2B68] text-[10px]">08:00 IST</span>
                </div>
                <p className="font-inter text-xs text-[#2C2B68] mt-0.5">
                  Officer Rajesh Kumar on duty at OCC Central Master Console.
                </p>
              </div>
            </div>
          </div>
        );

      case 'profile':
        return (
          <div className="space-y-4">
            <div className="flex items-center gap-3 pb-3 border-b border-[#8ACBD0]">
              <div className="w-12 h-12 rounded-xl bg-[#170C79] text-[#56B6C6] border-2 border-[#56B6C6] flex items-center justify-center font-bold text-lg">
                {user?.avatarInitials || 'KM'}
              </div>
              <div>
                <h3 className="font-mono-tech font-bold text-base text-[#170C79]">
                  {user?.name || 'KMRL Officer'}
                </h3>
                <span className="text-xs font-inter text-[#2C2B68]">
                  {user?.roleTitle} • {user?.employeeId}
                </span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 font-mono-tech text-xs">
              <div className="p-3 rounded-lg bg-[#FFFFFF] border border-[#8ACBD0]">
                <div className="text-[10px] text-[#2C2B68] font-bold">DEPARTMENT</div>
                <div className="font-bold text-[#170C79] mt-1">{user?.department}</div>
              </div>

              <div className="p-3 rounded-lg bg-[#FFFFFF] border border-[#8ACBD0]">
                <div className="text-[10px] text-[#2C2B68] font-bold">CLEARANCE LEVEL</div>
                <div className="font-bold text-[#56B6C6] mt-1">{user?.role}</div>
              </div>

              <div className="p-3 rounded-lg bg-[#FFFFFF] border border-[#8ACBD0]">
                <div className="text-[10px] text-[#2C2B68] font-bold">SECURITY ENCRYPTION</div>
                <div className="font-bold text-[#170C79] mt-1">SSL 256-Bit SHA-2</div>
              </div>

              <div className="p-3 rounded-lg bg-[#FFFFFF] border border-[#8ACBD0]">
                <div className="text-[10px] text-[#2C2B68] font-bold">LAST LOGIN SESSION</div>
                <div className="font-bold text-[#170C79] mt-1">{user?.lastLogin}</div>
              </div>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#170C79]/70 backdrop-blur-md animate-in fade-in select-none">
      <div className="relative w-full max-w-2xl bg-[#8ACBD0] rounded-2xl p-2 border-2 border-[#56B6C6]/60 shadow-2xl font-mono-tech overflow-hidden">
        {/* Top Window Bezel with Micro-Rivets */}
        <div className="flex items-center justify-between px-3 pt-2 pb-1.5">
          <div className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-[#170C79]/40"></span>
            <span className="w-1.5 h-1.5 rounded-full bg-[#170C79]/40"></span>
          </div>

          <span className="text-[9px] uppercase tracking-widest text-[#170C79] font-bold">
            KMRL OPERATIONS CONSOLE • SIH 2026
          </span>

          <button
            onClick={onClose}
            className="p-1 rounded hover:bg-[#56B6C6] text-[#170C79] transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Inner Inset Viewport */}
        <div className="bg-[#EFE3CA] rounded-xl p-5 border border-[#8ACBD0] shadow-inner space-y-4">
          {renderContent()}

          <div className="pt-3 border-t border-[#8ACBD0] flex items-center justify-between text-[10px] font-mono-tech text-[#2C2B68]">
            <span>KOCHI METRO RAIL LIMITED • AI INDUCTION PLATFORM</span>
            <button
              onClick={onClose}
              className="px-4 py-1.5 rounded-lg bg-[#170C79] hover:bg-[#56B6C6] hover:text-[#170C79] text-[#EFE3CA] font-bold text-xs transition-colors cursor-pointer"
            >
              CLOSE CONSOLE
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
