import React, { useState } from 'react';
import { Train } from '../../types/simulation';
import { 
  X, 
  Gauge, 
  Thermometer, 
  Zap, 
  Shield, 
  Radio, 
  Cpu, 
  Activity, 
  Wrench, 
  Building2, 
  AlertTriangle,
  ArrowRight,
  CheckCircle2
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

interface TrainDetailDrawerProps {
  train: Train | null;
  onClose: () => void;
  onRunOptimization?: () => void;
  onDeployRecommendation?: (id: string) => void;
}

export const TrainDetailDrawer: React.FC<TrainDetailDrawerProps> = ({ 
  train, 
  onClose,
  onRunOptimization
}) => {
  const { user, checkPermission } = useAuth();
  const [actionSuccessMessage, setActionSuccessMessage] = useState<string | null>(null);

  if (!train) return null;

  const loadPercentage = Math.round((train.passengerLoad / train.capacity) * 100);

  const getStatusColor = (status: Train['status']) => {
    switch (status) {
      case 'IN_SERVICE': return { bg: 'bg-[#2E8B57]/15', text: 'text-[#2E8B57]', border: 'border-[#2E8B57]/40', stripe: '#2E8B57', label: 'IN SERVICE' };
      case 'INDUCTING': return { bg: 'bg-[#56B6C6]/20', text: 'text-[#170C79]', border: 'border-[#56B6C6]/50', stripe: '#56B6C6', label: 'AI INDUCTING' };
      case 'READY_INDUCTION': return { bg: 'bg-[#D9A24B]/20', text: 'text-[#170C79]', border: 'border-[#D9A24B]/50', stripe: '#D9A24B', label: 'HOT RESERVE' };
      case 'STANDBY': return { bg: 'bg-[#8ACBD0]/30', text: 'text-[#170C79]', border: 'border-[#8ACBD0]', stripe: '#8ACBD0', label: 'DEPOT STANDBY' };
      case 'MAINTENANCE': return { bg: 'bg-[#C53030]/15', text: 'text-[#C53030]', border: 'border-[#C53030]/40', stripe: '#C53030', label: 'MAINTENANCE' };
      default: return { bg: 'bg-[#EFE3CA]', text: 'text-[#2C2B68]', border: 'border-[#8ACBD0]', stripe: '#170C79', label: status };
    }
  };

  const statusStyle = getStatusColor(train.status);

  const handleTriggerAI = () => {
    if (checkPermission('canTriggerAI', 'AI TRAIN OPTIMIZATION', 'Only OCC Operators and Managers can trigger real-time AI optimization.')) {
      if (onRunOptimization) onRunOptimization();
      setActionSuccessMessage('AI Multi-Objective Pareto Solver dispatched for this unit.');
      setTimeout(() => setActionSuccessMessage(null), 3500);
    }
  };

  const handleMaintenanceLog = () => {
    setActionSuccessMessage(`Maintenance inspection logged for ${train.id} under Muttom Depot Bay 2.`);
    setTimeout(() => setActionSuccessMessage(null), 3500);
  };

  return (
    <div className="fixed inset-y-0 right-0 z-50 w-full max-w-lg bg-[#EFE3CA] border-l-2 border-[#8ACBD0] shadow-2xl p-4 sm:p-6 flex flex-col justify-between font-mono-tech select-none animate-in slide-in-from-right duration-300 overflow-y-auto">
      <div className="space-y-4">
        {/* Drawer Header with Train-Window Bezel */}
        <div className="flex items-center justify-between pb-3 border-b border-[#8ACBD0]">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-[#170C79] border-2 border-[#56B6C6]/60 flex items-center justify-center font-mono-tech font-bold text-[#EFE3CA] text-2xl shadow-md flex-shrink-0">
              {train.id}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-mono-tech font-bold text-base sm:text-lg text-[#170C79] uppercase tracking-wide">
                  {train.name}
                </h3>
                <span className={`text-[8.5px] font-bold px-2 py-0.5 rounded border uppercase ${statusStyle.bg} ${statusStyle.text} ${statusStyle.border}`}>
                  {statusStyle.label}
                </span>
              </div>
              <span className="font-inter text-xs text-[#2C2B68] font-medium block">
                ALSTOM METROPOLIS • 3-CAR EMU (DMC-TC-DMC)
              </span>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg bg-[#FFFFFF] hover:bg-[#8ACBD0] text-[#170C79] transition-colors cursor-pointer border border-[#8ACBD0]"
            aria-label="Close train profile"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Clean Train Silhouette / Schematic Diagram */}
        <div className="p-3 bg-[#FFFFFF] rounded-xl border border-[#8ACBD0] shadow-xs">
          <div className="flex justify-between items-center text-[10px] text-[#2C2B68] font-bold mb-1">
            <span>ROLLING STOCK FORMATION</span>
            <span className="text-[#170C79] font-mono-tech">750V DC THIRD RAIL • GoA2</span>
          </div>

          <svg viewBox="0 0 460 70" className="w-full h-auto select-none py-1">
            <defs>
              <linearGradient id="winTintProfile" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#8ACBD0" />
                <stop offset="100%" stopColor="#56B6C6" />
              </linearGradient>
            </defs>

            {/* Track Line */}
            <line x1="10" y1="58" x2="450" y2="58" stroke="#8ACBD0" strokeWidth="3" />
            <line x1="10" y1="58" x2="450" y2="58" stroke="#170C79" strokeWidth="1" />

            {/* Car 1 DMC-A */}
            <g>
              <circle cx="35" cy="56" r="4.5" fill="#170C79" />
              <circle cx="50" cy="56" r="4.5" fill="#170C79" />
              <circle cx="110" cy="56" r="4.5" fill="#170C79" />
              <circle cx="125" cy="56" r="4.5" fill="#170C79" />
              <path d="M 20 52 L 20 28 Q 20 20 32 18 L 140 18 L 140 52 Z" fill="#FFFFFF" stroke="#170C79" strokeWidth="1.5" />
              <path d="M 20 30 Q 12 40 18 52 Z" fill={statusStyle.stripe} />
              <rect x="22" y="32" width="14" height="7" rx="1" fill="#170C79" />
              <text x="29" y="37.5" fill="#EFE3CA" fontSize="5" fontWeight="bold" fontFamily="JetBrains Mono" textAnchor="middle">{train.id}</text>
              <rect x="22" y="44" width="118" height="3" fill="#170C79" />
              <rect x="22" y="47" width="118" height="1.5" fill={statusStyle.stripe} />
              <rect x="42" y="24" width="14" height="14" rx="1" fill="url(#winTintProfile)" stroke="#170C79" strokeWidth="0.5" />
              <rect x="62" y="24" width="14" height="14" rx="1" fill="url(#winTintProfile)" stroke="#170C79" strokeWidth="0.5" />
              <rect x="82" y="24" width="14" height="14" rx="1" fill="url(#winTintProfile)" stroke="#170C79" strokeWidth="0.5" />
              <rect x="102" y="24" width="14" height="14" rx="1" fill="url(#winTintProfile)" stroke="#170C79" strokeWidth="0.5" />
              <rect x="122" y="24" width="12" height="14" rx="1" fill="url(#winTintProfile)" stroke="#170C79" strokeWidth="0.5" />
              <text x="80" y="14" fill="#170C79" fontSize="6.5" fontWeight="bold" fontFamily="JetBrains Mono" textAnchor="middle">CAR 1 (DMC-A)</text>
            </g>

            {/* Gangway 1-2 */}
            <rect x="140" y="26" width="6" height="24" fill="#170C79" />

            {/* Car 2 TC (Trailer Coach) */}
            <g>
              <path d="M 215 18 L 225 6 L 235 6 L 245 18" fill="none" stroke={statusStyle.stripe} strokeWidth="1.5" />
              <line x1="222" y1="5" x2="238" y2="5" stroke="#170C79" strokeWidth="2" />
              <circle cx="165" cy="56" r="4.5" fill="#170C79" />
              <circle cx="180" cy="56" r="4.5" fill="#170C79" />
              <circle cx="275" cy="56" r="4.5" fill="#170C79" />
              <circle cx="290" cy="56" r="4.5" fill="#170C79" />
              <rect x="146" y="18" width="154" height="34" rx="2" fill="#FFFFFF" stroke="#170C79" strokeWidth="1.5" />
              <rect x="146" y="44" width="154" height="3" fill="#170C79" />
              <rect x="146" y="47" width="154" height="1.5" fill={statusStyle.stripe} />
              <rect x="156" y="24" width="14" height="14" rx="1" fill="url(#winTintProfile)" stroke="#170C79" strokeWidth="0.5" />
              <rect x="176" y="24" width="14" height="14" rx="1" fill="url(#winTintProfile)" stroke="#170C79" strokeWidth="0.5" />
              <rect x="196" y="24" width="14" height="14" rx="1" fill="url(#winTintProfile)" stroke="#170C79" strokeWidth="0.5" />
              <rect x="236" y="24" width="14" height="14" rx="1" fill="url(#winTintProfile)" stroke="#170C79" strokeWidth="0.5" />
              <rect x="256" y="24" width="14" height="14" rx="1" fill="url(#winTintProfile)" stroke="#170C79" strokeWidth="0.5" />
              <rect x="276" y="24" width="14" height="14" rx="1" fill="url(#winTintProfile)" stroke="#170C79" strokeWidth="0.5" />
              <text x="223" y="14" fill="#170C79" fontSize="6.5" fontWeight="bold" fontFamily="JetBrains Mono" textAnchor="middle">CAR 2 (TRAILER)</text>
            </g>

            {/* Gangway 2-3 */}
            <rect x="300" y="26" width="6" height="24" fill="#170C79" />

            {/* Car 3 DMC-B */}
            <g>
              <circle cx="325" cy="56" r="4.5" fill="#170C79" />
              <circle cx="340" cy="56" r="4.5" fill="#170C79" />
              <circle cx="400" cy="56" r="4.5" fill="#170C79" />
              <circle cx="415" cy="56" r="4.5" fill="#170C79" />
              <path d="M 306 18 L 414 18 Q 426 20 426 28 L 426 52 L 306 52 Z" fill="#FFFFFF" stroke="#170C79" strokeWidth="1.5" />
              <path d="M 426 30 Q 434 40 428 52 Z" fill={statusStyle.stripe} />
              <rect x="410" y="32" width="14" height="7" rx="1" fill="#170C79" />
              <text x="417" y="37.5" fill="#EFE3CA" fontSize="5" fontWeight="bold" fontFamily="JetBrains Mono" textAnchor="middle">{train.id}</text>
              <rect x="306" y="44" width="120" height="3" fill="#170C79" />
              <rect x="306" y="47" width="120" height="1.5" fill={statusStyle.stripe} />
              <rect x="312" y="24" width="12" height="14" rx="1" fill="url(#winTintProfile)" stroke="#170C79" strokeWidth="0.5" />
              <rect x="330" y="24" width="14" height="14" rx="1" fill="url(#winTintProfile)" stroke="#170C79" strokeWidth="0.5" />
              <rect x="350" y="24" width="14" height="14" rx="1" fill="url(#winTintProfile)" stroke="#170C79" strokeWidth="0.5" />
              <rect x="370" y="24" width="14" height="14" rx="1" fill="url(#winTintProfile)" stroke="#170C79" strokeWidth="0.5" />
              <rect x="390" y="24" width="14" height="14" rx="1" fill="url(#winTintProfile)" stroke="#170C79" strokeWidth="0.5" />
              <text x="366" y="14" fill="#170C79" fontSize="6.5" fontWeight="bold" fontFamily="JetBrains Mono" textAnchor="middle">CAR 3 (DMC-B)</text>
            </g>
          </svg>
        </div>

        {/* Action feedback banner if any */}
        {actionSuccessMessage && (
          <div className="p-2.5 rounded-lg bg-[#2E8B57]/15 border border-[#2E8B57]/40 text-[#2E8B57] text-xs flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 flex-shrink-0" />
            <span className="font-bold">{actionSuccessMessage}</span>
          </div>
        )}

        {/* Core Live Telemetry Grid */}
        <div className="space-y-2">
          <span className="text-[10px] uppercase tracking-wider text-[#170C79] font-bold block">
            LIVE SENSOR TELEMETRY
          </span>

          <div className="grid grid-cols-2 gap-2.5">
            <div className="p-2.5 rounded-lg bg-[#FFFFFF] border border-[#8ACBD0] shadow-xs">
              <div className="flex items-center gap-1.5 text-[#2C2B68] text-[9.5px] mb-0.5 font-bold">
                <Gauge className="w-3.5 h-3.5 text-[#56B6C6]" />
                <span>VELOCITY</span>
              </div>
              <span className="font-mono-tech font-bold text-lg text-[#170C79]">
                {train.speedKmh} <span className="text-xs font-medium text-[#2C2B68]">km/h</span>
              </span>
            </div>

            <div className="p-2.5 rounded-lg bg-[#FFFFFF] border border-[#8ACBD0] shadow-xs">
              <div className="flex items-center gap-1.5 text-[#2C2B68] text-[9.5px] mb-0.5 font-bold">
                <Thermometer className="w-3.5 h-3.5 text-[#56B6C6]" />
                <span>TRACTION MOTOR</span>
              </div>
              <span className={`font-mono-tech font-bold text-lg ${train.motorTempC > 70 ? 'text-[#C53030]' : 'text-[#170C79]'}`}>
                {train.motorTempC}° <span className="text-xs font-medium text-[#2C2B68]">C</span>
              </span>
            </div>

            <div className="p-2.5 rounded-lg bg-[#FFFFFF] border border-[#8ACBD0] shadow-xs">
              <div className="flex items-center gap-1.5 text-[#2C2B68] text-[9.5px] mb-0.5 font-bold">
                <Zap className="w-3.5 h-3.5 text-[#56B6C6]" />
                <span>POWER DRAW</span>
              </div>
              <span className="font-mono-tech font-bold text-lg text-[#170C79]">
                {train.energyConsumptionKwh} <span className="text-xs font-medium text-[#2C2B68]">kWh</span>
              </span>
            </div>

            <div className="p-2.5 rounded-lg bg-[#FFFFFF] border border-[#8ACBD0] shadow-xs">
              <div className="flex items-center gap-1.5 text-[#2C2B68] text-[9.5px] mb-0.5 font-bold">
                <Shield className="w-3.5 h-3.5 text-[#56B6C6]" />
                <span>HEALTH SCORE</span>
              </div>
              <span className={`font-mono-tech font-bold text-lg ${train.healthScorePct < 80 ? 'text-[#C53030]' : 'text-[#170C79]'}`}>
                {train.healthScorePct}%
              </span>
            </div>
          </div>

          {/* Passenger Capacity Gauge */}
          <div className="p-3 rounded-xl bg-[#FFFFFF] border border-[#8ACBD0] space-y-1.5 shadow-xs">
            <div className="flex justify-between text-xs">
              <span className="text-[#2C2B68] font-bold text-[10px]">PASSENGER OCCUPANCY</span>
              <span className="font-bold text-[#170C79]">
                {train.passengerLoad} / {train.capacity} PAX ({loadPercentage}%)
              </span>
            </div>
            <div className="w-full h-2 bg-[#8ACBD0] rounded-full overflow-hidden">
              <div
                className={`h-full rounded-full transition-all duration-300 ${
                  loadPercentage > 85 ? 'bg-[#C53030]' : 'bg-[#56B6C6]'
                }`}
                style={{ width: `${loadPercentage}%` }}
              ></div>
            </div>
          </div>

          {/* Operational Route Details */}
          <div className="p-3 rounded-lg bg-[#FFFFFF] border border-[#8ACBD0] text-xs space-y-1.5 shadow-xs">
            <div className="flex justify-between">
              <span className="text-[#2C2B68] font-bold">CURRENT POSITION:</span>
              <span className="text-[#170C79] font-bold">{train.location}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[#2C2B68] font-bold">CORRIDOR DIRECTION:</span>
              <span className="text-[#170C79] font-bold">
                {train.direction === 'DOWN' ? 'SOUTHBOUND (Tripunithura)' : 'NORTHBOUND (Aluva)'}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-[#2C2B68] font-bold">CBTC AUTOMATION:</span>
              <span className="text-[#56B6C6] font-bold">{train.driverStatus} (GoA2)</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[#2C2B68] font-bold">ASSIGNED SIDING:</span>
              <span className="text-[#170C79] font-bold">{train.assignedRoute}</span>
            </div>
          </div>
        </div>

        {/* Role-Based Operational Controls */}
        <div className="space-y-2 pt-1">
          <span className="text-[10px] uppercase tracking-wider text-[#170C79] font-bold block">
            ROLE OPERATIONAL ACTIONS
          </span>

          <div className="grid grid-cols-1 gap-2">
            {(user?.role === 'OPERATOR' || user?.role === 'OPERATIONS_MANAGER' || user?.role === 'ADMINISTRATOR') ? (
              <button
                onClick={handleTriggerAI}
                className="w-full py-2.5 px-3 rounded-xl bg-[#170C79] hover:bg-[#56B6C6] hover:text-[#170C79] text-[#EFE3CA] font-mono-tech font-bold text-xs uppercase tracking-wider transition-colors cursor-pointer flex items-center justify-center gap-2 shadow-xs"
              >
                <Cpu className="w-4 h-4 text-[#56B6C6]" />
                <span>TRIGGER AI PARETO OPTIMIZATION</span>
              </button>
            ) : user?.role === 'MAINTENANCE' ? (
              <button
                onClick={handleMaintenanceLog}
                className="w-full py-2.5 px-3 rounded-xl bg-[#170C79] hover:bg-[#56B6C6] hover:text-[#170C79] text-[#EFE3CA] font-mono-tech font-bold text-xs uppercase tracking-wider transition-colors cursor-pointer flex items-center justify-center gap-2 shadow-xs"
              >
                <Wrench className="w-4 h-4 text-[#56B6C6]" />
                <span>LOG DEPOT BOGIE WORK ORDER</span>
              </button>
            ) : (
              <div className="p-2.5 rounded-lg bg-[#FFFFFF] border border-[#8ACBD0] text-center text-xs text-[#2C2B68]">
                Read-Only Telemetry Monitor Active ({user?.roleTitle || 'OCC Guest'})
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Footer Close Action */}
      <div className="pt-3 mt-4 border-t border-[#8ACBD0]">
        <button
          onClick={onClose}
          className="w-full py-2.5 rounded-xl bg-[#FFFFFF] hover:bg-[#8ACBD0] border border-[#8ACBD0] text-[#170C79] font-mono-tech font-bold text-xs uppercase tracking-wider transition-colors cursor-pointer text-center"
        >
          CLOSE TRAIN PROFILE
        </button>
      </div>
    </div>
  );
};
