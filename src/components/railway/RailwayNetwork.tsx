import React, { useState } from 'react';
import { Train, Station, CaseType } from '../../types/simulation';
import { TrainVehicle } from './TrainVehicle';
import { 
  Play, 
  Pause, 
  RotateCcw, 
  Clock, 
  Sparkles, 
  Radio, 
  Info 
} from 'lucide-react';

interface RailwayNetworkProps {
  trains: Train[];
  stations: Station[];
  currentCase: CaseType;
  onSelectTrain: (train: Train) => void;
  onSelectStation: (station: Station) => void;
  selectedTrain: Train | null;
  selectedStation: Station | null;
  isOptimizing: boolean;
  // Side Controls Props
  simTime: string;
  simSeconds: number;
  isPlaying: boolean;
  onTogglePlay: () => void;
  simSpeed: number;
  onSetSpeed: (speed: number) => void;
  onReset: () => void;
  onRunOptimization: () => void;
}

export const RailwayNetwork: React.FC<RailwayNetworkProps> = ({
  trains,
  stations,
  onSelectTrain,
  onSelectStation,
  selectedTrain,
  selectedStation,
  isOptimizing,
  simTime,
  simSeconds,
  isPlaying,
  onTogglePlay,
  simSpeed,
  onSetSpeed,
  onReset,
  onRunOptimization
}) => {
  const [hoveredStation, setHoveredStation] = useState<Station | null>(null);

  // Scaled coordinates on the expanded 1200x520 SVG map
  // Mainline Down Line is at Y=230, Up Line is at Y=350, Station centers at Y=290
  const stationCoords: Record<string, { x: number; y: number }> = {
    DEPOT: { x: 120, y: 95 },
    ALUVA: { x: 200, y: 290 },
    KALAMASSERY: { x: 390, y: 290 },
    EDAPPALLY: { x: 580, y: 290 },
    KALOOR: { x: 770, y: 290 },
    MG_ROAD: { x: 960, y: 290 },
    TRIPUNITHURA: { x: 1120, y: 290 }
  };

  // Timeline Progress Calculation (08:00 to 09:30)
  const startSeconds = 8 * 3600;
  const endSeconds = 9.5 * 3600;
  const progressPct = Math.max(0, Math.min(100, ((simSeconds - startSeconds) / (endSeconds - startSeconds)) * 100));

  return (
    <div className="w-full rounded-2xl bg-[#8ACBD0] border-2 border-[#56B6C6]/50 p-2 shadow-sm space-y-2">
      {/* Top Window Bezel with Micro-Rivets & Master Deck Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 px-3 pt-2 pb-2">
        <div className="flex items-center gap-3">
          {/* Bezel Micro-Rivets */}
          <div className="flex items-center gap-1.5 mr-1">
            <span className="w-1.5 h-1.5 rounded-full bg-[#170C79]/40"></span>
            <span className="w-1.5 h-1.5 rounded-full bg-[#170C79]/40"></span>
          </div>

          <div className="p-2 rounded-lg bg-[#EFE3CA] border border-[#8ACBD0] text-[#170C79]">
            <Radio className="w-4 h-4 text-[#56B6C6]" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="font-mono-tech font-bold text-sm md:text-base text-[#170C79] tracking-wide uppercase">
                KMRL MAINLINE & DEPOT OPERATIONS MAP
              </h2>
              <span className="text-[9px] font-mono-tech px-2 py-0.5 rounded bg-[#EFE3CA] text-[#170C79] border border-[#8ACBD0] font-bold">
                LINE 1 • 25.6 KM
              </span>
            </div>
            <p className="font-inter text-xs text-[#2C2B68] font-medium">
              Interactive high-resolution corridor schematic • Real-time train positions & siding induction
            </p>
          </div>
        </div>

        {/* Status Legend (Color Hunt Palette) */}
        <div className="flex flex-wrap items-center gap-2 text-xs font-mono-tech">
          <div className="flex items-center gap-1.5 bg-[#EFE3CA] px-2.5 py-1 rounded border border-[#8ACBD0]">
            <span className="w-2 h-2 rounded-full bg-[#2E8B57]"></span>
            <span className="text-[#170C79] font-bold text-[10px]">In Service</span>
          </div>
          <div className="flex items-center gap-1.5 bg-[#EFE3CA] px-2.5 py-1 rounded border border-[#8ACBD0]">
            <span className="w-2 h-2 rounded-full bg-[#56B6C6]"></span>
            <span className="text-[#170C79] font-bold text-[10px]">AI Inducting</span>
          </div>
          <div className="flex items-center gap-1.5 bg-[#EFE3CA] px-2.5 py-1 rounded border border-[#8ACBD0]">
            <span className="w-2 h-2 rounded-full bg-[#170C79]"></span>
            <span className="text-[#170C79] font-bold text-[10px]">Standby Depot</span>
          </div>
          <div className="flex items-center gap-1.5 bg-[#EFE3CA] px-2.5 py-1 rounded border border-[#8ACBD0]">
            <span className="w-2 h-2 rounded-full bg-[#C53030]"></span>
            <span className="text-[#170C79] font-bold text-[10px]">Maintenance</span>
          </div>

          {/* Right Bezel Micro-Rivets */}
          <div className="flex items-center gap-1.5 ml-1">
            <span className="w-1.5 h-1.5 rounded-full bg-[#170C79]/40"></span>
            <span className="w-1.5 h-1.5 rounded-full bg-[#170C79]/40"></span>
          </div>
        </div>
      </div>

      {/* Main Expansive Layout: Big SVG Canvas + Integrated Side Controls Panel */}
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-3 items-stretch">
        {/* Dominant Large Railway Simulation Canvas (9 Cols) */}
        <div className="xl:col-span-9 relative bg-[#EFE3CA] rounded-xl border border-[#8ACBD0] p-3 overflow-x-auto min-h-[500px] flex items-center shadow-inner">
          <div className="w-full min-w-[1040px] relative">
            <svg
              viewBox="0 0 1200 520"
              className="w-full h-auto select-none"
              style={{ minHeight: '460px' }}
            >
              <defs>
                {/* Clean Indigo & Cyan Track Gradients */}
                <linearGradient id="mainlineStroke" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#170C79" stopOpacity="0.9" />
                  <stop offset="50%" stopColor="#56B6C6" stopOpacity="0.95" />
                  <stop offset="100%" stopColor="#170C79" stopOpacity="0.9" />
                </linearGradient>

                <linearGradient id="depotSidingStroke" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#56B6C6" stopOpacity="0.95" />
                  <stop offset="100%" stopColor="#170C79" stopOpacity="0.8" />
                </linearGradient>
              </defs>

              {/* Clean Engineering Background Grid */}
              <g opacity="0.18">
                {Array.from({ length: 24 }).map((_, i) => (
                  <line
                    key={`vg-${i}`}
                    x1={i * 50}
                    y1="0"
                    x2={i * 50}
                    y2="520"
                    stroke="#8ACBD0"
                    strokeWidth="0.75"
                  />
                ))}
                {Array.from({ length: 11 }).map((_, i) => (
                  <line
                    key={`hg-${i}`}
                    x1="0"
                    y1={i * 50}
                    x2="1200"
                    y2={i * 50}
                    stroke="#8ACBD0"
                    strokeWidth="0.75"
                  />
                ))}
              </g>

              {/* MUTTOM MAINTENANCE DEPOT (Top-Left Facility Box) */}
              <g transform="translate(30, 25)">
                <rect
                  x="0"
                  y="0"
                  width="185"
                  height="135"
                  rx="8"
                  fill="#FFFFFF"
                  stroke="#8ACBD0"
                  strokeWidth="1.5"
                  strokeDasharray="4 2"
                />
                <text
                  x="14"
                  y="22"
                  fill="#170C79"
                  fontSize="11"
                  fontWeight="bold"
                  fontFamily="JetBrains Mono"
                  letterSpacing="0.06em"
                >
                  MUTTOM DEPOT
                </text>
                <text
                  x="14"
                  y="36"
                  fill="#2C2B68"
                  fontSize="8"
                  fontFamily="JetBrains Mono"
                >
                  ROLLING STOCK STABLING & INDUCTION
                </text>

                {/* Depot Stabling Siding Tracks */}
                <line x1="18" y1="62" x2="168" y2="62" stroke="#8ACBD0" strokeWidth="2.5" />
                <text x="20" y="56" fill="#2C2B68" fontSize="7" fontFamily="JetBrains Mono" fontWeight="bold">SIDING 1</text>

                <line x1="18" y1="95" x2="168" y2="95" stroke="#8ACBD0" strokeWidth="2.5" />
                <text x="20" y="89" fill="#2C2B68" fontSize="7" fontFamily="JetBrains Mono" fontWeight="bold">SIDING 2 (HOT RESERVE)</text>

                <line x1="18" y1="125" x2="168" y2="125" stroke="#56B6C6" strokeWidth="2" strokeDasharray="3 3" />
                <text x="20" y="119" fill="#56B6C6" fontSize="7" fontWeight="bold" fontFamily="JetBrains Mono">INDUCTION DISPATCH LINE</text>
              </g>

              {/* DEPOT-TO-MAINLINE TURNOUT FEEDER TRACK */}
              <g>
                <path
                  d="M 140 95 C 160 95, 180 160, 200 230"
                  stroke="url(#depotSidingStroke)"
                  strokeWidth="3"
                  fill="none"
                  strokeDasharray="5 3"
                />
                <rect x="155" y="150" width="80" height="16" rx="3" fill="#FFFFFF" stroke="#8ACBD0" strokeWidth="1" />
                <text
                  x="195"
                  y="161"
                  textAnchor="middle"
                  fill="#56B6C6"
                  fontSize="7.5"
                  fontWeight="bold"
                  fontFamily="JetBrains Mono"
                >
                  DEPOT TURNOUT
                </text>
              </g>

              {/* MAINLINE DOUBLE TRACKS (DOWN AT Y=230 & UP AT Y=350) */}
              <g>
                {/* Down Line Track Base Bed */}
                <line
                  x1="190"
                  y1="230"
                  x2="1130"
                  y2="230"
                  stroke="#8ACBD0"
                  strokeWidth="8"
                  strokeLinecap="round"
                />
                <line
                  x1="190"
                  y1="230"
                  x2="1130"
                  y2="230"
                  stroke="url(#mainlineStroke)"
                  strokeWidth="3"
                />

                {/* Down Line Sleepers */}
                {Array.from({ length: 48 }).map((_, i) => {
                  const tieX = 195 + i * 20;
                  return (
                    <line
                      key={`dtie-${i}`}
                      x1={tieX}
                      y1="222"
                      x2={tieX}
                      y2="238"
                      stroke="#170C79"
                      strokeWidth="1.5"
                      opacity="0.35"
                    />
                  );
                })}

                {/* Up Line Track Base Bed */}
                <line
                  x1="190"
                  y1="350"
                  x2="1130"
                  y2="350"
                  stroke="#8ACBD0"
                  strokeWidth="8"
                  strokeLinecap="round"
                />
                <line
                  x1="190"
                  y1="350"
                  x2="1130"
                  y2="350"
                  stroke="url(#mainlineStroke)"
                  strokeWidth="3"
                />

                {/* Up Line Sleepers */}
                {Array.from({ length: 48 }).map((_, i) => {
                  const tieX = 195 + i * 20;
                  return (
                    <line
                      key={`utie-${i}`}
                      x1={tieX}
                      y1="342"
                      x2={tieX}
                      y2="358"
                      stroke="#170C79"
                      strokeWidth="1.5"
                      opacity="0.35"
                    />
                  );
                })}

                {/* Direction Labels (Spacious Positioning) */}
                <text
                  x="660"
                  y="205"
                  fill="#170C79"
                  fontSize="8.5"
                  fontWeight="bold"
                  fontFamily="JetBrains Mono"
                  letterSpacing="0.08em"
                >
                  DOWN LINE → (SOUTHBOUND TO TRIPUNITHURA)
                </text>
                <text
                  x="660"
                  y="380"
                  fill="#170C79"
                  fontSize="8.5"
                  fontWeight="bold"
                  fontFamily="JetBrains Mono"
                  letterSpacing="0.08em"
                >
                  ← UP LINE (NORTHBOUND TO ALUVA)
                </text>
              </g>

              {/* EMERGENCY SIDING NEAR KALAMASSERY */}
              <g>
                <path
                  d="M 370 350 L 390 150 L 460 150"
                  stroke="#C53030"
                  strokeWidth="2"
                  strokeDasharray="4 3"
                  fill="none"
                />
                <rect x="390" y="130" width="135" height="15" rx="3" fill="#FFFFFF" stroke="#C53030" strokeWidth="0.8" />
                <text
                  x="457"
                  y="141"
                  textAnchor="middle"
                  fill="#C53030"
                  fontSize="7"
                  fontWeight="bold"
                  fontFamily="JetBrains Mono"
                >
                  EMERGENCY SIDING (ISOLATION)
                </text>
              </g>

              {/* RENDER ALL STATIONS WITH NON-OVERLAPPING CLEAR LABELS & LOAD BARS */}
              {stations.filter(s => s.id !== 'DEPOT').map((station) => {
                const coords = stationCoords[station.id];
                const isSelected = selectedStation?.id === station.id;
                const isSurge = station.status === 'SURGE_CRITICAL' || station.passengerDemandPct >= 85;

                return (
                  <g
                    key={station.id}
                    transform={`translate(${coords.x}, ${coords.y})`}
                    onClick={() => onSelectStation(station)}
                    onMouseEnter={() => setHoveredStation(station)}
                    onMouseLeave={() => setHoveredStation(null)}
                    className="cursor-pointer select-none"
                  >
                    {/* Connecting Vertical Track Crossline */}
                    <line x1="0" y1="-60" x2="0" y2="60" stroke="#8ACBD0" strokeWidth="2" strokeDasharray="3 3" opacity="0.6" />

                    {/* Station Node Halo */}
                    <circle
                      cx="0"
                      cy="0"
                      r={isSurge ? "22" : "16"}
                      fill={isSurge ? "rgba(197,48,48,0.2)" : "rgba(86,182,198,0.25)"}
                    />

                    {/* Station Pillar / Marker */}
                    <circle
                      cx="0"
                      cy="0"
                      r={isSelected ? "11" : "8"}
                      fill="#FFFFFF"
                      stroke={isSelected ? '#56B6C6' : isSurge ? '#C53030' : '#170C79'}
                      strokeWidth={isSelected ? '3' : '2'}
                    />
                    <circle
                      cx="0"
                      cy="0"
                      r={isSelected ? "5" : "3.5"}
                      fill={isSurge ? '#C53030' : '#170C79'}
                    />

                    {/* Station Name & Code (Top with Clean Pill Box — Zero Overlap with Down Line) */}
                    <g transform="translate(0, -100)">
                      <rect
                        x="-52"
                        y="-15"
                        width="104"
                        height="30"
                        rx="5"
                        fill="#FFFFFF"
                        stroke="#8ACBD0"
                        strokeWidth="1.2"
                        className="shadow-2xs"
                      />
                      <text
                        x="0"
                        y="-2"
                        textAnchor="middle"
                        fill="#170C79"
                        fontSize="9.5"
                        fontWeight="bold"
                        fontFamily="JetBrains Mono"
                        letterSpacing="0.03em"
                      >
                        {station.name.toUpperCase()}
                      </text>
                      <text
                        x="0"
                        y="9"
                        textAnchor="middle"
                        fill="#2C2B68"
                        fontSize="7.5"
                        fontWeight="bold"
                        fontFamily="JetBrains Mono"
                      >
                        KM {station.kmPosition.toFixed(1)} • {station.code}
                      </text>
                    </g>

                    {/* Demand & Queue HUD Badge (Bottom — Zero Overlap with Up Line) */}
                    <g transform="translate(0, 95)">
                      <rect
                        x="-42"
                        y="-14"
                        width="84"
                        height="28"
                        rx="4"
                        fill="#FFFFFF"
                        stroke={isSurge ? '#C53030' : '#8ACBD0'}
                        strokeWidth={isSurge ? '1.5' : '1'}
                      />
                      
                      {/* Passenger Demand Bar */}
                      <rect x="-36" y="-9" width="72" height="4.5" rx="1" fill="#EFE3CA" />
                      <rect
                        x="-36"
                        y="-9"
                        width={Math.max(4, (station.passengerDemandPct / 100) * 72)}
                        height="4.5"
                        rx="1"
                        fill={isSurge ? '#C53030' : '#56B6C6'}
                      />

                      {/* Waiting Count */}
                      <text
                        x="-34"
                        y="8"
                        fill={isSurge ? '#C53030' : '#170C79'}
                        fontSize="7.5"
                        fontWeight="bold"
                        fontFamily="JetBrains Mono"
                      >
                        {station.waitingCount} PAX
                      </text>
                      <text
                        x="34"
                        y="8"
                        textAnchor="end"
                        fill="#2C2B68"
                        fontSize="7.5"
                        fontWeight="bold"
                        fontFamily="JetBrains Mono"
                      >
                        {station.passengerDemandPct}%
                      </text>
                    </g>
                  </g>
                );
              })}

              {/* RENDER ALL MOVING TRAINS */}
              {trains.map((train) => (
                <TrainVehicle
                  key={train.id}
                  train={train}
                  onClick={onSelectTrain}
                  isSelected={selectedTrain?.id === train.id}
                />
              ))}
            </svg>
          </div>
        </div>

        {/* Integrated Side Control & Telemetry Deck (3 Cols) */}
        <div className="xl:col-span-3 rounded-xl bg-[#EFE3CA] border border-[#8ACBD0] p-4 flex flex-col justify-between space-y-4 shadow-inner">
          <div>
            <div className="flex items-center justify-between pb-2.5 mb-3 border-b border-[#8ACBD0]">
              <span className="text-[10px] font-mono-tech uppercase tracking-wider text-[#170C79] font-bold">
                SIMULATION CONTROLS
              </span>
              <div className="flex items-center gap-1.5 text-xs font-mono-tech text-[#170C79]">
                <Clock className="w-3.5 h-3.5 text-[#56B6C6]" />
                <span className="font-bold">{simTime}</span>
              </div>
            </div>

            {/* Playback Controls (Play / Pause, Speed Multipliers) */}
            <div className="space-y-3">
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={onTogglePlay}
                  className={`py-2.5 px-3 rounded-lg font-mono-tech font-bold text-xs flex items-center justify-center gap-2 cursor-pointer transition-all active:scale-95 shadow-sm ${
                    isPlaying
                      ? 'bg-[#170C79] text-[#EFE3CA] hover:bg-[#56B6C6] hover:text-[#170C79]'
                      : 'bg-[#56B6C6] text-[#170C79] hover:bg-[#48A1B0]'
                  }`}
                >
                  {isPlaying ? (
                    <>
                      <Pause className="w-3.5 h-3.5" />
                      <span>PAUSE SIM</span>
                    </>
                  ) : (
                    <>
                      <Play className="w-3.5 h-3.5" />
                      <span>RUN SIM</span>
                    </>
                  )}
                </button>

                <button
                  onClick={onReset}
                  className="py-2.5 px-3 rounded-lg bg-[#FFFFFF] hover:bg-[#8ACBD0] border border-[#8ACBD0] text-[#170C79] font-mono-tech text-xs font-bold transition-colors cursor-pointer flex items-center justify-center gap-1.5 shadow-xs"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>RESET</span>
                </button>
              </div>

              {/* Speed Multipliers */}
              <div className="space-y-1">
                <span className="text-[9px] font-mono-tech text-[#2C2B68] uppercase block font-bold">
                  PLAYBACK SPEED
                </span>
                <div className="grid grid-cols-4 gap-1.5 bg-[#FFFFFF] p-1 rounded-lg border border-[#8ACBD0] font-mono-tech text-xs shadow-xs">
                  {[0.5, 1, 2, 4].map((spd) => (
                    <button
                      key={spd}
                      onClick={() => onSetSpeed(spd)}
                      className={`py-1 rounded transition-colors cursor-pointer text-center ${
                        simSpeed === spd
                          ? 'bg-[#56B6C6] text-[#170C79] font-bold shadow-xs'
                          : 'text-[#2C2B68] hover:text-[#170C79] hover:bg-[#8ACBD0]/40'
                      }`}
                    >
                      {spd}×
                    </button>
                  ))}
                </div>
              </div>

              {/* Time Scrubber Slider */}
              <div className="space-y-1.5 pt-2 border-t border-[#8ACBD0]/40">
                <div className="flex justify-between text-[10px] font-mono-tech text-[#2C2B68] font-bold">
                  <span>08:00 (START)</span>
                  <span className="text-[#170C79] font-bold">{progressPct.toFixed(0)}% ELAPSED</span>
                  <span>09:30 (END)</span>
                </div>
                <div className="w-full h-2 bg-[#8ACBD0] rounded-full overflow-hidden">
                  <div
                    className="h-full bg-[#56B6C6] rounded-full transition-all duration-300"
                    style={{ width: `${progressPct}%` }}
                  ></div>
                </div>
              </div>
            </div>

            {/* Quick Live Telemetry Readout */}
            <div className="mt-4 pt-3 border-t border-[#8ACBD0]/40 space-y-2 text-xs font-mono-tech">
              <span className="text-[9px] font-bold text-[#170C79] uppercase block">
                CORRIDOR TELEMETRY
              </span>
              <div className="flex justify-between p-2 rounded bg-[#FFFFFF] border border-[#8ACBD0] shadow-xs">
                <span className="text-[#2C2B68] font-bold">ACTIVE FLEET:</span>
                <span className="text-[#170C79] font-bold">
                  {trains.filter(t => t.status === 'IN_SERVICE' || t.status === 'INDUCTING').length}/{trains.length} Units
                </span>
              </div>
              <div className="flex justify-between p-2 rounded bg-[#FFFFFF] border border-[#8ACBD0] shadow-xs">
                <span className="text-[#2C2B68] font-bold">TARGET HEADWAY:</span>
                <span className="text-[#170C79] font-bold">04:30 MIN</span>
              </div>
              <div className="flex justify-between p-2 rounded bg-[#FFFFFF] border border-[#8ACBD0] shadow-xs">
                <span className="text-[#2C2B68] font-bold">POWER GRID:</span>
                <span className="text-[#170C79] font-bold">750V DC (OK)</span>
              </div>
            </div>
          </div>

          {/* Quick AI Optimize Action Button */}
          <div className="pt-3 border-t border-[#8ACBD0]/40">
            <button
              onClick={onRunOptimization}
              disabled={isOptimizing}
              className="w-full py-2.5 px-3 rounded-lg bg-[#170C79] hover:bg-[#56B6C6] hover:text-[#170C79] text-[#EFE3CA] font-mono-tech font-bold text-xs uppercase tracking-wider transition-colors cursor-pointer flex items-center justify-center gap-2 shadow-md disabled:opacity-50"
            >
              <Sparkles className={`w-3.5 h-3.5 text-[#56B6C6] ${isOptimizing ? 'animate-spin' : ''}`} />
              <span>{isOptimizing ? 'SOLVING...' : 'TRIGGER AI OPTIMIZE'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Hover Station Inspector Tooltip */}
      {hoveredStation && (
        <div className="absolute top-20 right-8 bg-[#FFFFFF] border-2 border-[#8ACBD0] rounded-xl p-4 shadow-xl z-30 min-w-[240px] pointer-events-none text-xs font-mono-tech">
          <div className="flex items-center justify-between border-b border-[#8ACBD0]/40 pb-1.5 mb-2">
            <span className="font-bold text-[#170C79] uppercase text-sm font-mono-tech">
              {hoveredStation.name}
            </span>
            <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded border ${
              hoveredStation.status === 'SURGE_CRITICAL' 
                ? 'bg-[#C53030]/15 text-[#C53030] border-[#C53030]/30' 
                : 'bg-[#8ACBD0]/30 text-[#170C79] border-[#8ACBD0]'
            }`}>
              {hoveredStation.status}
            </span>
          </div>

          <div className="space-y-1.5 text-[#170C79]">
            <div className="flex justify-between">
              <span className="text-[#2C2B68] font-bold">DEMAND LOAD:</span>
              <span className="text-[#170C79] font-bold">{hoveredStation.passengerDemandPct}%</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[#2C2B68] font-bold">WAITING QUEUE:</span>
              <span className="text-[#170C79] font-bold">{hoveredStation.waitingCount} commuters</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[#2C2B68] font-bold">INFLOW RATE:</span>
              <span className="text-[#56B6C6] font-bold">+{hoveredStation.inflowRatePerMin} pax/min</span>
            </div>
          </div>
          <div className="mt-2 pt-1.5 border-t border-[#8ACBD0]/40 text-[9px] text-[#2C2B68] flex items-center gap-1">
            <Info className="w-3 h-3 text-[#56B6C6]" />
            <span>Click node to view full platform CCTV telemetry</span>
          </div>
        </div>
      )}
    </div>
  );
};



