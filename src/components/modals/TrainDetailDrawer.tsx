import React from 'react';
import { Train } from '../../types/simulation';
import { X, Gauge, Thermometer, Zap, Shield } from 'lucide-react';

interface TrainDetailDrawerProps {
  train: Train | null;
  onClose: () => void;
}

export const TrainDetailDrawer: React.FC<TrainDetailDrawerProps> = ({ train, onClose }) => {
  if (!train) return null;

  const loadPercentage = Math.round((train.passengerLoad / train.capacity) * 100);

  return (
    <div className="fixed inset-y-0 right-0 z-50 w-full max-w-md bg-[#EFE3CA] border-l-2 border-[#8ACBD0] shadow-2xl p-6 flex flex-col justify-between font-mono-tech select-none animate-in slide-in-from-right duration-300">
      <div>
        {/* Drawer Header */}
        <div className="flex items-center justify-between pb-4 border-b border-[#8ACBD0] mb-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#170C79] border border-[#56B6C6]/40 flex items-center justify-center font-mono-tech font-bold text-[#EFE3CA] text-xl shadow-md">
              {train.id}
            </div>
            <div>
              <h3 className="font-mono-tech font-bold text-base text-[#170C79] uppercase">
                {train.name}
              </h3>
              <span className="font-inter text-xs text-[#2C2B68] font-medium">
                ALSTOM METROPOLIS • 3-CAR FORMATION
              </span>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-lg bg-[#FFFFFF] hover:bg-[#8ACBD0] text-[#170C79] transition-colors cursor-pointer border border-[#8ACBD0]"
            aria-label="Close drawer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Status Highlight Banner */}
        <div className="p-3.5 rounded-xl bg-[#FFFFFF] border border-[#8ACBD0] mb-6 flex items-center justify-between shadow-xs">
          <div>
            <span className="text-[10px] text-[#2C2B68] uppercase block font-bold">OPERATIONAL STATUS</span>
            <span className="text-sm font-bold text-[#170C79] uppercase tracking-wide">
              {train.status.replace('_', ' ')}
            </span>
          </div>
          <div className="text-right">
            <span className="text-[10px] text-[#2C2B68] uppercase block font-bold">CBTC CONTROL MODE</span>
            <span className="text-xs font-bold text-[#56B6C6]">
              {train.driverStatus} (GoA2)
            </span>
          </div>
        </div>

        {/* Telemetry Metrics Grid */}
        <div className="space-y-4">
          <span className="text-[10px] uppercase tracking-wider text-[#170C79] font-bold block">
            LIVE TRAIN TELEMETRY
          </span>

          <div className="grid grid-cols-2 gap-3">
            <div className="p-3 rounded-lg bg-[#FFFFFF] border border-[#8ACBD0] shadow-xs">
              <div className="flex items-center gap-1.5 text-[#2C2B68] text-[10px] mb-1 font-bold">
                <Gauge className="w-3.5 h-3.5 text-[#56B6C6]" />
                <span>CURRENT SPEED</span>
              </div>
              <span className="font-mono-tech font-bold text-xl text-[#170C79]">
                {train.speedKmh} <span className="text-xs font-medium text-[#2C2B68]">km/h</span>
              </span>
            </div>

            <div className="p-3 rounded-lg bg-[#FFFFFF] border border-[#8ACBD0] shadow-xs">
              <div className="flex items-center gap-1.5 text-[#2C2B68] text-[10px] mb-1 font-bold">
                <Thermometer className="w-3.5 h-3.5 text-[#56B6C6]" />
                <span>TRACTION MOTOR</span>
              </div>
              <span className={`font-mono-tech font-bold text-xl ${train.motorTempC > 70 ? 'text-[#C53030]' : 'text-[#170C79]'}`}>
                {train.motorTempC}° <span className="text-xs font-medium text-[#2C2B68]">C</span>
              </span>
            </div>

            <div className="p-3 rounded-lg bg-[#FFFFFF] border border-[#8ACBD0] shadow-xs">
              <div className="flex items-center gap-1.5 text-[#2C2B68] text-[10px] mb-1 font-bold">
                <Zap className="w-3.5 h-3.5 text-[#56B6C6]" />
                <span>TRACTION POWER</span>
              </div>
              <span className="font-mono-tech font-bold text-xl text-[#170C79]">
                {train.energyConsumptionKwh} <span className="text-xs font-medium text-[#2C2B68]">kWh</span>
              </span>
            </div>

            <div className="p-3 rounded-lg bg-[#FFFFFF] border border-[#8ACBD0] shadow-xs">
              <div className="flex items-center gap-1.5 text-[#2C2B68] text-[10px] mb-1 font-bold">
                <Shield className="w-3.5 h-3.5 text-[#56B6C6]" />
                <span>HEALTH SCORE</span>
              </div>
              <span className="font-mono-tech font-bold text-xl text-[#170C79]">
                {train.healthScorePct}%
              </span>
            </div>
          </div>

          {/* Passenger Capacity Gauge */}
          <div className="p-4 rounded-xl bg-[#FFFFFF] border border-[#8ACBD0] space-y-2 shadow-xs">
            <div className="flex justify-between text-xs">
              <span className="text-[#2C2B68] font-bold">PASSENGER OCCUPANCY</span>
              <span className="font-bold text-[#170C79]">
                {train.passengerLoad} / {train.capacity} ({loadPercentage}%)
              </span>
            </div>
            <div className="w-full h-2 bg-[#8ACBD0] rounded-full overflow-hidden">
              <div
                className={`h-full rounded-full ${
                  loadPercentage > 85 ? 'bg-[#C53030]' : 'bg-[#56B6C6]'
                }`}
                style={{ width: `${loadPercentage}%` }}
              ></div>
            </div>
          </div>

          {/* Location Details */}
          <div className="p-3.5 rounded-lg bg-[#FFFFFF] border border-[#8ACBD0] text-xs space-y-1.5 shadow-xs">
            <div className="flex justify-between">
              <span className="text-[#2C2B68] font-bold">CURRENT TRACK BLOCK:</span>
              <span className="text-[#170C79] font-bold">{train.location}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[#2C2B68] font-bold">RUNNING DIRECTION:</span>
              <span className="text-[#170C79] font-bold">
                {train.direction === 'DOWN' ? 'SOUTHBOUND (Tripunithura)' : 'NORTHBOUND (Aluva)'}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-[#2C2B68] font-bold">ASSIGNED ROUTE:</span>
              <span className="text-[#170C79] font-bold">{train.assignedRoute}</span>
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
          CLOSE TELEMETRY INSPECTOR
        </button>
      </div>
    </div>
  );
};



