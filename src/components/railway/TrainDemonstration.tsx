import React, { useState } from 'react';
import { Train } from '../../types/simulation';
import { Train as TrainIcon, Gauge, Thermometer, Zap, Shield, ChevronRight, Activity, Radio, Cpu } from 'lucide-react';

interface TrainDemonstrationProps {
  trains: Train[];
  selectedTrain: Train | null;
  onSelectTrain: (train: Train) => void;
}

export const TrainDemonstration: React.FC<TrainDemonstrationProps> = ({
  trains,
  selectedTrain,
  onSelectTrain
}) => {
  // If no train is selected, default to the first active/inducting train or T01
  const activeTrain = selectedTrain || trains.find(t => t.status === 'IN_SERVICE' || t.status === 'INDUCTING') || trains[0];
  const [activeCarriageTab, setActiveCarriageTab] = useState<'DMC1' | 'TC' | 'DMC2'>('DMC1');

  if (!activeTrain) return null;

  const loadPct = Math.round((activeTrain.passengerLoad / activeTrain.capacity) * 100);

  const getStatusColor = (status: Train['status']) => {
    switch (status) {
      case 'IN_SERVICE': return { bg: 'bg-[#2E8B57]/15', text: 'text-[#2E8B57]', border: 'border-[#2E8B57]/40', label: 'IN SERVICE' };
      case 'INDUCTING': return { bg: 'bg-[#56B6C6]/20', text: 'text-[#170C79]', border: 'border-[#56B6C6]/50', label: 'AI INDUCTING' };
      case 'READY_INDUCTION': return { bg: 'bg-[#56B6C6]/20', text: 'text-[#170C79]', border: 'border-[#56B6C6]/50', label: 'HOT RESERVE' };
      case 'STANDBY': return { bg: 'bg-[#8ACBD0]/30', text: 'text-[#170C79]', border: 'border-[#8ACBD0]', label: 'DEPOT STANDBY' };
      case 'MAINTENANCE': return { bg: 'bg-[#C53030]/15', text: 'text-[#C53030]', border: 'border-[#C53030]/40', label: 'MAINTENANCE' };
      default: return { bg: 'bg-[#EFE3CA]', text: 'text-[#2C2B68]', border: 'border-[#8ACBD0]', label: status };
    }
  };

  const statusStyle = getStatusColor(activeTrain.status);

  return (
    <div className="w-full rounded-2xl bg-[#8ACBD0] border-2 border-[#56B6C6]/50 p-2 shadow-sm space-y-3">
      {/* Top Window Bezel with Micro-Rivets & Master Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 px-3 pt-2 pb-1">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 mr-1">
            <span className="w-1.5 h-1.5 rounded-full bg-[#170C79]/40"></span>
            <span className="w-1.5 h-1.5 rounded-full bg-[#170C79]/40"></span>
          </div>

          <div className="p-2 rounded-lg bg-[#EFE3CA] border border-[#8ACBD0] text-[#170C79]">
            <TrainIcon className="w-4 h-4 text-[#56B6C6]" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-mono-tech font-bold text-sm md:text-base text-[#170C79] uppercase tracking-wide">
                ALSTOM METROPOLIS ROLLING STOCK ARCHITECTURE
              </h3>
              <span className="text-[9px] font-mono-tech px-2 py-0.5 rounded bg-[#EFE3CA] text-[#170C79] border border-[#8ACBD0] font-bold">
                GoA2 CBTC • 750V DC
              </span>
            </div>
            <p className="font-inter text-xs text-[#2C2B68] font-medium">
              Spatial trainset breakdown • Real-time telemetry, passenger distribution & traction sub-systems
            </p>
          </div>
        </div>

        {/* Quick Train Selector Strip */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 font-mono-tech text-xs">
          {trains.map((t) => (
            <button
              key={t.id}
              onClick={() => onSelectTrain(t)}
              className={`px-2.5 py-1 rounded-lg font-bold transition-all cursor-pointer text-xs flex items-center gap-1 ${
                activeTrain.id === t.id
                  ? 'bg-[#170C79] text-[#EFE3CA] shadow-xs'
                  : 'bg-[#EFE3CA] text-[#2C2B68] hover:text-[#170C79] hover:bg-[#FFFFFF] border border-[#8ACBD0]'
              }`}
            >
              <span>{t.id}</span>
              <span className={`w-1.5 h-1.5 rounded-full ${t.status === 'IN_SERVICE' ? 'bg-[#2E8B57]' : t.status === 'INDUCTING' ? 'bg-[#56B6C6]' : 'bg-[#170C79]/40'}`}></span>
            </button>
          ))}

          <div className="flex items-center gap-1.5 ml-1">
            <span className="w-1.5 h-1.5 rounded-full bg-[#170C79]/40"></span>
            <span className="w-1.5 h-1.5 rounded-full bg-[#170C79]/40"></span>
          </div>
        </div>
      </div>

      {/* Main Expansive Inset Pane — Clear 2-Zone Separation: Left Info & Right Visual */}
      <div className="bg-[#EFE3CA] rounded-xl p-4 md:p-6 border border-[#8ACBD0] shadow-inner">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          {/* ZONE 1: TRAIN INFORMATION DECK (4 COLS) */}
          <div className="lg:col-span-4 bg-[#FFFFFF] rounded-xl p-4 md:p-5 border border-[#8ACBD0] flex flex-col justify-between space-y-4 shadow-xs">
            <div>
              {/* Header Title & Status */}
              <div className="flex items-center justify-between pb-3 border-b border-[#8ACBD0]/40">
                <div className="flex items-center gap-2.5">
                  <div className="w-10 h-10 rounded-xl bg-[#170C79] border border-[#56B6C6]/40 flex items-center justify-center font-mono-tech font-bold text-[#EFE3CA] text-xl shadow-xs">
                    {activeTrain.id}
                  </div>
                  <div>
                    <h4 className="font-mono-tech font-bold text-base text-[#170C79]">
                      {activeTrain.name}
                    </h4>
                    <span className="font-inter text-xs text-[#2C2B68] font-medium block">
                      3-Car EMU Formation (DMC-TC-DMC)
                    </span>
                  </div>
                </div>

                <span className={`text-[9px] font-mono-tech font-bold px-2.5 py-1 rounded border uppercase ${statusStyle.bg} ${statusStyle.text} ${statusStyle.border}`}>
                  {statusStyle.label}
                </span>
              </div>

              {/* Core Telemetry Indicators Grid */}
              <div className="grid grid-cols-2 gap-2.5 my-3.5 font-mono-tech">
                <div className="p-2.5 rounded-lg bg-[#F6F1E6] border border-[#8ACBD0]">
                  <div className="flex items-center gap-1.5 text-[9.5px] text-[#2C2B68] font-bold mb-0.5">
                    <Gauge className="w-3.5 h-3.5 text-[#56B6C6]" />
                    <span>VELOCITY</span>
                  </div>
                  <span className="text-base font-bold text-[#170C79]">
                    {activeTrain.speedKmh} <span className="text-xs font-medium text-[#2C2B68]">km/h</span>
                  </span>
                </div>

                <div className="p-2.5 rounded-lg bg-[#F6F1E6] border border-[#8ACBD0]">
                  <div className="flex items-center gap-1.5 text-[9.5px] text-[#2C2B68] font-bold mb-0.5">
                    <Thermometer className="w-3.5 h-3.5 text-[#56B6C6]" />
                    <span>TRACTION MOTOR</span>
                  </div>
                  <span className={`text-base font-bold ${activeTrain.motorTempC > 70 ? 'text-[#C53030]' : 'text-[#170C79]'}`}>
                    {activeTrain.motorTempC}° <span className="text-xs font-medium text-[#2C2B68]">C</span>
                  </span>
                </div>

                <div className="p-2.5 rounded-lg bg-[#F6F1E6] border border-[#8ACBD0]">
                  <div className="flex items-center gap-1.5 text-[9.5px] text-[#2C2B68] font-bold mb-0.5">
                    <Zap className="w-3.5 h-3.5 text-[#56B6C6]" />
                    <span>POWER DRAW</span>
                  </div>
                  <span className="text-base font-bold text-[#170C79]">
                    {activeTrain.energyConsumptionKwh} <span className="text-xs font-medium text-[#2C2B68]">kWh</span>
                  </span>
                </div>

                <div className="p-2.5 rounded-lg bg-[#F6F1E6] border border-[#8ACBD0]">
                  <div className="flex items-center gap-1.5 text-[9.5px] text-[#2C2B68] font-bold mb-0.5">
                    <Shield className="w-3.5 h-3.5 text-[#56B6C6]" />
                    <span>HEALTH SCORE</span>
                  </div>
                  <span className="text-base font-bold text-[#170C79]">
                    {activeTrain.healthScorePct}%
                  </span>
                </div>
              </div>

              {/* Occupancy & Load Factor Progress */}
              <div className="p-3 rounded-lg bg-[#F6F1E6] border border-[#8ACBD0] space-y-1.5">
                <div className="flex justify-between text-xs font-mono-tech">
                  <span className="text-[#2C2B68] font-bold text-[10px]">PASSENGER OCCUPANCY</span>
                  <span className="font-bold text-[#170C79]">
                    {activeTrain.passengerLoad} / {activeTrain.capacity} PAX ({loadPct}%)
                  </span>
                </div>
                <div className="w-full h-2 bg-[#8ACBD0] rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all duration-300 ${
                      loadPct > 85 ? 'bg-[#C53030]' : 'bg-[#56B6C6]'
                    }`}
                    style={{ width: `${loadPct}%` }}
                  ></div>
                </div>
              </div>

              {/* Route & Block Information */}
              <div className="mt-3 text-xs font-mono-tech space-y-1.5 text-[#2C2B68]">
                <div className="flex justify-between">
                  <span className="font-bold">CURRENT BLOCK:</span>
                  <span className="text-[#170C79] font-bold">{activeTrain.location}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-bold">DIRECTION:</span>
                  <span className="text-[#170C79] font-bold">
                    {activeTrain.direction === 'DOWN' ? 'SOUTHBOUND (Tripunithura)' : 'NORTHBOUND (Aluva)'}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="font-bold">CBTC AUTOMATION:</span>
                  <span className="text-[#56B6C6] font-bold">{activeTrain.driverStatus} (GoA2)</span>
                </div>
              </div>
            </div>

            {/* Siding Dispatch Status Footer */}
            <div className="pt-3 border-t border-[#8ACBD0]/40 flex items-center justify-between text-[10px] font-mono-tech text-[#2C2B68]">
              <span>ALLOCATION ROUTE: {activeTrain.assignedRoute}</span>
              <span className="font-bold text-[#170C79]">MUTTOM DEPOT</span>
            </div>
          </div>

          {/* ZONE 2: SPACIOUS TRAIN VISUAL DEMONSTRATION & SCHEMATIC (8 COLS) */}
          <div className="lg:col-span-8 bg-[#FFFFFF] rounded-xl p-5 md:p-6 border border-[#8ACBD0] flex flex-col justify-between shadow-xs space-y-6">
            <div>
              {/* Visual Title and Carriage Selector Tabs */}
              <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-[#8ACBD0]/40">
                <div>
                  <span className="text-[10px] font-mono-tech uppercase tracking-wider text-[#56B6C6] font-bold block">
                    SPATIAL ENGINEERING VISUALIZATION
                  </span>
                  <h4 className="font-mono-tech font-bold text-sm md:text-base text-[#170C79]">
                    3-CAR TRAINSET FORMATION SCHEMATIC
                  </h4>
                </div>

                <div className="flex items-center gap-1 bg-[#F6F1E6] p-1 rounded-lg border border-[#8ACBD0] font-mono-tech text-xs">
                  {(['DMC1', 'TC', 'DMC2'] as const).map((tab) => (
                    <button
                      key={tab}
                      onClick={() => setActiveCarriageTab(tab)}
                      className={`px-3 py-1 rounded transition-colors cursor-pointer font-bold ${
                        activeCarriageTab === tab
                          ? 'bg-[#170C79] text-[#EFE3CA] shadow-xs'
                          : 'text-[#2C2B68] hover:text-[#170C79]'
                      }`}
                    >
                      {tab === 'DMC1' ? 'CAR 1 (DMC-A)' : tab === 'TC' ? 'CAR 2 (TRAILER)' : 'CAR 3 (DMC-B)'}
                    </button>
                  ))}
                </div>
              </div>

              {/* Spacious 3-Car Metro Train Illustration SVG with generous breathing room */}
              <div className="py-8 px-2 flex items-center justify-center">
                <svg
                  viewBox="0 0 760 180"
                  className="w-full max-w-[720px] h-auto select-none"
                >
                  <defs>
                    <linearGradient id="trainRoofGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#170C79" />
                      <stop offset="100%" stopColor="#22158E" />
                    </linearGradient>
                    <linearGradient id="windowTint" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#8ACBD0" />
                      <stop offset="100%" stopColor="#56B6C6" />
                    </linearGradient>
                  </defs>

                  {/* Ground Rail Track Line */}
                  <line x1="20" y1="150" x2="740" y2="150" stroke="#8ACBD0" strokeWidth="6" strokeLinecap="round" />
                  <line x1="20" y1="150" x2="740" y2="150" stroke="#170C79" strokeWidth="2" strokeLinecap="round" />

                  {/* Sleepers */}
                  {Array.from({ length: 36 }).map((_, i) => (
                    <line
                      key={`rail-tie-${i}`}
                      x1={30 + i * 20}
                      y1="145"
                      x2={30 + i * 20}
                      y2="155"
                      stroke="#170C79"
                      strokeWidth="1.5"
                      opacity="0.3"
                    />
                  ))}

                  {/* ================= CAR 1: DMC-A (Driving Motor Coach - Leading Cab) ================= */}
                  <g className={`transition-all duration-300 ${activeCarriageTab === 'DMC1' ? 'opacity-100 scale-[1.01]' : 'opacity-85'}`}>
                    {/* Bogie Wheels */}
                    <circle cx="80" cy="144" r="9" fill="#170C79" stroke="#8ACBD0" strokeWidth="2" />
                    <circle cx="110" cy="144" r="9" fill="#170C79" stroke="#8ACBD0" strokeWidth="2" />
                    <circle cx="200" cy="144" r="9" fill="#170C79" stroke="#8ACBD0" strokeWidth="2" />
                    <circle cx="230" cy="144" r="9" fill="#170C79" stroke="#8ACBD0" strokeWidth="2" />

                    {/* Carriage Body */}
                    <path
                      d="M 50 135 L 50 82 Q 50 68 70 65 L 250 65 L 250 135 Z"
                      fill="#FFFFFF"
                      stroke={activeCarriageTab === 'DMC1' ? '#56B6C6' : '#170C79'}
                      strokeWidth={activeCarriageTab === 'DMC1' ? '3' : '2'}
                    />

                    {/* Aerodynamic Nose Wedge */}
                    <path
                      d="M 50 85 Q 36 105 48 135 Z"
                      fill="#56B6C6"
                    />

                    {/* Metro Livery Stripe */}
                    <rect x="52" y="115" width="198" height="6" fill="#170C79" />
                    <rect x="52" y="121" width="198" height="3" fill="#56B6C6" />

                    {/* Windshield & Side Windows */}
                    <path d="M 52 82 Q 44 95 56 104 L 75 104 L 75 80 Z" fill="url(#windowTint)" stroke="#170C79" strokeWidth="1" />
                    <rect x="88" y="80" width="22" height="24" rx="2" fill="url(#windowTint)" stroke="#170C79" strokeWidth="0.8" />
                    <rect x="120" y="80" width="22" height="24" rx="2" fill="url(#windowTint)" stroke="#170C79" strokeWidth="0.8" />
                    <rect x="160" y="80" width="22" height="24" rx="2" fill="url(#windowTint)" stroke="#170C79" strokeWidth="0.8" />
                    <rect x="192" y="80" width="22" height="24" rx="2" fill="url(#windowTint)" stroke="#170C79" strokeWidth="0.8" />
                    <rect x="224" y="80" width="20" height="24" rx="2" fill="url(#windowTint)" stroke="#170C79" strokeWidth="0.8" />

                    {/* Passenger Doors */}
                    <rect x="146" y="75" width="10" height="60" fill="#EFE3CA" stroke="#170C79" strokeWidth="0.8" />

                    {/* Carriage Label */}
                    <text x="150" y="55" fill="#170C79" fontSize="9" fontWeight="bold" fontFamily="JetBrains Mono" textAnchor="middle">
                      CAR 1 (DMC-A)
                    </text>
                  </g>

                  {/* Gangway Coupler 1-2 */}
                  <rect x="251" y="85" width="8" height="45" fill="#170C79" opacity="0.85" rx="1" />

                  {/* ================= CAR 2: TC (Trailer Coach with Pantograph) ================= */}
                  <g className={`transition-all duration-300 ${activeCarriageTab === 'TC' ? 'opacity-100 scale-[1.01]' : 'opacity-85'}`}>
                    {/* Pantograph (Roof 750V DC Assembly) */}
                    <path
                      d="M 360 65 L 375 38 L 395 38 L 410 65"
                      fill="none"
                      stroke="#56B6C6"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                    />
                    <line x1="370" y1="36" x2="400" y2="36" stroke="#170C79" strokeWidth="3" />

                    {/* Bogie Wheels */}
                    <circle cx="295" cy="144" r="9" fill="#170C79" stroke="#8ACBD0" strokeWidth="2" />
                    <circle cx="325" cy="144" r="9" fill="#170C79" stroke="#8ACBD0" strokeWidth="2" />
                    <circle cx="445" cy="144" r="9" fill="#170C79" stroke="#8ACBD0" strokeWidth="2" />
                    <circle cx="475" cy="144" r="9" fill="#170C79" stroke="#8ACBD0" strokeWidth="2" />

                    {/* Carriage Body */}
                    <rect
                      x="260"
                      y="65"
                      width="250"
                      height="70"
                      rx="4"
                      fill="#FFFFFF"
                      stroke={activeCarriageTab === 'TC' ? '#56B6C6' : '#170C79'}
                      strokeWidth={activeCarriageTab === 'TC' ? '3' : '2'}
                    />

                    {/* Metro Livery Stripe */}
                    <rect x="260" y="115" width="250" height="6" fill="#170C79" />
                    <rect x="260" y="121" width="250" height="3" fill="#56B6C6" />

                    {/* Saloon Windows */}
                    <rect x="274" y="80" width="24" height="24" rx="2" fill="url(#windowTint)" stroke="#170C79" strokeWidth="0.8" />
                    <rect x="306" y="80" width="24" height="24" rx="2" fill="url(#windowTint)" stroke="#170C79" strokeWidth="0.8" />
                    <rect x="340" y="80" width="24" height="24" rx="2" fill="url(#windowTint)" stroke="#170C79" strokeWidth="0.8" />
                    <rect x="406" y="80" width="24" height="24" rx="2" fill="url(#windowTint)" stroke="#170C79" strokeWidth="0.8" />
                    <rect x="440" y="80" width="24" height="24" rx="2" fill="url(#windowTint)" stroke="#170C79" strokeWidth="0.8" />
                    <rect x="474" y="80" width="24" height="24" rx="2" fill="url(#windowTint)" stroke="#170C79" strokeWidth="0.8" />

                    {/* Saloon Doors */}
                    <rect x="374" y="75" width="20" height="60" fill="#EFE3CA" stroke="#170C79" strokeWidth="0.8" />

                    {/* Carriage Label */}
                    <text x="385" y="25" fill="#170C79" fontSize="9" fontWeight="bold" fontFamily="JetBrains Mono" textAnchor="middle">
                      CAR 2 (TRAILER COACH)
                    </text>
                  </g>

                  {/* Gangway Coupler 2-3 */}
                  <rect x="511" y="85" width="8" height="45" fill="#170C79" opacity="0.85" rx="1" />

                  {/* ================= CAR 3: DMC-B (Driving Motor Coach - Trailing Cab) ================= */}
                  <g className={`transition-all duration-300 ${activeCarriageTab === 'DMC2' ? 'opacity-100 scale-[1.01]' : 'opacity-85'}`}>
                    {/* Bogie Wheels */}
                    <circle cx="550" cy="144" r="9" fill="#170C79" stroke="#8ACBD0" strokeWidth="2" />
                    <circle cx="580" cy="144" r="9" fill="#170C79" stroke="#8ACBD0" strokeWidth="2" />
                    <circle cx="670" cy="144" r="9" fill="#170C79" stroke="#8ACBD0" strokeWidth="2" />
                    <circle cx="700" cy="144" r="9" fill="#170C79" stroke="#8ACBD0" strokeWidth="2" />

                    {/* Carriage Body */}
                    <path
                      d="M 520 65 L 700 65 Q 720 68 720 82 L 720 135 L 520 135 Z"
                      fill="#FFFFFF"
                      stroke={activeCarriageTab === 'DMC2' ? '#56B6C6' : '#170C79'}
                      strokeWidth={activeCarriageTab === 'DMC2' ? '3' : '2'}
                    />

                    {/* Aerodynamic Nose Wedge */}
                    <path
                      d="M 720 85 Q 734 105 722 135 Z"
                      fill="#56B6C6"
                    />

                    {/* Metro Livery Stripe */}
                    <rect x="520" y="115" width="198" height="6" fill="#170C79" />
                    <rect x="520" y="121" width="198" height="3" fill="#56B6C6" />

                    {/* Windows & Doors */}
                    <rect x="526" y="80" width="20" height="24" rx="2" fill="url(#windowTint)" stroke="#170C79" strokeWidth="0.8" />
                    <rect x="554" y="80" width="22" height="24" rx="2" fill="url(#windowTint)" stroke="#170C79" strokeWidth="0.8" />
                    <rect x="586" y="80" width="22" height="24" rx="2" fill="url(#windowTint)" stroke="#170C79" strokeWidth="0.8" />
                    <rect x="636" y="80" width="22" height="24" rx="2" fill="url(#windowTint)" stroke="#170C79" strokeWidth="0.8" />
                    <rect x="668" y="80" width="22" height="24" rx="2" fill="url(#windowTint)" stroke="#170C79" strokeWidth="0.8" />
                    <path d="M 718 82 Q 726 95 714 104 L 698 104 L 698 80 Z" fill="url(#windowTint)" stroke="#170C79" strokeWidth="1" />

                    {/* Doors */}
                    <rect x="614" y="75" width="10" height="60" fill="#EFE3CA" stroke="#170C79" strokeWidth="0.8" />

                    {/* Carriage Label */}
                    <text x="620" y="55" fill="#170C79" fontSize="9" fontWeight="bold" fontFamily="JetBrains Mono" textAnchor="middle">
                      CAR 3 (DMC-B)
                    </text>
                  </g>
                </svg>
              </div>

              {/* Spatial Engineering Callout Annotation Boxes (Zero Overlap with Train) */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-2 font-mono-tech text-xs">
                <div className="p-3 rounded-lg bg-[#F6F1E6] border border-[#8ACBD0] shadow-2xs space-y-1">
                  <div className="flex items-center gap-1.5 text-[#170C79] font-bold text-[10.5px]">
                    <Radio className="w-3.5 h-3.5 text-[#56B6C6]" />
                    <span>ALSTOM URBALIS 400</span>
                  </div>
                  <p className="font-inter text-[11px] text-[#2C2B68] leading-relaxed">
                    Continuous CBTC bidirectional radio link with automated ATP/ATO speed profiling.
                  </p>
                </div>

                <div className="p-3 rounded-lg bg-[#F6F1E6] border border-[#8ACBD0] shadow-2xs space-y-1">
                  <div className="flex items-center gap-1.5 text-[#170C79] font-bold text-[10.5px]">
                    <Zap className="w-3.5 h-3.5 text-[#56B6C6]" />
                    <span>750V DC THIRD RAIL</span>
                  </div>
                  <p className="font-inter text-[11px] text-[#2C2B68] leading-relaxed">
                    Bottom-contact third rail pickup shoes with regenerative traction braking recovery.
                  </p>
                </div>

                <div className="p-3 rounded-lg bg-[#F6F1E6] border border-[#8ACBD0] shadow-2xs space-y-1">
                  <div className="flex items-center gap-1.5 text-[#170C79] font-bold text-[10.5px]">
                    <Cpu className="w-3.5 h-3.5 text-[#56B6C6]" />
                    <span>DYNAMIC SIDING DISPATCH</span>
                  </div>
                  <p className="font-inter text-[11px] text-[#2C2B68] leading-relaxed">
                    AI-synchronized hot-reserve injection from Muttom Depot within 42ms solve latency.
                  </p>
                </div>
              </div>
            </div>

            {/* Bottom Live Telemetry Footnote */}
            <div className="pt-3 border-t border-[#8ACBD0]/40 flex flex-wrap items-center justify-between gap-2 text-[10px] font-mono-tech text-[#2C2B68]">
              <span>FORMATION: 3 CARS (66M LENGTH) • TARE WEIGHT: 104 TONNES</span>
              <span className="font-bold text-[#170C79]">MAX ACCELERATION: 1.0 M/S² • SAFE BRAKING: 1.2 M/S²</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
