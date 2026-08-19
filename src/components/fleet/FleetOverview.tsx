import React from 'react';
import { Train } from '../../types/simulation';
import { Train as TrainIcon, ChevronRight } from 'lucide-react';

interface FleetOverviewProps {
  trains: Train[];
  onSelectTrain: (train: Train) => void;
  selectedTrain: Train | null;
}

export const FleetOverview: React.FC<FleetOverviewProps> = ({
  trains,
  onSelectTrain,
  selectedTrain
}) => {
  const getStatusBadge = (status: Train['status']) => {
    switch (status) {
      case 'IN_SERVICE':
        return { text: 'IN SERVICE', bg: 'bg-[#2E8B57]/15 text-[#2E8B57] border-[#2E8B57]/40 font-bold' };
      case 'INDUCTING':
        return { text: 'INDUCTING (AI)', bg: 'bg-[#56B6C6]/25 text-[#170C79] border-[#56B6C6]/50 font-bold' };
      case 'READY_INDUCTION':
        return { text: 'READY FOR INDUCTION', bg: 'bg-[#56B6C6]/25 text-[#170C79] border-[#56B6C6]/50 font-bold' };
      case 'STANDBY':
        return { text: 'DEPOT STANDBY', bg: 'bg-[#8ACBD0]/30 text-[#170C79] border-[#8ACBD0] font-bold' };
      case 'MAINTENANCE':
        return { text: 'MAINTENANCE HOLD', bg: 'bg-[#C53030]/15 text-[#C53030] border-[#C53030]/40 font-bold' };
      default:
        return { text: status, bg: 'bg-[#EFE3CA] text-[#2C2B68] border-[#8ACBD0]' };
    }
  };

  return (
    <div className="w-full rounded-2xl bg-[#8ACBD0] border-2 border-[#56B6C6]/50 p-2 shadow-sm space-y-2">
      {/* Top Window Bezel with Micro-Rivets & Master Roster Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 px-3 pt-2 pb-2">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 mr-1">
            <span className="w-1.5 h-1.5 rounded-full bg-[#170C79]/40"></span>
            <span className="w-1.5 h-1.5 rounded-full bg-[#170C79]/40"></span>
          </div>

          <div className="p-2 rounded-lg bg-[#EFE3CA] border border-[#8ACBD0] text-[#170C79]">
            <TrainIcon className="w-4 h-4 text-[#56B6C6]" />
          </div>
          <div>
            <h2 className="font-mono-tech font-bold text-sm md:text-base text-[#170C79] uppercase tracking-wide">
              KMRL ROLLING STOCK FLEET ROSTER
            </h2>
            <p className="font-inter text-xs text-[#2C2B68] font-medium">
              8 Metropolis 3-Car Trainsets • Alstom CBTC Urbalis 400
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3 text-xs font-mono-tech">
          <div className="bg-[#EFE3CA] px-3 py-1 rounded border border-[#8ACBD0] text-[#170C79] font-bold">
            <span className="text-[#2C2B68]">IN SERVICE: </span>
            <span className="text-[#170C79]">
              {trains.filter(t => t.status === 'IN_SERVICE' || t.status === 'INDUCTING').length}
            </span>
          </div>
          <div className="bg-[#EFE3CA] px-3 py-1 rounded border border-[#8ACBD0] text-[#170C79] font-bold">
            <span className="text-[#2C2B68]">DEPOT RESERVE: </span>
            <span className="text-[#170C79]">
              {trains.filter(t => t.status === 'STANDBY' || t.status === 'READY_INDUCTION').length}
            </span>
          </div>

          <div className="flex items-center gap-1.5 ml-1">
            <span className="w-1.5 h-1.5 rounded-full bg-[#170C79]/40"></span>
            <span className="w-1.5 h-1.5 rounded-full bg-[#170C79]/40"></span>
          </div>
        </div>
      </div>

      {/* Grid of 8 Trainset Train Window Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5 p-1">
        {trains.map((train) => {
          const isSelected = selectedTrain?.id === train.id;
          const badge = getStatusBadge(train.status);
          const loadPct = Math.round((train.passengerLoad / train.capacity) * 100);

          return (
            <div
              key={train.id}
              onClick={() => onSelectTrain(train)}
              className={`rounded-2xl p-1.5 transition-all duration-200 cursor-pointer flex flex-col justify-between ${
                isSelected
                  ? 'bg-[#8ACBD0] border-2 border-[#56B6C6] shadow-md scale-[1.01]'
                  : 'bg-[#8ACBD0] border-2 border-[#8ACBD0] hover:border-[#56B6C6] shadow-sm'
              }`}
            >
              {/* Window Top Bezel with Micro-Rivets */}
              <div className="flex items-center justify-between px-2 pt-1 pb-1.5">
                <div className="flex items-center gap-1">
                  <span className={`w-1 h-1 rounded-full ${isSelected ? 'bg-[#170C79]' : 'bg-[#170C79]/30'}`}></span>
                  <span className={`w-1 h-1 rounded-full ${isSelected ? 'bg-[#170C79]' : 'bg-[#170C79]/30'}`}></span>
                </div>
                <span className="text-[8.5px] font-mono-tech uppercase tracking-wider text-[#170C79] font-bold">
                  CARRIAGE {train.id}
                </span>
                <div className="flex items-center gap-1">
                  <span className={`w-1 h-1 rounded-full ${isSelected ? 'bg-[#170C79]' : 'bg-[#170C79]/30'}`}></span>
                  <span className={`w-1 h-1 rounded-full ${isSelected ? 'bg-[#170C79]' : 'bg-[#170C79]/30'}`}></span>
                </div>
              </div>

              {/* Inner Inset Viewport Pane */}
              <div className="bg-[#EFE3CA] rounded-xl p-3 border border-[#8ACBD0] flex flex-col justify-between flex-1 shadow-inner">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <span className="font-mono-tech font-bold text-xl text-[#170C79] tracking-wider">
                        {train.id}
                      </span>
                      <span className="text-[10px] font-mono-tech text-[#2C2B68] font-bold">
                        {train.name.replace('Trainset ', '')}
                      </span>
                    </div>
                    <span className={`text-[8px] font-mono-tech font-bold px-2 py-0.5 rounded border uppercase ${badge.bg}`}>
                      {badge.text}
                    </span>
                  </div>

                  {/* Location */}
                  <div className="text-xs text-[#170C79] font-mono-tech mb-2.5 truncate flex items-center gap-1">
                    <span className="text-[#2C2B68] font-bold">LOC:</span>
                    <span className="font-bold text-[#170C79] truncate">{train.location}</span>
                  </div>

                  {/* Passenger Load Bar */}
                  <div className="space-y-1 mb-3">
                    <div className="flex justify-between text-[10px] font-mono-tech">
                      <span className="text-[#2C2B68] font-bold">LOAD FACTOR</span>
                      <span className="font-bold text-[#170C79]">
                        {train.passengerLoad} / {train.capacity} ({loadPct}%)
                      </span>
                    </div>
                    <div className="w-full h-1.5 bg-[#8ACBD0] rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full ${
                          loadPct > 85 ? 'bg-[#C53030]' : 'bg-[#56B6C6]'
                        }`}
                        style={{ width: `${loadPct}%` }}
                      ></div>
                    </div>
                  </div>
                </div>

                {/* Telemetry Metrics Row */}
                <div className="pt-2 border-t border-[#8ACBD0]/40 grid grid-cols-3 gap-1 text-[10px] font-mono-tech">
                  <div className="bg-[#FFFFFF] p-1.5 rounded border border-[#8ACBD0] shadow-xs">
                    <span className="text-[#2C2B68] block text-[8px] font-bold">SPEED</span>
                    <span className="font-bold text-[#170C79]">{train.speedKmh} km/h</span>
                  </div>
                  <div className="bg-[#FFFFFF] p-1.5 rounded border border-[#8ACBD0] shadow-xs">
                    <span className="text-[#2C2B68] block text-[8px] font-bold">TEMP</span>
                    <span className={`font-bold ${train.motorTempC > 70 ? 'text-[#C53030]' : 'text-[#170C79]'}`}>
                      {train.motorTempC}°C
                    </span>
                  </div>
                  <div className="bg-[#FFFFFF] p-1.5 rounded border border-[#8ACBD0] shadow-xs">
                    <span className="text-[#2C2B68] block text-[8px] font-bold">HEALTH</span>
                    <span className="font-bold text-[#170C79]">{train.healthScorePct}%</span>
                  </div>
                </div>

                {/* Action trigger */}
                <div className="mt-2.5 pt-2 border-t border-[#8ACBD0]/40 flex items-center justify-between text-[9px] font-mono-tech text-[#2C2B68]">
                  <span className="font-bold">{train.driverStatus}</span>
                  <span className="flex items-center gap-0.5 text-[#170C79] font-bold hover:text-[#56B6C6]">
                    INSPECT <ChevronRight className="w-3 h-3 text-[#56B6C6]" />
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};



