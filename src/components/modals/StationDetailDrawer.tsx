import React from 'react';
import { Station, Train } from '../../types/simulation';
import { X, Video, Users } from 'lucide-react';

interface StationDetailDrawerProps {
  station: Station | null;
  trains: Train[];
  onClose: () => void;
  onDeployInductionToStation?: (stationId: string) => void;
}

export const StationDetailDrawer: React.FC<StationDetailDrawerProps> = ({
  station,
  trains,
  onClose
}) => {
  if (!station) return null;

  const isSurge = station.status === 'SURGE_CRITICAL' || station.passengerDemandPct >= 85;
  const approachingTrains = trains.filter(t => t.status === 'IN_SERVICE' || t.status === 'INDUCTING');

  return (
    <div className="fixed inset-y-0 right-0 z-50 w-full max-w-md bg-[#EFE3CA] border-l-2 border-[#8ACBD0] shadow-2xl p-6 flex flex-col justify-between font-mono-tech select-none animate-in slide-in-from-right duration-300">
      <div>
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-[#8ACBD0] mb-6">
          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-mono-tech font-bold text-lg text-[#170C79] uppercase">
                {station.name}
              </h3>
              <span className="text-xs font-bold px-2 py-0.5 rounded bg-[#FFFFFF] text-[#170C79] border border-[#8ACBD0] shadow-xs">
                {station.code}
              </span>
            </div>
            <span className="font-inter text-xs text-[#2C2B68] font-medium">
              KM {station.kmPosition.toFixed(1)} • ELEVATED INTERCHANGE
            </span>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-lg bg-[#FFFFFF] hover:bg-[#8ACBD0] text-[#170C79] transition-colors cursor-pointer border border-[#8ACBD0]"
            aria-label="Close drawer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Live CCTV Video Feed Simulation HUD */}
        <div className="relative rounded-xl overflow-hidden border-2 border-[#8ACBD0] bg-[#FFFFFF] mb-6 shadow-sm">
          <div className="p-2.5 bg-[#EFE3CA] flex items-center justify-between border-b border-[#8ACBD0] text-[10px] font-mono-tech">
            <div className="flex items-center gap-1.5 text-[#170C79]">
              <Video className="w-3.5 h-3.5 text-[#56B6C6]" />
              <span className="font-bold">LIVE CCTV • CAM-04 (PLATFORM 2)</span>
            </div>
            <span className="text-[#2C2B68] font-bold">AI CROWD DENSITY: {station.cctvRiskScore}%</span>
          </div>

          {/* CCTV Visual Canvas Frame */}
          <div className="h-36 relative flex items-center justify-center p-4 bg-[#FFFFFF]">
            {/* Simulated Bounding Boxes */}
            <div className="absolute inset-4 border border-dashed border-[#8ACBD0] rounded flex items-center justify-center bg-[#EFE3CA]/40">
              <div className="text-center space-y-1">
                <Users className="w-8 h-8 mx-auto text-[#170C79]" />
                <span className="text-[11px] text-[#170C79] font-bold block">
                  {station.waitingCount} COMMUTERS DETECTED
                </span>
                <span className="text-[9px] text-[#56B6C6] font-bold">
                  SURGE INFLOW: +{station.inflowRatePerMin} pax/min
                </span>
              </div>
            </div>

            {/* Corner HUD Markers */}
            <div className="absolute top-2 left-2 text-[8px] text-[#2C2B68] font-bold">FPS: 30.0</div>
            <div className="absolute bottom-2 right-2 text-[8px] text-[#170C79] font-bold">OPTICAL FLOW: ACTIVE</div>
          </div>
        </div>

        {/* Queue & Capacity Metrics */}
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-3 text-xs font-mono-tech">
            <div className="p-3 rounded-lg bg-[#FFFFFF] border border-[#8ACBD0] shadow-xs">
              <span className="text-[10px] text-[#2C2B68] uppercase block mb-1 font-bold">PLATFORM LOAD</span>
              <span className={`font-mono-tech font-bold text-2xl ${isSurge ? 'text-[#C53030]' : 'text-[#170C79]'}`}>
                {station.passengerDemandPct}%
              </span>
            </div>

            <div className="p-3 rounded-lg bg-[#FFFFFF] border border-[#8ACBD0] shadow-xs">
              <span className="text-[10px] text-[#2C2B68] uppercase block mb-1 font-bold">BOTTLENECK RISK</span>
              <span className={`font-mono-tech font-bold text-2xl ${station.cctvRiskScore > 75 ? 'text-[#C53030]' : 'text-[#170C79]'}`}>
                {station.cctvRiskScore}/100
              </span>
            </div>
          </div>

          {/* Approaching Trains Stream */}
          <div className="space-y-2">
            <span className="text-[10px] uppercase tracking-wider text-[#170C79] font-bold block">
              APPROACHING METRO TRAINSETS
            </span>

            <div className="space-y-2 max-h-32 overflow-y-auto font-mono-tech">
              {approachingTrains.slice(0, 3).map((train) => (
                <div
                  key={train.id}
                  className="p-2.5 rounded-lg bg-[#FFFFFF] border border-[#8ACBD0] flex items-center justify-between text-xs shadow-xs"
                >
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-[#170C79]">{train.id}</span>
                    <span className="text-[10px] text-[#2C2B68] font-bold">{train.direction} LINE</span>
                  </div>
                  <div className="text-right">
                    <span className="text-[#170C79] font-bold block">{train.speedKmh} km/h</span>
                    <span className="text-[9px] text-[#2C2B68]">{train.location}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Action Footer */}
      <div className="pt-4 border-t border-[#8ACBD0]">
        <button
          onClick={onClose}
          className="w-full py-3 rounded-xl bg-[#170C79] hover:bg-[#56B6C6] hover:text-[#170C79] text-[#EFE3CA] font-mono-tech font-bold text-xs uppercase tracking-wider transition-colors cursor-pointer shadow-md"
        >
          CLOSE CCTV INSPECTOR
        </button>
      </div>
    </div>
  );
};



